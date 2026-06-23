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
    zoom: 13,
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
    minZoom: 11,
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
    minZoom: 12,
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
    minZoom: 14,
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
    id: 'markets',
    label: 'Markets',
    defaultVisible: false,
    minZoom: 12,
    markerLabel: 'Mk',
    routeRadiusMeters: 550,
    points: [
      { id: 'borough-market', name: 'Borough Market', lat: 51.5055, lng: -0.091, detail: 'Market · opening times change; check the linked site before travelling.', url: 'https://boroughmarket.org.uk/' },
      { id: 'camden-market', name: 'Camden Market', lat: 51.5413, lng: -0.1464, detail: 'Market · opening times change; check the linked site before travelling.', url: 'https://camdenmarket.com/' },
      { id: 'greenwich-market', name: 'Greenwich Market', lat: 51.4816, lng: -0.0097, detail: 'Market · opening times change; check the linked site before travelling.', url: 'https://www.greenwichmarket.london/' },
    ],
  },
  {
    id: 'transport',
    label: 'Tube and river links',
    defaultVisible: true,
    minZoom: 14,
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
    id: 'water',
    label: 'Water refill points',
    defaultVisible: false,
    minZoom: 14,
    markerLabel: 'H2O',
    routeRadiusMeters: 400,
    points: [
      { id: 'trafalgar-water', name: 'Trafalgar Square drinking water', lat: 51.5081, lng: -0.128, detail: 'Drinking water from OpenStreetMap.' },
      { id: 'southbank-water', name: 'South Bank drinking water', lat: 51.5068, lng: -0.1149, detail: 'Bottle refill point from OpenStreetMap.' },
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
const zoomIndicator = document.querySelector('#zoom-indicator');
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
const menuButton = document.querySelector('#menu-button');
const searchButton = document.querySelector('#search-button');
const searchPanel = document.querySelector('#search-panel');
const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('#search-input');
const searchResultsEl = document.querySelector('#search-results');
const searchCloseButton = document.querySelector('#search-close-button');
const radiusButton = document.querySelector('#radius-button');
const radiusPanel = document.querySelector('#radius-panel');
const radiusSummaryEl = document.querySelector('#radius-summary');
const radiusResultsEl = document.querySelector('#radius-results');
const radiusCloseButton = document.querySelector('#radius-close-button');
const radiusClearButton = document.querySelector('#radius-clear-button');
const changeRouteButton = document.querySelector('#change-route-button');
const recenterButton = document.querySelector('#recenter-button');
const browsePickerButton = document.querySelector('#browse-picker-button');
const browseMapButton = document.querySelector('#browse-map-button');
const themeButton = document.querySelector('#theme-button');
const shareButton = document.querySelector('#share-button');

const initialSearchParams = new URLSearchParams(window.location.search);
const editorMode = initialSearchParams.get('editor') === '1';
const initialRouteId = initialSearchParams.get('route');
const initialRoute = routes.find((route) => route.id === initialRouteId);
const initialBrowseMode = editorMode || initialSearchParams.get('mode') === 'browse' || !initialRoute;
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
let basemapRepairLabels = [];
let onlineBaseLayer;
let onlineLabelLayer;
let onlineTileLayer;
let offlineTileLayer;
let editorDraftLayers = [];
let userMarker;
let userLocation;
let locationRequested = false;
let routeRenderToken = 0;
let selectedRouteBounds;
let routeGeometryPromise;
let tileManifestPromise;
let basemapOfflineAssetsPromise;
let tubeNetworkPromise;
let tubeNetworkData = { lines: [], riverServices: [], stations: [] };
let selectedTubeStationId;
let selectedTubeLineId;
let tubeNetworkRenderToken = 0;
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
const assetVersion = '20260623-1142';
const cacheName = 'londontour-offline-v83';
const layerStateKey = 'londontour-layer-state-v3';
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
let searchResults = [];
let radiusState = {
  active: false,
  center: null,
  centerName: '',
  radiusMeters: 0,
  edge: null,
  dragging: false,
  results: [],
};
let radiusOverlayLayers = [];
let radiusResultMarkers = [];

function saveActiveLayerIds() {
  try {
    localStorage.setItem(editorMode ? editorLayerStateKey : layerStateKey, JSON.stringify([...activeLayerIds]));
  } catch (error) {
    // Layer state is still usable for the current session.
  }
}

function applyLayerSelection(ids, message = 'Map layers updated.') {
  activeLayerIds = new Set(ids);
  if (!activeLayerIds.has('transport')) {
    selectedTubeStationId = undefined;
  }
  saveActiveLayerIds();
  renderLayerControls();
  renderLayerMarkers();
  void renderTubeNetwork();
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
  if (!editorMode || radiusState.active) return;
  const target = event.originalEvent?.target;
  if (target?.closest?.('.leaflet-marker-icon, .leaflet-popup, .leaflet-control, .map-topbar')) return;
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

function pointSourceLabel(source = '') {
  const value = String(source || '').toLowerCase();
  if (value.includes('openstreetmap')) return 'OSM';
  if (value.includes('tfl')) return 'TfL';
  return '';
}

function cleanPointDetail(point) {
  return String(point.detail || '')
    .replace(/\s*(?:Attraction|Museum|Plaque|Drinking water|Bottle refill point|Point)?\s*from OpenStreetMap\.?\s*/gi, '')
    .replace(/\s*OpenStreetMap point\.?\s*/gi, '')
    .trim();
}

function layerIconText(layerId, point = {}) {
  if (point.transportType === 'boat') return 'Boat';
  if (point.transportType === 'bus') return 'Bus';
  const icons = {
    landmarks: 'L',
    museums: 'M',
    monuments: 'Mon',
    plaques: 'Plq',
    pubs: 'P',
    markets: 'Mk',
    transport: 'T',
    toilets: 'WC',
    water: 'H2O',
    supermarkets: 'S',
  };
  return icons[layerId] || String(point.markerLabel || point.layerMarkerLabel || '').slice(0, 4) || '•';
}

function sourceBadge(point) {
  const label = pointSourceLabel(point.source);
  if (!label) return '';
  return `<span class="poi-source-badge" title="${escapeHtml(point.source)}">${escapeHtml(label)}</span>`;
}

function popupShell(content, kind = 'generic') {
  return `<div class="map-popup-card map-popup-card-${escapeHtml(kind)}">${content}</div>`;
}

function poiPopupContent(point) {
  const layerId = point.layerId || '';
  const icon = layerIconText(layerId, point);
  const detail = cleanPointDetail(point);
  const detailHtml = detail ? `<p class="poi-popup-detail">${escapeHtml(detail)}</p>` : '';
  return popupShell(`
    <div class="poi-popup poi-popup-${escapeHtml(layerId)}">
      <div class="poi-popup-header">
        <span class="poi-popup-icon layer-marker-${escapeHtml(layerId)} ${point.transportType ? `layer-marker-transport-${escapeHtml(point.transportType)}` : ''}" aria-hidden="true">${escapeHtml(icon)}</span>
        <div class="poi-popup-copy">
          ${popupTitle(point)}
          <div class="poi-popup-meta">
            <span>${escapeHtml(point.layerLabel || point.layerMarkerLabel || 'Point of interest')}</span>
            ${sourceBadge(point)}
          </div>
        </div>
      </div>
      ${detailHtml}
      ${nearbyPopupButton(point.lat, point.lng, point.name)}
      ${editorPopupControls(point)}
    </div>
  `, layerId || 'generic');
}

function safeLineColour(colour) {
  return /^#[0-9a-f]{6}$/i.test(colour || '') ? colour : '#111827';
}

function displayTubeLineColour(line) {
  if (line?.id === 'northern' && document.body.dataset.theme === 'dark') return '#f8fafc';
  return safeLineColour(line?.color);
}

function tubeStationFacilityAvailable(station, label) {
  const entry = (station.facilities || []).find((item) => item.toLowerCase().startsWith(`${label.toLowerCase()}:`));
  if (!entry) return false;
  const value = entry.split(':').slice(1).join(':').trim().toLowerCase();
  if (!value || value === 'no' || value === 'none') return false;
  const numeric = Number(value);
  if (Number.isFinite(numeric)) return numeric > 0;
  return value === 'yes' || value === 'true' || value === 'available';
}

function tubeStationLineChips(station, tubeNetwork = tubeNetworkData) {
  const lines = (station.lines || [])
    .map((lineId) => tubeNetwork.lines.find((line) => line.id === lineId))
    .filter(Boolean);

  if (!lines.length) return '<span class="tube-popup-muted">Tube station</span>';

  return lines
    .map((line) => `<span class="tube-line-chip" style="--tube-line-colour: ${displayTubeLineColour(line)}">${escapeHtml(line.label)}</span>`)
    .join('');
}

function tubeFacilityChip(label, available) {
  const iconLabel = label === 'Toilets' ? 'WC' : 'Lift';
  const stateLabel = `${label} ${available ? 'available' : 'not available'}`;
  return `
    <span class="tube-facility-chip ${available ? 'is-available' : 'is-unavailable'}" aria-label="${escapeHtml(stateLabel)}" title="${escapeHtml(stateLabel)}">
      <span class="tube-facility-icon" aria-hidden="true">${escapeHtml(iconLabel)}</span>
    </span>
  `;
}

function tubeRailChip(station) {
  if (!station.hasNationalRail) return '';
  return `
    <span class="tube-rail-chip" aria-label="National Rail services" title="National Rail services">
      <span aria-hidden="true">NR</span>
    </span>
  `;
}

function tubeStationPopupContent(station, tubeNetwork = tubeNetworkData) {
  const zone = station.zone ? `<span class="tube-zone-badge">Zone ${escapeHtml(station.zone)}</span>` : '';
  const toilets = tubeStationFacilityAvailable(station, 'Toilets');
  const lifts = tubeStationFacilityAvailable(station, 'Lifts');

  return popupShell(`
    <div class="tube-popup">
      <div class="tube-popup-header">
        <strong>${escapeHtml(station.name)}</strong>
        <div class="tube-meta-row">
          ${zone}
          ${tubeFacilityChip('Toilets', toilets)}
          ${tubeFacilityChip('Lifts', lifts)}
          ${tubeRailChip(station)}
        </div>
      </div>
      <div class="tube-line-list">${tubeStationLineChips(station, tubeNetwork)}</div>
      ${nearbyPopupButton(station.lat, station.lng, station.name)}
    </div>
  `, 'tube');
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

function nearbyPopupButton(lat, lng, name) {
  return `
    <div class="nearby-popup-actions">
      <button class="secondary-button" type="button" data-nearby-center data-lat="${Number(lat)}" data-lng="${Number(lng)}" data-name="${escapeHtml(name)}">Nearby</button>
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
              priority: Number(point.priority || Number.MAX_SAFE_INTEGER),
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
        previewLimit: Number(layer.previewLimit || 0),
        fullZoom: Number(layer.fullZoom || 0),
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

function pointPriority(point) {
  return Number.isFinite(point.priority) ? point.priority : Number.MAX_SAFE_INTEGER;
}

function pointInViewport(point, padding = 0.15) {
  if (!map) return true;
  return map.getBounds().pad(padding).contains([point.lat, point.lng]);
}

function layerPreviewLimit(layer, zoom) {
  const total = layer.points.length;
  if (total <= 90) return Infinity;

  const previewLimit = layer.previewLimit || Math.min(80, Math.max(30, Math.ceil(total * 0.18)));
  const fullZoom = layer.fullZoom || layer.minZoom + 3;
  if (zoom >= fullZoom) return Infinity;

  const zoomSteps = Math.max(0, Math.floor(zoom - layer.minZoom));
  return Math.min(total, previewLimit * 2 ** zoomSteps);
}

function limitLayerPointsForBrowse(layer, points, zoom, forcedPointIds) {
  const viewportPoints = points.filter((point) => forcedPointIds.has(point.id) || pointInViewport(point));
  const limit = layerPreviewLimit(layer, zoom);
  if (!Number.isFinite(limit)) return viewportPoints;

  const forced = viewportPoints.filter((point) => forcedPointIds.has(point.id));
  const ordinary = viewportPoints
    .filter((point) => !forcedPointIds.has(point.id))
    .sort((a, b) => pointPriority(a) - pointPriority(b) || a.name.localeCompare(b.name))
    .slice(0, Math.max(0, limit - forced.length));

  return [...forced, ...ordinary].sort((a, b) => a.name.localeCompare(b.name));
}

function routeMustShowPoint(point, route = selectedRoute) {
  return Boolean(route?.mustShowPointIds?.includes(point.id));
}

function routeMustHidePoint(point, route = selectedRoute) {
  return Boolean(route?.mustHidePointIds?.includes(point.id));
}

function activeLayerPoints(route = browseMode ? null : selectedRoute, includeZoomRules = true) {
  const zoom = map?.getZoom?.() || route?.zoom || 13;
  const radiusFilterActive = radiusState.active && radiusState.center && radiusState.radiusMeters > 0;
  return visibleLayerCatalog().flatMap((layer) => {
    const layerActive = radiusFilterActive || activeLayerIds.has(layer.id);
    const forcedPointIds = new Set(route?.mustShowPointIds || []);
    if (!layerActive && !forcedPointIds.size) return [];
    const points = layer.points
      .filter((point) => {
        const forced = forcedPointIds.has(point.id);
        if (!layerActive && !forced) return false;
        if (!radiusFilterActive && includeZoomRules && zoom < layer.minZoom && !forced) return false;
        if (radiusFilterActive && map.distance(radiusState.center, [point.lat, point.lng]) > radiusState.radiusMeters) return false;
        return !route || pointMatchesRoute(point, layer, route);
      });
    const displayPoints = radiusFilterActive
      ? points
      : includeZoomRules && !route ? limitLayerPointsForBrowse(layer, points, zoom, forcedPointIds) : points;
    return displayPoints
      .map((point) => ({ ...point, layerId: layer.id, layerLabel: layer.label, layerMarkerLabel: layer.markerLabel }));
  });
}

function normaliseSearchText(value = '') {
  return String(value)
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function searchableLayerCatalog() {
  return editorMode ? visibleLayerCatalog() : publicLayerCatalog();
}

function buildSearchableItems() {
  const routeItems = routes.flatMap((route) =>
    route.stops.map((stop, index) => ({
      id: `route-${route.id}-${index}`,
      type: 'Route stop',
      label: route.name,
      name: stop.name,
      detail: stop.detail,
      lat: stop.lat,
      lng: stop.lng,
      routeId: route.id,
      routeStopIndex: index,
      priority: index,
    }))
  );

  const layerItems = searchableLayerCatalog().flatMap((layer) =>
    layer.points.map((point) => ({
      ...point,
      id: `layer-${layer.id}-${point.id}`,
      sourcePointId: point.id,
      type: layer.label,
      label: point.transportType === 'boat' ? 'River pier' : layer.label,
      detail: point.detail,
      layerId: layer.id,
      layerLabel: layer.label,
      priority: pointPriority(point),
      point,
    }))
  );

  const tubeItems = tubeNetworkData.stations.map((station) => {
    const lines = station.lines
      .map((lineId) => tubeNetworkData.lines.find((line) => line.id === lineId)?.label)
      .filter(Boolean);
    return {
      id: `tube-${station.id}`,
      type: 'Tube station',
      label: lines.length ? lines.join(' · ') : 'Tube station',
      name: station.name,
      detail: [station.zone ? `Zone ${station.zone}` : null, station.source || 'TfL station data'].filter(Boolean).join(' · '),
      lat: station.lat,
      lng: station.lng,
      stationId: station.id,
      stationLines: lines,
      priority: isMajorTubeStation(station) ? 0 : 30,
    };
  });

  return [...routeItems, ...layerItems, ...tubeItems].map((item) => ({
    ...item,
    searchText: normaliseSearchText(`${item.name} ${item.label} ${item.type} ${item.detail || ''}`),
  }));
}

function scoreSearchItem(item, terms, query) {
  const name = normaliseSearchText(item.name);
  let score = item.priority || 0;
  if (name === query) score -= 100;
  if (name.startsWith(query)) score -= 60;
  if (name.includes(query)) score -= 35;
  if (item.searchText.includes(query)) score -= 18;
  terms.forEach((term) => {
    if (name.startsWith(term)) score -= 12;
    if (name.includes(term)) score -= 8;
    if (item.searchText.includes(term)) score -= 4;
  });
  return score;
}

function searchResultCategory(item) {
  if (item.stationId) return 'tube';
  if (item.layerId) return item.layerId;
  if (item.routeId) return 'route';
  return 'generic';
}

function searchResultClass(item) {
  return `search-result search-result-${escapeHtml(searchResultCategory(item))}`;
}

async function searchMapItems(query) {
  const normalisedQuery = normaliseSearchText(query);
  if (normalisedQuery.length < 2) return [];
  await loadTubeNetwork();
  const terms = normalisedQuery.split(/\s+/).filter(Boolean);
  return buildSearchableItems()
    .filter((item) => terms.every((term) => item.searchText.includes(term)))
    .map((item) => ({ ...item, score: scoreSearchItem(item, terms, normalisedQuery) }))
    .sort((a, b) => a.score - b.score || a.name.localeCompare(b.name))
    .slice(0, 40);
}

function renderSearchResults(query = searchInput?.value || '') {
  if (!searchResultsEl) return;
  const normalisedQuery = normaliseSearchText(query);
  if (normalisedQuery.length < 2) {
    searchResults = [];
    searchResultsEl.innerHTML = '<p class="search-empty">Type at least 2 letters.</p>';
    return;
  }

  if (!searchResults.length) {
    searchResultsEl.innerHTML = '<p class="search-empty">No matching places found.</p>';
    return;
  }

  searchResultsEl.innerHTML = searchResults
    .map((item, index) => `
      <button class="${searchResultClass(item)}" type="button" role="option" data-search-index="${index}">
        <strong>${escapeHtml(item.name)}</strong>
        <span>${escapeHtml(item.label || item.type)}</span>
        <small>${escapeHtml(item.detail || '')}</small>
      </button>
    `)
    .join('');
}

async function runSearch() {
  const query = searchInput?.value || '';
  searchResults = await searchMapItems(query);
  renderSearchResults(query);
}

function setSearchOpen(open) {
  const isOpen = Boolean(open);
  if (!searchPanel || !searchButton) return;
  document.body.classList.toggle('search-open', isOpen);
  searchPanel.hidden = !isOpen;
  searchButton.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  if (isOpen) {
    document.body.classList.add('route-view');
    document.body.classList.remove('route-menu-open', 'browse-layers-open', 'offline-menu-open');
    setRadiusOpen(false);
    setBrowseLayersOpen(false);
    setRouteMenuOpen(false);
    setOfflineMenuOpen(false);
    window.setTimeout(() => {
      searchInput?.focus();
      searchInput?.select();
    }, 0);
    void runSearch();
    setStatus('Search the map by place, layer item, pier, or tube station.');
  }
}

function searchPopupContent(item) {
  if (item.stationId) {
    const station = tubeNetworkData.stations.find((candidate) => candidate.id === item.stationId);
    if (station) return tubeStationPopupContent(station);
    return `<strong>${escapeHtml(item.name)}</strong>${nearbyPopupButton(item.lat, item.lng, item.name)}`;
  }

  if (item.layerId && item.point) {
    return poiPopupContent({
      ...item.point,
      layerId: item.layerId,
      layerLabel: item.layerLabel,
      layerMarkerLabel: item.layerMarkerLabel,
    });
  }

  return popupShell(`
    <div class="poi-popup">
      <div class="poi-popup-header">
        <div class="poi-popup-copy">
          <strong>${escapeHtml(item.name)}</strong>
          <div class="poi-popup-meta">
            <span>${escapeHtml(item.label || item.type)}</span>
          </div>
        </div>
      </div>
      <p class="poi-popup-detail">${escapeHtml(item.detail || '')}</p>
      ${nearbyPopupButton(item.lat, item.lng, item.name)}
    </div>
  `, 'generic');
}

function activateSearchLayer(item) {
  if (!item.layerId || activeLayerIds.has(item.layerId)) return false;
  activeLayerIds.add(item.layerId);
  saveActiveLayerIds();
  renderLayerControls();
  return true;
}

function focusSearchResult(item) {
  if (!map || !item) return;
  const layerChanged = activateSearchLayer(item);
  const targetZoom = item.stationId ? 15 : item.layerId === 'transport' ? 16 : 16;

  setSearchOpen(false);
  map.flyTo([item.lat, item.lng], Math.max(map.getZoom(), targetZoom), { duration: 0.45 });

  window.setTimeout(() => {
    renderLayerMarkers();
    if (item.stationId) {
      activeLayerIds.add('transport');
      saveActiveLayerIds();
      renderLayerControls();
      selectedTubeLineId = undefined;
      selectedTubeStationId = item.stationId;
      void renderTubeNetwork(item.stationId);
    } else {
      clearTubeSelectionBeforePopup();
      void renderTubeNetwork();
      L.popup()
        .setLatLng([item.lat, item.lng])
        .setContent(searchPopupContent(item))
        .openOn(map);
    }
    renderDetails();
    const layerMessage = layerChanged ? ` ${item.layerLabel || item.label} layer enabled.` : '';
    setStatus(`${item.name} selected from search.${layerMessage}`);
  }, 500);
}

function formatDistance(meters) {
  if (meters >= 1000) {
    const kilometres = meters / 1000;
    return `${Number.isInteger(kilometres) ? kilometres.toFixed(0) : kilometres.toFixed(1)} km`;
  }
  return `${Math.round(meters)} m`;
}

function setRadiusOpen(open) {
  const isOpen = Boolean(open);
  if (!radiusPanel || !radiusButton) return;
  radiusState.active = isOpen;
  document.body.classList.toggle('radius-open', isOpen);
  radiusPanel.hidden = !isOpen;
  radiusButton.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  if (isOpen) {
    document.body.classList.add('route-view');
    document.body.classList.remove('route-menu-open', 'browse-layers-open', 'offline-menu-open');
    setSearchOpen(false);
    setBrowseLayersOpen(false);
    setRouteMenuOpen(false);
    setOfflineMenuOpen(false);
    setStatus(radiusState.center ? 'Drag on the map to set the nearby radius.' : 'Drop a nearby search pin on the map.');
  } else {
    radiusState.dragging = false;
    if (map?.dragging) map.dragging.enable();
  }
  renderRadiusPanel();
  renderRadiusOverlays();
}

function clearRadiusExplore() {
  radiusState = {
    active: false,
    center: null,
    centerName: '',
    radiusMeters: 0,
    edge: null,
    dragging: false,
    results: [],
  };
  radiusOverlayLayers.forEach((layer) => layer.remove());
  radiusResultMarkers.forEach((marker) => marker.remove());
  radiusOverlayLayers = [];
  radiusResultMarkers = [];
  if (radiusPanel) radiusPanel.hidden = true;
  document.body.classList.remove('radius-open');
  radiusButton?.setAttribute('aria-expanded', 'false');
  if (map?.dragging) map.dragging.enable();
  renderRadiusPanel();
  renderLayerMarkers();
}

function startRadiusFromCenter(lat, lng, name = 'Selected point') {
  if (!map) return;
  radiusState.active = true;
  radiusState.center = L.latLng(Number(lat), Number(lng));
  radiusState.centerName = name;
  radiusState.radiusMeters = 0;
  radiusState.edge = null;
  radiusState.results = [];
  setRadiusOpen(true);
  map.closePopup();
  map.panTo(radiusState.center, { animate: true });
  setStatus(`${name}: drag out a nearby search radius.`);
}

function radiusSearchItems() {
  const items = buildSearchableItems();
  return items.filter((item) => Number.isFinite(item.lat) && Number.isFinite(item.lng));
}

function radiusResultsFor(center, radiusMeters) {
  if (!center || radiusMeters <= 0) return [];
  return radiusSearchItems()
    .map((item) => ({
      ...item,
      distanceMeters: map.distance(center, [item.lat, item.lng]),
    }))
    .filter((item) => item.distanceMeters <= radiusMeters)
    .sort((a, b) => a.distanceMeters - b.distanceMeters || a.name.localeCompare(b.name));
}

function renderRadiusPanel() {
  if (!radiusSummaryEl || !radiusResultsEl) return;
  if (!radiusState.center) {
    radiusSummaryEl.textContent = 'Drop a pin on the map, then drag out the radius.';
    radiusResultsEl.innerHTML = '<p class="search-empty">No radius selected yet.</p>';
    return;
  }

  if (!radiusState.radiusMeters) {
    radiusSummaryEl.textContent = `${radiusState.centerName || 'Selected point'} is the centre. Drag on the map to set the radius.`;
    radiusResultsEl.innerHTML = '<p class="search-empty">Drag out from the centre to reveal nearby places.</p>';
    return;
  }

  radiusSummaryEl.textContent = `${radiusState.results.length} result${radiusState.results.length === 1 ? '' : 's'} within ${formatDistance(radiusState.radiusMeters)} of ${radiusState.centerName || 'the pin'}.`;
  radiusResultsEl.innerHTML = radiusState.results.length
    ? radiusState.results
        .map((item, index) => `
          <button class="${searchResultClass(item)}" type="button" role="option" data-radius-index="${index}">
            <strong>${escapeHtml(item.name)}</strong>
            <span>${escapeHtml(item.label || item.type)} · ${escapeHtml(formatDistance(item.distanceMeters))}</span>
            <small>${escapeHtml(item.detail || '')}</small>
          </button>
        `)
        .join('')
    : '<p class="search-empty">No mapped places inside this circle.</p>';
}

function markerForRadiusResult(item) {
  if (item.layerId) return null;
  const markerHtml = item.stationId
    ? '<div class="tube-station-marker is-major is-selected"><span></span></div>'
    : '<div class="poi-marker poi-marker-poi"><span>R</span></div>';
  const markerSize = item.stationId ? [22, 22] : [26, 26];
  const marker = L.marker([item.lat, item.lng], {
    icon: L.divIcon({
      className: '',
      html: markerHtml,
      iconSize: markerSize,
      iconAnchor: [markerSize[0] / 2, markerSize[1] / 2],
    }),
  }).bindPopup(searchPopupContent(item));
  if (!item.stationId) marker.on('click', clearTubeSelectionBeforePopup);
  return marker;
}

function renderRadiusOverlays() {
  if (!map) return;
  radiusOverlayLayers.forEach((layer) => layer.remove());
  radiusResultMarkers.forEach((marker) => marker.remove());
  radiusOverlayLayers = [];
  radiusResultMarkers = [];
  if (!radiusState.active || !radiusState.center) return;

  const centerMarker = L.marker(radiusState.center, {
    interactive: false,
    icon: L.divIcon({
      className: '',
      html: '<div class="radius-center-marker"></div>',
      iconSize: [18, 18],
      iconAnchor: [9, 9],
    }),
  }).addTo(map);
  radiusOverlayLayers.push(centerMarker);

  if (!radiusState.radiusMeters) return;

  const circle = L.circle(radiusState.center, {
    radius: radiusState.radiusMeters,
    color: '#146c64',
    dashArray: '8 8',
    fillColor: '#25a99b',
    fillOpacity: 0.08,
    interactive: false,
    weight: 2,
  }).addTo(map);
  radiusOverlayLayers.push(circle);

  if (radiusState.edge) {
    const line = L.polyline([radiusState.center, radiusState.edge], {
      color: '#0c4d47',
      dashArray: '6 6',
      interactive: false,
      weight: 2,
    }).addTo(map);
    radiusOverlayLayers.push(line);

    for (let tick = 200; tick <= radiusState.radiusMeters; tick += 200) {
      const ratio = tick / radiusState.radiusMeters;
      const lat = radiusState.center.lat + (radiusState.edge.lat - radiusState.center.lat) * ratio;
      const lng = radiusState.center.lng + (radiusState.edge.lng - radiusState.center.lng) * ratio;
      const tickMarker = L.marker([lat, lng], {
        interactive: false,
        icon: L.divIcon({
          className: '',
          html: `<span class="radius-tick-label">${escapeHtml(formatDistance(tick))}</span>`,
          iconSize: [48, 18],
          iconAnchor: [24, 9],
        }),
      }).addTo(map);
      radiusOverlayLayers.push(tickMarker);
    }
  }

  radiusState.results.forEach((item) => {
    const marker = markerForRadiusResult(item);
    if (!marker) return;
    marker.addTo(map);
    radiusResultMarkers.push(marker);
  });
}

async function updateRadiusFromEdge(latLng) {
  if (!map || !radiusState.center) return;
  await loadTubeNetwork();
  const distance = Math.min(2000, Math.max(50, map.distance(radiusState.center, latLng)));
  radiusState.radiusMeters = Math.round(distance / 25) * 25;
  radiusState.edge = latLng;
  radiusState.results = radiusResultsFor(radiusState.center, radiusState.radiusMeters);
  renderRadiusPanel();
  renderRadiusOverlays();
  renderLayerMarkers();
}

function handleRadiusMapClick(event) {
  if (!radiusState.active || radiusState.center) return;
  startRadiusFromCenter(event.latlng.lat, event.latlng.lng, 'Dropped pin');
}

function handleRadiusPointerStart(event) {
  if (!radiusState.active || !radiusState.center) return;
  const target = event.target;
  if (target?.closest?.('.leaflet-popup, .leaflet-control, .map-topbar, .search-panel, .radius-panel')) return;
  event.preventDefault();
  radiusState.dragging = true;
  event.currentTarget?.setPointerCapture?.(event.pointerId);
  if (map?.dragging) map.dragging.disable();
  void updateRadiusFromEdge(map.mouseEventToLatLng(event));
}

function handleRadiusPointerMove(event) {
  if (!radiusState.active || !radiusState.dragging) return;
  event.preventDefault();
  void updateRadiusFromEdge(map.mouseEventToLatLng(event));
}

function handleRadiusPointerEnd(event) {
  if (!radiusState.active || !radiusState.dragging) return;
  event.preventDefault();
  radiusState.dragging = false;
  event.currentTarget?.releasePointerCapture?.(event.pointerId);
  if (map?.dragging) map.dragging.enable();
  void updateRadiusFromEdge(map.mouseEventToLatLng(event));
  setStatus(`Nearby radius set to ${formatDistance(radiusState.radiusMeters)}.`);
}

function focusRadiusResult(item) {
  if (!map || !item) return;
  if (item.layerId) activateSearchLayer(item);
  if (item.stationId) {
    activeLayerIds.add('transport');
    saveActiveLayerIds();
    renderLayerControls();
    selectedTubeLineId = undefined;
    selectedTubeStationId = item.stationId;
  }
  map.flyTo([item.lat, item.lng], Math.max(map.getZoom(), 16), { duration: 0.35 });
  window.setTimeout(() => {
    renderLayerMarkers();
    if (!item.stationId) clearTubeSelectionBeforePopup();
    void renderTubeNetwork(item.stationId);
    L.popup()
      .setLatLng([item.lat, item.lng])
      .setContent(searchPopupContent(item))
      .openOn(map);
    setStatus(`${item.name} selected from nearby results.`);
  }, 400);
}

function renderLayerControls() {
  if (!layerListEl) return;

  layerListEl.innerHTML = visibleLayerCatalog()
    .map((layer) => {
      const count = layer.points.length;
      const layerId = escapeHtml(layer.id);
      const label = escapeHtml(layer.label);
      const hasStagedDisplay = layer.previewLimit && count > layer.previewLimit;
      const visibilityCopy = hasStagedDisplay
        ? `${count} items · priority ${layer.previewLimit} from zoom ${layer.minZoom} · all by zoom ${layer.fullZoom || layer.minZoom + 3}`
        : `${count} item${count === 1 ? '' : 's'} · visible from zoom ${layer.minZoom}`;
      return `
        <label class="layer-toggle">
          <input type="checkbox" value="${layerId}" ${activeLayerIds.has(layer.id) ? 'checked' : ''} />
          <span>
            <strong>${label}</strong>
            <small>${escapeHtml(visibilityCopy)}</small>
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
    const basemapPack = await describeBasemapOfflinePack();
    parts.push(basemapPack.label);
  }

  const state = getOfflineState();
  const selectedLayers = [...activeLayerIds].sort().join(',');
  const basemapPack = selections.tiles ? await loadBasemapOfflineAssets() : null;
  const isStale =
    state &&
    (state.cacheName !== cacheName ||
      state.routeId !== (browseMode ? 'browse' : selectedRoute.id) ||
      state.layerIds !== selectedLayers ||
      state.includesTiles !== selections.tiles ||
      state.basemapVersion !== (basemapPack?.version || 'none'));

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
  if (options.minZoom && map.getZoom() < options.minZoom) {
    map.setZoom(options.minZoom, { animate: options.animate ?? true });
  }
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

function loadBasemapOfflineAssets() {
  if (!basemapOfflineAssetsPromise) {
    basemapOfflineAssetsPromise = fetch(assetUrl('/assets/offline-map-assets.json'))
      .then((response) => response.json())
      .then((data) => ({
        version: typeof data?.version === 'string' ? data.version : 'unknown',
        label: typeof data?.label === 'string' ? data.label : 'Local basemap',
        tileManifests: Array.isArray(data?.tileManifests) ? data.tileManifests : [],
        assets: Array.isArray(data?.assets) ? data.assets : [],
      }))
      .catch(() => ({
        version: 'legacy-tiles',
        label: 'Local basemap',
        tileManifests: [{ url: '/assets/tiles-manifest.json', label: 'Offline basemap tiles', pathPattern: '^/tiles/\\d+/\\d+/\\d+\\.png$' }],
        assets: [],
      }));
  }

  return basemapOfflineAssetsPromise;
}

function normaliseOfflineAssetUrl(url) {
  if (typeof url !== 'string') return null;
  if (!url.startsWith('/') || url.startsWith('//') || url.includes('..')) return null;
  return url;
}

function tilePathToLocalUrl(tilePath, pathPattern = '^/tiles/\\d+/\\d+/\\d+\\.png$') {
  const pattern = new RegExp(pathPattern);
  return typeof tilePath === 'string' && pattern.test(tilePath) ? tilePath : null;
}

async function expandBasemapOfflineUrls() {
  const basemapPack = await loadBasemapOfflineAssets();
  const manifestUrls = basemapPack.tileManifests
    .map((manifest) => normaliseOfflineAssetUrl(manifest.url))
    .filter(Boolean);
  const staticAssets = basemapPack.assets
    .map((asset) => normaliseOfflineAssetUrl(asset.url))
    .filter(Boolean);
  const tileUrls = [];

  for (const manifest of basemapPack.tileManifests) {
    const manifestUrl = normaliseOfflineAssetUrl(manifest.url);
    if (!manifestUrl) continue;
    const response = await fetch(assetUrl(manifestUrl), { cache: 'no-store' });
    if (!response.ok) continue;
    const tileManifest = await response.json();
    if (!Array.isArray(tileManifest)) continue;
    tileManifest
      .map((tilePath) => tilePathToLocalUrl(tilePath, manifest.pathPattern))
      .filter(Boolean)
      .forEach((url) => tileUrls.push(url));
  }

  return {
    version: basemapPack.version,
    label: basemapPack.label,
    manifestUrls,
    staticAssets,
    tileUrls,
  };
}

async function describeBasemapOfflinePack() {
  const expanded = await expandBasemapOfflineUrls();
  const pieces = [];
  if (expanded.tileUrls.length) pieces.push(`${expanded.tileUrls.length} map tiles`);
  if (expanded.staticAssets.length) pieces.push(`${expanded.staticAssets.length} basemap file${expanded.staticAssets.length === 1 ? '' : 's'}`);
  return {
    version: expanded.version,
    label: pieces.length ? `${expanded.label}: ${pieces.join(', ')}` : expanded.label,
  };
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
  map.createPane('basemapRepairLabels');
  map.getPane('basemapRepairLabels').style.zIndex = 440;
  map.getPane('basemapRepairLabels').style.pointerEvents = 'none';
  map.createPane('tubeNetwork');
  map.getPane('tubeNetwork').style.zIndex = 390;
  tubeNetworkRenderer = L.svg({ pane: 'tubeNetwork' });

  renderBasemapRepairLabels();

  L.control.zoom({ position: 'bottomright' }).addTo(map);
  map.setView(selectedRoute.center, selectedRoute.zoom);
  updateZoomIndicator();
  map.on('zoomend', () => {
    updateZoomIndicator();
    if (!browseMode) renderRouteMarkers();
    renderLayerMarkers();
    void renderTubeNetwork();
    renderDetails();
    renderRadiusOverlays();
  });
  map.on('moveend', () => {
    if (!browseMode && !radiusState.active) return;
    renderLayerMarkers();
    renderDetails();
  });
  map.on('click', handleRadiusMapClick);
  map.on('click', handleMapSelectionClear);
  map.getContainer().addEventListener('pointerdown', handleRadiusPointerStart);
  map.getContainer().addEventListener('pointermove', handleRadiusPointerMove);
  map.getContainer().addEventListener('pointerup', handleRadiusPointerEnd);
  map.getContainer().addEventListener('pointercancel', handleRadiusPointerEnd);
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

function updateZoomIndicator() {
  if (!map || !zoomIndicator) return;
  zoomIndicator.textContent = `Zoom ${map.getZoom()}`;
}

function applyBasemapTheme() {
  if (!map?._setBasemapTheme) return;
  map._setBasemapTheme(document.body.dataset.theme === 'dark' ? 'dark' : 'light');
}

function renderBasemapRepairLabels() {
  if (!map || basemapRepairLabels.length) return;

  [
    { name: 'City of London', lat: 51.5108, lng: -0.0997 },
    { name: 'Whitechapel', lat: 51.5153, lng: -0.0618 },
  ].forEach((label) => {
    const marker = L.marker([label.lat, label.lng], {
      interactive: false,
      keyboard: false,
      pane: 'basemapRepairLabels',
      icon: L.divIcon({
        className: 'basemap-repair-label',
        html: escapeHtml(label.name),
        iconSize: [120, 18],
        iconAnchor: [60, 9],
      }),
    }).addTo(map);
    basemapRepairLabels.push(marker);
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
    casingOpacity: isCompact ? 0.94 : 0.98,
    casingWeight: isCompact ? 12 : 16,
    lineOpacity: 1,
    lineWeight: segment === 'tube' ? (isCompact ? 8 : 10) : (isCompact ? 7 : 9),
  };
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
    await cacheRequest(cache, '/assets/vendor/maplibre/maplibre-gl.js');
    await cacheRequest(cache, '/assets/vendor/maplibre/maplibre-gl.css');
    await cacheRequest(cache, '/assets/vendor/pmtiles/pmtiles.js');
    await cacheRequest(cache, '/assets/maplibre-leaflet-adapter.js');
    if (selections.route) {
      await cacheRequest(cache, '/assets/route-geometry.json');
    }

    if (selections.layers) {
      await cacheRequest(cache, '/assets/layers.json');
      await cacheRequest(cache, '/assets/tube-network.json');
    }

    let basemapAssetTotal = 0;
    let cachedBasemapAssets = 0;
    let tileTotal = 0;
    let cachedTiles = 0;
    let basemapVersion = 'none';
    if (selections.tiles) {
      await cacheRequest(cache, '/assets/offline-map-assets.json');
      const expandedBasemap = await expandBasemapOfflineUrls();
      basemapVersion = expandedBasemap.version;
      const basemapUrls = [
        ...expandedBasemap.manifestUrls,
        ...expandedBasemap.staticAssets,
        ...expandedBasemap.tileUrls,
      ];
      basemapAssetTotal = basemapUrls.length;
      tileTotal = expandedBasemap.tileUrls.length;

      for (const url of basemapUrls) {
        try {
          await cacheRequest(cache, url);
          cachedBasemapAssets += 1;
          if (expandedBasemap.tileUrls.includes(url)) cachedTiles += 1;
        } catch (error) {
          // Skip bad basemap assets and keep going.
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
      basemapVersion,
      cachedBasemapAssets,
      basemapAssetTotal,
      cachedTiles,
      tileTotal,
      savedAt: new Date().toISOString(),
    });

    const tileSummary = selections.tiles ? ` Cached ${cachedBasemapAssets}/${basemapAssetTotal} basemap assets.` : '';
    setStatus(`Offline pack ready for ${browseMode ? 'browse mode' : selectedRoute.name}.${tileSummary}`);
    await renderOfflineDetails();
  } catch (error) {
    setStatus('Offline pack download failed.');
  } finally {
    offlineButton.disabled = false;
    offlineButton.textContent = document.body.classList.contains('offline-menu-open') ? 'Download offline pack' : 'Offline';
  }
}

function renderLayerMarkers() {
  if (!map) return;

  layerMarkers.forEach((marker) => marker.remove());
  layerMarkers = [];

  activeLayerPoints().forEach((point) => {
    const layerId = escapeHtml(point.layerId);
    const markerLabel = escapeHtml(layerIconText(point.layerId, point));
    const layerLabel = escapeHtml(point.layerLabel);
    const detail = escapeHtml(point.detail);
    const transportTypeClass = point.transportType ? ` layer-marker-transport-${escapeHtml(point.transportType)}` : '';
    const editorStateClass = editorPointState(point) ? ` is-editor-${editorPointState(point)}` : '';
    const routeStateClass = !browseMode && routeMustShowPoint(point) ? ' is-route-required' : routeMustHidePoint(point) ? ' is-route-hidden' : '';
    const isBoatMarker = point.transportType === 'boat';
    const markerSize = isBoatMarker ? [22, 22] : [30, 30];
    const markerHtml = isBoatMarker
      ? '<svg class="boat-marker-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M6 3h12v5h2.2l1.8 6H2l1.8-6H6V3Zm2 2v3h8V5H8Zm-1.5 5-1 3h13l-1-3h-11Z"/><path d="M4 17c1.4 0 1.4 1 2.8 1s1.4-1 2.8-1 1.4 1 2.8 1 1.4-1 2.8-1 1.4 1 2.8 1 1.4-1 2.8-1v2c-1.4 0-1.4 1-2.8 1s-1.4-1-2.8-1-1.4 1-2.8 1-1.4-1-2.8-1-1.4 1-2.8 1S5.4 19 4 19v-2Z"/></svg>'
      : `<span>${markerLabel}</span>`;
    const marker = L.marker([point.lat, point.lng], {
      icon: L.divIcon({
        className: '',
        html: `<div class="layer-marker layer-marker-${layerId}${transportTypeClass}${editorStateClass}${routeStateClass}" title="${escapeHtml(point.name)}">${markerHtml}</div>`,
        iconSize: markerSize,
        iconAnchor: [markerSize[0] / 2, markerSize[1] / 2],
      }),
    }).bindPopup(poiPopupContent(point));
    marker.on('click', clearTubeSelectionBeforePopup);
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

function selectedTubeLineOffsetMeters(lineId, selectedStation) {
  return 0;
}

function browseTubeLineOffsetPixels(lineId) {
  return 0;
}

function offsetTubeSegment(segment, offsetMeters) {
  if (!offsetMeters || !Array.isArray(segment) || segment.length < 2) return segment;

  return segment.map((point, index) => {
    const previous = segment[Math.max(0, index - 1)];
    const next = segment[Math.min(segment.length - 1, index + 1)];
    const lat = Number(point[0]);
    const lng = Number(point[1]);
    const originLat = lat * Math.PI / 180;
    const lngMeters = 111320 * Math.cos(originLat);
    const latMeters = 110540;
    const dx = (Number(next[1]) - Number(previous[1])) * lngMeters;
    const dy = (Number(next[0]) - Number(previous[0])) * latMeters;
    const length = Math.hypot(dx, dy);
    if (!length) return point;

    const normalX = -dy / length;
    const normalY = dx / length;
    return [
      lat + (normalY * offsetMeters) / latMeters,
      lng + (normalX * offsetMeters) / lngMeters,
    ];
  });
}

function segmentLengthMeters(start, end) {
  const originLat = ((Number(start[0]) + Number(end[0])) / 2) * Math.PI / 180;
  const latMeters = 110540;
  const lngMeters = 111320 * Math.cos(originLat);
  return Math.hypot((Number(end[1]) - Number(start[1])) * lngMeters, (Number(end[0]) - Number(start[0])) * latMeters);
}

function interpolateSegmentPoint(start, end, fraction) {
  return [
    Number(start[0]) + (Number(end[0]) - Number(start[0])) * fraction,
    Number(start[1]) + (Number(end[1]) - Number(start[1])) * fraction,
  ];
}

function canonicalTubeSegment(segment) {
  const forward = segment.map((point) => `${Number(point[0]).toFixed(6)},${Number(point[1]).toFixed(6)}`);
  const reversed = [...forward].reverse();
  return forward.join('|') <= reversed.join('|') ? segment : [...segment].reverse();
}

function tubeSegmentKey(segment) {
  return canonicalTubeSegment(segment)
    .map((point) => `${Number(point[0]).toFixed(6)},${Number(point[1]).toFixed(6)}`)
    .join('|');
}

function buildTubeSegmentGroups(lines = []) {
  const groups = new Map();
  lines.forEach((line) => {
    line.segments
      .filter((segment) => Array.isArray(segment) && segment.length >= 2)
      .forEach((segment) => {
        const canonical = canonicalTubeSegment(segment);
        const key = tubeSegmentKey(canonical);
        const existing = groups.get(key) || { segment: canonical, lineIds: [] };
        if (!existing.lineIds.includes(line.id)) existing.lineIds.push(line.id);
        groups.set(key, existing);
      });
  });
  return [...groups.values()];
}

function splitSegmentIntoStripeSections(segment, sectionMeters) {
  if (!Array.isArray(segment) || segment.length < 2) return [];

  const sections = [];
  let stripeIndex = 0;
  let current = [segment[0]];
  let remaining = sectionMeters;

  for (let index = 1; index < segment.length; index += 1) {
    let start = current[current.length - 1];
    const target = segment[index];
    let edgeMeters = segmentLengthMeters(start, target);
    if (!edgeMeters) continue;

    while (edgeMeters > remaining) {
      const splitPoint = interpolateSegmentPoint(start, target, remaining / edgeMeters);
      current.push(splitPoint);
      if (current.length >= 2) sections.push({ coordinates: current, stripeIndex });
      stripeIndex += 1;
      current = [splitPoint];
      start = splitPoint;
      edgeMeters = segmentLengthMeters(start, target);
      remaining = sectionMeters;
    }

    current.push(target);
    remaining -= edgeMeters;
    if (remaining <= 0.5) {
      if (current.length >= 2) sections.push({ coordinates: current, stripeIndex });
      stripeIndex += 1;
      current = [target];
      remaining = sectionMeters;
    }
  }

  if (current.length >= 2) sections.push({ coordinates: current, stripeIndex });
  return sections;
}

function clearSelectedTubeStation(options = {}) {
  if (!selectedTubeStationId && !selectedTubeLineId) return false;
  selectedTubeStationId = undefined;
  selectedTubeLineId = undefined;
  if (options.closePopup !== false) {
    map?.closePopup();
  }
  void renderTubeNetwork();
  if (options.status) {
    setStatus(options.status);
  }
  return true;
}

function clearTubeSelectionBeforePopup() {
  clearSelectedTubeStation({ closePopup: false, status: 'Tube line filter cleared.' });
}

function selectTubeLine(lineId) {
  const line = tubeNetworkData.lines.find((candidate) => candidate.id === lineId);
  if (!line) return;

  if (selectedTubeLineId === lineId && !selectedTubeStationId) {
    clearSelectedTubeStation({ status: `${line.label}: tube line filter cleared.` });
    return;
  }

  selectedTubeStationId = undefined;
  selectedTubeLineId = lineId;
  map?.closePopup();
  void renderTubeNetwork();
  setStatus(`${line.label}: showing selected line.`);
}

async function renderTubeNetwork(openStationId) {
  if (!map) return;
  const renderToken = ++tubeNetworkRenderToken;

  tubeLineLayers.forEach((layer) => layer.remove());
  riverServiceLayers.forEach((layer) => layer.remove());
  tubeStationMarkers.forEach((marker) => marker.remove());
  tubeLineLayers = [];
  riverServiceLayers = [];
  tubeStationMarkers = [];

  if (!activeLayerIds.has('transport')) {
    selectedTubeStationId = undefined;
    selectedTubeLineId = undefined;
    map.removeLineFeatureCollection?.('tube-network-lines');
    map.removeLineFeatureCollection?.('river-service-lines');
    return;
  }

  const tubeNetwork = await loadTubeNetwork();
  if (renderToken !== tubeNetworkRenderToken) return;

  const selectedStation = tubeNetwork.stations.find((station) => station.id === selectedTubeStationId);
  const selectedLineIds = new Set(selectedStation?.lines || (selectedTubeLineId ? [selectedTubeLineId] : []));
  const tubeFeatures = [];
  const riverFeatures = [];
  const lineById = new Map(tubeNetwork.lines.map((line) => [line.id, line]));
  const segmentGroups = buildTubeSegmentGroups(tubeNetwork.lines);

  segmentGroups.forEach((group) => {
    const displayLineIds = selectedLineIds.size
      ? group.lineIds.filter((lineId) => selectedLineIds.has(lineId))
      : group.lineIds;
    if (!displayLineIds.length) return;

    const isSelected = selectedLineIds.size ? displayLineIds.some((lineId) => selectedLineIds.has(lineId)) : false;
    const offsetPixels = selectedLineIds.size ? 0 : browseTubeLineOffsetPixels(displayLineIds[0]);
    const lineWeight = isSelected && displayLineIds.length > 1 ? 6 : isSelected ? 7 : 5.2;
    const lineOpacity = isSelected ? 1 : 0.5;
    const segment = displayLineIds.length === 1
      ? offsetTubeSegment(group.segment, selectedTubeLineOffsetMeters(displayLineIds[0], selectedStation))
      : group.segment;

    if (displayLineIds.length === 1) {
      const line = lineById.get(displayLineIds[0]);
      if (!line) return;
      tubeFeatures.push({
        type: 'Feature',
        properties: {
          id: line.id,
          label: line.label,
          color: displayTubeLineColour(line),
          offset: offsetPixels,
          opacity: lineOpacity,
          width: lineWeight,
        },
        geometry: {
          type: 'LineString',
          coordinates: segment.map(([lat, lng]) => [lng, lat]),
        },
      });
      return;
    }

    const stripeSectionMeters = isSelected ? 110 : 135;
    const stripeSections = splitSegmentIntoStripeSections(segment, stripeSectionMeters);
    stripeSections.forEach((stripe) => {
      const lineId = displayLineIds[stripe.stripeIndex % displayLineIds.length];
      const line = lineById.get(lineId);
      if (!line || stripe.coordinates.length < 2) return;
      tubeFeatures.push({
        type: 'Feature',
        properties: {
          id: line.id,
          label: line.label,
          color: displayTubeLineColour(line),
          offset: 0,
          opacity: lineOpacity,
          width: lineWeight,
        },
        geometry: {
          type: 'LineString',
          coordinates: stripe.coordinates.map(([lat, lng]) => [lng, lat]),
        },
      });
    });
  });

  map.setLineFeatureCollection?.(
    'tube-network-lines',
    { type: 'FeatureCollection', features: tubeFeatures },
    { fallbackColor: '#1d4ed8', onClick: (properties) => selectTubeLine(properties.id) }
  );

  tubeNetwork.riverServices.forEach((service) => {
    const segments = service.segments.filter((segment) => Array.isArray(segment) && segment.length >= 2);
    if (!segments.length) return;

    segments.forEach((segment) => {
      riverFeatures.push({
        type: 'Feature',
        properties: {
          id: service.id,
          label: service.label,
          color: service.color || '#0077b6',
          opacity: selectedLineIds.size ? 0.58 : 0.76,
          width: 3,
        },
        geometry: {
          type: 'LineString',
          coordinates: segment.map(([lat, lng]) => [lng, lat]),
        },
      });
    });
  });

  map.setLineFeatureCollection?.(
    'river-service-lines',
    { type: 'FeatureCollection', features: riverFeatures },
    { dashArray: [1.8, 1.8], fallbackColor: '#0077b6' }
  );

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
    const popupContent = tubeStationPopupContent(station, tubeNetwork);
    const marker = L.marker([station.lat, station.lng], {
      icon: L.divIcon({
        className: '',
        html: `<div class="tube-station-marker ${isMajorStation ? 'is-major' : ''} ${isSelectedStation ? 'is-selected' : ''}"><span></span></div>`,
        iconSize: isMajorStation ? [22, 22] : [18, 18],
        iconAnchor: isMajorStation ? [11, 11] : [9, 9],
      }),
    });

    marker.on('click', () => {
      if (selectedTubeStationId === station.id) {
        clearSelectedTubeStation({ status: `${station.name}: tube line filter cleared.` });
        return;
      }

      selectedTubeLineId = undefined;
      selectedTubeStationId = station.id;
      void renderTubeNetwork(station.id);
      setStatus(`${station.name}: showing ${stationLines.join(', ')} tube lines.`);
    });

    marker.addTo(map);
    if (station.id === openStationId) {
      L.popup()
        .setLatLng([station.lat, station.lng])
        .setContent(popupContent)
        .openOn(map);
    }
    tubeStationMarkers.push(marker);
  });
}

function handleMapSelectionClear(event) {
  if (event?.originalEvent?.londontourNativeLineClick) return;
  clearSelectedTubeStation({ status: 'Tube line filter cleared.' });
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
    }).bindPopup(`<strong>${index + 1}. ${escapeHtml(stop.name)}</strong><br>${escapeHtml(stop.detail)}${nearbyPopupButton(stop.lat, stop.lng, stop.name)}`);
    marker.on('click', clearTubeSelectionBeforePopup);
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
      overlayOrder: 60,
      lineCap: 'round',
      lineJoin: 'round',
    });
    const line = L.polyline(latLngs, {
      color: segmentStylesFor(segment.segment),
      opacity: strokeStyle.lineOpacity,
      weight: strokeStyle.lineWeight,
      overlayOrder: 61,
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
    fitSelectedRouteBounds({ animate: false, minZoom: 13 });
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
  if (!options.preserveView) {
    map.setView([51.5074, -0.11], 13, { animate: options.animate ?? false });
  }
  updateZoomIndicator();
  renderEditorPanel();
  setStatus(editorMode ? 'Editor mode: click the map to draw a draft route, or tag layer points from popups.' : 'Browse mode: no route selected. Pan, zoom, or turn map layers on and off.');
}

function updateMenuButtonState() {
  const isOpen = document.body.classList.contains('offline-menu-open');
  menuButton.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  menuButton.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
}

function updateBrowsePickerButtonState() {
  browsePickerButton.textContent = browseMode && document.body.classList.contains('route-menu-open') ? 'Cancel' : 'Browse map';
}

function setBrowseLayersOpen(open) {
  const isOpen = Boolean(open);
  document.body.classList.toggle('browse-layers-open', isOpen);
  if (isOpen) {
    clearTubeSelectionBeforePopup();
    document.body.classList.remove('route-menu-open', 'offline-menu-open');
    setSearchOpen(false);
    setRadiusOpen(false);
  }
  browseMapButton.textContent = isOpen ? 'Close' : 'Layers';
  browseMapButton.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  changeRouteButton.textContent = document.body.classList.contains('route-menu-open') ? 'Close' : 'Routes';
  updateMenuButtonState();
  updateBrowsePickerButtonState();

  if (!map) return;
  window.setTimeout(() => {
    map.invalidateSize();
  }, 0);
}

function setRouteMenuOpen(open) {
  const isOpen = Boolean(open);
  document.body.classList.toggle('route-menu-open', isOpen);
  if (isOpen) {
    clearTubeSelectionBeforePopup();
    document.body.classList.remove('browse-layers-open', 'offline-menu-open');
    setSearchOpen(false);
    setRadiusOpen(false);
  }
  changeRouteButton.textContent = isOpen ? 'Close' : 'Routes';
  browseMapButton.textContent = document.body.classList.contains('browse-layers-open') ? 'Close' : 'Layers';
  browseMapButton.setAttribute('aria-expanded', document.body.classList.contains('browse-layers-open') ? 'true' : 'false');
  updateMenuButtonState();
  updateBrowsePickerButtonState();
  if (isOpen) setStatus('Choose a route, or keep browsing the map.');
  if (map) window.setTimeout(() => map.invalidateSize(), 0);
}

function setOfflineMenuOpen(open) {
  const isOpen = Boolean(open);
  document.body.classList.toggle('offline-menu-open', isOpen);
  if (isOpen) {
    clearTubeSelectionBeforePopup();
    document.body.classList.remove('browse-layers-open', 'route-menu-open');
    setSearchOpen(false);
    setRadiusOpen(false);
    void renderOfflineDetails();
  }
  browseMapButton.textContent = document.body.classList.contains('browse-layers-open') ? 'Close' : 'Layers';
  browseMapButton.setAttribute('aria-expanded', document.body.classList.contains('browse-layers-open') ? 'true' : 'false');
  changeRouteButton.textContent = document.body.classList.contains('route-menu-open') ? 'Close' : 'Routes';
  updateMenuButtonState();
  updateBrowsePickerButtonState();
  if (isOpen) setStatus('Menu opened. Offline downloads are under Offline pack.');
  if (map) window.setTimeout(() => map.invalidateSize(), 0);
}

function toggleBrowseLayers() {
  setBrowseLayersOpen(!document.body.classList.contains('browse-layers-open'));
}

function enterBrowseMode(options = {}) {
  browseMode = true;
  document.body.classList.add('route-view', 'browse-view');
  document.body.classList.remove('route-menu-open', 'offline-menu-open');
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
    renderBrowseMap({ animate: options.animate ?? true, preserveView: options.preserveView ?? false });
  }, 0);
}

function selectRoute(route) {
  browseMode = false;
  selectedRoute = route;
  selectedRouteBounds = undefined;
  document.body.classList.add('route-view');
  document.body.classList.remove('browse-view', 'browse-layers-open', 'route-menu-open', 'offline-menu-open');
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
  const nextTheme = activeTheme === 'dark' ? 'light' : 'dark';
  document.body.dataset.theme = activeTheme;
  themeButton.setAttribute('aria-label', `Switch to ${nextTheme} mode`);
  themeButton.setAttribute('title', `Switch to ${nextTheme} mode`);
  applyBasemapTheme();
  void renderTubeNetwork();
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
    .bindPopup(`<strong>Your position</strong>${nearbyPopupButton(userLocation[0], userLocation[1], 'Your position')}`)
    .on('click', clearTubeSelectionBeforePopup)
    .addTo(map);
}

function toggleRouteMenu() {
  document.body.classList.add('route-view');
  setRouteMenuOpen(!document.body.classList.contains('route-menu-open'));
  renderPicker();
}

function toggleMenu() {
  document.body.classList.add('route-view');
  setOfflineMenuOpen(!document.body.classList.contains('offline-menu-open'));
}

function handleOfflineButtonClick() {
  void downloadOfflinePack();
}

function handleBrowsePickerClick() {
  if (browseMode && document.body.classList.contains('route-menu-open')) {
    setRouteMenuOpen(false);
    setStatus('Route chooser closed.');
    return;
  }

  enterBrowseMode({ preserveView: true });
}

pickerEl.addEventListener('click', (event) => {
  const target = event.target.closest('button[data-route]');
  if (!target) return;
  const route = routes.find((item) => item.id === target.dataset.route);
  if (route) selectRoute(route);
});

locateButton.addEventListener('click', locateUser);
offlineButton.addEventListener('click', handleOfflineButtonClick);
printButton.addEventListener('click', () => window.print());
searchButton.addEventListener('click', () => setSearchOpen(!document.body.classList.contains('search-open')));
searchCloseButton.addEventListener('click', () => setSearchOpen(false));
searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  void runSearch();
});
searchInput.addEventListener('input', () => {
  void runSearch();
});
searchResultsEl.addEventListener('click', (event) => {
  const resultButton = event.target.closest('button[data-search-index]');
  if (!resultButton) return;
  focusSearchResult(searchResults[Number(resultButton.dataset.searchIndex)]);
});
radiusButton.addEventListener('click', () => setRadiusOpen(!document.body.classList.contains('radius-open')));
radiusCloseButton.addEventListener('click', () => setRadiusOpen(false));
radiusClearButton.addEventListener('click', () => {
  clearRadiusExplore();
  setStatus('Nearby radius cleared.');
});
radiusResultsEl.addEventListener('click', (event) => {
  const resultButton = event.target.closest('button[data-radius-index]');
  if (!resultButton) return;
  focusRadiusResult(radiusState.results[Number(resultButton.dataset.radiusIndex)]);
});
menuButton.addEventListener('click', toggleMenu);
changeRouteButton.addEventListener('click', toggleRouteMenu);
recenterButton.addEventListener('click', recenterRoute);
browsePickerButton.addEventListener('click', handleBrowsePickerClick);
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

document.addEventListener('click', (event) => {
  const button = event.target.closest('button[data-nearby-center]');
  if (!button) return;
  startRadiusFromCenter(button.dataset.lat, button.dataset.lng, button.dataset.name || 'Selected point');
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && document.body.classList.contains('search-open')) {
    setSearchOpen(false);
    return;
  }
  if (event.key === 'Escape' && document.body.classList.contains('radius-open')) {
    setRadiusOpen(false);
  }
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
