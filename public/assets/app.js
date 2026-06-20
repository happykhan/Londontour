const routes = [
  {
    id: 'london-tour',
    geometryKey: 'london-tour',
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
    pois: [
      {
        name: 'Horse Guards Parade',
        lat: 51.5046,
        lng: -0.1289,
        detail: 'A good photo stop between Whitehall and Trafalgar Square.',
      },
      {
        name: 'The National Gallery',
        lat: 51.5089,
        lng: -0.1283,
        detail: 'Right on the edge of Trafalgar Square, ideal for a quick museum break.',
      },
      {
        name: 'Somerset House',
        lat: 51.5112,
        lng: -0.117,
        detail: 'Useful highlight near the Strand between the walk and bus sections.',
      },
      {
        name: 'St Paul’s Cathedral',
        lat: 51.5138,
        lng: -0.0984,
        detail: 'The main landmark on the Bus 15 section.',
      },
      {
        name: 'Leadenhall Market',
        lat: 51.5133,
        lng: -0.0835,
        detail: 'Short detour in the City if you want an extra historic stop.',
      },
      {
        name: 'Tower Pier',
        lat: 51.5071,
        lng: -0.0773,
        detail: 'Handy riverside option if you later add a boat leg.',
      },
    ],
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
  {
    id: 'secret-ldn-sightseeing',
    geometryKey: 'secret-ldn-sightseeing',
    name: 'Secret London sightseeing tour',
    kind: 'Walking',
    summary: 'A fast central London sightseeing loop from Trafalgar Square to a riverside pub finish.',
    distance: 'Just over 5 miles',
    time: 'About 2 hours',
    start: 'Trafalgar Square',
    transport: 'Walk',
    color: '#146c64',
    center: [51.5074, -0.1105],
    zoom: 13,
    pois: [
      { name: 'The Mall', lat: 51.5027, lng: -0.1324, detail: 'The ceremonial stretch towards Buckingham Palace.' },
      { name: 'London Eye', lat: 51.5033, lng: -0.1196, detail: 'South Bank landmark on the river bend.' },
      { name: 'Southbank Centre', lat: 51.5077, lng: -0.1142, detail: 'One of the article’s key mid-route stops.' },
      { name: 'Tate Modern', lat: 51.5076, lng: -0.0994, detail: 'Major riverside gallery on the South Bank stretch.' },
      { name: 'St Paul’s Cathedral', lat: 51.5138, lng: -0.0984, detail: 'The route’s dramatic mid-point across the Thames.' },
      { name: 'The Monument', lat: 51.5101, lng: -0.0864, detail: 'The Great Fire memorial on the City stretch.' },
      { name: 'Tower Bridge', lat: 51.5055, lng: -0.0754, detail: 'The obvious riverside photo finish.' },
      { name: 'The Dickens Inn', lat: 51.5076, lng: -0.0756, detail: 'A neat pub finish at St Katharine Docks.' },
    ],
    stops: [
      { name: 'Trafalgar Square', lat: 51.5079, lng: -0.1281, segment: 'walk', segmentLabel: 'Walking route', detail: 'Start in the square and head west via the Mall.' },
      { name: 'The Mall', lat: 51.5034, lng: -0.1337, segment: 'walk', segmentLabel: 'Walking route', detail: 'Take the ceremonial route to Buckingham Palace.' },
      { name: 'Buckingham Palace', lat: 51.5014, lng: -0.1419, segment: 'walk', segmentLabel: 'Walking route', detail: 'The royal stop before heading back through St James’s Park.' },
      { name: 'Birdcage Walk', lat: 51.5007, lng: -0.1312, segment: 'walk', segmentLabel: 'Walking route', detail: 'Carry on towards Westminster and the cathedral.' },
      { name: 'Westminster Abbey', lat: 51.4993, lng: -0.1273, segment: 'walk', segmentLabel: 'Walking route', detail: 'The Gothic heavyweight on the route.' },
      { name: 'Big Ben / Houses of Parliament', lat: 51.5007, lng: -0.1246, segment: 'walk', segmentLabel: 'Walking route', detail: 'Step over for the clock tower and Parliament.' },
      { name: 'Westminster Bridge', lat: 51.5018, lng: -0.1167, segment: 'walk', segmentLabel: 'Walking route', detail: 'Cross to the South Bank.' },
      { name: 'London Eye / South Bank', lat: 51.5033, lng: -0.1196, segment: 'walk', segmentLabel: 'Walking route', detail: 'Carry on by the river and the wheel.' },
      { name: 'Southbank Centre', lat: 51.5077, lng: -0.1142, segment: 'walk', segmentLabel: 'Walking route', detail: 'The article’s next major stop.' },
      { name: 'Waterloo Bridge book stalls', lat: 51.5084, lng: -0.1139, segment: 'walk', segmentLabel: 'Walking route', detail: 'Browse the books under the bridge.' },
      { name: 'OXO Tower', lat: 51.5077, lng: -0.1075, segment: 'walk', segmentLabel: 'Walking route', detail: 'Head along the river past the foreshore.' },
      { name: 'Tate Modern', lat: 51.5076, lng: -0.0994, segment: 'walk', segmentLabel: 'Walking route', detail: 'Keep moving, no time for the gallery queue.' },
      { name: "Shakespeare’s Globe", lat: 51.5081, lng: -0.0974, segment: 'walk', segmentLabel: 'Walking route', detail: 'A quick detour by the theatre.' },
      { name: 'Millennium Bridge', lat: 51.5107, lng: -0.0982, segment: 'walk', segmentLabel: 'Walking route', detail: 'Cross back over towards St Paul’s.' },
      { name: "St Paul’s Cathedral", lat: 51.5138, lng: -0.0984, segment: 'walk', segmentLabel: 'Walking route', detail: 'The skyline anchor for the middle of the tour.' },
      { name: 'Cannon Street', lat: 51.5112, lng: -0.0908, segment: 'walk', segmentLabel: 'Walking route', detail: 'Continue east through the City.' },
      { name: 'The Monument', lat: 51.5101, lng: -0.0864, segment: 'walk', segmentLabel: 'Walking route', detail: 'The Great Fire memorial on the way to the river.' },
      { name: 'Tower of London', lat: 51.5081, lng: -0.0761, segment: 'walk', segmentLabel: 'Walking route', detail: 'The fortress on the final stretch.' },
      { name: 'Tower Bridge', lat: 51.5055, lng: -0.0754, segment: 'walk', segmentLabel: 'Walking route', detail: 'The classic photo stop next door.' },
      { name: 'St Katharine Docks', lat: 51.5052, lng: -0.0706, segment: 'walk', segmentLabel: 'Walking route', detail: 'Pretty marina to wrap up the map.' },
      { name: 'The Dickens Inn', lat: 51.5068, lng: -0.0757, segment: 'walk', segmentLabel: 'Walking route', detail: 'A flower-festooned pub finish.' },
    ],
  },
];

const pickerEl = document.querySelector('#route-picker');
const titleEl = document.querySelector('#route-title');
const summaryEl = document.querySelector('#route-summary');
const metaEl = document.querySelector('#route-meta');
const directionsEl = document.querySelector('#directions');
const highlightsEl = document.querySelector('#route-highlights');
const statusEl = document.querySelector('#status');
const locateButton = document.querySelector('#locate-button');
const offlineButton = document.querySelector('#offline-button');
const printButton = document.querySelector('#print-button');
const mapPrintButton = document.querySelector('#map-print-button');
const changeRouteButton = document.querySelector('#change-route-button');
const recenterButton = document.querySelector('#recenter-button');

let selectedRoute = routes[0];
let map;
let routeLineLayers = [];
let routeMarkers = [];
let routePoiMarkers = [];
let userMarker;
let userLocation;
let locationRequested = false;
let routeRenderToken = 0;
let routeGeometryPromise;
let tileManifestPromise;
const londonBounds = [[51.28, -0.52], [51.70, 0.34]];
const cacheName = 'londontour-offline-v7';
const offlineMapStyle = {
  version: 8,
  name: 'Londontour offline',
  sources: {
    local: {
      type: 'raster',
      tiles: [
        '/tiles/{z}/{x}/{y}.png',
      ],
      tileSize: 256,
      minzoom: 11,
      maxzoom: 15,
      attribution: 'Local London tile pack',
    },
  },
  layers: [
    {
      id: 'background',
      type: 'background',
      paint: {
        'background-color': '#f3f5f6',
      },
    },
    {
      id: 'local-tiles',
      type: 'raster',
      source: 'local',
    },
  ],
};

async function resetLegacyRuntime() {
  try {
    if ('serviceWorker' in navigator) {
      const registrations = await navigator.serviceWorker.getRegistrations();
      await Promise.all(registrations.map((registration) => registration.unregister()));
    }

    if (window.caches) {
      const keys = await caches.keys();
      await Promise.all(keys.map((key) => (key === cacheName ? null : caches.delete(key))));
    }
  } catch (error) {
    // Ignore cleanup failures and keep the map usable.
  }
}

function isInsideLondon(latLng) {
  const [latitude, longitude] = latLng;
  return latitude >= 51.28 && latitude <= 51.70 && longitude >= -0.52 && longitude <= 0.34;
}

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
        <li data-segment="${stop.segment}">
          <span class="stop-index">${index + 1}</span>
          <div class="stop-copy">
            <strong>${stop.name}</strong>
            <span>${stop.detail}</span>
          </div>
          <span class="stop-segment">${stop.segment === 'walk' ? 'Walk' : stop.segment === 'bus' ? 'Bus' : stop.segment}</span>
        </li>
      `;
    })
    .join('');

  if (highlightsEl) {
    const pois = selectedRoute.pois || [];
    highlightsEl.innerHTML = pois.length
      ? pois
          .map(
            (poi) => `
              <li class="poi-item">
                <strong>${poi.name}</strong>
                <span>${poi.detail}</span>
              </li>
            `
          )
          .join('')
      : '<li class="poi-empty">No extra POIs on this route yet.</li>';
  }
}

function groupRouteStops(stops) {
  const groups = [];
  let current = null;

  stops.forEach((stop) => {
    if (!current || current.segment !== stop.segment) {
      current = {
        segment: stop.segment,
        segmentLabel: stop.segmentLabel,
        stops: [stop],
      };
      groups.push(current);
      return;
    }

    current.stops.push(stop);
  });

  return groups;
}

function loadRouteGeometry() {
  if (!routeGeometryPromise) {
    routeGeometryPromise = fetch('/assets/route-geometry.json')
      .then((response) => response.json())
      .catch(() => ({}));
  }

  return routeGeometryPromise;
}

function loadTileManifest() {
  if (!tileManifestPromise) {
    tileManifestPromise = fetch('/assets/tiles-manifest.json')
      .then((response) => response.json())
      .catch(() => []);
  }

  return tileManifestPromise;
}

function tilePathToApiUrl(tilePath) {
  const match = tilePath.match(/^\/tiles\/(\d+)\/(\d+)\/(\d+)\.png$/);
  if (!match) return null;

  const [, z, x, y] = match;
  return `/api/tile?z=${encodeURIComponent(z)}&x=${encodeURIComponent(x)}&y=${encodeURIComponent(y)}`;
}

async function fetchRouteGeometry(segment, coordinates) {
  if (coordinates.length < 2) {
    return coordinates;
  }

  const routeGeometry = await loadRouteGeometry();
  const geometry = routeGeometry?.[selectedRoute.geometryKey || selectedRoute.id]?.[segment];
  return Array.isArray(geometry) && geometry.length >= 2 ? geometry : coordinates;
}

function buildMap() {
  if (map) return;

  map = L.map('map', {
    zoomControl: false,
    minZoom: 11,
    maxZoom: 15,
    maxBounds: londonBounds,
    maxBoundsViscosity: 1.0,
    preferCanvas: true,
  });

  L.tileLayer('/api/tile?z={z}&x={x}&y={y}', {
    minZoom: 11,
    maxZoom: 15,
    tileSize: 256,
    attribution: 'Local London tile pack',
  }).addTo(map);

  L.control.zoom({ position: 'bottomright' }).addTo(map);
  map.setView(selectedRoute.center, selectedRoute.zoom);
  map.whenReady(() => {
    renderRouteOnMap();
  });
}

function segmentStylesFor(segment) {
  const colours = {
    walk: '#c9483a',
    bus: '#146c64',
    tube: '#6f2dbd',
    boat: '#0f766e',
  };

  return colours[segment] || '#c9483a';
}

function tilePathToLocalUrl(tilePath) {
  const match = tilePath.match(/^\/tiles\/(\d+)\/(\d+)\/(\d+)\.png$/);
  if (!match) return null;

  return tilePathToApiUrl(tilePath);
}

async function cacheRequest(cache, url) {
  const response = await fetch(url, { cache: 'no-store' });
  if (response.ok) {
    await cache.put(url, response.clone());
  }
}

async function downloadOfflinePack() {
  if (!window.caches) {
    setStatus('Offline caching is not supported in this browser.');
    return;
  }

  offlineButton.disabled = true;
  offlineButton.textContent = 'Downloading...';
  setStatus('Downloading the offline pack for this route...');

  try {
    const cache = await caches.open(cacheName);
    const tileManifest = await loadTileManifest();
    await cacheRequest(cache, '/');
    await cacheRequest(cache, '/index.html');
    await cacheRequest(cache, '/assets/app.js');
    await cacheRequest(cache, '/assets/styles.css');
    await cacheRequest(cache, '/assets/vendor/leaflet.js');
    await cacheRequest(cache, '/assets/vendor/leaflet.css');
    await cacheRequest(cache, '/assets/route-geometry.json');
    await cacheRequest(cache, '/assets/tiles-manifest.json');

    const tileUrls = tileManifest
      .map(tilePathToLocalUrl)
      .filter(Boolean);

    let cachedTiles = 0;
    for (const url of tileUrls) {
      try {
        await cacheRequest(cache, url);
        cachedTiles += 1;
      } catch (error) {
        // Skip bad tiles and keep going.
      }
    }

    setStatus(`Offline pack ready. Cached ${cachedTiles} local tiles and route geometry for the selected tour.`);
  } catch (error) {
    setStatus('Offline pack download failed.');
  } finally {
    offlineButton.disabled = false;
    offlineButton.textContent = 'Download offline pack';
  }
}

async function renderRouteOnMap() {
  if (!map) return;
  const renderToken = ++routeRenderToken;
  const routeBounds = L.latLngBounds([]);
  let routeHasPoints = false;
  const segmentGroups = groupRouteStops(selectedRoute.stops);

  setStatus('Loading route geometry...');

  routeLineLayers.forEach((layer) => {
    layer.remove();
  });
  routeLineLayers = [];

  const renderedSegments = await Promise.all(
    segmentGroups.map(async (segmentGroup, index) => {
      const coordinates = segmentGroup.stops.map((stop) => [stop.lng, stop.lat]);
      coordinates.forEach((coordinate) => {
        routeBounds.extend([coordinate[1], coordinate[0]]);
        routeHasPoints = true;
      });

      const routeCoordinates = await fetchRouteGeometry(segmentGroup.segment, coordinates);
      if (renderToken !== routeRenderToken) return null;

      return {
        id: `route-${segmentGroup.segment}-${index}`,
        segment: segmentGroup.segment,
        coordinates: routeCoordinates,
      };
    })
  );

  if (renderToken !== routeRenderToken) return;

  renderedSegments.filter(Boolean).forEach((segment) => {
    if (!segment || segment.coordinates.length < 2) return;

    const latLngs = segment.coordinates.map((coordinate) => [coordinate[1], coordinate[0]]);
    const casing = L.polyline(latLngs, {
      color: '#ffffff',
      opacity: 0.88,
      weight: 12,
      lineCap: 'round',
      lineJoin: 'round',
    });
    const line = L.polyline(latLngs, {
      color: segmentStylesFor(segment.segment),
      opacity: 0.98,
      weight: segment.segment === 'tube' ? 8 : 7,
      lineCap: 'round',
      lineJoin: 'round',
    });

    casing.addTo(map);
    line.addTo(map);
    routeLineLayers.push(casing, line);
  });

  routeMarkers.forEach((marker) => marker.remove());
  routeMarkers = [];

  routePoiMarkers.forEach((marker) => marker.remove());
  routePoiMarkers = [];

  selectedRoute.stops.forEach((stop, index) => {
    const marker = L.marker([stop.lat, stop.lng], {
      icon: L.divIcon({
        className: '',
        html: `<div class="poi-marker ${stop.segment === 'bus' ? 'poi-marker-bus' : ''}"><span>${index + 1}</span></div>`,
        iconSize: [28, 28],
        iconAnchor: [14, 14],
      }),
    }).bindPopup(`<strong>${index + 1}. ${stop.name}</strong><br>${stop.detail}`);
    marker.addTo(map);
    routeMarkers.push(marker);
  });

  (selectedRoute.pois || []).forEach((poi, index) => {
    const marker = L.marker([poi.lat, poi.lng], {
      icon: L.divIcon({
        className: '',
        html: '<div class="poi-marker poi-marker-poi"><span>✦</span></div>',
        iconSize: [26, 26],
        iconAnchor: [13, 13],
      }),
    }).bindPopup(`<strong>${poi.name}</strong><br>${poi.detail}`);
    marker.addTo(map);
    routePoiMarkers.push(marker);
  });

  if (routeHasPoints) {
    map.fitBounds(routeBounds, { padding: [56, 56] });
  }

  if (userLocation) {
    addOrUpdateUserMarker();
  }

  setStatus(`Viewing ${selectedRoute.name}. Tap markers for more info, or use my location. Available offline after the first visit.`);
}

function recenterRoute() {
  if (!map) return;
  const routeBounds = L.latLngBounds([]);
  selectedRoute.stops.forEach((stop) => routeBounds.extend([stop.lng, stop.lat]));
  map.fitBounds(routeBounds, { padding: [56, 56] });
}

function selectRoute(route) {
  selectedRoute = route;
  document.body.classList.add('route-view');
  renderPicker();
  renderDetails();
  buildMap();
  window.setTimeout(() => {
    map.invalidateSize();
    void renderRouteOnMap();
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

      if (!isInsideLondon(latLng)) {
        setStatus('Your position is outside the London map area. Route pins are still available.');
        return;
      }

      userLocation = latLng;
      addOrUpdateUserMarker();

      map.flyTo([latitude, longitude], Math.max(map.getZoom(), 16), { duration: 0.6 });
      if (userMarker && userMarker.getPopup()) userMarker.openPopup();
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

function addOrUpdateUserMarker() {
  if (!map || !userLocation) return;

  if (userMarker) {
    userMarker.remove();
  }

  userMarker = L.marker(userLocation, {
    icon: L.divIcon({
      className: '',
      html: '<div class="user-location-marker" title="Your position"></div>',
      iconSize: [22, 22],
      iconAnchor: [11, 11],
    }),
  })
    .bindPopup('<strong>Your position</strong>')
    .addTo(map);
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
offlineButton.addEventListener('click', downloadOfflinePack);
printButton.addEventListener('click', () => window.print());
mapPrintButton.addEventListener('click', () => window.print());
changeRouteButton.addEventListener('click', showRoutePicker);
recenterButton.addEventListener('click', recenterRoute);

renderPicker();
renderDetails();
buildMap();
void resetLegacyRuntime();
void renderRouteOnMap();
setStatus('Pick the route to open the map, then tap a marker or use my location. Available offline after the first visit.');
