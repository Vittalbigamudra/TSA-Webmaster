class HighlightSubset extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });

    shadow.innerHTML = `
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
        ${this.generateCards(6)}
      </div>
    `;
  }

  generateCards(count) {
    const imageSrc = 'resourceimage.jpg';
    const text = `Quick highlight of community resources and programs available in Forsyth County.`;

    return Array.from({ length: count }).map(() => `
      <div class="highlight-card">
        <img src="${imageSrc}" alt="Highlight Image">
        <p>${text}</p>
      </div>
    `).join('');
  }
}

customElements.define('highlight-subset', HighlightSubset);
