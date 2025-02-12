const PokemonCard = require('../models/pokemoncard');  // Import the PokemonCard model

// Get all Pokémon singles
const getAllPokemon = async (req, res) => {
  try {
    const pokemons = await PokemonCard.find();  // Get all cards
    res.status(200).json(pokemons);
  } catch (error) {
    console.error(error);  // Log the error
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

// Get a single Pokémon card by ID
const getPokemonById = async (req, res) => {
  try {
    const pokemon = await PokemonCard.findById(req.params.id);  // Find by ID
    if (!pokemon) {
      return res.status(404).json({ message: 'Pokemon not found' });
    }
    res.status(200).json(pokemon);
  } catch (error) {
    console.error(error);  // Log the error
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

// Add a new Pokémon single
const addPokemon = async (req, res) => {
  const { name, set, number, rarity, type, condition, quantity, price } = req.body;

  // If any required field is missing, return a bad request error
  if (!name || !set || !number || !rarity || !type || !condition || !price) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const newPokemon = new PokemonCard({
    name,
    set,
    number,
    rarity,
    type,
    condition,
    quantity,
    price,
  });

  try {
    const savedPokemon = await newPokemon.save();  // Save to MongoDB
    res.status(201).json(savedPokemon);  // Successfully created
  } catch (error) {
    console.error(error);  // Log the error
    res.status(400).json({ message: 'Failed to create Pokemon', error: error.message });
  }
};

// Update a Pokémon single
const updatePokemon = async (req, res) => {
  try {
    const updatedPokemon = await PokemonCard.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedPokemon) {
      return res.status(404).json({ message: 'Pokemon not found' });
    }
    res.status(200).json(updatedPokemon);  // Successfully updated
  } catch (error) {
    console.error(error);  // Log the error
    res.status(400).json({ message: 'Failed to update Pokemon', error: error.message });
  }
};

// Delete a Pokémon single
const deletePokemon = async (req, res) => {
  try {
    const deletedPokemon = await PokemonCard.findByIdAndDelete(req.params.id);
    if (!deletedPokemon) {
      return res.status(404).json({ message: 'Pokemon not found' });
    }
    res.status(200).json({ message: 'Pokemon deleted' });  // Successfully deleted
  } catch (error) {
    console.error(error);  // Log the error
    res.status(500).json({ message: 'Failed to delete Pokemon', error: error.message });
  }
};

module.exports = {
  getAllPokemon,
  getPokemonById,
  addPokemon,
  updatePokemon,
  deletePokemon,
};