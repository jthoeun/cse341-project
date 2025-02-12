module.exports = (mongoose) => {
    const userSchema = mongoose.Schema({
      username: {
        type: String,
      },
      password: {
        type: String,
      },
      displayName: {
        type: String,
      },
      firstName: {
        type: String,
      },
      lastName: {
        type: String,
      },
      email: {
        type: String,
        unique: true,  // Ensures the email is unique
      },
      accountType: {
        type: String,
      },
    });
  
    return mongoose.model('user', userSchema);
  };