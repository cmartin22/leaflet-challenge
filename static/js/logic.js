  var myMap = L.map("map", {
    center: [37.7749, -116.4194],
    zoom: 6
  });
  
  L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: "pk.eyJ1IjoiY21hcnRpbjIyIiwiYSI6ImNrMWlncnJuaTAzOTUzbHBhaHIxYzhkaWsifQ.JWNEoq9t_GF6-fJZMuu7yw"
  }).addTo(myMap);
  
 url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

  
d3.json(url, function(response) {
 
  for (var i = 0; i < response.features.length; i++) {
    latlong = [response.features[i].geometry.coordinates[1], response.features[i].geometry.coordinates[0]];
    mag = [response.features[i].properties.mag];
    time = [response.features[i].properties.time];

    var color = "#FF0C00";
    if (mag < 1){
      color = "#A3FF00";
    }
    else if (mag < 2){
      color = "#F4FF00";
    }
    else if (mag < 3){
      color = "#FFCC00";
    }
    else if (mag < 4){
      color = "#FF9A00";
    }
    else if (mag < 5){
      color = "#FF7700";
    }


    
    if (latlong) {
      L.circle(latlong,  {
        radius: mag*10000,
        color: color,
        fillOpacity: 0.9
      }).bindPopup("<h3>" + "The time (ms) for this quake was: "+ time + "</h3>")

        .addTo(myMap);
    }
  }
});