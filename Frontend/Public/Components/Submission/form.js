class SubmissionForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    this.shadowRoot.innerHTML = `
      <style>
        .formContainer {
          margin: 2rem auto;
          width: 60%;
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

        form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          flex-shrink: 100;
        }

        label {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }


        input, textarea, select {
          width: 100%;
          box-sizing: border-box; /* ensures padding/border are included in width */
          padding-top: 0.5rem;
          padding-bottom: 0.5rem;
          padding-left: 0.5rem;
          padding-right: 0.5rem;          
          border-radius: 8px;
          border: 1px solid #ccc;
          font-size: 1rem;
        }

        button {
          padding: 0.75rem;
          border: none;
          border-radius: 10px;
          background-color: #2c3e50;
          color: white;
          font-size: 1rem;
          cursor: pointer;
        }

        button:hover {
          background-color: #34495e;
        }
      </style>

      <div class="formContainer">
        <h2>Submit a Resource or Event</h2>
        <form id="submissionForm">
          <label>
            Company Name:
            <input type="text" name="company" required>
          </label>

          <label>
            Title:
            <input type="text" name="title" required>
          </label>

          <label>
            Description:
            <textarea name="description" rows="5" required></textarea>
          </label>

          <label>
            Type:
            <select name="type" required>
              <option value="">Select one</option>
              <option value="resource">Resource</option>
              <option value="event">Event</option>
            </select>
          </label>

          <label>
            Category:
            <input type="text" name="category" placeholder="e.g. Technology, Education, Networking" required>
          </label>

          <label>
            Location:
            <input type="text" name="location" placeholder="City, State or Online" required>
          </label>

          <label>
            Community Name:
            <input type="text" name="Comunnity" placeholder="Interesting County" required>
          </label>

          <label>
            Image URL (optional):
            <input type="url" name="image">
          </label>

          <button type="submit">Submit</button>
        </form>
      </div>
    `;

    this.shadowRoot.querySelector('#submissionForm').addEventListener('submit', e => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const submission = Object.fromEntries(formData.entries());

      console.log('Submission received:', submission);
      alert('Submission received! (Placeholder — hook into dispatcher or backend here.)');
    });
  }
}

customElements.define('submission-form', SubmissionForm);
