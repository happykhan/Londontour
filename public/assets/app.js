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

const fallbackLayerCatalog = [
  {
    id: 'landmarks',
    label: 'Essential landmarks',
    defaultVisible: true,
    minZoom: 13,
    markerLabel: 'L',
    routeRadiusMeters: 700,
    points: [
      { id: 'st-pauls', name: 'St Paul’s Cathedral', lat: 51.5138, lng: -0.0984, detail: 'Cathedral landmark on the City section.' },
      { id: 'tower-bridge', name: 'Tower Bridge', lat: 51.5055, lng: -0.0754, detail: 'Classic riverside photo stop.' },
      { id: 'tower-of-london', name: 'Tower of London', lat: 51.5081, lng: -0.0761, detail: 'Historic fortress by the Thames.' },
    ],
  },
  {
    id: 'museums',
    label: 'Museums',
    defaultVisible: false,
    minZoom: 13,
    markerLabel: 'M',
    routeRadiusMeters: 650,
    points: [
      { id: 'national-gallery', name: 'The National Gallery', lat: 51.5089, lng: -0.1283, detail: 'Gallery from OpenStreetMap.', url: 'https://www.nationalgallery.org.uk/' },
      { id: 'tate-modern', name: 'Tate Modern', lat: 51.5076, lng: -0.0994, detail: 'Museum from OpenStreetMap.', url: 'https://www.tate.org.uk/visit/tate-modern' },
    ],
  },
  {
    id: 'monuments',
    label: 'Statues and monuments',
    defaultVisible: false,
    minZoom: 13,
    markerLabel: 'Mon',
    routeRadiusMeters: 550,
    points: [
      { id: 'monument', name: 'The Monument', lat: 51.5101, lng: -0.0864, detail: 'Great Fire memorial near the City stretch.' },
      { id: 'nelsons-column', name: "Nelson's Column", lat: 51.5077, lng: -0.1279, detail: 'Monument on Trafalgar Square.' },
    ],
  },
  {
    id: 'plaques',
    label: 'Plaques',
    defaultVisible: false,
    minZoom: 14,
    markerLabel: 'Plq',
    routeRadiusMeters: 350,
    points: [
      { id: 'fallback-plaque', name: 'Historic plaque', lat: 51.5118, lng: -0.123, detail: 'Plaque from OpenStreetMap.' },
    ],
  },
  {
    id: 'pubs',
    label: 'Pubs',
    defaultVisible: false,
    minZoom: 13,
    markerLabel: 'P',
    routeRadiusMeters: 500,
    points: [
      { id: 'dickens-inn', name: 'The Dickens Inn', lat: 51.5068, lng: -0.0757, detail: 'Pub finish at St Katharine Docks.' },
      { id: 'southbank-centre', name: 'Southbank Centre', lat: 51.5077, lng: -0.1142, detail: 'Good indoor pause on the South Bank.' },
      { id: 'covent-garden', name: 'Covent Garden', lat: 51.5118, lng: -0.123, detail: 'Food, toilets, and market cover near the route.' },
    ],
  },
  {
    id: 'transport',
    label: 'Tube and river links',
    defaultVisible: false,
    minZoom: 12,
    markerLabel: 'Boat',
    routeRadiusMeters: 500,
    points: [
      { id: 'westminster-pier', name: 'Westminster Pier', lat: 51.5019, lng: -0.1234, detail: 'River pier near Parliament.', transportType: 'boat', markerLabel: 'Boat' },
      { id: 'tower-pier', name: 'Tower Millennium Pier', lat: 51.5075, lng: -0.0792, detail: 'River pier near the Tower.', transportType: 'boat', markerLabel: 'Boat' },
    ],
  },
  {
    id: 'bus-planning',
    label: 'Bus stops (route editor)',
    defaultVisible: false,
    editorOnly: true,
    minZoom: 15,
    markerLabel: 'Bus',
    routeRadiusMeters: 250,
    points: [
      { id: 'trafalgar-square-bus', name: 'Trafalgar Square', lat: 51.508, lng: -0.1281, detail: 'Bus stop near the route.', transportType: 'bus', markerLabel: 'Bus' },
    ],
  },
  {
    id: 'toilets',
    label: 'Public toilets',
    defaultVisible: false,
    minZoom: 13,
    markerLabel: 'WC',
    routeRadiusMeters: 400,
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
    routeRadiusMeters: 450,
    points: [
      { id: 'coop-strand', name: 'Co-op Strand', lat: 51.5111, lng: -0.1199, detail: 'Small supermarket hook for future grocery layers.' },
      { id: 'sainsburys-strand', name: 'Sainsbury’s Local Strand', lat: 51.5112, lng: -0.1221, detail: 'Central convenience grocery stop.' },
      { id: 'tesco-tower', name: 'Tesco Express Tower Hill', lat: 51.5107, lng: -0.0787, detail: 'Supermarket near the Tower finish.' },
    ],
  },
];

let layerCatalog = fallbackLayerCatalog;

const pickerEl = document.querySelector('#route-picker');
const titleEl = document.querySelector('#route-title');
const summaryEl = document.querySelector('#route-summary');
const metaEl = document.querySelector('#route-meta');
const directionsEl = document.querySelector('#directions');
const highlightsEl = document.querySelector('#route-highlights');
const statusEl = document.querySelector('#status');
const layerListEl = document.querySelector('#layer-list');
const layersAllButton = document.querySelector('#layers-all-button');
const layersNoneButton = document.querySelector('#layers-none-button');
const editorPanel = document.querySelector('#editor-panel');
const editorSummary = document.querySelector('#editor-summary');
const editorOutput = document.querySelector('#editor-output');
const editorUndoButton = document.querySelector('#editor-undo-button');
const editorClearButton = document.querySelector('#editor-clear-button');
const editorCopyButton = document.querySelector('#editor-copy-button');
const offlineDetailsEl = document.querySelector('#offline-details');
const locateButton = document.querySelector('#locate-button');
const offlineButton = document.querySelector('#offline-button');
const printButton = document.querySelector('#print-button');
const mapPrintButton = document.querySelector('#map-print-button');
const changeRouteButton = document.querySelector('#change-route-button');
const recenterButton = document.querySelector('#recenter-button');
const browsePickerButton = document.querySelector('#browse-picker-button');
const browseMapButton = document.querySelector('#browse-map-button');
const themeButton = document.querySelector('#theme-button');
const shareButton = document.querySelector('#share-button');

const initialSearchParams = new URLSearchParams(window.location.search);
const editorMode = initialSearchParams.get('editor') === '1';
const initialBrowseMode = editorMode || initialSearchParams.get('mode') === 'browse';
const initialRouteId = initialSearchParams.get('route');
const initialRoute = initialBrowseMode ? undefined : routes.find((route) => route.id === initialRouteId);
let selectedRoute = initialRoute || routes[0];
let browseMode = initialBrowseMode;
let map;
let routeLineLayers = [];
let routeMarkers = [];
let layerMarkers = [];
let tubeLineLayers = [];
let riverServiceLayers = [];
let tubeStationMarkers = [];
let tubeNetworkRenderer;
let editorDraftLayers = [];
let userMarker;
let userLocation;
let locationRequested = false;
let routeRenderToken = 0;
let selectedRouteBounds;
let routeGeometryPromise;
let tileManifestPromise;
let tubeNetworkPromise;
let tubeNetworkData = { lines: [], riverServices: [], stations: [] };
let selectedTubeStationId;
const londonBounds = [[51.28, -0.52], [51.70, 0.34]];
const majorTubeStationMinZoom = 12;
const tubeStationMinZoom = 13;
const majorTubeStationNames = new Set([
  'bank',
  'baker street',
  'bond street',
  'canary wharf',
  'charing cross',
  'ealing broadway',
  "earl's court",
  'elephant and castle',
  'euston',
  'farringdon',
  'finsbury park',
  'green park',
  'hammersmith',
  'holborn',
  "king's cross st. pancras",
  'liverpool street',
  'london bridge',
  'moorgate',
  'oxford circus',
  'paddington',
  'piccadilly circus',
  'stratford',
  'tottenham court road',
  'tower hill',
  'victoria',
  'waterloo',
  'west ham',
  'westminster',
]);
const assetVersion = '20260621-0858';
const cacheName = 'londontour-offline-v33';
const layerStateKey = 'londontour-layer-state-v2';
const editorLayerStateKey = 'londontour-editor-layer-state-v1';
const editorDraftStateKey = 'londontour-editor-draft-v1';
const themeStateKey = 'londontour-theme';
const offlineStateKey = 'londontour-offline-state-v1';

function assetUrl(path) {
  return `${path}?v=${assetVersion}`;
}

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

function visibleLayerCatalog() {
  return layerCatalog.filter((layer) => editorMode || !layer.editorOnly);
}

function publicLayerCatalog() {
  return layerCatalog.filter((layer) => !layer.editorOnly);
}

function loadActiveLayerIds() {
  try {
    const stored = JSON.parse(localStorage.getItem(editorMode ? editorLayerStateKey : layerStateKey) || '[]');
    const validIds = new Set(visibleLayerCatalog().map((layer) => layer.id));
    const selected = stored.filter((id) => validIds.has(id));
    if (selected.length) return new Set(selected);
  } catch (error) {
    // Use defaults when storage is unavailable.
  }

  if (editorMode) return new Set(visibleLayerCatalog().map((layer) => layer.id));
  return new Set(publicLayerCatalog().filter((layer) => layer.defaultVisible).map((layer) => layer.id));
}

let activeLayerIds = loadActiveLayerIds();
let editorDraft = loadEditorDraft();

function saveActiveLayerIds() {
  try {
    localStorage.setItem(editorMode ? editorLayerStateKey : layerStateKey, JSON.stringify([...activeLayerIds]));
  } catch (error) {
    // Layer state is still usable for the current session.
  }
}

function applyLayerSelection(ids, message = 'Map layers updated.') {
  activeLayerIds = new Set(ids);
  saveActiveLayerIds();
  renderLayerControls();
  renderLayerMarkers();
  void renderTubeNetwork().then(() => {
    if (browseMode) fitBrowseMap({ animate: false });
  });
  renderDetails();
  setStatus(message);
}

function loadEditorDraft() {
  try {
    const parsed = JSON.parse(localStorage.getItem(editorDraftStateKey) || '{}');
    return {
      path: Array.isArray(parsed.path)
        ? parsed.path
            .map((point) => ({ lat: Number(point.lat), lng: Number(point.lng) }))
            .filter((point) => Number.isFinite(point.lat) && Number.isFinite(point.lng))
        : [],
      mustShow: Array.isArray(parsed.mustShow) ? parsed.mustShow.map(String) : [],
      mustHide: Array.isArray(parsed.mustHide) ? parsed.mustHide.map(String) : [],
    };
  } catch (error) {
    return { path: [], mustShow: [], mustHide: [] };
  }
}

function saveEditorDraft() {
  try {
    localStorage.setItem(editorDraftStateKey, JSON.stringify(editorDraft));
  } catch (error) {
    // Editor export still works for the current page session.
  }
}

function findLayerPoint(pointId) {
  for (const layer of layerCatalog) {
    const point = layer.points.find((item) => item.id === pointId);
    if (point) return { ...point, layerId: layer.id, layerLabel: layer.label, layerMarkerLabel: layer.markerLabel };
  }
  return null;
}

function editorPointState(point) {
  if (!editorMode) return '';
  if (editorDraft.mustShow.includes(point.id)) return 'must-show';
  if (editorDraft.mustHide.includes(point.id)) return 'must-hide';
  return '';
}

function setEditorPointState(pointId, state) {
  editorDraft.mustShow = editorDraft.mustShow.filter((id) => id !== pointId);
  editorDraft.mustHide = editorDraft.mustHide.filter((id) => id !== pointId);
  if (state === 'must-show') editorDraft.mustShow.push(pointId);
  if (state === 'must-hide') editorDraft.mustHide.push(pointId);
  saveEditorDraft();
  renderEditorPanel();
  renderLayerMarkers();
}

function editorExport() {
  const pointForExport = (pointId) => {
    const point = findLayerPoint(pointId);
    return point
      ? {
          id: point.id,
          name: point.name,
          layerId: point.layerId,
          layerLabel: point.layerLabel,
          lat: point.lat,
          lng: point.lng,
        }
      : { id: pointId };
  };

  return {
    routeDraft: {
      path: editorDraft.path,
      mustShowPointIds: editorDraft.mustShow,
      mustHidePointIds: editorDraft.mustHide,
      mustShowPoints: editorDraft.mustShow.map(pointForExport),
      mustHidePoints: editorDraft.mustHide.map(pointForExport),
    },
  };
}

function renderEditorPanel() {
  if (!editorPanel) return;
  editorPanel.hidden = !editorMode;
  if (!editorMode) return;

  const pathCount = editorDraft.path.length;
  const mustShowCount = editorDraft.mustShow.length;
  const mustHideCount = editorDraft.mustHide.length;
  editorSummary.textContent = `${pathCount} path point${pathCount === 1 ? '' : 's'} · ${mustShowCount} must show · ${mustHideCount} must hide. Click the map to draw; use point popups to tag items.`;
  editorOutput.value = JSON.stringify(editorExport(), null, 2);
}

function clearEditorDraftLayers() {
  editorDraftLayers.forEach((layer) => layer.remove());
  editorDraftLayers = [];
}

function renderEditorDraftOverlays() {
  if (!map || !editorMode) return;
  clearEditorDraftLayers();
  if (!editorDraft.path.length) return;

  const latLngs = editorDraft.path.map((point) => [point.lat, point.lng]);
  if (latLngs.length > 1) {
    const line = L.polyline(latLngs, {
      color: '#111827',
      dashArray: '8 6',
      opacity: 0.82,
      weight: 4,
      lineCap: 'round',
      lineJoin: 'round',
    }).addTo(map);
    editorDraftLayers.push(line);
  }

  latLngs.forEach((latLng, index) => {
    const marker = L.circleMarker(latLng, {
      radius: 5,
      color: '#ffffff',
      fillColor: '#111827',
      fillOpacity: 1,
      weight: 2,
    }).bindPopup(`<strong>Draft path ${index + 1}</strong>`);
    marker.addTo(map);
    editorDraftLayers.push(marker);
  });
}

function handleEditorMapClick(event) {
  if (!editorMode) return;
  const target = event.originalEvent?.target;
  if (target?.closest?.('.leaflet-marker-icon, .leaflet-popup, .leaflet-control, .map-topbar, .map-actions')) return;
  editorDraft.path.push({
    lat: Number(event.latlng.lat.toFixed(6)),
    lng: Number(event.latlng.lng.toFixed(6)),
  });
  saveEditorDraft();
  renderEditorPanel();
  renderEditorDraftOverlays();
  setStatus('Editor path point added.');
}

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function safeExternalUrl(value = '') {
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:' ? url.href : '';
  } catch (error) {
    return '';
  }
}

function popupTitle(point) {
  const name = escapeHtml(point.name);
  const url = safeExternalUrl(point.url);
  if (!url) return `<strong>${name}</strong>`;
  return `<strong><a href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">${name}</a></strong>`;
}

function editorPopupControls(point) {
  if (!editorMode) return '';
  const state = editorPointState(point);
  return `
    <div class="editor-popup-actions" data-point-id="${escapeHtml(point.id)}">
      <button type="button" data-editor-action="must-show" ${state === 'must-show' ? 'aria-pressed="true"' : ''}>Must show</button>
      <button type="button" data-editor-action="must-hide" ${state === 'must-hide' ? 'aria-pressed="true"' : ''}>Must hide</button>
      <button type="button" data-editor-action="clear">Clear</button>
    </div>
  `;
}

function normaliseLayerCatalog(data) {
  const layers = Array.isArray(data?.layers) ? data.layers : data;
  if (!Array.isArray(layers) || !layers.length) return null;

  const normalised = layers
    .map((layer) => {
      const points = Array.isArray(layer.points)
        ? layer.points
            .map((point) => ({
              id: String(point.id || `${layer.id}-${point.name || 'point'}`),
              name: String(point.name || 'Unnamed point'),
              lat: Number(point.lat),
              lng: Number(point.lng),
              detail: String(point.detail || 'OpenStreetMap point.'),
              source: point.source ? String(point.source) : undefined,
              markerLabel: point.markerLabel ? String(point.markerLabel).slice(0, 4) : undefined,
              transportType: point.transportType ? String(point.transportType) : undefined,
              url: point.url ? String(point.url) : undefined,
              routes: Array.isArray(point.routes) ? point.routes.map(String) : undefined,
            }))
            .filter((point) => Number.isFinite(point.lat) && Number.isFinite(point.lng))
        : [];

      return {
        id: String(layer.id || ''),
        label: String(layer.label || layer.id || 'Layer'),
        defaultVisible: Boolean(layer.defaultVisible),
        editorOnly: Boolean(layer.editorOnly),
        minZoom: Number(layer.minZoom || 13),
        markerLabel: String(layer.markerLabel || '').slice(0, 3) || '•',
        routeRadiusMeters: Number(layer.routeRadiusMeters || layer.routeRadius * 100000 || 500),
        points,
      };
    })
    .filter((layer) => layer.id && layer.points.length);

  return normalised.length ? normalised : null;
}

async function loadLayerCatalog() {
  try {
    const response = await fetch(assetUrl('/assets/layers.json'), { cache: 'no-store' });
    if (!response.ok) throw new Error(`Layer catalog failed: ${response.status}`);

    const catalog = normaliseLayerCatalog(await response.json());
    if (!catalog) throw new Error('Layer catalog is empty or invalid');

    layerCatalog = catalog;
    const validIds = new Set(visibleLayerCatalog().map((layer) => layer.id));
    activeLayerIds = new Set([...activeLayerIds].filter((id) => validIds.has(id)));
    if (!activeLayerIds.size) {
      activeLayerIds = editorMode
        ? new Set(visibleLayerCatalog().map((layer) => layer.id))
        : new Set(publicLayerCatalog().filter((layer) => layer.defaultVisible).map((layer) => layer.id));
    }

    renderLayerControls();
    renderDetails();
    renderLayerMarkers();
    void renderTubeNetwork();
    if (browseMode) fitBrowseMap({ animate: false });
    await renderOfflineDetails();
  } catch (error) {
    // Keep the bundled fallback layer catalog if the generated dataset cannot load.
  }
}

function toLocalMeters(coordinate, originLat) {
  const latMeters = 110540;
  const lngMeters = 111320 * Math.cos((originLat * Math.PI) / 180);
  return {
    x: coordinate.lng * lngMeters,
    y: coordinate.lat * latMeters,
  };
}

function pointToSegmentDistanceMeters(point, start, end) {
  const originLat = (point.lat + start.lat + end.lat) / 3;
  const p = toLocalMeters(point, originLat);
  const a = toLocalMeters(start, originLat);
  const b = toLocalMeters(end, originLat);
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const lengthSquared = dx * dx + dy * dy;

  if (!lengthSquared) {
    return Math.hypot(p.x - a.x, p.y - a.y);
  }

  const t = Math.max(0, Math.min(1, ((p.x - a.x) * dx + (p.y - a.y) * dy) / lengthSquared));
  const closest = {
    x: a.x + t * dx,
    y: a.y + t * dy,
  };

  return Math.hypot(p.x - closest.x, p.y - closest.y);
}

function routeDistanceMeters(point, route) {
  if (route.stops.length < 2) return Infinity;

  const segmentDistances = route.stops.slice(1).map((stop, index) => {
    return pointToSegmentDistanceMeters(point, route.stops[index], stop);
  });

  return Math.min(...segmentDistances);
}

function pointMatchesRoute(point, layer, route) {
  if (route?.mustHidePointIds?.includes(point.id)) return false;
  if (route?.mustShowPointIds?.includes(point.id)) return true;
  if (point.routes) return point.routes.includes(route.id);
  return routeDistanceMeters(point, route) <= (layer.routeRadiusMeters || 500);
}

function routeMustShowPoint(point, route = selectedRoute) {
  return Boolean(route?.mustShowPointIds?.includes(point.id));
}

function routeMustHidePoint(point, route = selectedRoute) {
  return Boolean(route?.mustHidePointIds?.includes(point.id));
}

function activeLayerPoints(route = browseMode ? null : selectedRoute, includeZoomRules = !browseMode) {
  const zoom = map?.getZoom?.() || route?.zoom || 13;
  return visibleLayerCatalog().flatMap((layer) => {
    const layerActive = activeLayerIds.has(layer.id);
    const forcedPointIds = new Set(route?.mustShowPointIds || []);
    if (!layerActive && !forcedPointIds.size) return [];
    return layer.points
      .filter((point) => {
        const forced = forcedPointIds.has(point.id);
        if (!layerActive && !forced) return false;
        if (includeZoomRules && zoom < layer.minZoom && !forced) return false;
        return !route || pointMatchesRoute(point, layer, route);
      })
      .map((point) => ({ ...point, layerId: layer.id, layerLabel: layer.label, layerMarkerLabel: layer.markerLabel }));
  });
}

function renderLayerControls() {
  if (!layerListEl) return;

  layerListEl.innerHTML = visibleLayerCatalog()
    .map((layer) => {
      const count = layer.points.length;
      const layerId = escapeHtml(layer.id);
      const label = escapeHtml(layer.label);
      return `
        <label class="layer-toggle">
          <input type="checkbox" value="${layerId}" ${activeLayerIds.has(layer.id) ? 'checked' : ''} />
          <span>
            <strong>${label}</strong>
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
  if (selections.route) parts.push(browseMode ? 'browse map' : selectedRoute.name);
  if (selections.layers) parts.push(`${activeLayerPoints(browseMode ? null : selectedRoute, false).length} selected layer items`);
  if (selections.tiles) {
    const tileManifest = await loadTileManifest();
    parts.push(`${tileManifest.length} local tiles`);
  }

  const state = getOfflineState();
  const selectedLayers = [...activeLayerIds].sort().join(',');
  const isStale =
    state &&
    (state.cacheName !== cacheName ||
      state.routeId !== (browseMode ? 'browse' : selectedRoute.id) ||
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
        <button class="route-card ${!browseMode && route.id === selectedRoute.id ? 'is-active' : ''}" type="button" data-route="${route.id}">
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
                <strong>${escapeHtml(poi.name)}</strong>
                <span>${escapeHtml(poi.layerLabel)}: ${escapeHtml(poi.detail)}</span>
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

function buildBrowseBounds() {
  const bounds = L.latLngBounds([]);
  routes.forEach((route) => {
    route.stops.forEach((stop) => bounds.extend([stop.lat, stop.lng]));
  });
  visibleLayerCatalog().forEach((layer) => {
    layer.points.forEach((point) => bounds.extend([point.lat, point.lng]));
  });
  if (activeLayerIds.has('transport')) {
    tubeNetworkData.stations.forEach((station) => bounds.extend([station.lat, station.lng]));
  }
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

function fitBrowseMap(options = {}) {
  if (!map) return;
  const bounds = buildBrowseBounds();
  if (!bounds.isValid()) return;

  map.invalidateSize();
  map.fitBounds(bounds, {
    paddingTopLeft: [36, 92],
    paddingBottomRight: [36, 128],
    maxZoom: 14,
    animate: options.animate ?? true,
  });
}

function clearRouteOverlays() {
  routeRenderToken += 1;
  routeLineLayers.forEach((layer) => {
    layer.remove();
  });
  routeMarkers.forEach((marker) => {
    marker.remove();
  });
  routeLineLayers = [];
  routeMarkers = [];
  selectedRouteBounds = undefined;
}

function loadRouteGeometry() {
  if (!routeGeometryPromise) {
    routeGeometryPromise = fetch(assetUrl('/assets/route-geometry.json'))
      .then((response) => response.json())
      .catch(() => ({}));
  }

  return routeGeometryPromise;
}

function loadTileManifest() {
  if (!tileManifestPromise) {
    tileManifestPromise = fetch(assetUrl('/assets/tiles-manifest.json'))
      .then((response) => response.json())
      .catch(() => []);
  }

  return tileManifestPromise;
}

function loadTubeNetwork() {
  if (!tubeNetworkPromise) {
    tubeNetworkPromise = fetch(assetUrl('/assets/tube-network.json'))
      .then((response) => response.json())
      .then((data) => {
        tubeNetworkData = {
          lines: Array.isArray(data?.lines) ? data.lines : [],
          riverServices: Array.isArray(data?.riverServices) ? data.riverServices : [],
          stations: Array.isArray(data?.stations) ? data.stations : [],
        };
        return tubeNetworkData;
      })
      .catch(() => {
        tubeNetworkData = { lines: [], riverServices: [], stations: [] };
        return tubeNetworkData;
      });
  }

  return tubeNetworkPromise;
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
  map.createPane('basemapLabels');
  map.getPane('basemapLabels').style.zIndex = 430;
  map.getPane('basemapLabels').style.pointerEvents = 'none';
  map.createPane('tubeNetwork');
  map.getPane('tubeNetwork').style.zIndex = 390;
  tubeNetworkRenderer = L.svg({ pane: 'tubeNetwork' });

  const offlineTileLayer = L.tileLayer('/tiles/{z}/{x}/{y}.png', {
    minZoom: 11,
    maxZoom: 18,
    maxNativeZoom: 15,
    bounds: londonBounds,
    tileSize: 256,
    attribution: 'Offline London tile pack',
  });

  const onlineBaseLayer = L.tileLayer(
    'https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png',
    {
      subdomains: 'abcd',
      maxZoom: 18,
      tileSize: 256,
      attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
    }
  );
  const onlineLabelLayer = L.tileLayer(
    'https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png',
    {
      subdomains: 'abcd',
      maxZoom: 18,
      pane: 'basemapLabels',
      tileSize: 256,
    }
  );
  const onlineTileLayer = L.layerGroup([onlineBaseLayer, onlineLabelLayer]);

  const useOfflineTiles = () => {
    if (map.hasLayer(offlineTileLayer)) return;
    if (map.hasLayer(onlineTileLayer)) onlineTileLayer.remove();
    offlineTileLayer.addTo(map);
    setStatus('Using the offline fallback map tiles. Some basemap detail is reduced.');
  };

  onlineBaseLayer.once('tileerror', useOfflineTiles);
  onlineLabelLayer.once('tileerror', useOfflineTiles);
  if (navigator.onLine === false) {
    useOfflineTiles();
  } else {
    onlineTileLayer.addTo(map);
  }

  L.control.zoom({ position: 'bottomright' }).addTo(map);
  map.setView(selectedRoute.center, selectedRoute.zoom);
  map.on('zoomend', () => {
    if (!browseMode) renderRouteMarkers();
    renderLayerMarkers();
    void renderTubeNetwork();
    renderDetails();
  });
  if (editorMode) {
    map.on('click', handleEditorMapClick);
  }
  map.whenReady(() => {
    if (browseMode) {
      renderBrowseMap({ animate: false });
    } else {
      renderRouteOnMap();
    }
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

function routeStrokeStyle(segment) {
  const isCompact = window.matchMedia('(max-width: 900px)').matches;
  return {
    casingOpacity: isCompact ? 0.74 : 0.88,
    casingWeight: isCompact ? 8 : 12,
    lineOpacity: isCompact ? 0.92 : 0.98,
    lineWeight: segment === 'tube' ? (isCompact ? 6 : 8) : (isCompact ? 5 : 7),
  };
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

    if (selections.layers) {
      await cacheRequest(cache, '/assets/layers.json');
      await cacheRequest(cache, '/assets/tube-network.json');
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
      routeId: browseMode ? 'browse' : selectedRoute.id,
      layerIds: [...activeLayerIds].sort().join(','),
      includesRoute: selections.route,
      includesTiles: selections.tiles,
      includesLayers: selections.layers,
      cachedTiles,
      tileTotal,
      savedAt: new Date().toISOString(),
    });

    const tileSummary = selections.tiles ? ` Cached ${cachedTiles}/${tileTotal} local tiles.` : '';
    setStatus(`Offline pack ready for ${browseMode ? 'browse mode' : selectedRoute.name}.${tileSummary}`);
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
    const layerId = escapeHtml(point.layerId);
    const markerLabel = escapeHtml(point.markerLabel || point.layerMarkerLabel);
    const layerLabel = escapeHtml(point.layerLabel);
    const detail = escapeHtml(point.detail);
    const transportTypeClass = point.transportType ? ` layer-marker-transport-${escapeHtml(point.transportType)}` : '';
    const editorStateClass = editorPointState(point) ? ` is-editor-${editorPointState(point)}` : '';
    const routeStateClass = !browseMode && routeMustShowPoint(point) ? ' is-route-required' : routeMustHidePoint(point) ? ' is-route-hidden' : '';
    const marker = L.marker([point.lat, point.lng], {
      icon: L.divIcon({
        className: '',
        html: `<div class="layer-marker layer-marker-${layerId}${transportTypeClass}${editorStateClass}${routeStateClass}"><span>${markerLabel}</span></div>`,
        iconSize: [30, 30],
        iconAnchor: [15, 15],
      }),
    }).bindPopup(`${popupTitle(point)}<br>${layerLabel}<br>${detail}${editorPopupControls(point)}`);
    marker.addTo(map);
    layerMarkers.push(marker);
  });
  renderEditorDraftOverlays();
}

function normaliseTubeStationName(name) {
  return String(name || '')
    .toLowerCase()
    .replace(/\([^)]*\)/g, '')
    .replace(/-underground/g, '')
    .replace(/&/g, 'and')
    .replace(/\s+/g, ' ')
    .trim();
}

function tubeStationFacilityNumber(station, label) {
  const facility = station.facilities?.find((item) => item.toLowerCase().startsWith(`${label.toLowerCase()}:`));
  const match = facility?.match(/:\s*(\d+)/);
  return match ? Number(match[1]) : 0;
}

function isMajorTubeStation(station) {
  if ((station.lines?.length || 0) >= 4) return true;
  if (majorTubeStationNames.has(normaliseTubeStationName(station.name))) return true;
  return tubeStationFacilityNumber(station, 'Gates') >= 20 || tubeStationFacilityNumber(station, 'Ticket Halls') >= 3;
}

async function renderTubeNetwork() {
  if (!map) return;

  tubeLineLayers.forEach((layer) => layer.remove());
  riverServiceLayers.forEach((layer) => layer.remove());
  tubeStationMarkers.forEach((marker) => marker.remove());
  tubeLineLayers = [];
  riverServiceLayers = [];
  tubeStationMarkers = [];

  if (!activeLayerIds.has('transport')) {
    selectedTubeStationId = undefined;
    return;
  }

  const tubeNetwork = await loadTubeNetwork();
  const selectedStation = tubeNetwork.stations.find((station) => station.id === selectedTubeStationId);
  const selectedLineIds = new Set(selectedStation?.lines || []);

  tubeNetwork.lines.forEach((line) => {
    const isSelected = selectedLineIds.size && selectedLineIds.has(line.id);
    const isDimmed = selectedLineIds.size && !selectedLineIds.has(line.id);
    const style = {
      color: line.color || '#1d4ed8',
      opacity: isDimmed ? 0.18 : isSelected ? 0.95 : 0.68,
      pane: 'tubeNetwork',
      renderer: tubeNetworkRenderer,
      weight: isSelected ? 6 : 3,
      lineCap: 'round',
      lineJoin: 'round',
    };
    const segments = line.segments.filter((segment) => Array.isArray(segment) && segment.length >= 2);
    if (!segments.length) return;

    const polyline = L.polyline(segments, style).bindPopup(`${escapeHtml(line.label)} line`);
    polyline.addTo(map);
    tubeLineLayers.push(polyline);
  });

  tubeNetwork.riverServices.forEach((service) => {
    const segments = service.segments.filter((segment) => Array.isArray(segment) && segment.length >= 2);
    if (!segments.length) return;

    const polyline = L.polyline(segments, {
      color: service.color || '#0077b6',
      opacity: selectedLineIds.size ? 0.28 : 0.62,
      pane: 'tubeNetwork',
      renderer: tubeNetworkRenderer,
      weight: 3,
      dashArray: '8 8',
      lineCap: 'round',
      lineJoin: 'round',
    }).bindPopup(`${escapeHtml(service.label)} river service`);
    polyline.addTo(map);
    riverServiceLayers.push(polyline);
  });

  const currentZoom = map.getZoom();
  const showMajorStations = currentZoom >= majorTubeStationMinZoom;
  const showAllStations = currentZoom >= tubeStationMinZoom;
  if (!showAllStations && !showMajorStations && !selectedTubeStationId) return;

  tubeNetwork.stations.forEach((station) => {
    const isSelectedStation = station.id === selectedTubeStationId;
    const isMajorStation = isMajorTubeStation(station);
    if (!showAllStations) {
      if (showMajorStations) {
        if (!isMajorStation && !isSelectedStation) return;
      } else if (!isSelectedStation) {
        return;
      }
    }

    const stationLines = station.lines
      .map((lineId) => tubeNetwork.lines.find((line) => line.id === lineId)?.label)
      .filter(Boolean);
    const stationInfo = [
      isMajorStation ? 'Major interchange' : null,
      station.zone ? `Zone ${escapeHtml(station.zone)}` : null,
      station.facilities?.length ? escapeHtml(station.facilities.slice(0, 4).join(' · ')) : null,
      escapeHtml(station.source || 'TfL station data'),
    ].filter(Boolean);
    const marker = L.marker([station.lat, station.lng], {
      icon: L.divIcon({
        className: '',
        html: `<div class="tube-station-marker ${isMajorStation ? 'is-major' : ''} ${isSelectedStation ? 'is-selected' : ''}"><span></span></div>`,
        iconSize: isMajorStation ? [22, 22] : [18, 18],
        iconAnchor: isMajorStation ? [11, 11] : [9, 9],
      }),
    }).bindPopup(`<strong>${escapeHtml(station.name)}</strong><br>${escapeHtml(stationLines.join(' · '))}<br>${stationInfo.join('<br>')}`);

    marker.on('click', () => {
      selectedTubeStationId = station.id;
      void renderTubeNetwork();
      setStatus(`${station.name}: showing ${stationLines.join(', ')} tube lines.`);
    });

    marker.addTo(map);
    tubeStationMarkers.push(marker);
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
    }).bindPopup(`<strong>${index + 1}. ${escapeHtml(stop.name)}</strong><br>${escapeHtml(stop.detail)}`);
    marker.addTo(map);
    routeMarkers.push(marker);
  });
}

async function renderRouteOnMap() {
  if (browseMode) {
    renderBrowseMap({ animate: false });
    return;
  }

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
    const strokeStyle = routeStrokeStyle(segment.segment);
    const casing = L.polyline(latLngs, {
      color: '#ffffff',
      opacity: strokeStyle.casingOpacity,
      weight: strokeStyle.casingWeight,
      lineCap: 'round',
      lineJoin: 'round',
    });
    const line = L.polyline(latLngs, {
      color: segmentStylesFor(segment.segment),
      opacity: strokeStyle.lineOpacity,
      weight: strokeStyle.lineWeight,
      lineCap: 'round',
      lineJoin: 'round',
    });

    casing.addTo(map);
    line.addTo(map);
    routeLineLayers.push(casing, line);
  });

  renderRouteMarkers();
  renderLayerMarkers();
  void renderTubeNetwork();

  if (routeHasPoints) {
    selectedRouteBounds = routeBounds;
    fitSelectedRouteBounds({ animate: false });
  }

  if (userLocation) {
    addOrUpdateUserMarker();
  }

  if (document.body.classList.contains('route-view')) {
    setStatus(`Viewing ${selectedRoute.name}. Tap markers for more info, or use my location. Available offline after the first visit.`);
  } else {
    setStatus('Pick a route, then the map opens with pins, pan and zoom controls, and directions.');
  }
}

function recenterRoute() {
  if (!map) return;
  if (browseMode) {
    fitBrowseMap({ animate: true });
    setStatus('Recentered to show the full browse map.');
  } else {
    fitSelectedRouteBounds({ animate: true });
    setStatus(`Recentered to show all of ${selectedRoute.name}.`);
  }
}

function renderBrowseMap(options = {}) {
  if (!map) return;
  clearRouteOverlays();
  renderLayerMarkers();
  void renderTubeNetwork();
  if (userLocation) {
    addOrUpdateUserMarker();
  }
  fitBrowseMap({ animate: options.animate ?? false });
  renderEditorPanel();
  setStatus(editorMode ? 'Editor mode: click the map to draw a draft route, or tag layer points from popups.' : 'Browse mode: no route selected. Pan, zoom, or turn map layers on and off.');
}

function setBrowseLayersOpen(open) {
  const isOpen = Boolean(open);
  document.body.classList.toggle('browse-layers-open', browseMode && isOpen);
  browseMapButton.textContent = browseMode ? (isOpen ? 'Close' : 'Layers') : 'Browse';
  browseMapButton.setAttribute('aria-expanded', browseMode && isOpen ? 'true' : 'false');

  if (!map) return;
  window.setTimeout(() => {
    map.invalidateSize();
    if (browseMode) fitBrowseMap({ animate: false });
  }, 0);
}

function toggleBrowseLayers() {
  if (!browseMode) {
    enterBrowseMode({ openLayers: true });
    return;
  }

  setBrowseLayersOpen(!document.body.classList.contains('browse-layers-open'));
}

function enterBrowseMode(options = {}) {
  browseMode = true;
  document.body.classList.add('route-view', 'browse-view');
  setBrowseLayersOpen(options.openLayers ?? false);
  const url = new URL(window.location.href);
  url.searchParams.delete('route');
  url.searchParams.set('mode', 'browse');
  if (editorMode) url.searchParams.set('editor', '1');
  if (options.updateUrl !== false) {
    window.history.replaceState({}, '', url);
  }
  renderPicker();
  renderDetails();
  buildMap();
  window.setTimeout(() => {
    map.invalidateSize();
    renderBrowseMap({ animate: options.animate ?? true });
  }, 0);
}

function selectRoute(route) {
  browseMode = false;
  selectedRoute = route;
  selectedRouteBounds = undefined;
  document.body.classList.add('route-view');
  document.body.classList.remove('browse-view', 'browse-layers-open');
  setBrowseLayersOpen(false);
  const url = new URL(window.location.href);
  url.searchParams.set('route', route.id);
  url.searchParams.delete('mode');
  if (!editorMode) url.searchParams.delete('editor');
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
  if (browseMode) {
    url.searchParams.delete('route');
    url.searchParams.set('mode', 'browse');
  } else {
    url.searchParams.set('route', selectedRoute.id);
    url.searchParams.delete('mode');
  }
  window.history.replaceState({}, '', url);
  const shareData = {
    title: browseMode ? 'Londontour: browse map' : `Londontour: ${selectedRoute.name}`,
    text: browseMode ? 'Browse the London tour map without a selected route.' : selectedRoute.summary,
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
  browseMode = false;
  clearRouteOverlays();
  document.body.classList.remove('route-view', 'browse-view', 'browse-layers-open');
  setBrowseLayersOpen(false);
  const url = new URL(window.location.href);
  url.searchParams.delete('mode');
  url.searchParams.delete('route');
  if (!editorMode) url.searchParams.delete('editor');
  window.history.replaceState({}, '', url);
  renderPicker();
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
browsePickerButton.addEventListener('click', () => enterBrowseMode());
browseMapButton.addEventListener('click', toggleBrowseLayers);
themeButton.addEventListener('click', toggleTheme);
shareButton.addEventListener('click', shareRoute);
editorUndoButton.addEventListener('click', () => {
  if (!editorMode) return;
  editorDraft.path.pop();
  saveEditorDraft();
  renderEditorPanel();
  renderEditorDraftOverlays();
  setStatus('Last editor path point removed.');
});
editorClearButton.addEventListener('click', () => {
  if (!editorMode) return;
  editorDraft = { path: [], mustShow: [], mustHide: [] };
  saveEditorDraft();
  renderEditorPanel();
  renderLayerMarkers();
  renderEditorDraftOverlays();
  setStatus('Editor draft cleared.');
});
editorCopyButton.addEventListener('click', async () => {
  if (!editorMode) return;
  renderEditorPanel();
  try {
    await navigator.clipboard.writeText(editorOutput.value);
    setStatus('Route draft JSON copied.');
  } catch (error) {
    editorOutput.select();
    setStatus('Route draft JSON is selected.');
  }
});

document.addEventListener('click', (event) => {
  const button = event.target.closest('button[data-editor-action]');
  if (!button || !editorMode) return;
  const pointId = button.closest('.editor-popup-actions')?.dataset.pointId;
  if (!pointId) return;
  const action = button.dataset.editorAction;
  setEditorPointState(pointId, action === 'must-show' || action === 'must-hide' ? action : '');
  setStatus(action === 'must-show' ? 'Point marked as must show.' : action === 'must-hide' ? 'Point marked as must hide.' : 'Point editor tag cleared.');
});

layerListEl.addEventListener('change', (event) => {
  const target = event.target.closest('input[type="checkbox"]');
  if (!target) return;
  if (target.checked) {
    activeLayerIds.add(target.value);
  } else {
    activeLayerIds.delete(target.value);
  }
  applyLayerSelection(activeLayerIds);
});

layersAllButton.addEventListener('click', () => {
  applyLayerSelection(visibleLayerCatalog().map((layer) => layer.id), 'All map layers are visible.');
});

layersNoneButton.addEventListener('click', () => {
  applyLayerSelection([], 'All map layers are hidden.');
});

document.querySelectorAll('.offline-options input').forEach((input) => {
  input.addEventListener('change', () => {
    void renderOfflineDetails();
  });
});

applyTheme(localStorage.getItem(themeStateKey) || 'light');
if (initialRoute) {
  document.body.classList.add('route-view');
}
if (browseMode) {
  document.body.classList.add('route-view', 'browse-view');
}
if (editorMode) {
  document.body.classList.add('editor-mode');
}
setBrowseLayersOpen(editorMode);
renderLayerControls();
renderPicker();
renderDetails();
renderEditorPanel();
buildMap();
void loadLayerCatalog();
void resetLegacyRuntime();
if (browseMode) {
  renderBrowseMap({ animate: false });
} else {
  void renderRouteOnMap();
  setStatus('Pick the route to open the map, then tap a marker or use my location. Available offline after the first visit.');
}
