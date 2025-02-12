// userController.js

const db = require('../models');
const User = db.user;
const passwordUtil = require('../util/passwordComplexityCheck');

// Create a new user
module.exports.create = (req, res) => {
  try {
    // Check if username and password are provided
    if (!req.body.username || !req.body.password) {
      res.status(400).send({ message: 'Content cannot be empty!' });
      return;
    }

    // Check password complexity
    const password = req.body.password;
    const passwordCheck = passwordUtil.passwordPass(password);

    // If the password doesn't meet complexity requirements, send an error
    if (passwordCheck.error) {
      res.status(400).send({ message: passwordCheck.error.details[0].message });
      return;
    }

    // Create a new user
    const user = new User(req.body);
    user
      .save()
      .then((data) => {
        console.log(data);
        res.status(201).send(data);  // Successfully created
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || 'Some error occurred while creating the user.',
        });
      });
  } catch (err) {
    res.status(500).json(err);
  }
};

// Get all users
module.exports.getAll = (req, res) => {
  try {
    User.find({})
      .then((data) => {
        res.status(200).send(data);  // Successfully fetched all users
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || 'Some error occurred while retrieving users.',
        });
      });
  } catch (err) {
    res.status(500).json(err);
  }
};

// Get a specific user by username
module.exports.getUser = (req, res) => {
  try {
    const username = req.params.username;
    User.find({ username: username })
      .then((data) => {
        res.status(200).send(data);  // Successfully fetched user
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || 'Some error occurred while retrieving users.',
        });
      });
  } catch (err) {
    res.status(500).json(err);
  }
};

// Update a user's information
module.exports.updateUser = async (req, res) => {
  try {
    const username = req.params.username;
    if (!username) {
      res.status(400).send({ message: 'Invalid Username Supplied' });
      return;
    }

    const password = req.body.password;
    const passwordCheck = passwordUtil.passwordPass(password);

    if (passwordCheck.error) {
      res.status(400).send({ message: passwordCheck.error.details[0].message });
      return;
    }

    // Find and update user by username
    User.findOne({ username: username }, function (err, user) {
      user.username = req.params.username;
      user.password = req.body.password;
      user.displayName = req.body.displayName;
      user.firstName = req.body.firstName;
      user.lastName = req.body.lastName;
      user.email = req.body.email;
      user.accountType = req.body.accountType;
      
      user.save(function (err) {
        if (err) {
          res.status(500).json(err || 'Some error occurred while updating the user.');
        } else {
          res.status(204).send();  // Successfully updated
        }
      });
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

// Delete a user by username
module.exports.deleteUser = async (req, res) => {
  try {
    const username = req.params.username;
    if (!username) {
      res.status(400).send({ message: 'Invalid Username Supplied' });
      return;
    }

    User.deleteOne({ username: username }, function (err, result) {
      if (err) {
        res.status(500).json(err || 'Some error occurred while deleting the user.');
      } else {
        res.status(204).send(result);  // Successfully deleted
      }
    });
  } catch (err) {
    res.status(500).json(err || 'Some error occurred while deleting the user.');
  }
};