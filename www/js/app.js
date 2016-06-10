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

exampleApp.controller('MainController', function($scope, Camera, GoogleMap) {

  var myLatlng = new google.maps.LatLng(37.3000, -120.4833);
  var mapOptions = {
    center: myLatlng,
    zoom: 15,
    disableDefaultUI: true,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  var map = new google.maps.Map(document.getElementById("map"), mapOptions);
  google.maps.event.addDomListener(window, 'load', function() {

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

    //map.setCenter(myLatlng);

    //document.getElementById("map") = map;
    $scope.map = map;

    getCurrentLocation();
  });
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

  $scope.getLocation = function(){
    getCurrentLocation()
  };
  var options  = {
    quality: 75,
    allowEdit : true,
    targetWidth: 320,
    targetHeight: 160,
    saveToPhotoAlbum: false,
    correctOrientation: true
  }

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

exampleApp.controller('CameraController', function($scope, Camera) {



})

