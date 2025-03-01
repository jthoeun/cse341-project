const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
  // Original fields
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  displayName: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  accountType: { type: String, required: true },
  token: { type: String },
  googleId: { type: String, unique: true },

}, { collection: 'users' });

// Create the User model
const User = mongoose.model('User', userSchema);

// Export the model
module.exports = User;