var myLocation;

var initMap = (function () {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: -34.397,
      lng: 150.644
    },
    zoom: 14
  });
  var infoWindow = new google.maps.InfoWindow({
    map: map
  });
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      myLocation = pos;
      infoWindow.setPosition(pos);
      infoWindow.setContent('Location found.');
      var thisPlace = new google.maps.LatLng(myLocation.lat, myLocation.lng);
      var service = new google.maps.places.PlacesService(map);
      service.nearbySearch({
        location: thisPlace,
        radius: 1500,
        type: ["food"]
      }, callback);

      function callback(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
          }
        }
      };

      function createMarker(thisPlace) {
        var placeLoc = thisPlace.geometry.location;
        var marker = new google.maps.Marker({
          map: map,
          position: thisPlace.geometry.location
        });
        google.maps.event.addListener(marker, 'click', function () {
          infoWindow.setContent(thisPlace.name);
          infoWindow.open(map, this);
        });
      };

      map.setCenter(pos);
    }, function () {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    handleLocationError(false, infoWindow, map.getCenter());
  }
});

var handleLocationError = (function (browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
    'Error: The Geolocation service failed.' :
    'Error: Your browser doesn\'t support geolocation.');
});