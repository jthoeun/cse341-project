const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/user'); // Make sure this path is correct

const router = express.Router();

// Assuming Google OAuth is set up in Passport.js

// Callback route after Google authentication
router.get('/auth/google/callback', async (req, res) => {
  try {
    // Check if user is authenticated via Google
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    const user = req.user;

    // Create a JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Optionally, store the token in the MongoDB user document (if required)
    await User.findByIdAndUpdate(user._id, { token });

    // Send the token in the response
    res.json({ message: 'Authentication successful', token: token });

  } catch (error) {
    console.error("Error during Google OAuth callback:", error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;