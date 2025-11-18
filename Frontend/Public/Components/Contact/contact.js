class ContactContact extends HTMLElement {
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
        }
        h2 {
          text-align: center;
          margin-bottom: 1rem;
        }
        .section {
          margin-bottom: 1.5rem;
        }
        ul {
          list-style: none;
          padding: 0;
        }
        li {
          margin: 0.5rem 0;
        }
        strong {
          color: #2c3e50;
        }
      </style>

      <div class="container">
        <h2>Contact Us</h2>
        <div class="section">
          <p>For general inquiries, reach us at:</p>
          <ul>
            <li><strong>Email:</strong> communityhub@example.com</li>
            <li><strong>Phone:</strong> (555) 123-4567</li>
          </ul>
        </div>

        <div class="section">
          <h3>Emergency Contacts & Helplines</h3>
          <ul>
            <li><strong>Emergency Services (US):</strong> 911</li>
            <li><strong>National Suicide Prevention Lifeline:</strong> 988</li>
            <li><strong>Crisis Text Line:</strong> Text HOME to 741741</li>
            <li><strong>Local Police (Non-Emergency):</strong> (555) 987-6543</li>
          </ul>
        </div>
      </div>
    `;
  }
}

customElements.define('contact-contact', ContactContact);
