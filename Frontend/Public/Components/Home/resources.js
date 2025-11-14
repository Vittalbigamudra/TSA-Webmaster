class HomeResources extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });

    shadow.innerHTML = `
      <style>
        .resource-grid {
          width: 100%;
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 2rem;
          align-items: start;
          max-width: 1000px;
          max-height: 700px;
          margin: 2rem auto;
          padding: 1rem;
        }

        .text-content h1 {
          witdh: 400px;
          margin: 0 0 0.5rem;
          font-size: 4rem;
        }

        .text-content p {
          width: 500px;
          margin: 0;
          color: #444;
          line-height: 1.6;
          font-size 125%
        }

        .image-content img {
          height: 400px;
          width: 100%;
          border-radius: 8px;
        }
      </style>

      <div class="resource-grid">
        <div class="text-content">
          <h1>Resources</h1>
          <p>
            Forsyth County, Georgia offers a wide range of community resources including emergency housing, food assistance, mental health services, and senior support. Residents can access help through organizations like United Way, Forsyth County Senior Services, and the local library system, which provides a comprehensive Community Resource Guide. Programs include food pantries, Meals on Wheels, mental health hotlines, child safety initiatives, and educational support. Families benefit from services like Safe Kids Forsyth and Community Connection, while seniors have access to transportation, recreation, and caregiver resources. The county also provides crisis intervention, domestic violence support, and legal aid referrals.
          </p>
        </div>
        <div class="image-content">
          <img src="resourceimage.jpg" alt="Placeholder image" />
        </div>
      </div>

    `;
  }

}

customElements.define('home-resources', HomeResources);
