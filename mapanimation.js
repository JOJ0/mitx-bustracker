async function initMap() {
  /**
  * Dynamically loads the maps library, centers at the target area, and
  * launches the main program loop.
  */
  const { Map } = await google.maps.importLibrary("maps");
  const position = {lat:42.353350, lng:-71.091525};
  map = new Map(document.getElementById("map"), {
    zoom: 14,
    center: position,
		mapTypeId : google.maps.MapTypeId.ROADMAP,
    mapId: "JT_MITX_BUS",
  });
  putMarkers();  // Start main program

}

async function putMarkers(){
  /**
  * Fetches bus locations, checks for existing markers and updates them or
  * creates new ones. Calls itself every 15 seconds.
  */
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
  /**
  * Adds a new marker with a separate random color for each bus to the map.
  */
  const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary("marker");
  const position = {
    lat: bus.attributes.latitude,
    lng: bus.attributes.longitude
  };
  randCol = getRandomColor();
  const pinBackground = new PinElement({
    background: randCol,
    borderColor: randCol,
    glyphColor: "#444444",
  });
  const marker = new AdvancedMarkerElement({
    map: map,
    position: position,
    title: `Bus ${bus.id}`,
    id: bus.id,
    content: pinBackground.element,
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

async function getBusLocations(){
  /**
  * Request realtime bus data from MBTA. No API key required.
  */
	const url = 'https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip';
	const response = await fetch(url);
	const json     = await response.json();
	return json.data;
}

function getRandomColor() {
  /**
  * Returns a hex string, representing a random color.
  */
  function getRandomHex() {
    let val = Math.floor(Math.random() * 256)
    var str = val.toString(16);
    return str
  }
  return '#' + getRandomHex() + getRandomHex() + getRandomHex();
}


var map;  // Initialize the google map using this global variable.
var markers = []; // Save markers in this array.
initMap();
