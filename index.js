const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Ping/Pong endpoint
app.get('/ping', (req, res) => {
  res.json({ message: 'pong' });
});

// Reverse text endpoint
app.get('/reverse', (req, res) => {
  const text = req.query.text;

  if (!text) {
    return res.status(400).json({ error: 'Please provide a "text" query parameter' });
  }

  const reversed = text.split('').reverse().join('');
  res.json({ original: text, reversed: reversed });
});

// POST version for reversing text
app.post('/reverse', (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: 'Please provide "text" in the request body' });
  }

  const reversed = text.split('').reverse().join('');
  res.json({ original: text, reversed: reversed });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('Endpoints:');
  console.log('  GET  /ping      - Returns pong');
  console.log('  GET  /reverse?text=yourtext - Reverses the provided text');
  console.log('  POST /reverse   - Reverses text from JSON body {"text": "yourtext"}');
});
