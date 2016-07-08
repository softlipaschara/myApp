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

.factory('GoogleMap', ['$q', '$http', function($q, $http) {
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

    saveLocation : function(coords, token){
      var q = $q.defer();
      var url = "http://" + apiHost + "/saveLocation" + "/" + token
      var location = {
        latitude  : encodeURI(coords.latitude.toFixed(6)),
        longitude : encodeURI(coords.longitude.toFixed(6))
      }
      $http.get(url, {params: location}).then(function(response){
        q.resolve(response);
      }, function(err){
        q.reject(err);
      });

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
    },

    getDirection : function(){

    },

    getLatLng : function(address){
      var q = $q.defer();
      var request = {
        address: address + " Berlin, Germany"
      };
      geocoder.geocode(request, function(data, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          if (data[0] != null) {
            console.log("after check we receive data 0 is", data[0])
            var location = {
              latitude : data[0].geometry.location.lat(),
              longitude : data[0].geometry.location.lng()
            };
            q.resolve(location);
          } else {
            q.reject("No address available");
          }
        }else{
          q.reject(status)
        }
      });

      return q.promise;
    },

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
})

.factory('share', function($http, localStorageService){

  function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }


  var tmp = {
    location : {latitude : 52.510237, longitude : 13.416837},
    token : localStorageService.get("token"),
    range : 5,
    need : "Anne Hathaway",
    ask : {
      need : "Cigar",
      asker : "hallo",
      distance : 0,
    },
    help : {
      helper : null,
      location : null,
      distance : 0,
      meet : ""
    },
    meet : "",


    setLocation : function(latitude, longitude){
      if(!isNumeric(latitude) || !isNumeric(longitude))
        return;

      if(latitude >90 || latitude < -90)
        return;

      if(longitude >90 || longitude < -90)
        return;

      this.location = {
        longitude : longitude,
        latitude : latitude
      }
    },
    isNumeric : isNumeric,
    setToken : function(token){
      this.token = token
    },
    //TODO
    setRange : function(range){
      if(isNumeric(range))
        this.range = range
    },
    setAsk : function(askObj){
      if(askObj != null)
        this.ask = askObj
    },
    setHelp : function(helperObj){
      if(helperObj != null)
       this.help = helperObj
    },
    setMeet : function(meetPoint){
      this.meet = meetPoint
    },
    setNeed : function(need){
      if(need != null)
        this.need = need
    }
  };

  return tmp
})

.factory('mySocket', function (socketFactory) {
  var factory = socketFactory({
    ioSocket: io.connect('http://localhost:3031')
  });
  factory.forward('help');
  return factory;
});
