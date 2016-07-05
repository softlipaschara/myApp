// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var exampleApp = angular.module('starter', ['ionic', 'starter.services'])



.run(function($ionicPlatform) {
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

.config(function($stateProvider, $urlRouterProvider){
  $stateProvider
    .state('need', {
      url: '/need',
      templateUrl: 'need.html',
      //controller: 'MainController'
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
      //controller: 'AnimationController'
    })
    .state('acception', {
    url: '/acception',
    templateUrl: 'acception.html',
    })
    .state('navigationWalk', {
      url: '/navigationWalk',
      templateUrl: 'navigationWalk.html',
      controller: 'MainController1'
    })
    .state('navigationBike', {
      url: '/navigationBike',
      templateUrl: 'navigationBike.html',
      controller: 'MainController2'
    })
    .state('ask', {
      url: '/ask',
      templateUrl: 'ask.html',
    })
    .state('anyway', {
      url: '/anyway',
      templateUrl: 'anyway.html',
    })
    .state('thankyou', {
      url: '/thankyou',
      templateUrl: 'thankyou.html',
      controller: 'ThankyouController'
    })
    .state('see', {
      url: '/see',
      templateUrl: 'see.html',
    })
    .state('coming', {
      url: '/coming',
      templateUrl: 'coming.html',
      controller: 'MainController3'
    });
  $urlRouterProvider.otherwise('/need');
});

exampleApp.controller('MainController', function($scope, GoogleMap) {

  var myLatlng = new google.maps.LatLng(37.3000, -120.4833);
  var mapOptions = {
    center: myLatlng,
    zoom: 15,
    disableDefaultUI: true,
    scrollwheel:  false,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  //var mapEl = document.getElementById("map");
  var circle = document.getElementById("circle");
  var map = new google.maps.Map(document.getElementById("map"), mapOptions);
  //onGesture("tap", function(event){
  //  console.log("tap event is" , event)
  //}, mapEl);

  var getCurrentLocation = function(){
    GoogleMap.getLocation().then(function(pos){
      map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
      var myLocation = new google.maps.Marker({
        position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
        map: map,
        title: "My Location"
      });
    })
  }
  map = new google.maps.Map(document.getElementById("map"), mapOptions);
  var styles = globalConfig.mapStyle;
  map.setOptions({styles: styles,draggable: false});
  $scope.map = map;
  getCurrentLocation();

  $scope.getLocation = function(){
    getCurrentLocation()
  };
})

exampleApp.controller('ThankyouController', function($scope, GoogleMap){

  $scope.getAddress = function(){

    var processPosition = function(pos){
      return GoogleMap.getAddress(pos)
    }

    var wrongPosition = function(err){
      alert("some error happened" + err )
    }

    var processAddress = function(address){
      var input = document.getElementById("addressInput");
      input.value = address
    }

    GoogleMap.getLocation()
      .then(processPosition, wrongPosition)
      .then(processAddress, wrongPosition)
  }
})

exampleApp.controller('CameraController', function($scope, Camera) {
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


exampleApp.controller('NavigationController',function($scope, GoogleMap){

  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;
  directionsDisplay.setMap(map);

  var location = getLocationFake();

  function calculateAndDisplayRoute() {
    directionsService.route({
      origin:new google.maps.LatLng(52.558040,13.439400),
      destination:new google.maps.LatLng(52.557956, 13.442910),
      travelMode: google.maps.TravelMode.WALK
    }, function(response, status) {
      if (status === google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }

  var request = {

  };
})

function getPushNotification(){
  return{
     request : "aspirin",
     distance : "50m"
  }

}


function getLocationFake(){

  return {
    latitude : 52.557956,
    longitude : 13.442910,
    name : "yang",
    age: 21,
  }
}

exampleApp.controller('MainController1', function($scope, GoogleMap) {

  var myLatlng = new google.maps.LatLng(37.3000, -120.4833);
  var mapOptions = {
    center: myLatlng,
    zoom: 15,
    disableDefaultUI: true,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  var map = new google.maps.Map(document.getElementById("map1"), mapOptions);

  var getCurrentLocation = function(){
    GoogleMap.getLocation().then(function(pos){
      map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
      var myLocation = new google.maps.Marker({
        position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
        map: map,
        title: "My Location"
      });
    })
  }
  map = new google.maps.Map(document.getElementById("map1"), mapOptions);
  var styles = globalConfig.mapStyle;

  map.setOptions({styles: styles});
  $scope.map = map;
  getCurrentLocation();

  $scope.getLocation = function(){
    getCurrentLocation()
  };
})


exampleApp.controller('MainController2', function($scope, GoogleMap) {

  var myLatlng = new google.maps.LatLng(37.3000, -120.4833);
  var mapOptions = {
    center: myLatlng,
    zoom: 15,
    disableDefaultUI: true,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  var map = new google.maps.Map(document.getElementById("map2"), mapOptions);

  var getCurrentLocation = function(){
    GoogleMap.getLocation().then(function(pos){
      map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
      var myLocation = new google.maps.Marker({
        position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
        map: map,
        title: "My Location"
      });
    })
  }
  map = new google.maps.Map(document.getElementById("map2"), mapOptions);
  var styles = globalConfig.mapStyle
    map.setOptions({styles: styles});

    $scope.map = map;

    getCurrentLocation();
  });



exampleApp.controller('MainController3', function($scope, GoogleMap) {

  var myLatlng = new google.maps.LatLng(37.3000, -120.4833);
  var mapOptions = {
    center: myLatlng,
    zoom: 15,
    disableDefaultUI: true,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  var map = new google.maps.Map(document.getElementById("map3"), mapOptions);

  var getCurrentLocation = function(){
    GoogleMap.getLocation().then(function(pos){
      map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
      var myLocation = new google.maps.Marker({
        position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
        map: map,
        title: "My Location"
      });
    })
  }
  map = new google.maps.Map(document.getElementById("map3"), mapOptions);
  var styles = globalConfig.mapStyle;
  map.setOptions({styles: styles});
  $scope.map = map;
  getCurrentLocation();
  $scope.getLocation = function(){
    getCurrentLocation()
  };
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
