const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Serve everything in dist
app.use(express.static(path.join(__dirname, 'Frontend/dist')));

// Only send index.html for SPA-style routes if you really need it
// For multi-page site, you can remove this entirely
// app.get(/.*/, (req, res) => {
//   res.sendFile(path.join(__dirname, 'Frontend/dist', 'index.html'));
// });

app.listen(port, () => {
  console.log(`Express server running at http://localhost:${port}`);
});
