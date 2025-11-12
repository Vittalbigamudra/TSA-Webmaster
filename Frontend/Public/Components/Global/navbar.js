class GlobalNavbar extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });

    shadow.innerHTML = `
      <style>
        nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background-color: #2c3e50;
          padding: 0.75rem 1.5rem;
          font-family: sans-serif;
        }
        .logo {
          color: #ecf0f1;
          font-size: 1.5rem;
          font-weight: bold;
        }
        ul {
          list-style: none;
          display: flex;
          gap: 1rem;
          margin: 0;
          padding: 0;
        }
        li a {
          color: #ecf0f1;
          text-decoration: none;
          font-weight: 500;
        }
        li a:hover {
          text-decoration: underline;
        }
      </style>
      <nav>
        <div class="logo">Community Hub</div>
        <ul>
          <li><a href="index.html">Home</a></li>
          <li><a href="resources.html">Resources</a></li>
          <li><a href="highlights.html">Highlights</a></li>
          <li><a href="submission.html">Submit</a></li>
          <li><a href="about.html">About</a></li>
          <li><a href="contact.html">Contact</a></li>
        </ul>
      </nav>
    `;
  }
}

customElements.define('global-navbar', GlobalNavbar);
