const jwt = require('jsonwebtoken');

// Middleware to authenticate JWT
const authenticateJWT = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Extract token

  if (!token) {
    return res.status(401).json({ message: 'No token provided. Authorization denied.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
    req.user = decoded;  
    next();  
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(403).json({ message: 'Token has expired' });
    }
    res.status(401).json({ message: 'Token is not valid', error: err.message });
  }
};

// Admin role check
const admin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied' });
  }
  next();
};

module.exports = { authenticateJWT, admin };