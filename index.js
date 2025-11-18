const express = require('express');
const path = require('path');
const { addSubmission, getSubmissions } = require('./db');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Serve built frontend
app.use(express.static(path.join(__dirname, 'Frontend/dist')));

// Default route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'Frontend/dist', 'index.html'));
});

// --- API route for submissions ---
app.post('/api/submissions', (req, res) => {
  try {
    const submission = req.body;
    addSubmission(submission);
    res.json({ success: true });
  } catch (err) {
    console.error('DB insert error', err);
    res.status(500).json({ success: false, error: 'Database error' });
  }
});

app.listen(port, () => {
  console.log(`Main site running at http://localhost:${port}`);
});

// --- SysAdmin App ---
const adminApp = express();
const adminPort = process.env.ADMIN_PORT || 4000;

adminApp.use(express.static(path.join(__dirname, 'Frontend/Private/SystemAdmin')));
adminApp.use(express.json());

adminApp.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'Frontend/Private/SystemAdmin', 'sysadmin.html'));
});

// Example API route for sysadmin dashboard
adminApp.get('/api/submissions', (req, res) => {
  const rows = getSubmissions.all();
  res.json(rows);
});

adminApp.listen(adminPort, () => {
  console.log(`SysAdmin running at http://localhost:${adminPort}`);
});
