const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swaggerDesign.json');
const routes = require('./routes');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const passport = require('passport');
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

// Initialize Passport
app.use(passport.initialize());

// Set up the routes
app.use('/api', routes);
app.use('/api/users', userRoutes);
app.use('/auth', authRoutes); // Google authentication routes

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