// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var exampleApp = angular.module('starter', ['ionic','ionic.service.core', 'starter.services', 'LocalStorageModule', 'btford.socket-io']
  )

.run(function($ionicPlatform) {
  var isIOS = $ionicPlatform.is("ios");
  var isAndroid = $ionicPlatform.is("android");

  $ionicPlatform.ready(function() {

    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $httpProvider){
  delete $httpProvider.defaults.headers.common['X-Requested-With'];


  $stateProvider
    .state('need', {
      url: '/need',
      templateUrl: 'need.html',
      controller: 'StartController'
    })

    .state('map', {
      url: '/map',
      templateUrl: 'map.html',
      controller: 'MainController'
    })

    .state('photo', {
      url: '/photo',
      templateUrl: 'photo.html',
      controller: 'CameraController'
    })
    .state('confirm', {
      url: '/confirm',
      templateUrl: 'confirm.html',
      controller: 'ConfirmController'
    })
    .state('pushAcception', {
      url: '/pushAcception',
      templateUrl: 'pushAcception.html',
    })
    .state('acception', {
      url: '/acception',
      templateUrl: 'acception.html',
      controller : 'AcceptionController'
    })
    .state('navigationWalk', {
      url: '/navigationWalk',
      templateUrl: 'navigationWalk.html',
      controller: 'NavigationController',
      params: {
        isBike: false
      }
    })
    .state('pushAsk', {
      url: '/pushAsk',
      templateUrl: 'pushAsk.html',
      controller: 'PushAskController',
    })
    .state('ask', {
      url: '/ask',
      templateUrl: 'ask.html',
      controller: 'AskController',
    })
    .state('anyway', {
      url: '/anyway',
      templateUrl: 'anyway.html',
    })
    .state('alreadyAccepted', {
      url: '/alreadyAccepted',
      templateUrl: 'alreadyAccepted.html',
    })
    .state('thankyou', {
      url: '/thankyou',
      templateUrl: 'thankyou.html',
      controller: 'ThankyouController'
    })
    .state('see', {
      url: '/see',
      templateUrl: 'see.html',
      controller : 'SeeController'
    })
    .state('coming', {
      url: '/coming',
      templateUrl: 'coming.html',
      controller: 'ComingController'
    });
  $urlRouterProvider.otherwise('/need');
});

exampleApp.controller('StartController', function($scope, $state, GoogleMap, localStorageService, mySocket, share, $http) {

  var getCurrentLocation = function(){

    function saveLocation(pos){
      share.setLocation(pos.coords.latitude, pos.coords.longitude);
      return GoogleMap.saveLocation(share.location, share.token)
    }

    function saveFakeLocation(err){
      return GoogleMap.saveLocation(share.location, share.token)
    }

    function processResult(result){
      var location = result.data.data.location
      console.log("save location successful with result " , result)
    }

    GoogleMap.getLocation()
      .then(saveLocation, saveFakeLocation)
      .then(processResult)
  };

  $scope.goMap = function(){
    var input = document.getElementById("inputNeed");
    if(input.value != "") {
      share.setNeed(input.value)
    }
    $state.go("map")
  };

  // create the token if there is not
  if(!share.token) {
    var tokenString = share.token == null ? "" : "/" + share.token;
    var url = "http://" + apiHost + "/createToken" + tokenString;

    $http.get(url).then(function (response) {
      var createdId = response.data.data.uuid;
      console.log('create user token', createdId);
      share.setToken(createdId)
      localStorageService.set("token", createdId);
      getCurrentLocation();
    }, function (err) {
      alert("error in create token from server");
    });
  }else{
    getCurrentLocation();
  }

  console.log('start with token:' , share.token);

  mySocket.on("askHelp", function(data){
    console.log("ask help data is", data)
    var isFound = data.target.some(function(item){
      if(item.token == share.token){
        share.setAsk({
          asker : data.asker,
          need : data.need,
          distance : item.distance
        });
        return true
      }
    });
    if(isFound){
      $state.go("pushAsk")
    }
  });
});

exampleApp.controller('MainController', function($scope, GoogleMap, localStorageService, share, $http) {
  var myLatlng = new google.maps.LatLng(share.location.latitude, share.location.longitude);
  var mapOptions = {
    center: myLatlng,
    zoom: 15,
    disableDefaultUI: true,
    scrollwheel:  false,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    styles : globalConfig.mapStyle,
    draggable : false
  };
  //var mapEl = document.getElementById("map");
  var circle = document.getElementById("circle");
  var map = new google.maps.Map(document.getElementById("map"), mapOptions);
  $scope.map = map;

  var myLocation = new google.maps.Marker({
    position: new google.maps.LatLng(location.latitude, location.longitude),
    map: map,
    title: "My Location"
  });
});

exampleApp.controller('AskController', function($scope, $state, share, mySocket){
  var request = share.ask;
  $scope.need = "some people need help, but we don't know what he/she need";
  if(request.need != null && request.need != null){
    $scope.need = "A lovely neighbor in " + request.distance + "m needs " + request.need
  }
});

/**
 * Confirm Controller
 */
exampleApp.controller('ConfirmController', function($scope, $http, share, $state, mySocket){
  $scope.waitText = "Waiting for other neighbor's reply...";
  var data = {
    "longitude" : encodeURI(share.location.longitude.toFixed(6)),
    "latitude" : encodeURI(share.location.latitude.toFixed(6)),
    "range" : share.range,
    "need"  : encodeURI(share.need == null ? "default" : share.need)
  };

  var url = "http://" + apiHost + "/calculateLocation" + "/" + share.token;
  $http.get(url, {params: data}).then(function(response){
    var result = response.data.data;
    if(result.length > 0){
      $scope.waitText = "We found " + result.length + " users around, please wait for answer";
    }else {
      $scope.waitText = "Currently no people nearby.";
    }
  }, function(err){
    console.log("ERROR" , err.toString());
  });

  mySocket.on("sendHelpAsker" + share.token, function(data){
    console.log('receive infomation is', data)
    share.setHelp(data);
    $state.go('pushAcception');
  })
});

exampleApp.controller("AcceptionController", function($scope,$state, share){
  $scope.navBike = function(){
    $state.go('navigationWalk' , {isBike : true})
  }
  $scope.navWalk = function(){
    $state.go('navigationWalk' , {isBike : false})
  }
});

exampleApp.controller('ThankyouController', function($scope, share, mySocket, $state, GoogleMap){

  $scope.sendInfo = function(){
    var input = document.getElementById("addressInput");
    if(input.value !== ""){
      share.setMeet(input.value)

      mySocket.emit('sendHelp', {
        asker : share.ask.asker,
        meet : share.meet,
        helper : share.token,
        location : share.location,
        distance : share.ask.distance
      });

      $state.go('see')
    }else{
      alert("please tell your neighbor a place to meet")
    }
  };

  $scope.getAddress = function(){

    var processPosition = function(pos){
      share.setLocation(pos.coords.latitude, pos.coords.longitude);
      return GoogleMap.getAddress(pos)
    };

    var processAddress = function(address){
      var input = document.getElementById("addressInput");
      input.value = address
    };

    var wrongPosition = function(err){
      alert("some error happened" + err )
    };

    GoogleMap.getLocation()
      .then(processPosition, wrongPosition)
      .then(processAddress, wrongPosition)
  }
})

exampleApp.controller('SeeController', function($scope, GoogleMap, share, mySocket){

});

exampleApp.controller('PushAskController', function($scope, share, mySocket){
  var request = share.ask;
  $scope.need = "some people need help, but we don't know what he/she need";
  if(request.need != null && request.need != null){
    $scope.need = "A lovely neighbor in " + request.distance + "m needs " + request.need
  }
});

exampleApp.controller('CameraController', function($scope, share, Camera) {
  var options  = {
    quality: 100,
    allowEdit : true,
    targetWidth: 320,
    targetHeight: 320,
    saveToPhotoAlbum: false,
    correctOrientation: true
  };


  $scope.getPhoto = function() {
    Camera.getPicture(options).then(function(imageURI) {
      console.log(imageURI);
      $scope.lastPhoto = imageURI;
      $scope.hasPhoto = true;
    }, function(err) {
      console.err(err);
    });
  };
})


exampleApp.controller('NavigationController',function($stateParams, $scope, $state, GoogleMap, share, $interval,mySocket){

  $scope.meetAddress = share.help.meet != "" ? share.help.meet : "his current address";

  var startLatLng = new google.maps.LatLng(share.location.latitude, share.location.longitude);
  var destLatLng = new google.maps.LatLng(share.help.location.latitude, share.help.location.longitude);

  console.log('map options are', share.location, share.help.location)
  var mapOptions = {
    center: startLatLng,
    zoom: 15,
    disableDefaultUI: true,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
  };

  var map = new google.maps.Map(document.getElementById("mapNav"), mapOptions);
  var styles = globalConfig.mapStyle;
  map.setOptions({styles: styles});
  $scope.map = map;

  $interval(function () {
    GoogleMap.getLocation().then(function(pos){
      var updateLatLng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude)
      //map.panTo(updateLatLng); //todo maybe delete later
      //myLocation.setPosition(updateLatLng)
      var updatedLocation = {
        latitude : pos.coords.latitude,
        longitude: pos.coords.longitude
      };
      share.setLocation(updatedLocation);
      console.log('now send update with data' , {
        location : updatedLocation,
        asker : share.token,
        helper : share.help.helper
      }) //TODO
      mySocket.emit("sendUpdate", {
        location : updatedLocation,
        asker : share.token,
        helper : share.help.helper
      })
    })
  }, globalConfig.updateInterval);

  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;
  directionsDisplay.setMap(map);

  var directRoute = function(isBike){
    console.log("now nav with bike :" ,isBike)
    var walkEl = document.getElementById("walkIcon")
    var bikeEl = document.getElementById("bikeIcon")
    walkEl.className = !isBike ? "walk-white" : "walk-black";
    walkEl.src = !isBike ? "img/walk1.png" : "img/walk.png";
    bikeEl.className = isBike ? "bike-white" : "bike-black";
    bikeEl.src = isBike ? "img/bike1.png" : "img/bike.png";

    var request = {
      origin:startLatLng,
      destination:share.help.meet + ", Berlin, Germany",
      travelMode: isBike ? google.maps.TravelMode.BICYCLING : google.maps.TravelMode.WALKING
    };

    directionsService.route(request, function(result, status) {
      console.log('result is', result);
      if (status == google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(result);
      }else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  };

  $scope.navBike = function(){
    directRoute(true);
  }
  $scope.navWalk = function(){
    directRoute(false);
  }
  console.log("stateParams is, ", $stateParams)
  directRoute($stateParams.isBike)
})

exampleApp.controller('ComingController', function($scope, GoogleMap,$interval, share, localStorageService, mySocket) {

  var startLatLng = new google.maps.LatLng(share.location.latitude, share.location.longitude)
  var mapOptions = {
    center: startLatLng,
    zoom: 15,
    disableDefaultUI: true,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    styles :  globalConfig.mapStyle
  };
  var map = new google.maps.Map(document.getElementById("mapNav"), mapOptions);
  var myLocation = new google.maps.Marker({
    position: startLatLng,
    icon : "http://66.media.tumblr.com/4efe7440870da2674c66e73912fa2ec5/tumblr_oa1tw6Flcc1qkfs2lo2_75sq.png",
    map: map
  });
  var comingLocaion = new google.maps.Marker({
    position: startLatLng,
    map : map,
    icon : 'http://67.media.tumblr.com/085fb9fc287c722a6a3045b5a3ab2b58/tumblr_oa1tw6Flcc1qkfs2lo1_75sq.png'
  });
  $scope.map = map;

  //update my location
  $interval(function () {
    GoogleMap.getLocation().then(function(pos){
      var updateLatLng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude)
      myLocation.setPosition(updateLatLng)
    })
  }, globalConfig.updateInterval);

  //update coming loactino
  mySocket.on("updateHelper" + share.token, function(data){
    console.log("receive location data" , data)
    var updateLatLng = new google.maps.LatLng(data.location.latitude, data.location.longitude)
    comingLocaion.setPosition(updateLatLng)
  });
})



function showDiv() {
  document.getElementById('buttonAppear').style.display = "block";
}
function vanishDiv() {
  document.getElementById('buttonVanish').style.display= "none";
}
function showBroadcast() {
  document.getElementById('broadcastButton').style.display = "block";
}
function showSend() {
  document.getElementById('sendButton').style.display = "block";
}
function showPhoto() {
  document.getElementById('photoButton').style.display = "block";
}


