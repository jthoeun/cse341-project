const User = require('../models/user'); // Import the User model correctly
const passwordUtil = require('../util/passwordComplexityCheck');

// Create a new user
module.exports.create = (req, res) => {
  try {
    if (!req.body.username || !req.body.password) {
      return res.status(400).send({ message: 'Username and password are required!' });
    }

    // Check password complexity
    const passwordCheck = passwordUtil.passwordPass(req.body.password);
    if (passwordCheck.error) {
      return res.status(400).send({ message: passwordCheck.error.details[0].message });
    }

    // Create user
    const user = new User(req.body);
    user.save()
      .then((data) => res.status(201).send(data)) // Successfully created
      .catch((err) => res.status(500).send({ message: err.message || 'Error creating user.' }));
  } catch (err) {
    res.status(500).json(err);
  }
};

// Get all users
module.exports.getAll = (req, res) => {
  User.find({})
    .then((data) => res.status(200).send(data)) // Successfully fetched users
    .catch((err) => res.status(500).send({ message: err.message || 'Error retrieving users.' }));
};

// Get a user by username
module.exports.getUser = (req, res) => {
  User.findOne({ username: req.params.username })
    .then((data) => {
      if (!data) return res.status(404).send({ message: 'User not found' });
      res.status(200).send(data); // Successfully fetched user
    })
    .catch((err) => res.status(500).send({ message: err.message || 'Error retrieving user.' }));
};

// Update a user's information
module.exports.updateUser = (req, res) => {
  const { username } = req.params;
  if (!username) return res.status(400).send({ message: 'Invalid Username Supplied' });

  User.findOneAndUpdate({ username }, req.body, { new: true })
    .then((data) => {
      if (!data) return res.status(404).send({ message: 'User not found' });
      res.status(200).send(data);
    })
    .catch((err) => res.status(500).send({ message: err.message || 'Error updating user.' }));
};

// Delete a user
module.exports.deleteUser = (req, res) => {
  User.deleteOne({ username: req.params.username })
    .then((result) => {
      if (result.deletedCount === 0) return res.status(404).send({ message: 'User not found' });
      res.status(204).send(); // Successfully deleted
    })
    .catch((err) => res.status(500).send({ message: err.message || 'Error deleting user.' }));
};