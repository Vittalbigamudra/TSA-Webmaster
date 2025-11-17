import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

class ResourcesMap extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });

    shadow.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          height: 100vh;
        }
        #map {
          width: 100%;
          height: 100%;
        }
      </style>
      <div id="map"></div>
    `;

    this.container = shadow.querySelector('#map');
  }

  connectedCallback() {
    const apiKey = import.meta.env.VITE_MAPTILER_KEY;
    const defaultStyle = `https://api.maptiler.com/maps/streets/style.json?key=${apiKey}`;

    // Parse attributes or fall back to defaults
    const centerAttr = this.getAttribute('center');
    const zoomAttr = this.getAttribute('zoom');

    // Correct order: [longitude, latitude]
    const defaultCenter = [-84.1435, 34.2359];

    const center = centerAttr ? JSON.parse(centerAttr) : defaultCenter;
    const zoom = zoomAttr ? parseFloat(zoomAttr) : 10;

    this.map = new maplibregl.Map({
      container: this.container,
      style: this.getAttribute('style-url') || defaultStyle,
      center,
      zoom
    });

    // Add navigation controls
    this.map.addControl(new maplibregl.NavigationControl());

    // Add a marker at the center
    new maplibregl.Marker()
      .setLngLat(center)
      .addTo(this.map);
  }

  disconnectedCallback() {
    if (this.map) {
      this.map.remove();
    }
  }
}

customElements.define('resources-map', ResourcesMap);
