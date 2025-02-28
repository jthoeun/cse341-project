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
  session: false, 
}), (req, res) => {
  if (!req.user || !req.user.token) {
    return res.status(401).json({ message: 'Authentication failed' });
  }

  // Send the token and user details to the frontend
  res.json({
    message: 'Authentication successful',
    token: req.user.token,
    user: {
      id: req.user._id,
      googleId: req.user.googleId,
      displayName: req.user.displayName,
      email: req.user.email,
      accountType: req.user.accountType,
    }
  });
});

// Logout route 
router.get('/logout', (req, res) => {
  res.json({ message: 'Logout successful. Clear the token on the client side.' });
});

module.exports = router;