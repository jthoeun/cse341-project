const mongoose = require('mongoose');

// Define the Pokemon schema
const pokemonSchema = new mongoose.Schema({
  name: { type: String, required: true },
  set: { type: String, required: true },
  number: { type: String, required: true },
  rarity: { type: String, required: true },
  type: { type: String, required: true },
  condition: { type: String, required: true },
  quantity: { type: Number, default: 0 },
  price: { type: Number, required: true },
});


const PokemonCard = mongoose.model('PokemonCard', pokemonSchema, 'inventory');  // Explicitly use 'inventory' collection

module.exports = PokemonCard;