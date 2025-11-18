class AdminResources extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        .grid { display: grid; gap: 0.75rem; }
        .item { border: 1px solid #e5e7eb; border-radius: 10px; padding: 0.75rem; background: #fff; }
        .controls { display: flex; gap: 0.5rem; margin-top: 0.5rem; }
        input, select { padding: 0.4rem; border: 1px solid #cbd5e1; border-radius: 8px; }
        button { border: none; border-radius: 8px; padding: 0.45rem 0.7rem; cursor: pointer; }
        .save { background: #2563eb; color: #fff; }
        .delete { background: #ef4444; color: #fff; }
      </style>
      <div class="grid" id="list"></div>
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
      this.items = (Array.isArray(data) ? data : []).filter(d => d.type === 'resource');
      this.render();
    } catch (e) {
      console.error('Load resources failed', e);
    }
  }

  render() {
    this.list.innerHTML = this.items.map(it => `
      <div class="item">
        <div><strong>${it.title}</strong> — ${it.company}</div>
        <div>Category: ${it.category} • Location: ${it.location}</div>
        <div class="controls">
          <input data-id="${it.id}" name="title" value="${it.title}" />
          <input data-id="${it.id}" name="category" value="${it.category}" />
          <input data-id="${it.id}" name="location" value="${it.location}" />
          <button class="save" data-id="${it.id}">Save</button>
          <button class="delete" data-id="${it.id}">Delete</button>
        </div>
      </div>
    `).join('');

    this.shadowRoot.querySelectorAll('.save').forEach(btn => {
      btn.addEventListener('click', () => this.saveItem(btn.dataset.id));
    });
    this.shadowRoot.querySelectorAll('.delete').forEach(btn => {
      btn.addEventListener('click', () => this.deleteItem(btn.dataset.id));
    });
  }

  collect(id) {
    const inputs = Array.from(this.shadowRoot.querySelectorAll(`[data-id="${id}"]`))
      .filter(el => el.tagName === 'INPUT');
    const update = {};
    inputs.forEach(i => { update[i.name] = i.value; });
    return update;
  }

  async saveItem(id) {
    const payload = this.collect(id);
    try {
      const resp = await fetch(`/api/submissions/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const json = await resp.json();
      if (json.success) await this.load();
    } catch (e) {
      console.error('Save resource failed', e);
    }
  }

  async deleteItem(id) {
    if (!confirm('Delete this resource?')) return;
    try {
      const resp = await fetch(`/api/submissions/${id}`, { method: 'DELETE' });
      const json = await resp.json();
      if (json.success) {
        this.items = this.items.filter(x => x.id != id);
        this.render();
      }
    } catch (e) {
      console.error('Delete resource failed', e);
    }
  }
}

customElements.define('admin-resources', AdminResources);
