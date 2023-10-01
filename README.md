# The Real Time Bus Tracker Exercise

## Description

A self-study-exercise I worked on during the [MITx Fullstack Programming Course](https://xpro.mit.edu/courses/course-v1:xPRO+PCCx/) I'm attending.

Displays a map containing a portion of Boston Massachusetts around the location of MIT and Harvard. Draws "randomly colored pins" for each vehicle of _bus line 1_ in real time on that map. The pins location is updated every 15 seconds. Hovering over a pin displays the bus' number.

Uses the API's provided by "The Google Maps Platform" and the "Massachusettes Bay Transport Authority" (MBTA).


## How to Run

- [Clone the repo.](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository)
- [Follow the steps described in google's excellent documentation](
https://developers.google.com/maps/get-started#create-project) which should involve the following:
  - Create a "Google Maps Platform" account.
  - Create a new project.
  - Enable the "Maps JavaScript API" for the project.
  - Get an API key.
- Create a file called `google-maps-sdk.js` within the root of your local repo clone.
- Copy the boilerplate code including your API key [as described here](https://developers.google.com/maps/documentation/javascript/load-maps-js-api) into that file.
- Open index.html in your browser

If busses on line 1 are currently on their way, you should see "colored map pins" for each of them. If you don't see any pin, it might be the case that at that particular time no bus is operating (eg. at night). Your browser's debug console will spit out details of what information is being retrieved from MBTA's API and whether or not running busses are currently reported.

## Roadmap

A couple of ideas I might add to this project to expand my knowledge of working with embedded Google Maps and geo-location-data in general:

- Buttons to stop tracking, recolor pins, reset the app.
- Clickable bus pins - providing information on more things MBTA provides, eg. how crowded the bus currently is.
- Investigate what information my hometown's transportation organisation's public web API provides and implement a similar app _or_ integrate into this one.


## License

Released under an MIT license, see the [LICENSE](LICENSE) file within the repo for details.