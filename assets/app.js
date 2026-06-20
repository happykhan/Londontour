const tourStops = [
  {
    name: "Westminster Underground",
    lat: 51.501,
    lng: -0.1246,
    detail: "Start outside the station and walk toward Parliament Square."
  },
  {
    name: "Big Ben and Parliament",
    lat: 51.5007,
    lng: -0.1246,
    detail: "Cross Parliament Square for the classic clock tower view."
  },
  {
    name: "Westminster Abbey",
    lat: 51.4993,
    lng: -0.1273,
    detail: "Continue west for the abbey entrance and College Garden."
  },
  {
    name: "St James's Park",
    lat: 51.5025,
    lng: -0.134,
    detail: "Follow Birdcage Walk along the park edge."
  },
  {
    name: "Buckingham Palace",
    lat: 51.5014,
    lng: -0.1419,
    detail: "Pause at the Victoria Memorial for the forecourt view."
  },
  {
    name: "Trafalgar Square",
    lat: 51.508,
    lng: -0.1281,
    detail: "Finish by walking northeast through The Mall and Admiralty Arch."
  }
];

const directions = [
  "Exit Westminster Underground and face Parliament Square.",
  "Walk south to Big Ben and the Houses of Parliament viewpoint.",
  "Head west across Parliament Square to Westminster Abbey.",
  "Continue onto Birdcage Walk beside St James's Park.",
  "Arrive at Buckingham Palace and the Victoria Memorial.",
  "Return northeast through The Mall, pass Admiralty Arch, and finish at Trafalgar Square."
];

const statusEl = document.querySelector("#status");
const directionsEl = document.querySelector("#directions");
const locateButton = document.querySelector("#locate-button");
const printButton = document.querySelector("#print-button");

directionsEl.innerHTML = directions
  .map((step, index) => {
    const stop = tourStops[index];
    return `<li><strong>${stop.name}</strong>${step}</li>`;
  })
  .join("");

const map = L.map("map", {
  scrollWheelZoom: true
}).setView([51.5033, -0.1303], 15);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  maxZoom: 19
}).addTo(map);

const routeCoordinates = tourStops.map((stop) => [stop.lat, stop.lng]);

L.polyline(routeCoordinates, {
  color: "#c9483a",
  opacity: 0.92,
  weight: 5
}).addTo(map);

tourStops.forEach((stop, index) => {
  L.marker([stop.lat, stop.lng])
    .addTo(map)
    .bindPopup(`<strong>${index + 1}. ${stop.name}</strong><br>${stop.detail}`);
});

map.fitBounds(routeCoordinates, {
  padding: [36, 36]
});

let userMarker;
let userAccuracyCircle;

function setStatus(message) {
  statusEl.textContent = message;
}

function locateUser() {
  if (!navigator.geolocation) {
    setStatus("Geolocation is not available in this browser.");
    return;
  }

  setStatus("Finding your location...");

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude, accuracy } = position.coords;
      const latLng = [latitude, longitude];

      if (userMarker) {
        userMarker.setLatLng(latLng);
        userAccuracyCircle.setLatLng(latLng).setRadius(accuracy);
      } else {
        const icon = L.divIcon({
          className: "user-location-marker",
          iconSize: [22, 22]
        });

        userMarker = L.marker(latLng, { icon })
          .addTo(map)
          .bindPopup("<strong>Your position</strong>");

        userAccuracyCircle = L.circle(latLng, {
          color: "#1d6fe8",
          fillColor: "#1d6fe8",
          fillOpacity: 0.12,
          radius: accuracy,
          weight: 1
        }).addTo(map);
      }

      map.setView(latLng, 16);
      userMarker.openPopup();
      setStatus("Your position is shown on the map.");
    },
    (error) => {
      const messages = {
        1: "Location permission was denied. The tour map is still available.",
        2: "Your location could not be determined right now.",
        3: "Location lookup timed out. Try again from the map button."
      };

      setStatus(messages[error.code] || "Location lookup failed.");
    },
    {
      enableHighAccuracy: true,
      maximumAge: 30000,
      timeout: 10000
    }
  );
}

locateButton.addEventListener("click", locateUser);
printButton.addEventListener("click", () => window.print());
