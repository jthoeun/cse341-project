const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Middleware to validate POST/PUT data
const validateUserData = (req, res, next) => {
  const { username, password, displayName, firstName, lastName, email, accountType } = req.body;
  if (!username || !password || !displayName || !firstName || !lastName || !email || !accountType) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  next();
};

// GET all users
router.get('/', userController.getAll);

// GET a single user by username
router.get('/:username', userController.getUser);

// POST a new user (register)
router.post('/', validateUserData, userController.create);

// PUT to update a user by username
router.put('/:username', validateUserData, userController.updateUser);

// DELETE a user by username
router.delete('/:username', userController.deleteUser);

module.exports = router;