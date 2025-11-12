class SubmissionSubmission extends HTMLElement {
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
        }

        input, textarea, select {
          width: 100%;
          padding: 0.5rem;
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
            Title:
            <input type="text" name="title" required>
          </label>

          <label>
            Description:
            <textarea name="description" rows="5" required></textarea>
          </label>

          <label>
            Category:
            <select name="category" required>
              <option value="">Select one</option>
              <option value="resource">Resource</option>
              <option value="event">Event</option>
            </select>
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
      alert('Submission received! (Placeholder — hook into dispatcher or backend here.)');
    });
  }
}

customElements.define('submission-submission', SubmissionSubmission);
