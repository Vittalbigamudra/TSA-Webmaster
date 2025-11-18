class AboutAbout extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    this.shadowRoot.innerHTML = `
      <style>
        .container {
          margin: 2rem auto;
          width: 80%;
          padding: 2rem;
          border-radius: 20px;
          box-shadow: 2px 2px 10px 1px black;
          background-color: white;
          font-family: sans-serif;
          line-height: 1.6;
        }

        h2, h3 {
          text-align: center;
          margin-bottom: 1rem;
          color: #2c3e50;
        }

        section {
          margin-bottom: 2rem;
        }

        p {
          text-align: justify;
        }

        ul {
          list-style: disc;
          margin-left: 2rem;
        }
      </style>

      <div class="container">
        <h2>About the Community Hub</h2>

        <section>
          <h3>Our Mission</h3>
          <p>
            The Community Hub was created to empower students, educators, and innovators by providing
            a centralized space for resources, events, and collaboration. We believe that knowledge
            should be accessible, tools should be simple, and opportunities should be shared widely.
          </p>
        </section>

        <section>
          <h3>Our Vision</h3>
          <p>
            We envision a future where communities thrive through open collaboration, where technology
            is used to simplify rather than complicate, and where every member has the ability to
            contribute meaningfully to shared growth. The Hub is designed to be a living platform —
            evolving with the needs of its users.
          </p>
        </section>

        <section>
          <h3>Our Values</h3>
          <ul>
            <li><strong>Simplicity:</strong> Tools and workflows should be intuitive and accessible.</li>
            <li><strong>Collaboration:</strong> Growth happens when ideas are shared and built together.</li>
            <li><strong>Privacy:</strong> Respecting user data and ensuring secure participation.</li>
            <li><strong>Innovation:</strong> Encouraging creative solutions and new approaches to challenges.</li>
            <li><strong>Community:</strong> Building connections that last beyond individual projects.</li>
          </ul>
        </section>

        <section>
          <h3>Our Story</h3>
          <p>
            The Hub began as a student-led initiative during competitive web development events,
            where the need for a modular, resource-driven platform became clear. Over time, it grew
            into a fully realized project that integrates modern web technologies, dispatcher-based
            workflows, and a commitment to extensibility. Today, it stands as a showcase of what
            motivated teams can achieve when they combine technical skill with community spirit.
          </p>
        </section>

        <section>
          <h3>Community Impact</h3>
          <p>
            Beyond competitions, the Community Hub serves as a model for how digital platforms can
            support real-world collaboration. From sharing educational resources to highlighting
            local events, the Hub is designed to scale — whether it’s used by a classroom, a club,
            or an entire organization. Every submission, every highlight, and every shared resource
            contributes to a growing library of knowledge and opportunities.
          </p>
        </section>
      </div>
    `;
  }
}

customElements.define('about-about', AboutAbout);
