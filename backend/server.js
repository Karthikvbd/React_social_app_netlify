const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3501;

// ===== Middleware =====
app.use(cors());
app.use(express.json());

// ===== Temporary in-memory post data =====
let posts = [
  { id: 1, title: "First Post", body: "This is the first post" },
  { id: 2, title: "Second Post", body: "This is the second post" }
];

// ===== API Routes =====

// Get all posts
app.get('/posts', (req, res) => {
  res.json(posts);
});

// Add new post
app.post('/posts', (req, res) => {
  const newPost = req.body;
  posts.push(newPost);
  res.json(newPost);
});

// Edit post
app.put('/posts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = posts.findIndex(post => post.id === id);
  if (index !== -1) {
    posts[index] = req.body;
    res.json(posts[index]);
  } else {
    res.status(404).json({ message: 'Post not found' });
  }
});

// Delete post
app.delete('/posts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  posts = posts.filter(post => post.id !== id);
  res.json({ message: 'Post deleted' });
});

// ===== Example API =====
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from Express!' });
});

// ===== Serve React build =====
app.use(express.static(path.join(__dirname, '..', 'build')));

// Catch-all route for React (works with Express 5)
app.use((req, res) => {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

// ===== Start Server =====
app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});
