const express = require('express');
const router = express.Router();
const User = require('../models/user'); 

// Create a new user (register)
router.post('/register', async (req, res) => {
  const { username, password, displayName, firstName, lastName, email, accountType } = req.body;

  // Create a new user
  const newUser = new User({
    username,
    password,
    displayName,
    firstName,
    lastName,
    email,
    accountType,
  });

  try {
    const savedUser = await newUser.save();  // Save the user to the database
    res.status(201).json(savedUser);  // Successfully created user
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create user', error: error.message });
  }
});

// Get a single user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);  // Find user by ID
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);  // Return user details
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to retrieve user', error: error.message });
  }
});

// Update a user by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(updatedUser);  // Return updated user
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update user', error: error.message });
  }
});

// Delete a user by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });  // Successfully deleted
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete user', error: error.message });
  }
});

module.exports = router;