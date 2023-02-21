/* 
Add an event listener that runs
  when a user clicks on the map element.
*/
map.on("click", (event) => {
  /*What should happen when something is clicked*/

  // If the user clicked on one of your markers, get its information.
  const features = map.queryRenderedFeatures(event.point, {
    layers: ["motor-vehicle-crashes"] // replace with your layer name
  });
  if (!features.length) {
    return;
  }
  const feature = features[0];

  /* 
    Create a popup, specify its options 
    and properties, and add it to the map.
  */
  const popup = new mapboxgl.Popup({ offset: [0, -15], className: "my-popup" })
    .setLngLat(feature.geometry.coordinates)
    .setHTML(
      `<h3>Cause: ${feature.properties.Factor1}</h3>
       <p>Time: ${feature.properties.Hour}</p>
    <p>Injured: ${feature.properties.Injured}</p>
    <p>Killed: ${feature.properties.Killed}</p>`
    )
    .addTo(map);
});
const geocoder = new MapboxGeocoder({
  // Initialize the geocoder
  accessToken: mapboxgl.accessToken, // Set the access token
  mapboxgl: mapboxgl, // Set the mapbox-gl instance
  marker: false, // Do not use the default marker style
  placeholder: "Search for places in New York", // Placeholder text for the search bar
  proximity: {
    longitude: -74.0091,
    latitude: 40.7127
  } // Coordinates of New York center
});
map.addControl(geocoder, "top-right");
map.on("mousemove", (event) => {
    const dzone = map.queryRenderedFeatures(event.point, {
      layers: ["motor-vehicle-crashes"]
    });
    document.getElementById("pd").innerHTML = dzone.length
      ? `<h3><strong>Cause: ${dzone[0].properties.Factor1}</h3><p>Casualty: <strong>${dzone[0].properties.Casualty}</strong></p>`
      : `<p>Hover over a point!</p>`;
});
map.addControl(
  new mapboxgl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true
    },
    trackUserLocation: true,
    showUserHeading: true
  }),
  "top-right"
);
mapboxgl.accessToken =
"pk.eyJ1IjoidG9ieTY2NiIsImEiOiJjbGNwN3czeTAyM3p5M29tdDhwcGFiN3ZlIn0.OtoWbP2r7WReunzZsbyjwg";

const style_2019 = "mapbox://styles/toby666/cle72ixtw001g01ln3ohyeygo";
const style_2021 = "mapbox://styles/toby666/cle736f6u00ba01qm1b59jca3";
const layerList = document.getElementById("menu");
const inputs = layerList.getElementsByTagName("input");

//On click the radio button, toggle the style of the map.
for (const input of inputs) {
  input.onclick = (layer) => {
    if (layer.target.id == "style_2019") {
      map.setStyle(style_2019);
    }
    if (layer.target.id == "style_2021") {
      map.setStyle(style_2021);
    }
  };
}