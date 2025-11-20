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
          font-family: sans-serif;
        }
        #map {
          width: 100%;
          height: 100%;
          position: relative;
        }
        .searchContainer {
          position: absolute;
          top: 1rem;
          left: 50%;
          transform: translateX(-50%);
          background-color: white;
          padding: 0.75rem 1rem;
          border-radius: 12px;
          box-shadow: 2px 2px 10px rgba(0,0,0,0.3);
          display: flex;
          gap: 0.5rem;
          align-items: center;
          width: 60%;
          max-width: 500px;
        }
        .searchContainer input {
          flex: 1;
          padding: 0.5rem;
          border-radius: 8px;
          border: 1px solid #ccc;
          font-size: 1rem;
        }
        .searchContainer button {
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 8px;
          background-color: #2c3e50;
          color: white;
          font-size: 1rem;
          cursor: pointer;
        }
        .searchContainer button:hover {
          background-color: #34495e;
        }
      </style>
      <div id="map">
        <div class="searchContainer">
          <input type="text" id="searchInput" placeholder="Search location...">
          <button id="searchBtn">Go</button>
        </div>
      </div>
    `;

    this.container = shadow.querySelector('#map');
    this.searchInput = shadow.querySelector('#searchInput');
    this.searchBtn = shadow.querySelector('#searchBtn');
  }

  connectedCallback() {
    const apiKey = import.meta.env.VITE_MAPTILER_KEY;
    const defaultStyle = `https://api.maptiler.com/maps/streets/style.json?key=${apiKey}`;

    const centerAttr = this.getAttribute('center');
    const zoomAttr = this.getAttribute('zoom');
    const defaultCenter = [-84.1435, 34.2359];

    const center = centerAttr ? JSON.parse(centerAttr) : defaultCenter;
    const zoom = zoomAttr ? parseFloat(zoomAttr) : 10;

    this.map = new maplibregl.Map({
      container: this.container,
      style: this.getAttribute('style-url') || defaultStyle,
      center,
      zoom
    });

    this.map.addControl(new maplibregl.NavigationControl());

    this.marker = new maplibregl.Marker().setLngLat(center).addTo(this.map);

    // Search button handler
    this.searchBtn.addEventListener('click', async () => {
      const query = this.searchInput.value.trim();
      if (!query) return;

      try {
        // Use MapTiler geocoding API
        const resp = await fetch(
          `https://api.maptiler.com/geocoding/${encodeURIComponent(query)}.json?key=${apiKey}`
        );
        const data = await resp.json();
        if (data.features && data.features.length > 0) {
          const [lng, lat] = data.features[0].geometry.coordinates;
          this.map.flyTo({ center: [lng, lat], zoom: 12 });
          this.marker.setLngLat([lng, lat]);
        } else {
          alert('Location not found.');
        }
      } catch (err) {
        console.error('Search error', err);
        alert('Search failed. Please try again.');
      }
    });
  }

  disconnectedCallback() {
    if (this.map) {
      this.map.remove();
    }
  }
}

customElements.define('resources-map', ResourcesMap);