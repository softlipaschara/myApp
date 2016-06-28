angular.module('starter.services', [])

.factory('Camera', ['$q', function($q) {

  return {
    getPicture: function(options) {
      var q = $q.defer();
      console.log("get picture called , navigator is", navigator)
      navigator.camera.getPicture(function(result) {
        // Do any magic you need
        q.resolve(result);
      }, function(err) {
        q.reject(err);
      }, options);

      return q.promise;
    }
  }
}])

.factory('GoogleMap', ['$q', function($q) {
  var geocoder = new google.maps.Geocoder();

  return {
    getLocation: function(options) {
      var q = $q.defer();

      navigator.geolocation.getCurrentPosition(function (pos) {
        // Do any magic you need
        q.resolve(pos);
      }, function(err) {
        q.reject(err);
      }, options);

      return q.promise;
    },

    getAddress : function(position){
      var q = $q.defer();
      var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      var request = {
        latLng: latlng
      };
      geocoder.geocode(request, function(data, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          if (data[0] != null) {
            q.resolve(data[0].formatted_address);
          } else {
            q.reject("No address available");
          }
        }else{
          q.reject(status)
        }
      });

      return q.promise;
    }

  }
}])


/**
 * A simple example service that returns some data.
 */
.factory('Friends', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var friends = [
    { id: 0, name: 'Scruff McGruff' },
    { id: 1, name: 'G.I. Joe' },
    { id: 2, name: 'Miss Frizzle' },
    { id: 3, name: 'Ash Ketchum' }
  ];

  return {
    all: function() {
      return friends;
    },
    get: function(friendId) {
      // Simple index lookup
      return friends[friendId];
    }
  }
});
