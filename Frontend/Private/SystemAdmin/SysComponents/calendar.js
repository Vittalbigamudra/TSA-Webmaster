class AdminCalendar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        .wrap { display: grid; gap: 0.75rem; }
        .event { border: 1px solid #e5e7eb; border-radius: 10px; padding: 0.75rem; background: #fff; }
        .date { font-weight: 600; color: #334155; }
      </style>
      <div class="wrap" id="list"></div>
    `;
    this.list = this.shadowRoot.querySelector('#list');
    this.items = [];
  }

  async connectedCallback() {
    await this.load();
  }

  async load() {
    try {
      const resp = await fetch('/api/submissions');
      const data = await resp.json();
      this.items = (Array.isArray(data) ? data : [])
        .filter(d => d.type === 'event' && d.Approved === 'True')
        .sort((a, b) => (a.eventDate || '').localeCompare(b.eventDate || ''));
      this.render();
    } catch (e) {
      console.error('Load calendar failed', e);
    }
  }

  render() {
    if (!this.items.length) {
      this.list.innerHTML = `<p>No approved events.</p>`;
      return;
    }
    this.list.innerHTML = this.items.map(it => `
      <div class="event">
        <div class="date">${it.eventDate || 'TBD'}</div>
        <div><strong>${it.title}</strong> — ${it.company}</div>
        <div>${it.location}</div>
        <div>${it.category}</div>
      </div>
    `).join('');
  }
}

customElements.define('admin-calendar', AdminCalendar);
