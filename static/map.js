
// Function to initialize the map with bus information
function initializeMap(mapboxToken, busId, coordinateInfo) {
    mapboxgl.accessToken = mapboxToken;

    var map = new mapboxgl.Map({
      container: 'map-container',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [coordinateInfo[busId].origin.long, coordinateInfo[busId].origin.lat],  // Center map on the origin
      zoom: 12
    });
  
    map.on('load', function() {
      // Add origin marker (blue)
      const originMarker = new mapboxgl.Marker({ color: 'blue' });
      originMarker.setLngLat([coordinateInfo[busId].origin.long, coordinateInfo[busId].origin.lat]);
      originMarker.setPopup(new mapboxgl.Popup().setHTML(`<b>Origin:</b> ${coordinateInfo[busId].origin.name}`));
      originMarker.addTo(map);
  
      // Add destination marker (red)
      const destinationMarker = new mapboxgl.Marker({ color: 'red' });
      destinationMarker.setLngLat([coordinateInfo[busId].destination.long, coordinateInfo[busId].destination.lat]);
      destinationMarker.setPopup(new mapboxgl.Popup().setHTML(`<b>Destination:</b> ${coordinateInfo[busId].destination.name}`));
      destinationMarker.addTo(map);
  
      // Add route points markers (yellow)
      Object.keys(coordinateInfo[busId].route_coordinates).forEach(function (pointName) {
        const point = coordinateInfo[busId].route_coordinates[pointName];
        const pointMarker = new mapboxgl.Marker({ color: 'yellow' });
        pointMarker.setLngLat([point.longitude, point.latitude]);
        pointMarker.setPopup(new mapboxgl.Popup().setHTML(`<b>Point:</b> ${pointName}`));
        pointMarker.addTo(map);

      });
  
      // Draw route line (blue)
      map.addSource('route', {
        type: 'geojson',
        data: {
          type: 'Feature',
          geometry: {
            type: 'LineString',
            coordinates: [
              [coordinateInfo[busId].origin.long, coordinateInfo[busId].origin.lat],
              ...Object.values(coordinateInfo[busId].route_coordinates).map(point => [point.longitude, point.latitude]),
              [coordinateInfo[busId].destination.long, coordinateInfo[busId].destination.lat]
            ]
          }
        }
      });
  
      map.addLayer({
        id: 'route',
        type: 'line',
        source: 'route',
        paint: {
          'line-color': 'blue',
          'line-width': 4
        }
      });
    });

    // Get ETA using Mapbox Directions API
    const origin = `${coordinateInfo[busId].origin.long},${coordinateInfo[busId].origin.lat}`;
    const destination = `${coordinateInfo[busId].destination.long},${coordinateInfo[busId].destination.lat}`;

    fetch(`https://api.mapbox.com/directions/v5/mapbox/driving/${origin};${destination}?access_token=${mapboxToken}`, {
      headers: {
        'Access-Control-Allow-Origin': 'https://findmybus-azlf.onrender.com'
      }
    })
      .then(response => response.json())
      .then(data => {
        const etaInSeconds = data.routes[0].duration;
        const etaInMinutes = Math.round(etaInSeconds / 60);

        // Display ETA above the map
        const etaValueElement = document.getElementById('eta-value');
        etaValueElement.textContent = `${etaInMinutes} minutes`;
      })
      .catch(error => {
        console.error('Error fetching ETA:', error);
        // Handle error, e.g., display a default ETA or an error message
      });
}
  