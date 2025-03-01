const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/user'); // Ensure the correct path to your User model
const router = express.Router();

// Google authentication route
router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

// Google OAuth callback route
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }),
  async (req, res) => {
    try {
      // Successful authentication
      if (!req.user) {
        return res.status(401).json({ message: 'Authentication failed' });
      }

      // Create JWT token
      const token = jwt.sign({ userId: req.user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

      // Optionally, save the token in the MongoDB document (if you want)
      await User.findByIdAndUpdate(req.user._id, { token });

      // Return response with JWT token and user info
      res.json({
        message: 'Authentication successful',
        token: token,
        user: req.user
      });

    } catch (error) {
      console.error("Error during authentication:", error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

module.exports = router;