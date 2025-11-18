// List all submissions (used by all components)
adminApp.get('/api/submissions', (req, res) => {
  try {
    const rows = require('../../db').getSubmissions.all();
    res.json(rows);
  } catch (e) {
    res.status(500).json({ error: 'Failed to load' });
  }
});

// Approve/revoke
adminApp.post('/api/submissions/:id/approve', (req, res) => {
  const { Approved } = req.body; // "True" or "False"
  try {
    require('../../db').updateApproved.run(Approved, req.params.id);
    res.json({ success: true });
  } catch {
    res.status(500).json({ success: false });
  }
});

// Set highlight
adminApp.post('/api/submissions/:id/highlight', (req, res) => {
  const { Highlight } = req.body; // "None" | "Main" | "Sub"
  try {
    require('../../db').updateHighlight.run(Highlight, req.params.id);
    res.json({ success: true });
  } catch {
    res.status(500).json({ success: false });
  }
});

// Edit resource/event fields
adminApp.patch('/api/submissions/:id', (req, res) => {
  const { title, category, location } = req.body;
  try {
    require('../../db').updateFields.run(title, category, location, req.params.id);
    res.json({ success: true });
  } catch {
    res.status(500).json({ success: false });
  }
});

// Delete
adminApp.delete('/api/submissions/:id', (req, res) => {
  try {
    require('../../db').deleteSubmission.run(req.params.id);
    res.json({ success: true });
  } catch {
    res.status(500).json({ success: false });
  }
});
