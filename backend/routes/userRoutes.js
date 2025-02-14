const express = require('express');
const router = express.Router();

// GET /users/:id - Retrieve user profile
router.get('/:id', (req, res) => {
  const { id } = req.params;
  res.send(`User profile for ID: ${id}`);
});

// PUT /users/:id - Update user profile
router.put('/:id', (req, res) => {
  const updatedProfile = req.body;
  res.send(`User profile updated: ${JSON.stringify(updatedProfile)}`);
});

module.exports = router;
