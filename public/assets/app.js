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

const layerCatalog = [
  {
    id: 'attractions',
    label: 'Major attractions',
    defaultVisible: true,
    minZoom: 13,
    markerLabel: 'A',
    routeRadius: 0.0065,
    points: [
      { id: 'horse-guards', name: 'Horse Guards Parade', lat: 51.5046, lng: -0.1289, detail: 'Photo stop between Whitehall and Trafalgar Square.' },
      { id: 'national-gallery', name: 'The National Gallery', lat: 51.5089, lng: -0.1283, detail: 'Major gallery on Trafalgar Square.' },
      { id: 'somerset-house', name: 'Somerset House', lat: 51.5112, lng: -0.117, detail: 'Useful stop near the Strand.' },
      { id: 'st-pauls', name: 'St Paul’s Cathedral', lat: 51.5138, lng: -0.0984, detail: 'Cathedral landmark on the City section.' },
      { id: 'leadenhall-market', name: 'Leadenhall Market', lat: 51.5133, lng: -0.0835, detail: 'Historic covered market near the route.' },
      { id: 'tower-bridge', name: 'Tower Bridge', lat: 51.5055, lng: -0.0754, detail: 'Classic riverside photo stop.' },
      { id: 'london-eye', name: 'London Eye', lat: 51.5033, lng: -0.1196, detail: 'South Bank landmark on the river bend.' },
      { id: 'tate-modern', name: 'Tate Modern', lat: 51.5076, lng: -0.0994, detail: 'Major riverside gallery.' },
      { id: 'monument', name: 'The Monument', lat: 51.5101, lng: -0.0864, detail: 'Great Fire memorial near the City stretch.' },
    ],
  },
  {
    id: 'food',
    label: 'Pubs and rest stops',
    defaultVisible: true,
    minZoom: 13,
    markerLabel: 'P',
    routeRadius: 0.005,
    points: [
      { id: 'dickens-inn', name: 'The Dickens Inn', lat: 51.5068, lng: -0.0757, detail: 'Pub finish at St Katharine Docks.' },
      { id: 'southbank-centre', name: 'Southbank Centre', lat: 51.5077, lng: -0.1142, detail: 'Good indoor pause on the South Bank.' },
      { id: 'covent-garden', name: 'Covent Garden', lat: 51.5118, lng: -0.123, detail: 'Food, toilets, and market cover near the route.' },
    ],
  },
  {
    id: 'transport',
    label: 'Transport links',
    defaultVisible: false,
    minZoom: 12,
    markerLabel: 'T',
    routeRadius: 0.005,
    points: [
      { id: 'charing-cross', name: 'Charing Cross', lat: 51.508, lng: -0.1247, detail: 'Rail and Underground interchange.' },
      { id: 'westminster-station', name: 'Westminster Underground', lat: 51.501, lng: -0.1254, detail: 'Tube access by Parliament Square.' },
      { id: 'tower-hill', name: 'Tower Hill Underground', lat: 51.5104, lng: -0.0766, detail: 'Tube access for the Tower finish.' },
      { id: 'tower-pier', name: 'Tower Pier', lat: 51.5071, lng: -0.0773, detail: 'Uber Boat stop for a future river leg.' },
    ],
  },
  {
    id: 'toilets',
    label: 'Public toilets',
    defaultVisible: false,
    minZoom: 13,
    markerLabel: 'WC',
    routeRadius: 0.004,
    points: [
      { id: 'trafalgar-wc', name: 'Trafalgar Square toilets', lat: 51.5081, lng: -0.128, detail: 'Central convenience near the route start.' },
      { id: 'southbank-wc', name: 'South Bank toilets', lat: 51.5068, lng: -0.1149, detail: 'Useful riverside stop near Waterloo Bridge.' },
      { id: 'tower-wc', name: 'Tower Hill toilets', lat: 51.5087, lng: -0.0766, detail: 'Public facilities near the route finish.' },
    ],
  },
  {
    id: 'supermarkets',
    label: 'Supermarkets',
    defaultVisible: false,
    minZoom: 13,
    markerLabel: 'S',
    routeRadius: 0.0045,
    points: [
      { id: 'coop-strand', name: 'Co-op Strand', lat: 51.5111, lng: -0.1199, detail: 'Small supermarket hook for future grocery layers.' },
      { id: 'sainsburys-strand', name: 'Sainsbury’s Local Strand', lat: 51.5112, lng: -0.1221, detail: 'Central convenience grocery stop.' },
      { id: 'tesco-tower', name: 'Tesco Express Tower Hill', lat: 51.5107, lng: -0.0787, detail: 'Supermarket near the Tower finish.' },
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
const layerListEl = document.querySelector('#layer-list');
const offlineDetailsEl = document.querySelector('#offline-details');
const locateButton = document.querySelector('#locate-button');
const offlineButton = document.querySelector('#offline-button');
const printButton = document.querySelector('#print-button');
const mapPrintButton = document.querySelector('#map-print-button');
const changeRouteButton = document.querySelector('#change-route-button');
const recenterButton = document.querySelector('#recenter-button');
const themeButton = document.querySelector('#theme-button');
const shareButton = document.querySelector('#share-button');

const initialRouteId = new URLSearchParams(window.location.search).get('route');
let selectedRoute = routes.find((route) => route.id === initialRouteId) || routes[0];
let map;
let routeLineLayers = [];
let routeMarkers = [];
let layerMarkers = [];
let userMarker;
let userLocation;
let locationRequested = false;
let routeRenderToken = 0;
let selectedRouteBounds;
let routeGeometryPromise;
let tileManifestPromise;
const londonBounds = [[51.28, -0.52], [51.70, 0.34]];
const cacheName = 'londontour-offline-v16';
const layerStateKey = 'londontour-layer-state-v1';
const themeStateKey = 'londontour-theme';
const offlineStateKey = 'londontour-offline-state-v1';

async function resetLegacyRuntime() {
  try {
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

function loadActiveLayerIds() {
  try {
    const stored = JSON.parse(localStorage.getItem(layerStateKey) || '[]');
    const validIds = new Set(layerCatalog.map((layer) => layer.id));
    const selected = stored.filter((id) => validIds.has(id));
    if (selected.length) return new Set(selected);
  } catch (error) {
    // Use defaults when storage is unavailable.
  }

  return new Set(layerCatalog.filter((layer) => layer.defaultVisible).map((layer) => layer.id));
}

let activeLayerIds = loadActiveLayerIds();

function saveActiveLayerIds() {
  try {
    localStorage.setItem(layerStateKey, JSON.stringify([...activeLayerIds]));
  } catch (error) {
    // Layer state is still usable for the current session.
  }
}

function routeDistance(point, route) {
  return Math.min(
    ...route.stops.map((stop) => {
      const latDiff = point.lat - stop.lat;
      const lngDiff = point.lng - stop.lng;
      return Math.sqrt(latDiff * latDiff + lngDiff * lngDiff);
    })
  );
}

function pointMatchesRoute(point, layer, route) {
  if (point.routes) return point.routes.includes(route.id);
  return routeDistance(point, route) <= (layer.routeRadius || 0.005);
}

function activeLayerPoints(route = selectedRoute, includeZoomRules = true) {
  const zoom = map?.getZoom?.() || route.zoom || 13;
  return layerCatalog.flatMap((layer) => {
    if (!activeLayerIds.has(layer.id)) return [];
    if (includeZoomRules && zoom < layer.minZoom) return [];
    return layer.points
      .filter((point) => pointMatchesRoute(point, layer, route))
      .map((point) => ({ ...point, layerId: layer.id, layerLabel: layer.label, markerLabel: layer.markerLabel }));
  });
}

function renderLayerControls() {
  if (!layerListEl) return;

  layerListEl.innerHTML = layerCatalog
    .map((layer) => {
      const count = layer.points.length;
      return `
        <label class="layer-toggle">
          <input type="checkbox" value="${layer.id}" ${activeLayerIds.has(layer.id) ? 'checked' : ''} />
          <span>
            <strong>${layer.label}</strong>
            <small>${count} item${count === 1 ? '' : 's'} · visible from zoom ${layer.minZoom}</small>
          </span>
        </label>
      `;
    })
    .join('');
}

function offlineSelections() {
  return {
    route: document.querySelector('input[name="offline-route"]')?.checked ?? true,
    tiles: document.querySelector('input[name="offline-tiles"]')?.checked ?? true,
    layers: document.querySelector('input[name="offline-layers"]')?.checked ?? true,
  };
}

function getOfflineState() {
  try {
    return JSON.parse(localStorage.getItem(offlineStateKey) || 'null');
  } catch (error) {
    return null;
  }
}

function setOfflineState(state) {
  try {
    localStorage.setItem(offlineStateKey, JSON.stringify(state));
  } catch (error) {
    // Offline cache still works without the summary state.
  }
}

async function renderOfflineDetails() {
  if (!offlineDetailsEl) return;
  const selections = offlineSelections();
  const parts = ['app shell'];
  if (selections.route) parts.push(selectedRoute.name);
  if (selections.layers) parts.push(`${activeLayerPoints(selectedRoute, false).length} selected layer items`);
  if (selections.tiles) {
    const tileManifest = await loadTileManifest();
    parts.push(`${tileManifest.length} local tiles`);
  }

  const state = getOfflineState();
  const selectedLayers = [...activeLayerIds].sort().join(',');
  const isStale =
    state &&
    (state.cacheName !== cacheName ||
      state.routeId !== selectedRoute.id ||
      state.layerIds !== selectedLayers ||
      state.includesTiles !== selections.tiles);

  offlineDetailsEl.textContent = state
    ? `${isStale ? 'Needs refresh' : 'Ready'}: ${parts.join(', ')}. Last saved ${new Date(state.savedAt).toLocaleString()}.`
    : `Not downloaded yet. Will include ${parts.join(', ')}.`;
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
    const pois = activeLayerPoints(selectedRoute, false);
    highlightsEl.innerHTML = pois.length
      ? pois
          .map(
            (poi) => `
              <li class="poi-item">
                <strong>${poi.name}</strong>
                <span>${poi.layerLabel}: ${poi.detail}</span>
              </li>
            `
          )
          .join('')
      : '<li class="poi-empty">No selected layers have nearby items for this route.</li>';
  }

  void renderOfflineDetails();
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

function buildStopsBounds(route = selectedRoute) {
  const bounds = L.latLngBounds([]);
  route.stops.forEach((stop) => bounds.extend([stop.lat, stop.lng]));
  return bounds;
}

function routeFitPadding() {
  if (window.matchMedia('(max-width: 900px)').matches) {
    return {
      paddingTopLeft: [44, 88],
      paddingBottomRight: [44, Math.round(window.innerHeight * 0.4)],
    };
  }

  return { padding: [64, 64] };
}

function fitSelectedRouteBounds(options = {}) {
  if (!map) return;
  const bounds = selectedRouteBounds?.isValid?.() ? selectedRouteBounds : buildStopsBounds();
  if (!bounds.isValid()) return;

  map.invalidateSize();
  map.fitBounds(bounds, {
    ...routeFitPadding(),
    animate: options.animate ?? true,
  });
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
    maxZoom: 18,
    maxBounds: londonBounds,
    maxBoundsViscosity: 1.0,
    preferCanvas: true,
  });

  const offlineTileLayer = L.tileLayer('/tiles/{z}/{x}/{y}.png', {
    minZoom: 11,
    maxZoom: 18,
    maxNativeZoom: 15,
    bounds: londonBounds,
    tileSize: 256,
    attribution: 'Offline London tile pack',
  });

  const onlineTileLayer = L.tileLayer(
    'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
    {
      subdomains: 'abcd',
      maxZoom: 18,
      tileSize: 256,
      attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
    }
  );

  const useOfflineTiles = () => {
    if (map.hasLayer(offlineTileLayer)) return;
    if (map.hasLayer(onlineTileLayer)) onlineTileLayer.remove();
    offlineTileLayer.addTo(map);
    setStatus('Using the offline fallback map tiles. Some basemap detail is reduced.');
  };

  onlineTileLayer.once('tileerror', useOfflineTiles);
  if (navigator.onLine === false) {
    useOfflineTiles();
  } else {
    onlineTileLayer.addTo(map);
  }

  L.control.zoom({ position: 'bottomright' }).addTo(map);
  map.setView(selectedRoute.center, selectedRoute.zoom);
  map.on('zoomend', () => {
    renderRouteMarkers();
    renderLayerMarkers();
    renderDetails();
  });
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
  return /^\/tiles\/\d+\/\d+\/\d+\.png$/.test(tilePath) ? tilePath : null;
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

  const selections = offlineSelections();
  offlineButton.disabled = true;
  offlineButton.textContent = 'Downloading...';
  setStatus('Downloading the selected offline pack...');

  try {
    const cache = await caches.open(cacheName);
    await cacheRequest(cache, '/');
    await cacheRequest(cache, '/index.html');
    await cacheRequest(cache, '/assets/app.js');
    await cacheRequest(cache, '/assets/styles.css');
    await cacheRequest(cache, '/assets/vendor/leaflet.js');
    await cacheRequest(cache, '/assets/vendor/leaflet.css');
    if (selections.route) {
      await cacheRequest(cache, '/assets/route-geometry.json');
    }

    let tileTotal = 0;
    let cachedTiles = 0;
    if (selections.tiles) {
      await cacheRequest(cache, '/assets/tiles-manifest.json');
      const tileManifest = await loadTileManifest();
      const tileUrls = tileManifest
        .map(tilePathToLocalUrl)
        .filter(Boolean);
      tileTotal = tileUrls.length;

      for (const url of tileUrls) {
        try {
          await cacheRequest(cache, url);
          cachedTiles += 1;
        } catch (error) {
          // Skip bad tiles and keep going.
        }
      }
    }

    setOfflineState({
      cacheName,
      routeId: selectedRoute.id,
      layerIds: [...activeLayerIds].sort().join(','),
      includesRoute: selections.route,
      includesTiles: selections.tiles,
      includesLayers: selections.layers,
      cachedTiles,
      tileTotal,
      savedAt: new Date().toISOString(),
    });

    const tileSummary = selections.tiles ? ` Cached ${cachedTiles}/${tileTotal} local tiles.` : '';
    setStatus(`Offline pack ready for ${selectedRoute.name}.${tileSummary}`);
    await renderOfflineDetails();
  } catch (error) {
    setStatus('Offline pack download failed.');
  } finally {
    offlineButton.disabled = false;
    offlineButton.textContent = 'Download offline pack';
  }
}

function renderLayerMarkers() {
  if (!map) return;

  layerMarkers.forEach((marker) => marker.remove());
  layerMarkers = [];

  activeLayerPoints().forEach((point) => {
    const marker = L.marker([point.lat, point.lng], {
      icon: L.divIcon({
        className: '',
        html: `<div class="layer-marker layer-marker-${point.layerId}"><span>${point.markerLabel}</span></div>`,
        iconSize: [30, 30],
        iconAnchor: [15, 15],
      }),
    }).bindPopup(`<strong>${point.name}</strong><br>${point.layerLabel}<br>${point.detail}`);
    marker.addTo(map);
    layerMarkers.push(marker);
  });
}

function visibleRouteStops() {
  if (!map || map.getZoom() >= 13) {
    return selectedRoute.stops.map((stop, index) => ({ stop, index }));
  }

  return selectedRoute.stops
    .map((stop, index) => ({ stop, index }))
    .filter(({ stop, index }) => {
      const previous = selectedRoute.stops[index - 1];
      return index === 0 || index === selectedRoute.stops.length - 1 || previous?.segment !== stop.segment;
    });
}

function renderRouteMarkers() {
  if (!map) return;

  routeMarkers.forEach((marker) => marker.remove());
  routeMarkers = [];

  visibleRouteStops().forEach(({ stop, index }) => {
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

      routeCoordinates.forEach((coordinate) => {
        routeBounds.extend([coordinate[1], coordinate[0]]);
        routeHasPoints = true;
      });

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

  renderRouteMarkers();
  renderLayerMarkers();

  if (routeHasPoints) {
    selectedRouteBounds = routeBounds;
    fitSelectedRouteBounds({ animate: false });
  }

  if (userLocation) {
    addOrUpdateUserMarker();
  }

  setStatus(`Viewing ${selectedRoute.name}. Tap markers for more info, or use my location. Available offline after the first visit.`);
}

function recenterRoute() {
  if (!map) return;
  fitSelectedRouteBounds({ animate: true });
  setStatus(`Recentered to show all of ${selectedRoute.name}.`);
}

function selectRoute(route) {
  selectedRoute = route;
  selectedRouteBounds = undefined;
  document.body.classList.add('route-view');
  const url = new URL(window.location.href);
  url.searchParams.set('route', route.id);
  window.history.replaceState({}, '', url);
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

function applyTheme(theme) {
  const activeTheme = theme === 'dark' ? 'dark' : 'light';
  document.body.dataset.theme = activeTheme;
  themeButton.textContent = activeTheme === 'dark' ? 'Light' : 'Dark';
  try {
    localStorage.setItem(themeStateKey, activeTheme);
  } catch (error) {
    // Theme changes can remain session-only.
  }
}

function toggleTheme() {
  applyTheme(document.body.dataset.theme === 'dark' ? 'light' : 'dark');
}

async function shareRoute() {
  const url = new URL(window.location.href);
  url.searchParams.set('route', selectedRoute.id);
  window.history.replaceState({}, '', url);
  const shareData = {
    title: `Londontour: ${selectedRoute.name}`,
    text: selectedRoute.summary,
    url: url.toString(),
  };

  try {
    if (navigator.share) {
      await navigator.share(shareData);
      setStatus('Route shared.');
      return;
    }

    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(shareData.url);
      setStatus('Route link copied.');
      return;
    }

    setStatus('Route link is ready in the address bar.');
  } catch (error) {
    setStatus('Route link is ready in the address bar.');
  }
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
themeButton.addEventListener('click', toggleTheme);
shareButton.addEventListener('click', shareRoute);

layerListEl.addEventListener('change', (event) => {
  const target = event.target.closest('input[type="checkbox"]');
  if (!target) return;
  if (target.checked) {
    activeLayerIds.add(target.value);
  } else {
    activeLayerIds.delete(target.value);
  }
  saveActiveLayerIds();
  renderLayerControls();
  renderLayerMarkers();
  renderDetails();
  setStatus('Map layers updated.');
});

document.querySelectorAll('.offline-options input').forEach((input) => {
  input.addEventListener('change', () => {
    void renderOfflineDetails();
  });
});

applyTheme(localStorage.getItem(themeStateKey) || 'light');
renderLayerControls();
renderPicker();
renderDetails();
buildMap();
void resetLegacyRuntime();
void renderRouteOnMap();
setStatus('Pick the route to open the map, then tap a marker or use my location. Available offline after the first visit.');
