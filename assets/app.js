const routes = [
  {
    id: 'westminster-walk',
    name: 'Westminster to Covent Garden',
    kind: 'Walking tour',
    summary: 'A classic London walk through the royal, political and theatre heart of the city.',
    distance: '4.7 km',
    time: '75–95 min',
    start: 'Buckingham Palace',
    transport: 'Walking',
    color: '#c9483a',
    center: [51.5042, -0.1305],
    zoom: 15,
    stops: [
      {
        name: 'Buckingham Palace',
        lat: 51.5014,
        lng: -0.1419,
        detail: 'Start at the Victoria Memorial and head into St James’s Park.',
      },
      {
        name: 'St James’s Park',
        lat: 51.5025,
        lng: -0.134,
        detail: 'Walk the park edge for the familiar postcard view of central London.',
      },
      {
        name: 'Westminster Abbey',
        lat: 51.4993,
        lng: -0.1273,
        detail: 'Stop outside the abbey and the College Garden entrance.',
      },
      {
        name: 'Big Ben / Parliament',
        lat: 51.5007,
        lng: -0.1246,
        detail: 'Cross Parliament Square for the clock tower and river frontage.',
      },
      {
        name: 'Whitehall',
        lat: 51.5054,
        lng: -0.1248,
        detail: 'Continue north past government buildings and Cenotaph.',
      },
      {
        name: 'Trafalgar Square',
        lat: 51.508,
        lng: -0.1281,
        detail: 'Use the square as the route’s central landmark.',
      },
      {
        name: 'Covent Garden',
        lat: 51.5118,
        lng: -0.123,
        detail: 'Finish at the piazza and market hall for food and a sit-down.',
      },
    ],
    directions: [
      'Start at Buckingham Palace and walk east towards St James’s Park.',
      'Follow the park edge and head to Westminster Abbey.',
      'Cross Parliament Square for Big Ben and the Houses of Parliament.',
      'Continue north up Whitehall.',
      'Finish at Trafalgar Square and walk on to Covent Garden.',
    ],
  },
  {
    id: 'bus-15',
    name: 'Bus 15 to the Tower',
    kind: 'Bus route',
    summary: 'A bus-first route with short walking hops between the major river and city landmarks.',
    distance: '6.1 km',
    time: '35–55 min',
    start: 'Trafalgar Square',
    transport: 'Bus 15',
    color: '#146c64',
    center: [51.5105, -0.1105],
    zoom: 14,
    stops: [
      {
        name: 'Trafalgar Square / Charing Cross',
        lat: 51.5079,
        lng: -0.1282,
        detail: 'Board around the square and Charing Cross for the bus start.',
      },
      {
        name: 'Aldwych',
        lat: 51.512,
        lng: -0.1165,
        detail: 'Get off near the Strand for the theatre district stretch.',
      },
      {
        name: 'Fleet Street',
        lat: 51.5138,
        lng: -0.1077,
        detail: 'A classic city stop between the legal district and St Paul’s.',
      },
      {
        name: "St Paul's Cathedral",
        lat: 51.5138,
        lng: -0.0984,
        detail: 'Step off for the cathedral view and the grand dome.',
      },
      {
        name: 'Monument',
        lat: 51.5101,
        lng: -0.0864,
        detail: 'Head east through the City towards the Monument column.',
      },
      {
        name: 'Tower of London',
        lat: 51.5081,
        lng: -0.0761,
        detail: 'Use this for the riverside stop and castle grounds.',
      },
      {
        name: 'Tower Bridge',
        lat: 51.5055,
        lng: -0.0754,
        detail: 'End at the bridge span for the most recognisable finish.',
      },
    ],
    directions: [
      'Start at Trafalgar Square or Charing Cross and board Bus 15.',
      'Hop off around Aldwych, then continue through Fleet Street.',
      'Stop at St Paul’s Cathedral and continue east to Monument.',
      'Carry on to the Tower of London.',
      'Finish by walking on to Tower Bridge.',
    ],
  },
];

const pickerEl = document.querySelector('#route-picker');
const titleEl = document.querySelector('#route-title');
const summaryEl = document.querySelector('#route-summary');
const metaEl = document.querySelector('#route-meta');
const directionsEl = document.querySelector('#directions');
const statusEl = document.querySelector('#status');
const locateButton = document.querySelector('#locate-button');
const printButton = document.querySelector('#print-button');

let selectedRoute = routes[0];
let map;
let routeLayer;
let userMarker;
let userAccuracyCircle;
let userLocation;
let userAccuracy = 0;

function renderPicker() {
  pickerEl.innerHTML = routes
    .map(
      (route) => `
        <button class="route-card ${route.id === selectedRoute.id ? 'is-active' : ''}" type="button" data-route="${route.id}">
          <span class="route-kind">${route.kind}</span>
          <strong>${route.name}</strong>
          <span class="route-copy">${route.summary}</span>
          <span class="route-transport">${route.transport}</span>
        </button>
      `
    )
    .join('');

}

function renderDetails() {
  titleEl.textContent = selectedRoute.name;
  summaryEl.textContent = selectedRoute.summary;
  metaEl.innerHTML = `
    <div><span class="label">Transport</span><strong>${selectedRoute.transport}</strong></div>
    <div><span class="label">Distance</span><strong>${selectedRoute.distance}</strong></div>
    <div><span class="label">Time</span><strong>${selectedRoute.time}</strong></div>
  `;

  directionsEl.innerHTML = selectedRoute.directions
    .map((step, index) => {
      const stop = selectedRoute.stops[index];
      return `
        <li>
          <strong>${stop.name}</strong>
          <span>${step}</span>
        </li>
      `;
    })
    .join('');
}

function buildMap() {
  if (map) return;

  map = L.map('map', {
    scrollWheelZoom: true,
    zoomControl: true,
  }).setView(selectedRoute.center, selectedRoute.zoom);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19,
  }).addTo(map);

  routeLayer = L.layerGroup().addTo(map);
}

function renderRouteOnMap() {
  routeLayer.clearLayers();

  const coordinates = selectedRoute.stops.map((stop) => [stop.lat, stop.lng]);
  L.polyline(coordinates, {
    color: selectedRoute.color,
    opacity: 0.95,
    weight: 6,
  }).addTo(routeLayer);

  selectedRoute.stops.forEach((stop, index) => {
    const icon = L.divIcon({
      className: 'poi-marker',
      html: `<span>${index + 1}</span>`,
      iconSize: [28, 28],
      iconAnchor: [14, 14],
    });

    L.marker([stop.lat, stop.lng], { icon })
      .addTo(routeLayer)
      .bindPopup(`<strong>${index + 1}. ${stop.name}</strong><br>${stop.detail}`);
  });

  map.fitBounds(coordinates, { padding: [30, 30] });

  if (userLocation) {
    const icon = L.divIcon({
      className: 'user-location-marker',
      iconSize: [22, 22],
    });

    userMarker = L.marker(userLocation, { icon }).addTo(routeLayer).bindPopup('<strong>Your position</strong>');
    userAccuracyCircle = L.circle(userLocation, {
      color: '#1d6fe8',
      fillColor: '#1d6fe8',
      fillOpacity: 0.12,
      radius: userAccuracy,
      weight: 1,
    }).addTo(routeLayer);
  }
}

function selectRoute(route) {
  selectedRoute = route;
  renderPicker();
  renderDetails();
  buildMap();
  renderRouteOnMap();
  setStatus(`Viewing ${route.name}. Tap markers for more info, or use my location.`);
}

function setStatus(message) {
  statusEl.textContent = message;
}

function locateUser() {
  if (!navigator.geolocation) {
    setStatus('Geolocation is not available in this browser.');
    return;
  }

  setStatus('Finding your location...');

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude, accuracy } = position.coords;
      const latLng = [latitude, longitude];
      userLocation = latLng;
      userAccuracy = accuracy;

      if (userMarker) {
        userMarker.setLatLng(latLng);
        userAccuracyCircle.setLatLng(latLng).setRadius(accuracy);
      } else {
        const icon = L.divIcon({
          className: 'user-location-marker',
          iconSize: [22, 22],
        });

        userMarker = L.marker(latLng, { icon }).addTo(routeLayer).bindPopup('<strong>Your position</strong>');
        userAccuracyCircle = L.circle(latLng, {
          color: '#1d6fe8',
          fillColor: '#1d6fe8',
          fillOpacity: 0.12,
          radius: accuracy,
          weight: 1,
        }).addTo(routeLayer);
      }

      map.setView(latLng, Math.max(map.getZoom(), 16));
      userMarker.openPopup();
      setStatus('Your position is shown on the map.');
    },
    (error) => {
      const messages = {
        1: 'Location permission was denied. The tour map is still available.',
        2: 'Your location could not be determined right now.',
        3: 'Location lookup timed out. Try again from the map button.',
      };

      setStatus(messages[error.code] || 'Location lookup failed.');
    },
    {
      enableHighAccuracy: true,
      maximumAge: 30000,
      timeout: 10000,
    }
  );
}

pickerEl.addEventListener('click', (event) => {
  const target = event.target.closest('button[data-route]');
  if (!target) return;
  const route = routes.find((item) => item.id === target.dataset.route);
  if (route) selectRoute(route);
});

locateButton.addEventListener('click', locateUser);
printButton.addEventListener('click', () => window.print());

renderPicker();
renderDetails();
buildMap();
renderRouteOnMap();
setStatus('Pick a route, then tap a marker or use my location.');
