const express = require('express');
const router = express.Router();
const { dataRole } = require('../utils/data2');
const { dataUser } = require('../utils/data2');

// In-memory data (for demo)
let roles = dataRole;

// Get all roles
router.get('/', (req, res) => {
    res.json(roles);
});

// Get role by id
router.get('/:id', (req, res) => {
    const role = roles.find(r => r.id === req.params.id);
    if (!role) return res.status(404).json({ error: 'Role not found' });
    res.json(role);
});

// Create role
router.post('/', (req, res) => {
    const { id, name, description } = req.body;
    if (!id || !name) return res.status(400).json({ error: 'Missing fields' });
    if (roles.find(r => r.id === id)) return res.status(409).json({ error: 'Role ID exists' });
    const now = new Date().toISOString();
    const newRole = { id, name, description, creationAt: now, updatedAt: now };
    roles.push(newRole);
    res.status(201).json(newRole);
});

// Update role
router.put('/:id', (req, res) => {
    const idx = roles.findIndex(r => r.id === req.params.id);
    if (idx === -1) return res.status(404).json({ error: 'Role not found' });
    const { name, description } = req.body;
    roles[idx] = { ...roles[idx], name, description, updatedAt: new Date().toISOString() };
    res.json(roles[idx]);
});

// Delete role
router.delete('/:id', (req, res) => {
    const idx = roles.findIndex(r => r.id === req.params.id);
    if (idx === -1) return res.status(404).json({ error: 'Role not found' });
    const deleted = roles.splice(idx, 1);
    res.json(deleted[0]);
});

// Get all users with a specific role id
router.get('/:id/users', (req, res) => {
    const usersWithRole = dataUser.filter(u => u.role && u.role.id === req.params.id);
    res.json(usersWithRole);
});

module.exports = router;
