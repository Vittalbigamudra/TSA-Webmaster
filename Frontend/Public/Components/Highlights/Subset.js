class HighlightSubset extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
    this.render();

    // Re-render when highlights change elsewhere (storage or custom event)
    window.addEventListener('storage', (e) => {
      if (e.key === 'highlights') this.render();
    });
    window.addEventListener('highlights-updated', () => this.render());
  }

  async getHighlights() {
    try {
      const resp = await fetch('/api/highlights');
      if (resp.ok) {
        const json = await resp.json();
        // normalize shape
        return (json || []).map((h, i) => ({ id: h.id || `h-${i+1}`, image: h.image || 'resourceimage.jpg', text: h.description || h.text || h.title || '', link: h.link || '' }));
      }
    } catch (err) {
      // network fail - fallback to localStorage
    }

    try {
      const raw = localStorage.getItem('highlights');
      if (raw) return JSON.parse(raw);
    } catch (err) {
      // ignore parse errors
    }

    const defaults = Array.from({ length: 6 }).map((_, i) => ({
      id: `h-${i + 1}`,
      image: 'resourceimage.jpg',
      text: 'Quick highlight of community resources and programs available in Forsyth County.',
      link: ''
    }));
    try { localStorage.setItem('highlights', JSON.stringify(defaults)); } catch (e) {}
    return defaults;
  }

  async render() {
    const highlights = await this.getHighlights();

    this.shadow.innerHTML = `
      <style>
        .highlight-container {
          display: flex;
          justify-content: center;
          gap: 1rem;
          flex-wrap: wrap;
          margin: 2rem auto;
          max-width: 100%;
        }
        .highlight-card {
          width: 300px;
          height: 400px;
          border-radius: 12px;
          box-shadow: 2px 2px 10px rgba(0,0,0,0.2);
          background-color: #fff;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }
        .highlight-card img {
          width: 100%;
          height: 60%;
          object-fit: cover;
        }
        .highlight-card p {
          padding: 1rem;
          text-align: center;
          font-family: sans-serif;
          font-size: 1rem;
        }
      </style>
      <div class="highlight-container">
        ${highlights.map(h => `
          <div class="highlight-card" data-id="${h.id}">
            <a href="${h.link || '#'}" target="_blank" rel="noopener noreferrer">
              <img src="${h.image}" alt="Highlight Image">
            </a>
            <p>${h.text}</p>
          </div>
        `).join('')}
      </div>
    `;
  }
}

customElements.define('highlight-subset', HighlightSubset);
