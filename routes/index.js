const express = require('express');
const router = express.Router();


router.use('/pokemon', require('./pokemonRoutes')); 
router.use('/user', require('./userRoutes'));      
module.exports = router;