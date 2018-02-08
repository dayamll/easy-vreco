function initMap() {
  const containerMap = document.getElementById('map');
  const directionsService = new google.maps.DirectionsService();
  const directionsDisplay = new google.maps.DirectionsRenderer();
  const geocoder = new google.maps.Geocoder();
  // Punto de muestra en el mapa al carga la pagina
  const losOlivos = { 
    lat: -11.9594, 
    lng: -77.0760 
  };

  // Caracteristicas del mapa 
  const mapOptions = {
    zoom: 15,
    center: losOlivos,
  };

  // Creamos el mapa con las constantes containerMap y 
  const map = new google.maps.Map(containerMap, mapOptions);

  // Adjuntamos al mapa las siguientes caracteriristicas
  directionsDisplay.setMap(map);
  // Aqui indicamos el efecto que tendra el marcador  
  const markerMap = new google.maps.Marker({
    position: { 
      lat: losOlivos.lat, 
      lng: losOlivos.lng 
    },
    animation: google.maps.Animation.DROP,
    map: map
  });

  // Realizamos el llamado al evento load para que pueda ubicarme al momento que carge la pagina
  window.addEventListener('load', function() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getCoords, errorFound);
    } else {
      alert('Tu navegador no soporta el API de Geolocation');
    }
  });

  function errorFound(error) {
    alert('Un error ocurrió: ' + error.code);
  };
  
  function getCoords(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;

    let myLocation = new google.maps.Marker({
      position: { 
        lat: lat, 
        lng: lon 
      },
      animation: google.maps.Animation.DROP,
      map: map
    });
    // Al mapa creado le agrego mi ubicación
    map.setCenter({ 
      lat: lat, 
      lng: lon 
    });
  };
}