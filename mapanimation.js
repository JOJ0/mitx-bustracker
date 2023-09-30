async function initMap() {
  // Request needed libraries.
  const { Map } = await google.maps.importLibrary("maps");
  // Create map, centered at position
  const position = {lat:42.353350, lng:-71.091525};
  map = new Map(document.getElementById("map"), {
    zoom: 14,
    center: position,
		mapTypeId : google.maps.MapTypeId.ROADMAP,
    mapId: "JT_MITX_BUS",
  });
  // Start main program
  putMarkers();

}


async function putMarkers(){
  // get bus data
	const locations = await getBusLocations();
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  locations.forEach((bus) => {
    console.log(bus.id);

    const position = {
      lat: bus.attributes.latitude,
      lng: bus.attributes.longitude
    };
    const marker = new AdvancedMarkerElement({
      map: map,
      position: position,
      title: `Bus ${bus.id}`,
      id: bus.id,
    });
	  markers.push(marker);
  })

	console.log(new Date().toISOString());
	console.log(locations);
	setTimeout(putMarkers, 15000);
}

// Request bus data from MBTA
async function getBusLocations(){
	const url = 'https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip';
	const response = await fetch(url);
	const json     = await response.json();
	return json.data;
}


let map;  // Initialize and add the map
var markers = []; // Save markers in this array
var AdvancedMarkerElement;
initMap();
