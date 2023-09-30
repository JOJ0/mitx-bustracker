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

  locations.forEach((bus) => {
    console.log(bus.id);
    let marker = existingMarker(bus.id);
    if (marker) {
      console.log(bus.id, "existing already. Relocating marker...");
      relocateMarker(marker, bus)
    }
    else {
      newMarker(bus);
    }
  })

	console.log(new Date().toISOString());
	console.log(locations);
	setTimeout(putMarkers, 15000);
}

async function newMarker(bus) {
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
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
  console.log("New marker added:", marker.title)
  markers.push(marker);
}

function existingMarker(busId) {
  /**
   * Returns an existing marker by looking up its ID, or undefined otherwise.
  */
  var result = markers.find(item => item.title === `Bus ${busId}`);
  return result;
}

function relocateMarker(marker, bus) {
  /**
   * Relocates existing marker with coordinates found in the bus object.
   */
  marker.position = {
    lat: bus.attributes.latitude,
    lng: bus.attributes.longitude,
  };
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
