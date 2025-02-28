const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const pokemonController = require('../controllers/pokemonController');
const { authenticateJWT } = require('../middleware/authMiddleware'); 

// Middleware to validate ObjectId
const validateObjectId = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Invalid ObjectId format' });
  }
  next();
};

// Middleware to validate POST/PUT data
const validatePokemonData = (req, res, next) => {
  const { name, set, number, rarity, type, condition, price } = req.body;
  if (!name || !set || !number || !rarity || !type || !condition || !price) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  next();
};

// GET all Pokémon singles (Public)
router.get('/', pokemonController.getAllPokemon);

// GET a single Pokémon card by ID (Public)
router.get('/:id', validateObjectId, pokemonController.getPokemonById);

// POST a new Pokémon single (Protected: Requires JWT)
router.post('/', authenticateJWT, validatePokemonData, pokemonController.addPokemon);

// PUT to update a Pokémon single by ID (Protected: Requires JWT)
router.put('/:id', authenticateJWT, validateObjectId, validatePokemonData, pokemonController.updatePokemon);

// DELETE a Pokémon single by ID (Protected: Requires JWT)
router.delete('/:id', authenticateJWT, validateObjectId, pokemonController.deletePokemon);

module.exports = router;