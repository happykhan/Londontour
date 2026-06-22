const londonPmtilesUrl = '/assets/basemaps/london-z14.pmtiles';
const londonBounds = [[-0.52, 51.28], [0.34, 51.70]];

const protocol = new pmtiles.Protocol();
maplibregl.addProtocol('pmtiles', protocol.tile);

const routeMeta = {
  'london-tour': { label: 'London tour', segments: ['walk', 'bus'] },
  'secret-ldn-sightseeing': { label: 'Secret route', segments: ['walk'] },
};

const routeColours = {
  walk: '#c9483a',
  bus: '#146c64',
  tube: '#6f2dbd',
  boat: '#0f766e',
};

let routeGeometry = {};
let selectedRouteId = 'london-tour';

const style = {
  version: 8,
  glyphs: 'https://fonts.openmaptiles.org/{fontstack}/{range}.pbf',
  sources: {
    london: {
      type: 'vector',
      url: `pmtiles://${location.origin}${londonPmtilesUrl}`,
      attribution: '<a href="https://protomaps.com" target="_blank" rel="noopener">Protomaps</a> <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">&copy; OpenStreetMap contributors</a>',
    },
  },
  layers: [
    {
      id: 'background',
      type: 'background',
      paint: { 'background-color': '#f5f1e8' },
    },
    {
      id: 'earth',
      type: 'fill',
      source: 'london',
      'source-layer': 'earth',
      paint: { 'fill-color': '#f5f1e8' },
    },
    {
      id: 'landuse-parks',
      type: 'fill',
      source: 'london',
      'source-layer': 'landuse',
      filter: ['in', ['get', 'kind'], ['literal', ['park', 'forest', 'wood', 'nature_reserve', 'garden', 'cemetery']]],
      paint: { 'fill-color': '#d9ead6', 'fill-opacity': 0.9 },
    },
    {
      id: 'water',
      type: 'fill',
      source: 'london',
      'source-layer': 'water',
      paint: { 'fill-color': '#aad3df' },
    },
    {
      id: 'buildings',
      type: 'fill',
      source: 'london',
      'source-layer': 'buildings',
      minzoom: 13,
      paint: { 'fill-color': '#dfd6c8', 'fill-opacity': 0.72 },
    },
    {
      id: 'roads-minor-casing',
      type: 'line',
      source: 'london',
      'source-layer': 'roads',
      minzoom: 12,
      filter: ['!', ['in', ['get', 'kind'], ['literal', ['highway', 'major_road', 'medium_road']]]],
      paint: {
        'line-color': '#d4cdc0',
        'line-width': ['interpolate', ['linear'], ['zoom'], 12, 0.4, 14, 2.2],
      },
    },
    {
      id: 'roads-minor',
      type: 'line',
      source: 'london',
      'source-layer': 'roads',
      minzoom: 12,
      filter: ['!', ['in', ['get', 'kind'], ['literal', ['highway', 'major_road', 'medium_road']]]],
      paint: {
        'line-color': '#ffffff',
        'line-width': ['interpolate', ['linear'], ['zoom'], 12, 0.3, 14, 1.4],
      },
    },
    {
      id: 'roads-major-casing',
      type: 'line',
      source: 'london',
      'source-layer': 'roads',
      filter: ['in', ['get', 'kind'], ['literal', ['highway', 'major_road', 'medium_road']]],
      paint: {
        'line-color': '#d1b889',
        'line-width': ['interpolate', ['linear'], ['zoom'], 10, 1.2, 14, 5],
      },
    },
    {
      id: 'roads-major',
      type: 'line',
      source: 'london',
      'source-layer': 'roads',
      filter: ['in', ['get', 'kind'], ['literal', ['highway', 'major_road', 'medium_road']]],
      paint: {
        'line-color': '#fff3c4',
        'line-width': ['interpolate', ['linear'], ['zoom'], 10, 0.8, 14, 3.6],
      },
    },
    {
      id: 'road-labels',
      type: 'symbol',
      source: 'london',
      'source-layer': 'roads',
      minzoom: 13,
      layout: {
        'symbol-placement': 'line',
        'text-field': ['coalesce', ['get', 'name'], ['get', 'ref']],
        'text-font': ['Noto Sans Regular'],
        'text-size': ['interpolate', ['linear'], ['zoom'], 13, 10, 14, 12],
      },
      paint: {
        'text-color': '#6d665e',
        'text-halo-color': '#fffaf0',
        'text-halo-width': 1.4,
      },
    },
    {
      id: 'place-labels',
      type: 'symbol',
      source: 'london',
      'source-layer': 'places',
      layout: {
        'text-field': ['coalesce', ['get', 'name:en'], ['get', 'name']],
        'text-font': ['Noto Sans Regular'],
        'text-size': ['interpolate', ['linear'], ['zoom'], 9, 11, 13, 18],
        'text-transform': 'uppercase',
        'text-letter-spacing': 0.02,
        'text-padding': 8,
      },
      paint: {
        'text-color': '#475569',
        'text-halo-color': '#fffaf0',
        'text-halo-width': 1.8,
      },
    },
    {
      id: 'poi-labels',
      type: 'symbol',
      source: 'london',
      'source-layer': 'pois',
      minzoom: 14,
      layout: {
        'text-field': ['coalesce', ['get', 'name:en'], ['get', 'name']],
        'text-font': ['Noto Sans Regular'],
        'text-size': 11,
        'text-padding': 4,
      },
      paint: {
        'text-color': '#374151',
        'text-halo-color': '#fffaf0',
        'text-halo-width': 1.3,
      },
    },
  ],
};

const map = new maplibregl.Map({
  container: 'map',
  style,
  center: [-0.105, 51.512],
  zoom: 13,
  minZoom: 10,
  maxZoom: 14,
  maxBounds: londonBounds,
  attributionControl: false,
});

map.addControl(new maplibregl.NavigationControl({ visualizePitch: false }), 'top-right');
map.addControl(new maplibregl.AttributionControl({ compact: false }), 'bottom-right');

const statusEl = document.querySelector('#status');
const zoomEl = document.querySelector('#zoom-value');
const routeButtons = Array.from(document.querySelectorAll('[data-route]'));

function updateZoom() {
  zoomEl.textContent = map.getZoom().toFixed(2);
}

map.on('load', () => {
  statusEl.textContent = 'Loaded self-hosted London PMTiles basemap.';
  updateZoom();
  void loadRouteOverlays();
});

map.on('zoom', updateZoom);
map.on('error', (event) => {
  statusEl.textContent = `Map error: ${event.error?.message || 'unknown error'}`;
});

function lineFeature(segment, coordinates) {
  return {
    type: 'Feature',
    properties: { segment },
    geometry: { type: 'LineString', coordinates },
  };
}

function routeFeatureCollection(routeId) {
  const route = routeGeometry[routeId] || {};
  return {
    type: 'FeatureCollection',
    features: Object.entries(route)
      .filter(([, coordinates]) => Array.isArray(coordinates) && coordinates.length >= 2)
      .map(([segment, coordinates]) => lineFeature(segment, coordinates)),
  };
}

function allRouteCoordinates(routeId) {
  return Object.values(routeGeometry[routeId] || {}).flat();
}

function fitRoute(routeId) {
  const coordinates = allRouteCoordinates(routeId);
  if (!coordinates.length) return;
  const bounds = coordinates.reduce(
    (memo, coordinate) => memo.extend(coordinate),
    new maplibregl.LngLatBounds(coordinates[0], coordinates[0])
  );
  map.fitBounds(bounds, { padding: 72, maxZoom: 14, duration: 350 });
}

function setActiveRouteButton(routeId) {
  routeButtons.forEach((button) => {
    button.classList.toggle('is-active', button.dataset.route === routeId);
  });
}

function renderRouteOverlay(routeId) {
  selectedRouteId = routeId;
  const source = map.getSource('selected-route');
  const data = routeFeatureCollection(routeId);
  if (source) source.setData(data);
  setActiveRouteButton(routeId);
  fitRoute(routeId);
  statusEl.textContent = `Loaded ${routeMeta[routeId]?.label || 'route'} over self-hosted PMTiles.`;
}

async function loadRouteOverlays() {
  const response = await fetch('/assets/route-geometry.json', { cache: 'no-store' });
  routeGeometry = await response.json();
  map.addSource('selected-route', {
    type: 'geojson',
    data: routeFeatureCollection(selectedRouteId),
  });
  map.addLayer({
    id: 'selected-route-casing',
    type: 'line',
    source: 'selected-route',
    paint: {
      'line-color': '#ffffff',
      'line-opacity': 0.94,
      'line-width': ['interpolate', ['linear'], ['zoom'], 11, 7, 14, 14],
    },
  });
  map.addLayer({
    id: 'selected-route-line',
    type: 'line',
    source: 'selected-route',
    paint: {
      'line-color': ['match', ['get', 'segment'], 'bus', routeColours.bus, 'tube', routeColours.tube, 'boat', routeColours.boat, routeColours.walk],
      'line-opacity': 1,
      'line-width': ['interpolate', ['linear'], ['zoom'], 11, 4, 14, 9],
    },
  });
  renderRouteOverlay(selectedRouteId);
}

routeButtons.forEach((button) => {
  button.addEventListener('click', () => {
    renderRouteOverlay(button.dataset.route);
  });
});
