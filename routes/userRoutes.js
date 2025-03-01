const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const { authenticateJWT } = require('../middleware/authMiddleware'); // OAuth middleware

// Middleware to validate POST/PUT data
const validateUserData = (req, res, next) => {
  const { username, password, displayName, firstName, lastName, email, accountType } = req.body;
  if (!username || !password || !displayName || !firstName || !lastName || !email || !accountType) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  next();
};

// GET all users 
router.get('/', authenticateJWT, userController.getAll);

// GET a single user by username 
router.get('/:username', authenticateJWT, userController.getUser);

// POST a new user (register) - Public
router.post('/', validateUserData, userController.create);

// PUT to update a user by username 
router.put('/:username', authenticateJWT, validateUserData, userController.updateUser);

// DELETE a user by username
router.delete('/:username', authenticateJWT, userController.deleteUser);

// POST login route - Public
router.post('/login', userController.loginUser);

// Google OAuth Login (Public)
router.get('/auth/google', userController.googleLogin);

// Google OAuth Callback (Public)
router.get('/auth/google/callback', userController.googleCallback);

// Logout and invalidate JWT token 
router.get('/auth/logout', authenticateJWT, userController.logout);

module.exports = router;