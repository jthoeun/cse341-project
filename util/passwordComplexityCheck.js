// util/passwordComplexityCheck.js

const passwordComplexity = require('joi-password-complexity');

// Define the complexity options
const complexityOptions = {
  min: 8,
  max: 26,
  lowerCase: 1,
  upperCase: 1,
  numeric: 1,
  symbol: 1,
  requirementCount: 4,
};

// Function to validate the password against the complexity rules
module.exports.passwordPass = (passwordToCheck) => {
  return passwordComplexity(complexityOptions, 'Password').validate(passwordToCheck);
};