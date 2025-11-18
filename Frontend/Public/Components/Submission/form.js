class SubmissionForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    this.shadowRoot.innerHTML = `
      <style>
        .formContainer { margin: 2rem auto; width: 60%; padding: 2rem; border-radius: 20px;
          box-shadow: 2px 2px 10px 1px black; background-color: white; font-family: sans-serif; }
        h2 { text-align: center; margin-bottom: 1rem; }
        form { display: flex; flex-direction: column; gap: 1rem; }
        label { display: flex; flex-direction: column; gap: 0.25rem; }
        input, textarea, select { width: 100%; box-sizing: border-box; padding: 0.5rem;
          border-radius: 8px; border: 1px solid #ccc; font-size: 1rem; }
        button { padding: 0.75rem; border: none; border-radius: 10px; background-color: #2c3e50;
          color: white; font-size: 1rem; cursor: pointer; }
        button:hover { background-color: #34495e; }
        .hidden { display: none; }
      </style>

      <div class="formContainer">
        <h2>Submit a Resource or Event</h2>
        <form id="submissionForm">
          <label>Company Name:<input type="text" name="company" required></label>
          <label>Title:<input type="text" name="title" required></label>
          <label>Description:<textarea name="description" rows="5" required></textarea></label>
          <label>Type:
            <select name="type" id="typeSelect" required>
              <option value="">Select one</option>
              <option value="resource">Resource</option>
              <option value="event">Event</option>
            </select>
          </label>
          <label id="dateLabel" class="hidden">Event Date:<input type="date" name="eventDate"></label>
          <label>Category:<input type="text" name="category" required></label>
          <label>Location:<input type="text" name="location" required></label>
          <label>Image URL (optional):<input type="url" name="image"></label>
          <button type="submit">Submit</button>
        </form>
      </div>
    `;

    const form = this.shadowRoot.querySelector('#submissionForm');
    const typeSelect = this.shadowRoot.querySelector('#typeSelect');
    const dateLabel = this.shadowRoot.querySelector('#dateLabel');

    typeSelect.addEventListener('change', () => {
      if (typeSelect.value === 'event') {
        dateLabel.classList.remove('hidden');
        dateLabel.querySelector('input').required = true;
      } else {
        dateLabel.classList.add('hidden');
        dateLabel.querySelector('input').required = false;
      }
    });

    form.addEventListener('submit', async e => {
      e.preventDefault();
      const formData = new FormData(form);
      const submission = Object.fromEntries(formData.entries());

      // Add default Approved field
      submission.Approved = "False";

      try {
        const resp = await fetch('/api/submissions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(submission)
        });
        const json = await resp.json();
        if (json && json.success) {
          alert('Submission received! It will appear in the admin queue for review.');
          form.reset();
          dateLabel.classList.add('hidden');
        } else {
          throw new Error(json.error || 'Unknown error');
        }
      } catch (err) {
        console.error('Submission error', err);
        alert('Submission failed. Please try again later.');
      }
    });
  }
}

customElements.define('submission-form', SubmissionForm);
