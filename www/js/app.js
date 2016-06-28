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
      controller: 'AnimationController'
    })
    .state('acception', {
    url: '/acception',
    templateUrl: 'acception.html',
    //controller: 'MainController'
    })
    .state('navigationWalk', {
      url: '/navigationWalk',
      templateUrl: 'navigationWalk.html',
      controller: 'MainController'
    })
    .state('navigationBike', {
      url: '/navigationBike',
      templateUrl: 'navigationBike.html',
      controller: 'MainController'
    })
    .state('ask', {
      url: '/ask',
      templateUrl: 'ask.html',
      //controller: 'AnimationController'
    })
    .state('thankyou', {
      url: '/thankyou',
      templateUrl: 'thankyou.html',
      controller: 'CameraController'
    })
    .state('see', {
      url: '/see',
      templateUrl: 'see.html',
      //controller: 'AnimationController'
    });
  $urlRouterProvider.otherwise('/need');
});

exampleApp.controller('MainController', function($scope, GoogleMap) {

  var myLatlng = new google.maps.LatLng(37.3000, -120.4833);
  var mapOptions = {
    center: myLatlng,
    zoom: 15,
    disableDefaultUI: true,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  var map = new google.maps.Map(document.getElementById("map"), mapOptions);

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
  var styles =
    [
      {
        "featureType": "road",
        "elementType": "labels",
        "stylers": [
          {
            "visibility": "on"
          }
        ]
      },
      {
        "featureType": "poi",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "administrative",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#000000"
            //"color":"lightyellow"
          },
          {
            "weight": 0.1
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#000000"
          },
          {
            "weight": 0.8
          }
        ]
      },
      {
        "featureType": "landscape",
        "stylers": [
          {
            "color": "#ffffff"
            //"color":"lightyellow"
          }
        ]
      },
      {
        "featureType": "water",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "transit",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "elementType": "labels",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "elementType": "labels.text",
        "stylers": [
          {
            "visibility": "on"
          }
        ]
      },
      {
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#ffffff"
            //"color":"lightyellow"
          }
        ]
      },
      {
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#000000"
          }
        ]
      },
      {
        "elementType": "labels.icon",
        "stylers": [
          {
            "visibility": "on"
          }
        ]
      }
    ];
  map.setOptions({styles: styles});
  $scope.map = map;
  getCurrentLocation();
  google.maps.event.addDomListener(window, 'load', function() {
    map = new google.maps.Map(document.getElementById("map"), mapOptions);
    var styles =
      [
        {
          "featureType": "road",
          "elementType": "labels",
          "stylers": [
            {
              "visibility": "on"
            }
          ]
        },
        {
          "featureType": "poi",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "administrative",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "geometry.fill",
          "stylers": [
            {
              "color": "#000000"
              //"color":"lightyellow"
            },
            {
              "weight": 0.1
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "color": "#000000"
            },
            {
              "weight": 0.8
            }
          ]
        },
        {
          "featureType": "landscape",
          "stylers": [
            {
              "color": "#ffffff"
              //"color":"lightyellow"
            }
          ]
        },
        {
          "featureType": "water",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "transit",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "elementType": "labels",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "elementType": "labels.text",
          "stylers": [
            {
              "visibility": "on"
            }
          ]
        },
        {
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#ffffff"
              //"color":"lightyellow"
            }
          ]
        },
        {
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#000000"
            }
          ]
        },
        {
          "elementType": "labels.icon",
          "stylers": [
            {
              "visibility": "on"
            }
          ]
        }
      ];
    map.setOptions({styles: styles});

    $scope.map = map;

    getCurrentLocation();
  });
  $scope.getLocation = function(){
    getCurrentLocation()
  };
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

exampleApp.controller('AnimationController',function($scope){
  var ballColor = document.getElementById("ballColor")
  var shadowColor = document.getElementById("shadowColor")

  $scope.setTimeout = function(){
    ballColor.animate({
      color:[ "#FF5460", "green" ]
    }, 1000)
    shadowColor.animate({
      color:[ "#FF5460", "green" ]
    }, 1000)
  }, 2000
})

