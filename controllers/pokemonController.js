const PokemonCard = require('../models/pokemoncard');  // Import the PokemonCard model

// Get all Pokémon singles
const getAllPokemon = async (req, res) => {
  try {
    const pokemons = await PokemonCard.find();  // Get all cards
    res.status(200).json(pokemons);
  } catch (error) {
    res.status(500).json({ message: error.message });
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
    res.status(500).json({ message: error.message });
  }
};

// Add a new Pokémon single
const addPokemon = async (req, res) => {
  const { name, set, number, rarity, type, condition, quantity, price } = req.body;

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
    res.status(201).json(savedPokemon);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a Pokémon single
const updatePokemon = async (req, res) => {
  try {
    const updatedPokemon = await PokemonCard.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }  // Return the updated document
    );
    if (!updatedPokemon) {
      return res.status(404).json({ message: 'Pokemon not found' });
    }
    res.status(200).json(updatedPokemon);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a Pokémon single
const deletePokemon = async (req, res) => {
  try {
    const deletedPokemon = await PokemonCard.findByIdAndDelete(req.params.id);
    if (!deletedPokemon) {
      return res.status(404).json({ message: 'Pokemon not found' });
    }
    res.status(200).json({ message: 'Pokemon deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllPokemon,
  getPokemonById,
  addPokemon,
  updatePokemon,
  deletePokemon,
};