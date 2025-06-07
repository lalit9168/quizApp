// server.js
const express = require('express');
const app = express();

// Basic GET route
app.get('/', (req, res) => {
  res.send('Hello World from Express!');
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
