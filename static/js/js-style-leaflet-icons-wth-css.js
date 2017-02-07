(function () {
  var data
    , map
    , baseMap
    ;

  data = [{
    "type": "Feature",
    "properties": {
      "symbol": "house"
    },
    "geometry": {
      "type": "Point",
      "coordinates": [-110.979935, 32.244518]
    }
  },{
    "type": "Feature",
    "properties": {
      "symbol": "camera"
    },
    "geometry": {
      "type": "Point",
      "coordinates": [-110.877625, 32.207923]
    }
  },{
    "type": "Feature",
    "properties": {
      "symbol": "marker"
    },
    "geometry": {
      "type": "Point",
      "coordinates": [-110.923630, 32.206180]
    }
  }];

  map = L.map('leaflet-style-vectors-css')
    .setView([32.216637, -110.938737], 11);

  baseMap = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    detectRetina: true
  });

  layer = L.geoJson(data, {
    pointToLayer: function (feature, latlng) {
      var tag
        , symbol
        , icon
        ;

      symbol = feature.properties.symbol;

      switch (symbol) {
        case 'house':
          tag = 'house-icon';
          break;
        case 'camera':
          tag = 'camera-icon';
          break;
        case 'marker':
          tag = 'marker-icon';
          break;
      }

      icon = new L.divIcon({className: tag});

      return L.marker(latlng, {icon: icon});
    }
  });

  baseMap.addTo(map);
  layer.addTo(map);
})();