const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swaggerDesign.json');
const routes = require('./routes');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const passport = require('passport');
const jwt = require('jsonwebtoken');  // Import jsonwebtoken
const User = require('./models/user');
const session = require('express-session');  // Import express-session
require('./config/passport');

dotenv.config();

const app = express();

// MongoDB connection using MONGO_URI from the .env file
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware for parsing JSON requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Express session middleware - enable sessions for Passport.js
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key', 
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }  // In production, you should set this to true with HTTPS
}));

// Initialize Passport
app.use(passport.initialize());

// Google OAuth login route (Step 1)
app.get('/api/users/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google OAuth callback route (Step 2)
app.get('/api/users/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  async (req, res) => {
    try {
      // Check if the user exists in the database
      let user = await User.findOne({ googleId: req.user.googleId });

      if (!user) {
        // Create a new user if not found
        user = new User({
          googleId: req.user.googleId,
          username: req.user.displayName,
          email: req.user.emails[0].value,
        });
        await user.save();
      }

      // Generate a JWT token
      const token = jwt.sign(
        { id: user._id, username: user.username, email: user.email },
        process.env.JWT_SECRET,  
        { expiresIn: '1h' }  // Set token expiration 
      );

      // Save token to the user model (if desired)
      user.token = token;
      await user.save();

      // Send the token to the client 
      res.json({ token });

    } catch (error) {
      console.error('Error during Google OAuth callback:', error);
      res.status(500).send('Something went wrong');
    }
  }
);

// Route to handle logging out and clearing the JWT token
app.post('/api/users/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).send('Logout error');
    }
    // Destroy session and send response
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).send('Session destruction error');
      }
      res.status(200).send('Logged out successfully');
    });
  });
});

// Set up the routes
app.use('/api', routes);
app.use('/api/users', userRoutes);
app.use('/auth', authRoutes); 

// Swagger UI setup for API documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Error handling middleware (catch-all)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});