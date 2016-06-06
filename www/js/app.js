// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var exampleApp = angular.module('starter', ['ionic'])

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

exampleApp.controller('MapController', function($scope, $ionicLoading) {

  google.maps.event.addDomListener(window, 'load', function() {
    var myLatlng = new google.maps.LatLng(37.3000, -120.4833);

    var mapOptions = {
      center: myLatlng,
      zoom: 17,
      disableDefaultUI: true,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var map = new google.maps.Map(document.getElementById("map"), mapOptions);

    var styles =
      [
        {
          "featureType": "landscape",
          "stylers": [
            {
              "saturation": -100
            },
            {
              "lightness": 65
            },
            {
              "visibility": "on"
            }
          ]
        },
        {
          "featureType": "poi",
          "stylers": [
            {
              "saturation": -100
            },
            {
              "lightness": 51
            },
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "stylers": [
            {
              "saturation": -100
            },
            {
              "visibility": "simplified"
            }
          ]
        },
        {
          "featureType": "road.arterial",
          "stylers": [
            {
              "saturation": -100
            },
            {
              "lightness": 30
            },
            {
              "visibility": "on"
            }
          ]
        },
        {
          "featureType": "road.local",
          "stylers": [
            {
              "saturation": -100
            },
            {
              "lightness": 40
            },
            {
              "visibility": "on"
            }
          ]
        },
        {
          "featureType": "transit",
          "stylers": [
            {
              "saturation": -100
            },
            {
              "visibility": "simplified"
            }
          ]
        },
        {
          "featureType": "administrative.province",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "labels",
          "stylers": [
            {
              "visibility": "on"
            },
            {
              "lightness": -25
            },
            {
              "saturation": -100
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [
            {
              "hue": "#ffff00"
            },
            {
              "lightness": -25
            },
            {
              "saturation": -97
            }
          ]
        }
      ];
    map.setOptions({styles: styles});

    navigator.geolocation.getCurrentPosition(function(pos) {
      map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
      var myLocation = new google.maps.Marker({
        position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
        map: map,
        title: "My Location"
      });
    });

    $scope.map = map;
  });

});
