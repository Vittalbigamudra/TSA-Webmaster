class HomeSubmission extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });

    shadow.innerHTML = `
      <style>
        .inviteBox {
          margin: 2%;
          padding: 2rem;
          height: 300px;
          width: 92.5%;
          border-radius: 20px;
          box-shadow: 2px 2px 10px 1px black;
          background-color: white;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          font-family: sans-serif;
          text-align: center;
        }

        .inviteBox h2 {
          margin-bottom: 1rem;
        }

        .inviteButton {
          padding: 0.75rem 1.5rem;
          font-size: 1rem;
          border: none;
          border-radius: 10px;
          background-color: #2c3e50;
          color: white;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .inviteButton:hover {
          background-color: #34495e;
        }
      </style>

      <div class="inviteBox">
        <h2>Have something to share?</h2>
        <p>Submit a resource or event to help the community grow.</p>
        <button class="inviteButton" onclick="">Submit Now</button>
      </div>
    `;

    shadow.querySelector('.inviteButton').addEventListener('click', () => {
      window.location.href = '/Frontend/Public/Site/submission.html';
    });
  }
}

customElements.define('home-submission', HomeSubmission);
