const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3501;

// Enable CORS
app.use(cors());

// Serve static files from React build folder
app.use(express.static(path.join(__dirname, 'build')));

// Example API route
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from Express!' });
});

//  Catch-all: serve React's index.html for all other routes
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(` Server is running on port ${PORT}`);
});
