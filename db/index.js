const Database = require('better-sqlite3');
const db = new Database('tsa.sqlite');

db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

// --- Schema ---
db.prepare(`
  CREATE TABLE IF NOT EXISTS submissions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT NOT NULL,
    company TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    location TEXT NOT NULL,
    image TEXT,
    eventDate TEXT,
    Approved TEXT DEFAULT 'False',
    Highlight TEXT DEFAULT 'None',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`).run();

// --- Prepared statements ---
const insertEvent = db.prepare(`
  INSERT INTO submissions (type, company, title, description, category, location, image, eventDate)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?)
`);

const insertResource = db.prepare(`
  INSERT INTO submissions (type, company, title, description, category, location, image)
  VALUES (?, ?, ?, ?, ?, ?, ?)
`);

const getSubmissions = db.prepare(`SELECT * FROM submissions ORDER BY created_at DESC`);
const updateApproved = db.prepare(`UPDATE submissions SET Approved = ? WHERE id = ?`);
const updateHighlight = db.prepare(`UPDATE submissions SET Highlight = ? WHERE id = ?`);
const updateFields = db.prepare(`UPDATE submissions SET title = ?, category = ?, location = ? WHERE id = ?`);
const deleteSubmission = db.prepare(`DELETE FROM submissions WHERE id = ?`);

// --- Dispatcher function ---
function addSubmission(submission) {
  if (submission.type === 'event') {
    return insertEvent.run(
      submission.type,
      submission.company,
      submission.title,
      submission.description,
      submission.category,
      submission.location,
      submission.image,
      submission.eventDate
    );
  } else {
    return insertResource.run(
      submission.type,
      submission.company,
      submission.title,
      submission.description,
      submission.category,
      submission.location,
      submission.image
    );
  }
}

module.exports = {
  db,
  addSubmission,
  getSubmissions,
  updateApproved,
  updateHighlight,
  updateFields,
  deleteSubmission
};
