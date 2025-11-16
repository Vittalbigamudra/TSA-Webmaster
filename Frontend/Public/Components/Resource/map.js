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

  this.map = new maplibregl.Map({
    container: this.container,
    style: this.getAttribute('style-url') || defaultStyle,
    center: this.getAttribute('center') ? JSON.parse(this.getAttribute('center')) : [0, 0],
    zoom: this.getAttribute('zoom') ? parseFloat(this.getAttribute('zoom')) : 2
  });
}


  disconnectedCallback() {
    if (this.map) {
      this.map.remove();
    }
  }
}

customElements.define('resources-map', ResourcesMap);
