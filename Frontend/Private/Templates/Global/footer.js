class GlobalFooter extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });

    shadow.innerHTML = `
      <style>
        footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background-color: #2c3e50;
          color: #ecf0f1;
          padding: 0.75rem 1.5rem;
          font-family: sans-serif;
          font-size: 0.9rem;
        }
        .contact {
          display: flex;
          gap: 1rem;
        }
        a {
          color: #ecf0f1;
          text-decoration: none;
        }
        a:hover {
          text-decoration: underline;
        }
      </style>
      <footer>
        <div>&copy; ${new Date().getFullYear()} Community Hub</div>
        <div class="contact">
          <a href="mailto:contact@communityhub.org">Email</a>
          <a href="tel:+1234567890">Call</a>
        </div>
      </footer>
    `;
  }
}

customElements.define('global-footer', GlobalFooter);
