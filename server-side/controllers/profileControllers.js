const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Simulated user data
let user = {
  fullName: '',
  bio: '',
  username: '',
};

// Get user data
app.get('/api/user', (req, res) => {
  res.json(user);
});

// Update user data
app.put('/api/user', (req, res) => {
  const { fullName, bio, username } = req.body;
  user.fullName = fullName;
  user.bio = bio;
  user.username = username;
  res.sendStatus(200);
});

// Start the server
app.listen(3001, () => {
  console.log('Server started on port 3001');
});
