class HighlightMain extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });

    shadow.innerHTML = `
      <style>
        .main-highlight {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          align-items: center;
          max-width: 1000px;
          margin: 2rem auto;
          padding: 1rem;
        }
        .main-highlight h1 {
          font-size: 3rem;
          margin-bottom: 1rem;
        }
        .main-highlight p {
          font-size: 1.2rem;
          line-height: 1.6;
          color: #444;
        }
        .main-highlight img {
          width: 100%;
          height: 400px;
          object-fit: cover;
          border-radius: 8px;
        }
      </style>
      <div class="main-highlight">
        <div class="text-content">
          <h1>Main Highlight</h1>
          <p>
            Forsyth County, Georgia offers a wide range of community resources including emergency housing, food assistance, mental health services, and senior support. Programs like United Way, Safe Kids Forsyth, and Meals on Wheels ensure families and seniors have access to vital support.
          </p>
        </div>
        <div class="image-content">
          <img src="resourceimage.jpg" alt="Main Highlight Image">
        </div>
      </div>
    `;
  }
}

customElements.define('highlight-main', HighlightMain);
