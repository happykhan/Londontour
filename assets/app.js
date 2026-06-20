const routes = [
  {
    id: 'london-tour',
    name: 'London tour',
    kind: 'Walking + Bus 15',
    summary: 'One whole London tour that starts on foot, then continues by Bus 15 to the Tower.',
    distance: '10.8 km',
    time: '2h 15–2h 55',
    start: 'Buckingham Palace',
    transport: 'Walk + Bus 15',
    color: '#c9483a',
    center: [51.5078, -0.121],
    zoom: 14,
    stops: [
      {
        name: 'Buckingham Palace',
        lat: 51.5014,
        lng: -0.1419,
        segment: 'walk',
        segmentLabel: 'Walking section',
        detail: 'Start at the Victoria Memorial and head into St James’s Park.',
      },
      {
        name: 'St James’s Park',
        lat: 51.5025,
        lng: -0.134,
        segment: 'walk',
        segmentLabel: 'Walking section',
        detail: 'Walk the park edge for the familiar postcard view of central London.',
      },
      {
        name: 'Westminster Abbey',
        lat: 51.4993,
        lng: -0.1273,
        segment: 'walk',
        segmentLabel: 'Walking section',
        detail: 'Stop outside the abbey and the College Garden entrance.',
      },
      {
        name: 'Big Ben / Parliament',
        lat: 51.5007,
        lng: -0.1246,
        segment: 'walk',
        segmentLabel: 'Walking section',
        detail: 'Cross Parliament Square for the clock tower and river frontage.',
      },
      {
        name: 'Whitehall',
        lat: 51.5054,
        lng: -0.1248,
        segment: 'walk',
        segmentLabel: 'Walking section',
        detail: 'Continue north past government buildings and Cenotaph.',
      },
      {
        name: 'Trafalgar Square',
        lat: 51.508,
        lng: -0.1281,
        segment: 'walk',
        segmentLabel: 'Walking section',
        detail: 'Use the square as the route’s central landmark.',
      },
      {
        name: 'Covent Garden',
        lat: 51.5118,
        lng: -0.123,
        segment: 'walk',
        segmentLabel: 'Walking section',
        detail: 'Finish the first section at the piazza and market hall.',
      },
      {
        name: 'Trafalgar Square / Charing Cross',
        lat: 51.5079,
        lng: -0.1282,
        segment: 'bus',
        segmentLabel: 'Bus 15 section',
        detail: 'Board Bus 15 around the square and Charing Cross.',
      },
      {
        name: 'Aldwych',
        lat: 51.512,
        lng: -0.1165,
        segment: 'bus',
        segmentLabel: 'Bus 15 section',
        detail: 'Get off near the Strand for the theatre district stretch.',
      },
      {
        name: 'Fleet Street',
        lat: 51.5138,
        lng: -0.1077,
        segment: 'bus',
        segmentLabel: 'Bus 15 section',
        detail: 'Continue through the legal district towards St Paul’s.',
      },
      {
        name: "St Paul's Cathedral",
        lat: 51.5138,
        lng: -0.0984,
        segment: 'bus',
        segmentLabel: 'Bus 15 section',
        detail: 'Step off for the cathedral view and the grand dome.',
      },
      {
        name: 'Monument',
        lat: 51.5101,
        lng: -0.0864,
        segment: 'bus',
        segmentLabel: 'Bus 15 section',
        detail: 'Head east through the City towards the Monument column.',
      },
      {
        name: 'Tower of London',
        lat: 51.5081,
        lng: -0.0761,
        segment: 'bus',
        segmentLabel: 'Bus 15 section',
        detail: 'Use this for the riverside stop and castle grounds.',
      },
      {
        name: 'Tower Bridge',
        lat: 51.5055,
        lng: -0.0754,
        segment: 'bus',
        segmentLabel: 'Bus 15 section',
        detail: 'End at the bridge span for the most recognisable finish.',
      },
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
const mapPrintButton = document.querySelector('#map-print-button');
const changeRouteButton = document.querySelector('#change-route-button');
const recenterButton = document.querySelector('#recenter-button');

let selectedRoute = routes[0];
let map;
let routeLayer;
let userMarker;
let userAccuracyCircle;
let userLocation;
let userAccuracy = 0;
let locationRequested = false;
const londonBounds = L.latLngBounds([51.28, -0.52], [51.70, 0.34]);

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

  directionsEl.innerHTML = selectedRoute.stops
    .map((stop, index) => {
      const previous = selectedRoute.stops[index - 1];
      const segmentBreak = !previous || previous.segment !== stop.segment;
      return `
        ${segmentBreak ? `<li class="segment-divider">${stop.segmentLabel}</li>` : ''}
        <li>
          <strong>${stop.name}</strong>
          <span>${stop.detail}</span>
        </li>
      `;
    })
    .join('');
}

function buildMap() {
  if (map) return;

  map = L.map('map', {
    bounceAtZoomLimits: false,
    maxBounds: londonBounds,
    maxBoundsViscosity: 0.9,
    minZoom: 11,
    scrollWheelZoom: true,
    tap: true,
    zoomControl: true,
  }).setView(selectedRoute.center, selectedRoute.zoom);

  L.tileLayer('/api/tile/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19,
  }).addTo(map);

  routeLayer = L.layerGroup().addTo(map);
}

function renderRouteOnMap() {
  routeLayer.clearLayers();

  const walkStops = selectedRoute.stops.filter((stop) => stop.segment === 'walk');
  const busStops = selectedRoute.stops.filter((stop) => stop.segment === 'bus');
  const routeBounds = L.latLngBounds(selectedRoute.stops.map((stop) => [stop.lat, stop.lng]));

  [
    { stops: walkStops, color: '#c9483a' },
    { stops: busStops, color: '#146c64' },
  ].forEach(({ stops, color }) => {
    if (stops.length < 2) return;
    const coordinates = stops.map((stop) => [stop.lat, stop.lng]);
    L.polyline(coordinates, {
      color: '#ffffff',
      opacity: 0.88,
      weight: 12,
      lineCap: 'round',
      lineJoin: 'round',
    }).addTo(routeLayer);
    L.polyline(coordinates, {
      color,
      opacity: 0.98,
      weight: 7,
      lineCap: 'round',
      lineJoin: 'round',
    }).addTo(routeLayer);
  });

  selectedRoute.stops.forEach((stop, index) => {
    const icon = L.divIcon({
      className: `poi-marker ${stop.segment === 'bus' ? 'poi-marker-bus' : ''}`,
      html: `<span>${index + 1}</span>`,
      iconSize: [30, 30],
      iconAnchor: [15, 15],
    });

    L.marker([stop.lat, stop.lng], { icon })
      .addTo(routeLayer)
      .bindPopup(`<strong>${index + 1}. ${stop.name}</strong><br>${stop.detail}`);
  });

  map.fitBounds(routeBounds, { padding: [56, 56] });

  if (userLocation) {
    const icon = L.divIcon({
      className: 'user-location-marker',
      iconSize: [22, 22],
    });

    userMarker = L.marker(userLocation, { icon, zIndexOffset: 1000 })
      .addTo(routeLayer)
      .bindPopup('<strong>Your position</strong>');
    userAccuracyCircle = L.circle(userLocation, {
      color: '#1d6fe8',
      fillColor: '#1d6fe8',
      fillOpacity: 0.12,
      radius: userAccuracy,
      weight: 1,
    }).addTo(routeLayer);
  }
}

function recenterRoute() {
  if (!map) return;
  const coordinates = selectedRoute.stops.map((stop) => [stop.lat, stop.lng]);
  map.fitBounds(coordinates, { padding: [56, 56] });
}

function selectRoute(route) {
  selectedRoute = route;
  document.body.classList.add('route-view');
  renderPicker();
  renderDetails();
  buildMap();
  setTimeout(() => {
    map.invalidateSize();
    renderRouteOnMap();
    if (!locationRequested) {
      locationRequested = true;
      locateUser();
    }
  }, 0);
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

  locationRequested = true;
  setStatus('Finding your location...');

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude, accuracy } = position.coords;
      const latLng = [latitude, longitude];

      if (!londonBounds.contains(latLng)) {
        setStatus('Your position is outside the London map area. Route pins are still available.');
        return;
      }

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

function showRoutePicker() {
  document.body.classList.remove('route-view');
  setStatus('Pick a route, then the map opens with pins, pan and zoom controls, and directions.');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

pickerEl.addEventListener('click', (event) => {
  const target = event.target.closest('button[data-route]');
  if (!target) return;
  const route = routes.find((item) => item.id === target.dataset.route);
  if (route) selectRoute(route);
});

locateButton.addEventListener('click', locateUser);
printButton.addEventListener('click', () => window.print());
mapPrintButton.addEventListener('click', () => window.print());
changeRouteButton.addEventListener('click', showRoutePicker);
recenterButton.addEventListener('click', recenterRoute);

renderPicker();
renderDetails();
buildMap();
renderRouteOnMap();
setStatus('Pick the route to open the map, then tap a marker or use my location.');
