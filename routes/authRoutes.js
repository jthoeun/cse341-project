const express = require('express');
const passport = require('passport');
const router = express.Router();

// Route to initiate Google OAuth authentication
router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email'],
}));

// Callback route after Google authentication
router.get('/google/callback', passport.authenticate('google', {
  failureRedirect: '/login',
}), (req, res) => {
  // Successful authentication, 
  res.redirect('/dashboard');  // Placeholder for the time being
});

// Route for logging out
router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: 'Logout failed', error: err });
    }
    res.redirect('/login');  // Redirect to login page after logout
  });
});

module.exports = router;