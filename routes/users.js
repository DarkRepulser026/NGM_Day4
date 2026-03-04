
const express = require('express');
const router = express.Router();
const { dataUser } = require('../utils/data2');

// In-memory data (for demo)
let users = dataUser;

// Get all users
router.get('/', (req, res) => {
  res.json(users);
});

// Get user by username
router.get('/:username', (req, res) => {
  const user = users.find(u => u.username === req.params.username);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

// Create user
router.post('/', (req, res) => {
  const { username, password, email, fullName, avatarUrl, status, role } = req.body;
  if (!username || !password || !email) return res.status(400).json({ error: 'Missing fields' });
  if (users.find(u => u.username === username)) return res.status(409).json({ error: 'Username exists' });
  const now = new Date().toISOString();
  const newUser = { username, password, email, fullName, avatarUrl, status, loginCount: 0, role, creationAt: now, updatedAt: now };
  users.push(newUser);
  res.status(201).json(newUser);
});

// Update user
router.put('/:username', (req, res) => {
  const idx = users.findIndex(u => u.username === req.params.username);
  if (idx === -1) return res.status(404).json({ error: 'User not found' });
  const { password, email, fullName, avatarUrl, status, role } = req.body;
  users[idx] = { ...users[idx], password, email, fullName, avatarUrl, status, role, updatedAt: new Date().toISOString() };
  res.json(users[idx]);
});

// Delete user
router.delete('/:username', (req, res) => {
  const idx = users.findIndex(u => u.username === req.params.username);
  if (idx === -1) return res.status(404).json({ error: 'User not found' });
  const deleted = users.splice(idx, 1);
  res.json(deleted[0]);
});

module.exports = router;
