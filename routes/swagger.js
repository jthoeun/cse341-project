// You can import the Swagger documentation here if you need additional logic or custom API routes for Swagger
const express = require('express');
const router = express.Router();

// Example route - this could be where you customize how Swagger documentation is handled
// If you're just serving it, this is already handled in server.js
router.get('/', (req, res) => {
  res.send('Swagger UI should be served at /api-docs');
});

module.exports = router;