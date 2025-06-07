// server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors()); // Allow requests from any origin (for local testing)
app.use(express.json()); // Parse JSON bodies

// Routes
app.get('/', (req, res) => {
  res.send('Hello World from Express!');
});

app.get('/api/message', (req, res) => {
  res.json({ message: 'This is a GET message from the backend!' });
});

app.post('/api/message', (req, res) => {
  const { name } = req.body;
  res.json({ reply: `Hello, ${name}. You sent a POST request!` });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
