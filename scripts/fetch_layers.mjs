import { writeFile } from 'node:fs/promises';

const BBOX = {
  south: 51.38,
  west: -0.42,
  north: 51.66,
  east: 0.15,
};

const OUTPUT_FILE = new URL('../public/assets/layers.json', import.meta.url);
const USER_AGENT = 'Londontour data import (https://github.com/happykhan/Londontour)';

const layerDefinitions = [
  {
    id: 'landmarks',
    label: 'Essential landmarks',
    defaultVisible: true,
    minZoom: 11,
    markerLabel: 'L',
    routeRadiusMeters: 700,
    maxItems: 160,
    previewLimit: 80,
    fullZoom: 15,
  },
  {
    id: 'museums',
    label: 'Museums',
    defaultVisible: false,
    minZoom: 12,
    markerLabel: 'M',
    routeRadiusMeters: 650,
    maxItems: 320,
    previewLimit: 50,
    fullZoom: 16,
  },
  {
    id: 'monuments',
    label: 'Statues and monuments',
    defaultVisible: false,
    minZoom: 14,
    markerLabel: 'Mon',
    routeRadiusMeters: 550,
    maxItems: 420,
    previewLimit: 55,
    fullZoom: 16,
  },
  {
    id: 'plaques',
    label: 'Plaques',
    defaultVisible: false,
    minZoom: 14,
    markerLabel: 'Plq',
    routeRadiusMeters: 350,
    maxItems: 320,
    previewLimit: 45,
    fullZoom: 17,
  },
  {
    id: 'pubs',
    label: 'Pubs',
    defaultVisible: false,
    minZoom: 13,
    markerLabel: 'P',
    routeRadiusMeters: 500,
    maxItems: 520,
    previewLimit: 60,
    fullZoom: 16,
  },
  {
    id: 'markets',
    label: 'Markets',
    defaultVisible: false,
    minZoom: 12,
    markerLabel: 'Mk',
    routeRadiusMeters: 550,
    maxItems: 160,
    previewLimit: 45,
    fullZoom: 16,
  },
  {
    id: 'transport',
    label: 'Tube and river links',
    defaultVisible: true,
    minZoom: 14,
    markerLabel: 'Boat',
    routeRadiusMeters: 500,
    maxItems: 90,
    previewLimit: 24,
    fullZoom: 16,
  },
  {
    id: 'bus-planning',
    label: 'Bus stops (route editor)',
    defaultVisible: false,
    editorOnly: true,
    minZoom: 15,
    markerLabel: 'Bus',
    routeRadiusMeters: 250,
    maxItems: 1600,
    previewLimit: 120,
    fullZoom: 18,
  },
  {
    id: 'toilets',
    label: 'Public toilets',
    defaultVisible: false,
    minZoom: 13,
    markerLabel: 'WC',
    routeRadiusMeters: 400,
    maxItems: 320,
    previewLimit: 55,
    fullZoom: 16,
  },
  {
    id: 'water',
    label: 'Water refill points',
    defaultVisible: false,
    minZoom: 14,
    markerLabel: 'H2O',
    routeRadiusMeters: 400,
    maxItems: 320,
    previewLimit: 45,
    fullZoom: 17,
  },
  {
    id: 'supermarkets',
    label: 'Supermarkets',
    defaultVisible: false,
    minZoom: 13,
    markerLabel: 'S',
    routeRadiusMeters: 450,
    maxItems: 420,
    previewLimit: 60,
    fullZoom: 16,
  },
];

function bboxString(bounds = BBOX) {
  return `${bounds.south},${bounds.west},${bounds.north},${bounds.east}`;
}

function overpassQuery(bounds = BBOX) {
  const bbox = bboxString(bounds);
  return `[out:json][timeout:25];(
  node[amenity~"^(pub|bar)$"](${bbox});
  way[amenity~"^(pub|bar)$"](${bbox});
  relation[amenity~"^(pub|bar)$"](${bbox});
  node[amenity=toilets](${bbox});
  way[amenity=toilets](${bbox});
  relation[amenity=toilets](${bbox});
  node[amenity=drinking_water](${bbox});
  way[amenity=drinking_water](${bbox});
  relation[amenity=drinking_water](${bbox});
  node[man_made=water_tap](${bbox});
  way[man_made=water_tap](${bbox});
  relation[man_made=water_tap](${bbox});
  node[drinking_water=yes](${bbox});
  way[drinking_water=yes](${bbox});
  relation[drinking_water=yes](${bbox});
  node[amenity=marketplace](${bbox});
  way[amenity=marketplace](${bbox});
  relation[amenity=marketplace](${bbox});
  node[marketplace](${bbox});
  way[marketplace](${bbox});
  relation[marketplace](${bbox});
  node["market:type"](${bbox});
  way["market:type"](${bbox});
  relation["market:type"](${bbox});
  node["name"~"[Mm]arket"](${bbox});
  way["name"~"[Mm]arket"](${bbox});
  relation["name"~"[Mm]arket"](${bbox});
  node[shop~"^(supermarket|convenience)$"](${bbox});
  way[shop~"^(supermarket|convenience)$"](${bbox});
  relation[shop~"^(supermarket|convenience)$"](${bbox});
  node[tourism~"^(attraction|museum|gallery|artwork|viewpoint)$"](${bbox});
  way[tourism~"^(attraction|museum|gallery|artwork|viewpoint)$"](${bbox});
  relation[tourism~"^(attraction|museum|gallery|artwork|viewpoint)$"](${bbox});
  node[historic](${bbox});
  way[historic](${bbox});
  relation[historic](${bbox});
  node[memorial](${bbox});
  way[memorial](${bbox});
  relation[memorial](${bbox});
  node["memorial:type"](${bbox});
  way["memorial:type"](${bbox});
  relation["memorial:type"](${bbox});
  node[artwork_type](${bbox});
  way[artwork_type](${bbox});
  relation[artwork_type](${bbox});
  node[amenity=place_of_worship](${bbox});
  way[amenity=place_of_worship](${bbox});
  relation[amenity=place_of_worship](${bbox});
  node[man_made=bridge](${bbox});
  way[man_made=bridge](${bbox});
  relation[man_made=bridge](${bbox});
  node[railway~"^(station|subway_entrance|tram_stop)$"](${bbox});
  way[railway~"^(station|subway_entrance|tram_stop)$"](${bbox});
  relation[railway~"^(station|subway_entrance|tram_stop)$"](${bbox});
  node[public_transport~"^(platform|station|stop_position)$"](${bbox});
  way[public_transport~"^(platform|station|stop_position)$"](${bbox});
  relation[public_transport~"^(platform|station|stop_position)$"](${bbox});
  node[highway=bus_stop](${bbox});
  node[amenity=ferry_terminal](${bbox});
  way[amenity=ferry_terminal](${bbox});
  relation[amenity=ferry_terminal](${bbox});
);out center tags qt;`;
}

function bboxChunks(rows = 4, cols = 4) {
  const chunks = [];
  const latStep = (BBOX.north - BBOX.south) / rows;
  const lngStep = (BBOX.east - BBOX.west) / cols;

  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      chunks.push({
        south: Number((BBOX.south + row * latStep).toFixed(6)),
        west: Number((BBOX.west + col * lngStep).toFixed(6)),
        north: Number((BBOX.south + (row + 1) * latStep).toFixed(6)),
        east: Number((BBOX.west + (col + 1) * lngStep).toFixed(6)),
      });
    }
  }

  return chunks;
}

async function fetchOverpassChunk(bounds, index, total) {
  const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(overpassQuery(bounds))}`;
  const maxAttempts = 5;

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    let response;
    try {
      response = await fetch(url, {
        headers: {
          'User-Agent': USER_AGENT,
          Accept: 'application/json',
        },
      });
    } catch (error) {
      const waitSeconds = attempt * 6;
      console.log(`Overpass chunk ${index}/${total} attempt ${attempt} failed: ${error.message}; waiting ${waitSeconds}s`);
      await sleep(waitSeconds * 1000);
      continue;
    }

    if (response.ok) {
      const data = await response.json();
      console.log(`Overpass chunk ${index}/${total}: ${data.elements?.length || 0} raw elements`);
      return data.elements || [];
    }

    if (response.status !== 429 && response.status < 500) {
      throw new Error(`Overpass request ${index}/${total} failed: ${response.status} ${response.statusText}`);
    }

    const retryAfterSeconds = Number(response.headers.get('retry-after'));
    const waitSeconds = Math.max(Number.isFinite(retryAfterSeconds) ? retryAfterSeconds : attempt * 8, attempt * 5);
    console.log(`Overpass chunk ${index}/${total} attempt ${attempt} returned ${response.status}; waiting ${waitSeconds}s`);
    await sleep(waitSeconds * 1000);
  }

  throw new Error(`Overpass request ${index}/${total} failed after ${maxAttempts} attempts`);
}

async function fetchOverpass() {
  const chunks = bboxChunks();
  const elementByKey = new Map();

  for (const [index, chunk] of chunks.entries()) {
    const elements = await fetchOverpassChunk(chunk, index + 1, chunks.length);
    for (const element of elements) {
      elementByKey.set(`${element.type}/${element.id}`, element);
    }
    await sleep(2000);
  }

  const elements = [...elementByKey.values()];
  if (!elements.length) throw new Error(`Overpass returned no layer data for ${bboxString(BBOX)}`);
  return { elements };
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function fetchTubeStations() {
  const response = await fetch('https://api.tfl.gov.uk/StopPoint/Mode/tube?stopTypes=NaptanMetroStation', {
    headers: {
      'User-Agent': USER_AGENT,
      Accept: 'application/json',
    },
  });

  if (!response.ok) return [];
  const data = await response.json();
  return (data.stopPoints || [])
    .filter((station) => station.stopType === 'NaptanMetroStation' && station.lat && station.lon)
    .map((station) => ({
      name: station.commonName.replace(/\s+Underground Station$/i, ''),
      lat: station.lat,
      lng: station.lon,
    }));
}

function isInBounds(point, bounds = BBOX) {
  return point.lat >= bounds.south && point.lat <= bounds.north && point.lng >= bounds.west && point.lng <= bounds.east;
}

function cleanRiverPierName(name = '') {
  return name
    .replace(/\.+$/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function riverPierLines(stopPoint) {
  const rawLines = [
    ...(stopPoint.lines || []).map((line) => line.name || line.id),
    ...(stopPoint.lineModeGroups || []).flatMap((group) => group.lineIdentifier || []),
    ...(stopPoint.children || []).flatMap((child) => [
      ...(child.lines || []).map((line) => line.name || line.id),
      ...(child.lineModeGroups || []).flatMap((group) => group.lineIdentifier || []),
    ]),
  ];

  return [...new Set(rawLines
    .map((line) => String(line || '').toUpperCase())
    .filter((line) => line.startsWith('RB') || line === 'WOOLWICH FERRY'))]
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
}

async function fetchRiverPiers() {
  const response = await fetch('https://api.tfl.gov.uk/StopPoint/Mode/river-bus', {
    headers: {
      'User-Agent': USER_AGENT,
      Accept: 'application/json',
    },
  });

  if (!response.ok) return [];
  const data = await response.json();
  return (data.stopPoints || [])
    .filter((point) => point.stopType === 'NaptanFerryPort' && Number.isFinite(point.lat) && Number.isFinite(point.lon))
    .map((point) => {
      const lines = riverPierLines(point);
      const name = cleanRiverPierName(point.commonName);
      return {
        layerId: 'transport',
        point: {
          id: `transport-tfl-${String(point.id || point.naptanId).toLowerCase()}-${slugify(name)}`,
          name,
          lat: Number(point.lat.toFixed(6)),
          lng: Number(point.lon.toFixed(6)),
          detail: `River Bus pier${lines.length ? ` · ${lines.join(' · ')}` : ''} from TfL StopPoint.`,
          source: `TfL StopPoint ${point.id || point.naptanId}`,
          transportType: 'boat',
          markerLabel: 'Boat',
        },
        score: 160 + lines.length * 8,
      };
    })
    .filter((item) => item.point.name && isInBounds(item.point));
}

function coordinateFor(element) {
  const lat = element.lat ?? element.center?.lat;
  const lng = element.lon ?? element.center?.lon;
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;
  return { lat: Number(lat.toFixed(6)), lng: Number(lng.toFixed(6)) };
}

const essentialLandmarkNames = new Set([
  '10 downing street',
  'bank of england',
  'big ben',
  'borough market',
  'alexandra palace',
  'barbican centre',
  'battersea power station',
  'british library',
  'british museum',
  'buckingham palace',
  'camden market',
  'charing cross',
  "cleopatra's needle",
  'covent garden',
  'cutty sark',
  'globe theatre',
  'greenwich market',
  'hampton court palace',
  'guildhall',
  'hms belfast',
  'imperial war museum',
  'kensington palace',
  "king's cross st. pancras",
  'kew gardens',
  'leadenhall market',
  'london eye',
  'london bridge',
  'london zoo',
  'mansion house',
  'marble arch',
  'millennium bridge',
  'national gallery',
  'natural history museum',
  'old royal naval college',
  'palace of westminster',
  'piccadilly circus',
  'royal academy of arts',
  'royal albert hall',
  'royal courts of justice',
  'royal observatory greenwich',
  'royal exchange',
  'royal festival hall',
  'royal opera house',
  'science museum',
  'sky garden',
  'somerset house',
  'southbank centre',
  "st paul's cathedral",
  "st. paul's cathedral",
  "st james's palace",
  "st. james's palace",
  'southwark cathedral',
  'temple church',
  'the british library',
  'the british museum',
  'the monument',
  'the monument to the great fire of london',
  'the o2',
  'the royal courts of justice',
  'the shard',
  'tower bridge',
  'tower of london',
  'trafalgar square',
  'victoria and albert museum',
  'wembley stadium',
  'westminster abbey',
  'westminster bridge',
  'westminster cathedral',
  'whitechapel gallery',
]);

const curatedEssentialLandmarks = [
  { name: 'Alexandra Palace', lat: 51.5940, lng: -0.1300, url: 'https://www.alexandrapalace.com/' },
  { name: 'Barbican Centre', lat: 51.5202, lng: -0.0938, url: 'https://www.barbican.org.uk/' },
  { name: 'Battersea Power Station', lat: 51.4818, lng: -0.1447, url: 'https://batterseapowerstation.co.uk/' },
  { name: 'British Library', lat: 51.5299, lng: -0.1275, url: 'https://www.bl.uk/' },
  { name: 'British Museum', lat: 51.5194, lng: -0.1270, url: 'https://www.britishmuseum.org/' },
  { name: 'Camden Market', lat: 51.5413, lng: -0.1461, url: 'https://camdenmarket.com/' },
  { name: 'Covent Garden', lat: 51.5117, lng: -0.1230, url: 'https://www.coventgarden.london/' },
  { name: 'Cutty Sark', lat: 51.4828, lng: -0.0096, url: 'https://www.rmg.co.uk/cutty-sark' },
  { name: 'Greenwich Market', lat: 51.4816, lng: -0.0090, url: 'https://www.greenwichmarket.london/' },
  { name: 'Hampton Court Palace', lat: 51.4036, lng: -0.3376, url: 'https://www.hrp.org.uk/hampton-court-palace/' },
  { name: 'HMS Belfast', lat: 51.5066, lng: -0.0810, url: 'https://www.iwm.org.uk/visits/hms-belfast' },
  { name: 'Imperial War Museum', lat: 51.4958, lng: -0.1086, url: 'https://www.iwm.org.uk/visits/iwm-london' },
  { name: 'Kensington Palace', lat: 51.5050, lng: -0.1877, url: 'https://www.hrp.org.uk/kensington-palace/' },
  { name: "King's Cross St. Pancras", lat: 51.5317, lng: -0.1246 },
  { name: 'Kew Gardens', lat: 51.4787, lng: -0.2956, url: 'https://www.kew.org/kew-gardens' },
  { name: 'London Zoo', lat: 51.5353, lng: -0.1534, url: 'https://www.londonzoo.org/' },
  { name: 'Marble Arch', lat: 51.5131, lng: -0.1589 },
  { name: 'National Gallery', lat: 51.5089, lng: -0.1283, url: 'https://www.nationalgallery.org.uk/' },
  { name: 'Natural History Museum', lat: 51.4967, lng: -0.1764, url: 'https://www.nhm.ac.uk/' },
  { name: 'Old Royal Naval College', lat: 51.4830, lng: -0.0056, url: 'https://ornc.org/' },
  { name: 'Royal Academy of Arts', lat: 51.5094, lng: -0.1399, url: 'https://www.royalacademy.org.uk/' },
  { name: 'Royal Albert Hall', lat: 51.5010, lng: -0.1774, url: 'https://www.royalalberthall.com/' },
  { name: 'Royal Observatory Greenwich', lat: 51.4769, lng: -0.0005, url: 'https://www.rmg.co.uk/royal-observatory' },
  { name: 'Science Museum', lat: 51.4978, lng: -0.1745, url: 'https://www.sciencemuseum.org.uk/' },
  { name: 'Sky Garden', lat: 51.5113, lng: -0.0835, url: 'https://skygarden.london/' },
  { name: 'St Pancras International', lat: 51.5319, lng: -0.1263, url: 'https://stpancras.com/' },
  { name: 'Tate Britain', lat: 51.4911, lng: -0.1278, url: 'https://www.tate.org.uk/visit/tate-britain' },
  { name: 'Tate Modern', lat: 51.5076, lng: -0.0994, url: 'https://www.tate.org.uk/visit/tate-modern' },
  { name: 'The Monument', lat: 51.5101, lng: -0.0860 },
  { name: 'The O2', lat: 51.5030, lng: 0.0032, url: 'https://www.theo2.co.uk/' },
  { name: 'The Shard', lat: 51.5045, lng: -0.0865, url: 'https://www.the-shard.com/' },
  { name: 'Victoria and Albert Museum', lat: 51.4966, lng: -0.1722, url: 'https://www.vam.ac.uk/' },
  { name: 'Wembley Stadium', lat: 51.5560, lng: -0.2796, url: 'https://www.wembleystadium.com/' },
  { name: 'Westminster Cathedral', lat: 51.4963, lng: -0.1396, url: 'https://westminstercathedral.org.uk/' },
  { name: 'Whitechapel Gallery', lat: 51.5164, lng: -0.0700, url: 'https://www.whitechapelgallery.org/' },
];

const officialMarketUrlOverrides = [
  { name: 'borough market', url: 'https://boroughmarket.org.uk/', lat: 51.5056, lng: -0.0904 },
  { name: 'broadway market', url: 'https://broadwaymarket.co.uk/', lat: 51.5369, lng: -0.0615 },
  { name: 'brixton village', url: 'https://brixtonvillage.com/', lat: 51.4624, lng: -0.112 },
  { name: 'camden market', url: 'https://camdenmarket.com/', lat: 51.5424, lng: -0.1472 },
  { name: 'camden lock market', url: 'https://camdenmarket.com/', lat: 51.5413, lng: -0.1461 },
  { name: 'columbia road flower market', url: 'https://columbiaroadmarket.co.uk/', lat: 51.5294, lng: -0.0694 },
  { name: 'covent garden market', url: 'https://www.coventgarden.london/', lat: 51.512, lng: -0.1227 },
  { name: 'greenwich market', url: 'https://www.greenwichmarket.london/', lat: 51.4816, lng: -0.009 },
  { name: 'leadenhall market', url: 'https://leadenhallmarket.co.uk/', lat: 51.5127, lng: -0.0836 },
  { name: 'maltby street market', url: 'https://www.maltbystreet.market/', lat: 51.4993, lng: -0.0756 },
  { name: 'old spitalfields market', url: 'https://oldspitalfieldsmarket.com/', lat: 51.5196, lng: -0.0754 },
  { name: 'portobello market', url: 'https://visitportobello.com/', lat: 51.5161, lng: -0.2051 },
  { name: 'portobello road market', url: 'https://visitportobello.com/', lat: 51.5161, lng: -0.2051 },
  { name: 'seven dials market', url: 'https://www.sevendialsmarket.com/', lat: 51.5141, lng: -0.1258 },
];

const excludedMarketNames = new Set([
  'downmarket_',
  'market',
  'stratford mall',
  'whole foods market',
]);

function classify(tags = {}) {
  if (/^(pub|bar)$/.test(tags.amenity)) return 'pubs';
  if (tags.amenity === 'toilets') return 'toilets';
  if (isWaterRefill(tags)) return 'water';
  if (isMarket(tags)) return 'markets';
  if (/^(supermarket|convenience)$/.test(tags.shop)) return 'supermarkets';
  if (transportType(tags) === 'boat') return 'transport';
  if (transportType(tags) === 'bus') return 'bus-planning';
  if (isMuseum(tags)) return 'museums';
  if (isPlaque(tags)) return 'plaques';
  if (isEssentialLandmark(tags)) return 'landmarks';
  if (isMonument(tags)) return 'monuments';
  return null;
}

function normaliseTitle(value = '') {
  return value
    .toLowerCase()
    .replace(/^the\s+/, '')
    .replace(/[^\w\s'.-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function isMuseum(tags = {}) {
  return tags.tourism === 'museum' || tags.tourism === 'gallery';
}

function isWaterRefill(tags = {}) {
  return tags.amenity === 'drinking_water' || tags.man_made === 'water_tap' || tags.drinking_water === 'yes';
}

function isMarket(tags = {}) {
  const name = normaliseTitle(tags.name || tags['name:en'] || '');
  if (excludedMarketNames.has(name)) return false;
  if (tags.amenity === 'marketplace' || tags.marketplace || tags['market:type']) return true;
  if (!name.includes('market')) return false;
  return (
    tags.tourism === 'attraction' ||
    tags.historic === 'yes' ||
    tags.historic === 'market' ||
    tags.building === 'retail' ||
    tags.building === 'commercial'
  );
}

function isPlaque(tags = {}) {
  const values = [tags.memorial, tags['memorial:type'], tags.historic, tags.tourism, tags.name]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();
  return values.includes('plaque') || values.includes('blue plaque');
}

function isEssentialLandmark(tags = {}) {
  if (isRailOrTubeTransport(tags)) return false;
  const name = normaliseTitle(tags.name || tags['name:en'] || '');
  if (essentialLandmarkNames.has(name)) return true;
  if (tags.man_made === 'bridge' && essentialLandmarkNames.has(name)) return true;
  if (tags.building === 'cathedral' || tags.building === 'church') return essentialLandmarkNames.has(name);
  return false;
}

function isMonument(tags = {}) {
  if (tags.historic === 'monument' || tags.historic === 'memorial') return true;
  if (tags.tourism === 'artwork') return true;
  if (tags.memorial && !isPlaque(tags)) return true;
  if (tags.artwork_type) return true;
  return false;
}

function transportType(tags = {}) {
  if (tags.amenity === 'ferry_terminal' || tags.ferry === 'yes' || /river services/i.test(tags.network || '')) return 'boat';
  if (tags.highway === 'bus_stop' || tags.bus === 'yes' || tags.amenity === 'bus_station') return 'bus';
  return null;
}

function isRailOrTubeTransport(tags = {}) {
  const values = [
    tags.network,
    tags.operator,
    tags.line,
    tags.station,
    tags.railway,
    tags.public_transport,
    tags.subway,
    tags.name,
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();

  return (
    values.includes('london underground') ||
    values.includes('national rail') ||
    values.includes('elizabeth line') ||
    values.includes('docklands light railway') ||
    values.includes('london overground') ||
    values.includes('tube') ||
    tags.train === 'yes' ||
    tags.light_rail === 'yes' ||
    tags.railway === 'subway_entrance' ||
    tags.railway === 'subway' ||
    tags.railway === 'station' ||
    tags.railway === 'stop' ||
    tags.railway === 'platform' ||
    tags.station === 'subway' ||
    tags.subway === 'yes'
  );
}

function titleCase(value = '') {
  return value
    .split('_')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function fallbackName(layerId, tags) {
  if (layerId === 'toilets') return 'Public toilets';
  if (layerId === 'water') return 'Water refill point';
  if (layerId === 'markets') return 'Market';
  if (layerId === 'transport') return 'River pier';
  if (layerId === 'bus-planning') return 'Bus stop';
  if (layerId === 'supermarkets') return titleCase(tags.shop || 'Supermarket');
  if (layerId === 'pubs') return titleCase(tags.amenity || 'Pub');
  if (layerId === 'museums') return titleCase(tags.tourism || 'Museum');
  if (layerId === 'monuments') return titleCase(tags.artwork_type || tags.memorial || tags.historic || 'Monument');
  if (layerId === 'plaques') return 'Plaque';
  return titleCase(tags.tourism || tags.historic || tags.amenity || 'Landmark');
}

function detailFor(layerId, tags = {}) {
  if (layerId === 'pubs') {
    const bits = [titleCase(tags.amenity)];
    if (tags.cuisine) bits.push(titleCase(tags.cuisine));
    if (tags.outdoor_seating === 'yes') bits.push('outdoor seating');
    return `${bits.filter(Boolean).join(' · ')} from OpenStreetMap.`;
  }

  if (layerId === 'toilets') {
    const bits = ['Public toilet'];
    if (tags.fee) bits.push(`fee: ${tags.fee}`);
    if (tags.wheelchair) bits.push(`wheelchair: ${tags.wheelchair}`);
    if (tags.access) bits.push(`access: ${tags.access}`);
    return `${bits.join(' · ')} from OpenStreetMap.`;
  }

  if (layerId === 'water') {
    const bits = ['Drinking water'];
    if (tags.fountain) bits.push(`fountain: ${tags.fountain}`);
    if (tags.bottle) bits.push(`bottle: ${tags.bottle}`);
    if (tags.access) bits.push(`access: ${tags.access}`);
    if (tags.fee) bits.push(`fee: ${tags.fee}`);
    return `${bits.join(' · ')} from OpenStreetMap.`;
  }

  if (layerId === 'markets') {
    const bits = ['Market'];
    if (tags['market:type']) bits.push(titleCase(tags['market:type']));
    if (tags.opening_hours) bits.push(`listed hours: ${tags.opening_hours}`);
    bits.push('opening times change; check the linked site before travelling');
    return `${bits.join(' · ')}.`;
  }

  if (layerId === 'supermarkets') {
    const bits = [titleCase(tags.shop)];
    if (tags.brand) bits.push(tags.brand);
    return `${bits.filter(Boolean).join(' · ')} from OpenStreetMap.`;
  }

  if (layerId === 'transport') {
    const bits = ['River pier'];
    if (tags.ref) bits.push(`pier ${tags.ref}`);
    if (tags.operator) bits.push(tags.operator);
    if (tags.network) bits.push(tags.network);
    return `${bits.join(' · ')} from OpenStreetMap.`;
  }

  if (layerId === 'bus-planning') {
    const bits = ['Bus stop'];
    if (tags.local_ref) bits.push(`stop ${tags.local_ref}`);
    if (tags.operator) bits.push(tags.operator);
    if (tags.network) bits.push(tags.network);
    return `${bits.join(' · ')} from OpenStreetMap.`;
  }

  if (layerId === 'museums') {
    const bits = [tags.tourism === 'gallery' ? 'Gallery' : 'Museum'];
    if (tags.operator) bits.push(tags.operator);
    return `${bits.join(' · ')} from OpenStreetMap.`;
  }

  if (layerId === 'monuments') {
    const bits = [titleCase(tags.artwork_type || tags.memorial || tags.historic || tags.tourism || 'Monument')];
    if (tags.subject) bits.push(tags.subject);
    return `${bits.join(' · ')} from OpenStreetMap.`;
  }

  if (layerId === 'plaques') {
    const bits = ['Plaque'];
    if (tags.subject) bits.push(tags.subject);
    if (tags.operator) bits.push(tags.operator);
    return `${bits.join(' · ')} from OpenStreetMap.`;
  }

  const bits = [titleCase(tags.tourism || tags.historic || 'Attraction')];
  if (tags.operator) bits.push(tags.operator);
  return `${bits.join(' · ')} from OpenStreetMap.`;
}

function urlFromTags(tags = {}) {
  const directUrl = tags.website || tags['contact:website'] || tags.url;
  if (directUrl) {
    const normalised = /^https?:\/\//i.test(directUrl) ? directUrl : `https://${directUrl}`;
    try {
      const url = new URL(normalised);
      if (url.protocol === 'http:' || url.protocol === 'https:') return url.href;
    } catch (error) {
      // Fall through to public knowledge graph links.
    }
  }

  if (tags.wikipedia) {
    const [language, ...titleParts] = tags.wikipedia.split(':');
    const title = titleParts.join(':');
    if (language && title) {
      return `https://${language}.wikipedia.org/wiki/${encodeURIComponent(title.replace(/ /g, '_'))}`;
    }
  }

  if (/^Q\d+$/i.test(tags.wikidata || '')) {
    return `https://www.wikidata.org/wiki/${tags.wikidata}`;
  }

  return undefined;
}

function officialMarketUrlFor(tags = {}, coordinate) {
  const name = normaliseTitle(tags.name || tags['name:en'] || '');
  if (!coordinate) return undefined;
  return officialMarketUrlOverrides.find((market) => market.name === name && distanceMeters(coordinate, market) <= 700)?.url;
}

function marketUrlFromTags(tags = {}, coordinate) {
  return officialMarketUrlFor(tags, coordinate) || urlFromTags(tags);
}

function scoreElement(layerId, tags = {}) {
  let score = 0;
  if (tags.name) score += 50;
  if (tags.wikidata || tags.wikipedia) score += 25;
  if (layerId === 'landmarks' && essentialLandmarkNames.has(normaliseTitle(tags.name || tags['name:en'] || ''))) score += 80;
  if (layerId === 'museums' && urlFromTags(tags)) score += 18;
  if (tags.tourism === 'museum' || tags.tourism === 'gallery' || tags.historic === 'monument') score += 18;
  if (tags.amenity === 'ferry_terminal' || tags.ferry === 'yes') score += 45;
  if (tags.highway === 'bus_stop') score += 12;
  if (tags.public_transport === 'stop_position') score -= 45;
  if (tags.amenity === 'pub' || tags.amenity === 'cafe') score += 10;
  if (layerId === 'toilets' && tags.access === 'public') score += 12;
  if (layerId === 'water' && tags.amenity === 'drinking_water') score += 30;
  if (layerId === 'water' && tags.bottle === 'yes') score += 18;
  if (layerId === 'water' && tags.access === 'public') score += 12;
  if (layerId === 'markets' && urlFromTags(tags)) score += 30;
  if (layerId === 'markets' && officialMarketUrlOverrides.some((market) => market.name === normaliseTitle(tags.name || tags['name:en'] || ''))) score += 80;
  if (layerId === 'markets' && tags.amenity === 'marketplace') score += 20;
  if (layerId === 'markets' && tags.opening_hours) score += 12;
  if (layerId === 'supermarkets' && tags.brand) score += 12;
  if (tags.disused || tags.abandoned || tags.demolished) score -= 100;
  return score;
}

function slugify(value) {
  return value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 48);
}

function cleanPoint(element) {
  const tags = element.tags || {};
  const layerId = classify(tags);
  const coordinate = coordinateFor(element);
  if (!layerId || !coordinate) return null;
  const pointTransportType = layerId === 'transport' || layerId === 'bus-planning' ? transportType(tags) : null;
  if ((layerId === 'transport' || layerId === 'bus-planning') && (!pointTransportType || isRailOrTubeTransport(tags))) return null;
  if ((layerId === 'transport' || layerId === 'bus-planning') && tags.public_transport === 'stop_position') return null;
  const pointUrl = layerId === 'museums' ? urlFromTags(tags) : layerId === 'markets' ? marketUrlFromTags(tags, coordinate) : undefined;
  if (layerId === 'museums' && !pointUrl) return null;
  if (layerId === 'markets' && !pointUrl) return null;

  const name = (tags.name || tags['name:en'] || fallbackName(layerId, tags)).trim();
  if (!name) return null;
  if ((layerId === 'transport' || layerId === 'bus-planning') && /^\d+[A-Z]?$/.test(name)) return null;

  return {
    layerId,
    point: {
      id: `${layerId}-${element.type}-${element.id}-${slugify(name)}`,
      name,
      lat: coordinate.lat,
      lng: coordinate.lng,
      detail: detailFor(layerId, tags),
      source: `OpenStreetMap ${element.type}/${element.id}`,
      ...(pointUrl ? { url: pointUrl } : {}),
      ...(pointTransportType
        ? {
            transportType: pointTransportType,
            markerLabel: pointTransportType === 'boat' ? 'Boat' : 'Bus',
          }
        : {}),
    },
    score: scoreElement(layerId, tags),
  };
}

function curatedLandmarkItems() {
  return curatedEssentialLandmarks
    .filter((point) => isInBounds(point))
    .map((point, index) => ({
      layerId: 'landmarks',
      point: {
        id: `landmarks-curated-${slugify(point.name)}`,
        name: point.name,
        lat: point.lat,
        lng: point.lng,
        detail: 'Essential landmark from the curated OpenStreetMap supplement.',
        source: 'OpenStreetMap curated supplement',
        ...(point.url ? { url: point.url } : {}),
      },
      score: 240 - index,
    }));
}

function distanceMeters(a, b) {
  const originLat = ((a.lat + b.lat) / 2) * Math.PI / 180;
  const latMeters = 110540;
  const lngMeters = 111320 * Math.cos(originLat);
  return Math.hypot((a.lng - b.lng) * lngMeters, (a.lat - b.lat) * latMeters);
}

function normaliseName(value = '') {
  return value
    .toLowerCase()
    .replace(/\bunderground station\b/g, '')
    .replace(/\bstation\b/g, '')
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function isDuplicateTubeTransport(point, tubeStations) {
  if (point.layerId !== 'transport' && point.layerId !== 'bus-planning') return false;
  const name = normaliseName(point.point.name);
  return tubeStations.some((station) => {
    const stationName = normaliseName(station.name);
    if (name === stationName) return true;
    if (distanceMeters(point.point, station) > 250) return false;
    return name === `${stationName} platform` || /\bplatforms?\b/.test(name);
  });
}

function dedupe(points) {
  const kept = [];
  const sorted = [...points].sort((a, b) => b.score - a.score);
  for (const item of sorted) {
    const duplicate = kept.find((existing) => {
      if (existing.point.transportType !== item.point.transportType) return false;
      if (normaliseName(existing.point.name) !== normaliseName(item.point.name)) return false;
      if (item.layerId === 'landmarks') return true;
      const threshold = item.layerId === 'transport' || item.layerId === 'bus-planning' ? 180 : 35;
      return distanceMeters(existing.point, item.point) <= threshold;
    });

    if (!duplicate) {
      kept.push(item);
    }
  }
  return kept;
}

function buildLayers(elements, tubeStations, riverPiers) {
  const pointsByLayer = new Map(layerDefinitions.map((layer) => [layer.id, []]));
  elements.map(cleanPoint).filter(Boolean).forEach((item) => {
    if (item.layerId === 'transport') return;
    if (isDuplicateTubeTransport(item, tubeStations)) return;
    pointsByLayer.get(item.layerId)?.push(item);
  });
  curatedLandmarkItems().forEach((item) => pointsByLayer.get('landmarks')?.push(item));
  for (const pier of riverPiers) {
    pointsByLayer.get('transport')?.push(pier);
  }

  return layerDefinitions.map(({ maxItems, ...layer }) => {
    const points = dedupe(pointsByLayer.get(layer.id) || [])
      .sort((a, b) => b.score - a.score || a.point.name.localeCompare(b.point.name))
      .slice(0, maxItems)
      .map((item, index) => ({ ...item.point, priority: index + 1 }))
      .sort((a, b) => a.name.localeCompare(b.name));

    return {
      ...layer,
      points,
    };
  });
}

const [overpassData, tubeStations, riverPiers] = await Promise.all([fetchOverpass(), fetchTubeStations(), fetchRiverPiers()]);
const output = {
  generatedAt: new Date().toISOString(),
  source: 'OpenStreetMap via Overpass API and TfL StopPoint river-bus piers',
  bbox: BBOX,
  layers: buildLayers(overpassData.elements || [], tubeStations, riverPiers),
};

await writeFile(OUTPUT_FILE, `${JSON.stringify(output, null, 2)}\n`);

for (const layer of output.layers) {
  console.log(`${layer.label}: ${layer.points.length}`);
}
