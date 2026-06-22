(() => {
  const londonPmtilesUrl = '/assets/basemaps/london-z14.pmtiles';
  const pmtilesProtocol = new pmtiles.Protocol();
  maplibregl.addProtocol('pmtiles', pmtilesProtocol.tile);

  let layerIdCounter = 0;
  const defaultMaxZoom = 18;

  function latLng(input, lng) {
    if (Array.isArray(input)) return { lat: Number(input[0]), lng: Number(input[1]) };
    if (input && typeof input === 'object') return { lat: Number(input.lat), lng: Number(input.lng ?? input.lon) };
    return { lat: Number(input), lng: Number(lng) };
  }

  function toLngLat(input) {
    const point = latLng(input);
    return [point.lng, point.lat];
  }

  function lngLatToLatLng(input) {
    return { lat: Number(input.lat), lng: Number(input.lng) };
  }

  function normaliseLineCoordinates(input) {
    if (!Array.isArray(input) || !input.length) return [];
    if (Array.isArray(input[0]) && Array.isArray(input[0][0])) {
      return input.map((segment) => segment.map(toLngLat));
    }
    return [input.map(toLngLat)];
  }

  function pointDistanceMeters(a, b) {
    const first = latLng(a);
    const second = latLng(b);
    const earthRadius = 6371000;
    const dLat = ((second.lat - first.lat) * Math.PI) / 180;
    const dLng = ((second.lng - first.lng) * Math.PI) / 180;
    const lat1 = (first.lat * Math.PI) / 180;
    const lat2 = (second.lat * Math.PI) / 180;
    const h =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
    return 2 * earthRadius * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
  }

  function makeStyle(theme = 'light') {
    const dark = theme === 'dark';
    const colours = dark
      ? {
          background: '#111816',
          earth: '#111816',
          park: '#173a2d',
          water: '#123a4c',
          building: '#222c28',
          minorCasing: '#27342f',
          minorRoad: '#39433f',
          majorCasing: '#4a4130',
          majorRoad: '#7a6742',
          label: '#d7ded8',
          roadLabel: '#bbc5bd',
          halo: '#101412',
        }
      : {
          background: '#f5f1e8',
          earth: '#f5f1e8',
          park: '#d9ead6',
          water: '#aad3df',
          building: '#dfd6c8',
          minorCasing: '#d4cdc0',
          minorRoad: '#ffffff',
          majorCasing: '#d1b889',
          majorRoad: '#fff3c4',
          label: '#475569',
          roadLabel: '#6d665e',
          halo: '#fffaf0',
        };

    return {
      version: 8,
      glyphs: 'https://fonts.openmaptiles.org/{fontstack}/{range}.pbf',
      sources: {
        london: {
          type: 'vector',
          url: `pmtiles://${location.origin}${londonPmtilesUrl}`,
          attribution:
            '<a href="https://protomaps.com" target="_blank" rel="noopener">Protomaps</a> <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">&copy; OpenStreetMap contributors</a>',
        },
      },
      layers: [
        { id: 'background', type: 'background', paint: { 'background-color': colours.background } },
        { id: 'earth', type: 'fill', source: 'london', 'source-layer': 'earth', paint: { 'fill-color': colours.earth } },
        {
          id: 'landuse-parks',
          type: 'fill',
          source: 'london',
          'source-layer': 'landuse',
          filter: ['in', ['get', 'kind'], ['literal', ['park', 'forest', 'wood', 'nature_reserve', 'garden', 'cemetery']]],
          paint: { 'fill-color': colours.park, 'fill-opacity': dark ? 0.82 : 0.9 },
        },
        {
          id: 'water-areas',
          type: 'fill',
          source: 'london',
          'source-layer': 'water',
          filter: [
            'all',
            ['==', ['geometry-type'], 'Polygon'],
            ['!', ['in', ['get', 'kind_detail'], ['literal', ['canal']]]],
          ],
          paint: { 'fill-color': colours.water },
        },
        {
          id: 'waterways',
          type: 'line',
          source: 'london',
          'source-layer': 'water',
          filter: ['in', ['get', 'kind'], ['literal', ['canal', 'river', 'stream']]],
          paint: {
            'line-color': colours.water,
            'line-opacity': dark ? 0.9 : 0.86,
            'line-width': ['interpolate', ['linear'], ['zoom'], 10, 0.8, 14, 2.4, 18, 5.4],
          },
        },
        {
          id: 'buildings',
          type: 'fill',
          source: 'london',
          'source-layer': 'buildings',
          minzoom: 13,
          paint: { 'fill-color': colours.building, 'fill-opacity': dark ? 0.55 : 0.72 },
        },
        {
          id: 'roads-minor-casing',
          type: 'line',
          source: 'london',
          'source-layer': 'roads',
          minzoom: 12,
          filter: ['!', ['in', ['get', 'kind'], ['literal', ['highway', 'major_road', 'medium_road']]]],
          paint: { 'line-color': colours.minorCasing, 'line-width': ['interpolate', ['linear'], ['zoom'], 12, 0.4, 14, 2.2] },
        },
        {
          id: 'roads-minor',
          type: 'line',
          source: 'london',
          'source-layer': 'roads',
          minzoom: 12,
          filter: ['!', ['in', ['get', 'kind'], ['literal', ['highway', 'major_road', 'medium_road']]]],
          paint: { 'line-color': colours.minorRoad, 'line-width': ['interpolate', ['linear'], ['zoom'], 12, 0.3, 14, 1.4] },
        },
        {
          id: 'roads-major-casing',
          type: 'line',
          source: 'london',
          'source-layer': 'roads',
          filter: ['in', ['get', 'kind'], ['literal', ['highway', 'major_road', 'medium_road']]],
          paint: { 'line-color': colours.majorCasing, 'line-width': ['interpolate', ['linear'], ['zoom'], 10, 1.2, 14, 5] },
        },
        {
          id: 'roads-major',
          type: 'line',
          source: 'london',
          'source-layer': 'roads',
          filter: ['in', ['get', 'kind'], ['literal', ['highway', 'major_road', 'medium_road']]],
          paint: { 'line-color': colours.majorRoad, 'line-width': ['interpolate', ['linear'], ['zoom'], 10, 0.8, 14, 3.6] },
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
          paint: { 'text-color': colours.roadLabel, 'text-halo-color': colours.halo, 'text-halo-width': 1.4 },
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
            'text-padding': 12,
          },
          paint: { 'text-color': colours.label, 'text-halo-color': colours.halo, 'text-halo-width': 1.8 },
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
          paint: { 'text-color': colours.label, 'text-halo-color': colours.halo, 'text-halo-width': 1.3 },
        },
      ],
    };
  }

  class Bounds {
    constructor(points = []) {
      this.points = [];
      points.forEach((point) => this.extend(point));
    }
    extend(point) {
      const ll = latLng(point);
      if (Number.isFinite(ll.lat) && Number.isFinite(ll.lng)) this.points.push(ll);
      return this;
    }
    isValid() {
      return this.points.length > 0;
    }
    toLngLatBounds() {
      if (!this.isValid()) return null;
      const first = this.points[0];
      const bounds = new maplibregl.LngLatBounds([first.lng, first.lat], [first.lng, first.lat]);
      this.points.slice(1).forEach((point) => bounds.extend([point.lng, point.lat]));
      return bounds;
    }
    pad() {
      return this;
    }
    contains(point) {
      if (!this.isValid()) return false;
      const ll = latLng(point);
      const lats = this.points.map((item) => item.lat);
      const lngs = this.points.map((item) => item.lng);
      return ll.lat >= Math.min(...lats) && ll.lat <= Math.max(...lats) && ll.lng >= Math.min(...lngs) && ll.lng <= Math.max(...lngs);
    }
  }

  class MapWrapper {
    constructor(container, options = {}) {
      this._layers = new Set();
      this._styleLayers = new Set();
      this._pendingStyleLayers = new Set();
      this._nativeLineGroups = new Map();
      this._readyCallbacks = [];
      this._loaded = false;
      this._styleReady = false;
      this.dragging = { enable: () => this._map.dragPan.enable(), disable: () => this._map.dragPan.disable() };
      this._map = new maplibregl.Map({
        container,
        style: makeStyle(document.body.dataset.theme),
        center: [-0.11, 51.5074],
        zoom: 13,
        minZoom: options.minZoom ?? 10,
        maxZoom: options.maxZoom ?? defaultMaxZoom,
        maxBounds: options.maxBounds ? options.maxBounds.map((point) => [point[1], point[0]]) : undefined,
        attributionControl: false,
      });
      this._map.addControl(new maplibregl.AttributionControl({ compact: false }), 'bottom-right');
      this._map.on('load', () => {
        this._loaded = true;
        this._styleReady = true;
        this._flushPendingStyleLayers();
        this._readyCallbacks.splice(0).forEach((callback) => callback());
      });
      this._map.on('style.load', () => {
        this._styleReady = true;
        this._renderNativeLineGroups();
        this._styleLayers.forEach((layer) => this._pendingStyleLayers.add(layer));
        this._flushPendingStyleLayers();
      });
      window.__londontourMapDebug = {
        adapter: this,
        styleLayerIds: () => this._map.getStyle().layers.map((layer) => layer.id),
        nativeLineGroups: () => [...this._nativeLineGroups.entries()].map(([id, group]) => ({
          id,
          layerExists: Boolean(this._map.getLayer(id)),
          sourceExists: Boolean(this._map.getSource(id)),
          featureCount: group.data?.features?.length ?? 0,
          renderedFeatureCount: this._map.getLayer(id) ? this._map.queryRenderedFeatures(undefined, { layers: [id] }).length : 0,
          colors: [...new Set((group.data?.features || []).map((feature) => feature.properties?.color).filter(Boolean))],
          index: this._map.getStyle().layers.findIndex((layer) => layer.id === id),
        })),
        overlayLayers: () => [...this._styleLayers].map((layer) => ({
          id: layer.id,
          order: layer._overlayOrder(),
          pane: layer.options?.pane,
          color: this._map.getLayer(layer.id) ? this._map.getPaintProperty(layer.id, 'line-color') : null,
          opacity: this._map.getLayer(layer.id) ? this._map.getPaintProperty(layer.id, 'line-opacity') : null,
          width: this._map.getLayer(layer.id) ? this._map.getPaintProperty(layer.id, 'line-width') : null,
        })),
      };
    }
    getContainer() { return this._map.getContainer(); }
    createPane() {}
    getPane() { return { style: {} }; }
    invalidateSize() { this._map.resize(); }
    setView(center, zoom) { this._map.jumpTo({ center: toLngLat(center), zoom: zoom ?? this._map.getZoom() }); return this; }
    flyTo(center, zoom) { this._map.flyTo({ center: toLngLat(center), zoom: zoom ?? this._map.getZoom(), duration: 450 }); return this; }
    panTo(center) { this._map.panTo(toLngLat(center)); return this; }
    setZoom(zoom) { this._map.zoomTo(zoom); return this; }
    zoomIn() { this._map.zoomIn(); return this; }
    zoomOut() { this._map.zoomOut(); return this; }
    getZoom() { return Math.round(this._map.getZoom()); }
    getBounds() {
      const b = this._map.getBounds();
      return new Bounds([[b.getSouth(), b.getWest()], [b.getNorth(), b.getEast()]]);
    }
    fitBounds(bounds, options = {}) {
      const maplibreBounds = bounds?.toLngLatBounds ? bounds.toLngLatBounds() : new Bounds(bounds || []).toLngLatBounds();
      if (!maplibreBounds) return this;
      this._map.fitBounds(maplibreBounds, {
        padding: options.padding || {
          top: options.paddingTopLeft?.[1] || 64,
          left: options.paddingTopLeft?.[0] || 64,
          bottom: options.paddingBottomRight?.[1] || 64,
          right: options.paddingBottomRight?.[0] || 64,
        },
        maxZoom: options.maxZoom || defaultMaxZoom,
        duration: options.animate === false ? 0 : 450,
      });
      return this;
    }
    on(eventName, handler) {
      if (eventName === 'zoomend') this._map.on('zoomend', handler);
      else if (eventName === 'click') this._map.on('click', (event) => handler({ latlng: lngLatToLatLng(event.lngLat), originalEvent: event.originalEvent }));
      else this._map.on(eventName, handler);
      return this;
    }
    whenReady(callback) {
      if (this._loaded) callback();
      else this._readyCallbacks.push(callback);
      return this;
    }
    distance(a, b) { return pointDistanceMeters(a, b); }
    mouseEventToLatLng(event) {
      const rect = this.getContainer().getBoundingClientRect();
      return lngLatToLatLng(this._map.unproject([event.clientX - rect.left, event.clientY - rect.top]));
    }
    closePopup() {
      document.querySelectorAll('.maplibregl-popup').forEach((popup) => popup.remove());
    }
    _openPopup(point, html) {
      this.closePopup();
      return new maplibregl.Popup()
        .setLngLat(toLngLat(point))
        .setHTML(html || '')
        .addTo(this._map);
    }
    hasLayer(layer) { return this._layers.has(layer); }
    _addLayer(layer) { this._layers.add(layer); }
    _removeLayer(layer) { this._layers.delete(layer); }
    _addStyleLayer(layer) {
      this._styleLayers.add(layer);
      this._pendingStyleLayers.add(layer);
      this._flushPendingStyleLayers();
    }
    _removeStyleLayer(layer) {
      this._styleLayers.delete(layer);
      this._pendingStyleLayers.delete(layer);
    }
    _renderNativeLineGroups() {
      [...this._nativeLineGroups.keys()].forEach((id) => this._renderNativeLineGroup(id));
    }
    _renderNativeLineGroup(id) {
      if (!this._styleReady || !this._map.isStyleLoaded()) return;
      const group = this._nativeLineGroups.get(id);
      if (!group) return;

      if (this._map.getSource(id)) {
        this._map.getSource(id).setData(group.data);
      } else {
        this._map.addSource(id, { type: 'geojson', data: group.data });
      }

      if (!this._map.getLayer(id)) {
        const paint = {
          'line-color': ['case', ['has', 'color'], ['get', 'color'], group.fallbackColor || '#146c64'],
          'line-opacity': ['case', ['has', 'opacity'], ['get', 'opacity'], 1],
          'line-width': ['case', ['has', 'width'], ['get', 'width'], 3],
        };
        if (group.dashArray) paint['line-dasharray'] = group.dashArray;
        this._map.addLayer({
          id,
          type: 'line',
          source: id,
          paint,
          layout: { 'line-cap': 'round', 'line-join': 'round' },
        });
      }
    }
    setLineFeatureCollection(id, data, options = {}) {
      this._nativeLineGroups.set(id, { data, ...options });
      this._renderNativeLineGroup(id);
      this._sortOverlayLayers();
      return this;
    }
    removeLineFeatureCollection(id) {
      this._nativeLineGroups.delete(id);
      if (this._map.getLayer(id)) this._map.removeLayer(id);
      if (this._map.getSource(id)) this._map.removeSource(id);
      return this;
    }
    _flushPendingStyleLayers() {
      if (!this._styleReady || !this._map.isStyleLoaded()) return;
      [...this._pendingStyleLayers].forEach((layer) => {
        layer._addToStyle();
        this._pendingStyleLayers.delete(layer);
      });
      this._sortOverlayLayers();
    }
    _sortOverlayLayers() {
      if (!this._map.isStyleLoaded()) return;
      [...this._styleLayers]
        .filter((layer) => this._map.getLayer(layer.id))
        .sort((a, b) => a._overlayOrder() - b._overlayOrder())
        .forEach((layer) => {
          try {
            this._map.moveLayer(layer.id);
          } catch (_) {
            // Layer ordering is best-effort while styles are changing.
          }
        });
    }
    _setBasemapTheme(theme) {
      this._styleReady = false;
      this._map.setStyle(makeStyle(theme));
    }
  }

  class HtmlMarker {
    constructor(point, options = {}) {
      this.point = point;
      this.options = options;
      this.handlers = {};
      const wrapper = document.createElement('div');
      wrapper.className = options.icon?.className || '';
      wrapper.innerHTML = options.icon?.html || '';
      this.element = wrapper;
      this.marker = new maplibregl.Marker({ element: wrapper, anchor: 'center' }).setLngLat(toLngLat(point));
      wrapper.addEventListener('click', (event) => {
        event.stopPropagation();
        if (this.handlers.click) this.handlers.click({ originalEvent: event, latlng: latLng(this.point) });
        if (this.popupHtml) this.openPopup();
      });
    }
    addTo(map) { this.map = map; this.marker.addTo(map._map); map._addLayer(this); return this; }
    remove() { this.marker.remove(); this.map?._removeLayer(this); return this; }
    bindPopup(html) { this.popupHtml = html; return this; }
    getPopup() { return this.popupHtml ? {} : null; }
    openPopup() { if (!this.map || !this.popupHtml) return this; this.map._openPopup(this.point, this.popupHtml); return this; }
    on(eventName, handler) { this.handlers[eventName] = handler; return this; }
  }

  class PopupWrapper {
    setLatLng(point) { this.point = point; return this; }
    setContent(html) { this.html = html; return this; }
    openOn(map) { map._openPopup(this.point, this.html || ''); return this; }
  }

  class LineLayer {
    constructor(points, options = {}) {
      this.id = `adapter-line-${++layerIdCounter}`;
      this.points = points;
      this.options = options;
    }
    addTo(map) {
      this.map = map;
      map._addLayer(this);
      map._addStyleLayer(this);
      return this;
    }
    _addToStyle() {
      const map = this.map;
      if (!map || map._map.getLayer(this.id)) return;
      const segments = normaliseLineCoordinates(this.points);
      const data = {
        type: 'FeatureCollection',
        features: segments.map((coordinates) => ({ type: 'Feature', properties: {}, geometry: { type: 'LineString', coordinates } })),
      };
      map._map.addSource(this.id, { type: 'geojson', data });
      const paint = {
        'line-color': this.options.color || '#146c64',
        'line-opacity': this.options.opacity ?? 1,
        'line-width': this.options.weight || 3,
      };
      if (this.options.dashArray) {
        paint['line-dasharray'] = this.options.dashArray.split(/\s+/).map(Number);
      }

      map._map.addLayer({
        id: this.id,
        type: 'line',
        source: this.id,
        paint,
        layout: { 'line-cap': this.options.lineCap || 'round', 'line-join': this.options.lineJoin || 'round' },
      });
      map._sortOverlayLayers();
    }
    _overlayOrder() {
      if (this.options.overlayOrder) return this.options.overlayOrder;
      if (this.options.pane === 'tubeNetwork') return 20;
      if (this.options.dashArray) return 25;
      return 40;
    }
    remove() {
      if (this.map?._map.getLayer(this.id)) this.map._map.removeLayer(this.id);
      if (this.map?._map.getSource(this.id)) this.map._map.removeSource(this.id);
      this.map?._removeLayer(this);
      this.map?._removeStyleLayer(this);
      return this;
    }
    bindPopup() { return this; }
  }

  class CircleLayer extends LineLayer {
    constructor(point, options = {}) {
      const center = latLng(point);
      const radius = options.radius || 0;
      const coordinates = [];
      for (let i = 0; i <= 80; i += 1) {
        const angle = (i / 80) * Math.PI * 2;
        const dx = Math.cos(angle) * radius;
        const dy = Math.sin(angle) * radius;
        coordinates.push([center.lat + dy / 110540, center.lng + dx / (111320 * Math.cos((center.lat * Math.PI) / 180))]);
      }
      super(coordinates, options);
    }
  }

  class NoopLayer {
    addTo(map) { map._addLayer(this); return this; }
    remove() { return this; }
    once() { return this; }
    setUrl() { return this; }
  }

  class ZoomControl {
    constructor(options = {}) {
      this.options = options;
    }
    addTo(map) {
      this.map = map;
      const control = document.createElement('div');
      control.className = `leaflet-control leaflet-bar leaflet-control-zoom leaflet-control-zoom-${this.options.position || 'topright'}`;
      control.setAttribute('aria-label', 'Zoom controls');
      const zoomIn = document.createElement('button');
      zoomIn.className = 'leaflet-control-zoom-in';
      zoomIn.type = 'button';
      zoomIn.textContent = '+';
      zoomIn.setAttribute('aria-label', 'Zoom in');
      const zoomOut = document.createElement('button');
      zoomOut.className = 'leaflet-control-zoom-out';
      zoomOut.type = 'button';
      zoomOut.textContent = '−';
      zoomOut.setAttribute('aria-label', 'Zoom out');
      zoomIn.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        map.zoomIn();
      });
      zoomOut.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        map.zoomOut();
      });
      control.append(zoomIn, zoomOut);
      map.getContainer().append(control);
      this.control = control;
      map._addLayer(this);
      return this;
    }
    remove() {
      this.control?.remove();
      this.map?._removeLayer(this);
      return this;
    }
  }

  window.L = {
    map: (container, options) => new MapWrapper(container, options),
    marker: (point, options) => new HtmlMarker(point, options),
    circleMarker: (point, options = {}) => new HtmlMarker(point, {
      icon: {
        className: '',
        html: `<div class="adapter-circle-marker" style="--marker-size:${(options.radius || 5) * 2}px;--marker-fill:${options.fillColor || '#146c64'};--marker-stroke:${options.color || '#fff'}"></div>`,
      },
    }),
    divIcon: (options) => options,
    popup: () => new PopupWrapper(),
    polyline: (points, options) => new LineLayer(points, options),
    circle: (point, options) => new CircleLayer(point, options),
    latLng,
    latLngBounds: (points = []) => new Bounds(points),
    layerGroup: () => new NoopLayer(),
    tileLayer: () => new NoopLayer(),
    svg: () => ({}),
    control: { zoom: (options) => new ZoomControl(options) },
  };
})();
