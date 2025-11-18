class AdminSubmissions extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        .grid { display: grid; gap: 0.75rem; }
        .item { border: 1px solid #e5e7eb; border-radius: 10px; padding: 0.75rem; background: #fff; }
        .meta { display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.5rem; font-size: 0.9rem; color: #334155; }
        .actions { display: flex; gap: 0.5rem; margin-top: 0.5rem; }
        button { border: none; border-radius: 8px; padding: 0.5rem 0.75rem; cursor: pointer; }
        .approve { background: #16a34a; color: #fff; }
        .revoke { background: #ef4444; color: #fff; }
        select, input { padding: 0.4rem; border: 1px solid #cbd5e1; border-radius: 8px; }
        .status { font-size: 0.85rem; color: #64748b; margin-top: 0.25rem; }
        .search { display: flex; gap: 0.5rem; margin-bottom: 0.75rem; }
      </style>
      <div class="search">
        <input id="q" placeholder="Search title/company/category..." />
        <select id="type"><option value="">All</option><option value="event">Event</option><option value="resource">Resource</option></select>
        <select id="approved"><option value="">Any</option><option value="True">Approved</option><option value="False">Pending</option></select>
        <button id="refresh">Refresh</button>
      </div>
      <div id="list" class="grid"></div>
    `;

    this.list = this.shadowRoot.querySelector('#list');
    this.shadowRoot.querySelector('#refresh').addEventListener('click', () => this.load());
    this.shadowRoot.querySelector('#q').addEventListener('input', () => this.render());
    this.shadowRoot.querySelector('#type').addEventListener('change', () => this.render());
    this.shadowRoot.querySelector('#approved').addEventListener('change', () => this.render());
    this.items = [];
  }

  async connectedCallback() {
    await this.load();
  }

  async load() {
    try {
      const resp = await fetch('/api/submissions');
      const data = await resp.json();
      this.items = Array.isArray(data) ? data : [];
      this.render();
    } catch (e) {
      console.error('Failed to load submissions', e);
      this.list.innerHTML = `<p>Failed to load submissions.</p>`;
    }
  }

  filter(items) {
    const q = this.shadowRoot.querySelector('#q').value.trim().toLowerCase();
    const type = this.shadowRoot.querySelector('#type').value;
    const approved = this.shadowRoot.querySelector('#approved').value;
    return items.filter(it => {
      const text = `${it.title} ${it.company} ${it.category}`.toLowerCase();
      const matchQ = !q || text.includes(q);
      const matchType = !type || it.type === type;
      const matchApproved = !approved || it.Approved === approved;
      return matchQ && matchType && matchApproved;
    });
  }

  render() {
    const items = this.filter(this.items);
    this.list.innerHTML = items.map(it => this.renderItem(it)).join('');
    // Attach handlers after rendering
    items.forEach(it => {
      this.shadowRoot.querySelector(`#approve-${it.id}`)?.addEventListener('click', () => this.setApproved(it.id, 'True'));
      this.shadowRoot.querySelector(`#revoke-${it.id}`)?.addEventListener('click', () => this.setApproved(it.id, 'False'));
      this.shadowRoot.querySelector(`#highlight-${it.id}`)?.addEventListener('change', (e) => this.setHighlight(it.id, e.target.value));
    });
  }

  renderItem(it) {
    const eventDate = it.eventDate ? `<div><strong>Event Date:</strong> ${it.eventDate}</div>` : '';
    return `
      <div class="item">
        <div class="meta">
          <div><strong>Type:</strong> ${it.type}</div>
          <div><strong>Company:</strong> ${it.company}</div>
          <div><strong>Title:</strong> ${it.title}</div>
          <div><strong>Category:</strong> ${it.category}</div>
          <div><strong>Location:</strong> ${it.location}</div>
          <div><strong>Community:</strong> ${it.community || it.Community || ''}</div>
          ${eventDate}
        </div>
        <div class="status">Approved: ${it.Approved || 'False'} | Highlight: ${it.Highlight || 'None'}</div>
        <div class="actions">
          <button id="approve-${it.id}" class="approve">Approve</button>
          <button id="revoke-${it.id}" class="revoke">Revoke</button>
          <select id="highlight-${it.id}">
            <option value="None" ${it.Highlight === 'None' ? 'selected' : ''}>None</option>
            <option value="Main" ${it.Highlight === 'Main' ? 'selected' : ''}>Main</option>
            <option value="Sub" ${it.Highlight === 'Sub' ? 'selected' : ''}>Sub</option>
          </select>
        </div>
      </div>
    `;
  }

  async setApproved(id, value) {
    try {
      const resp = await fetch(`/api/submissions/${id}/approve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Approved: value })
      });
      const json = await resp.json();
      if (json.success) {
        this.items = this.items.map(x => x.id === id ? { ...x, Approved: value } : x);
        this.render();
      }
    } catch (e) {
      console.error('Approve failed', e);
    }
  }

  async setHighlight(id, value) {
    try {
      const resp = await fetch(`/api/submissions/${id}/highlight`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Highlight: value })
      });
      const json = await resp.json();
      if (json.success) {
        this.items = this.items.map(x => x.id === id ? { ...x, Highlight: value } : x);
        this.render();
      }
    } catch (e) {
      console.error('Highlight failed', e);
    }
  }
}

customElements.define('admin-submissions', AdminSubmissions);
