const mongoose = require("mongoose");

const PokemonCardSchema = new mongoose.Schema({
  name: { type: String, required: true },
  set: { type: String, required: true },
  condition: { type: String, required: true, enum: ["NM", "LP", "MP", "HP", "DMG"] },
  quantity: { type: Number, required: true, min: 0 },
  price: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model("PokemonCard", PokemonCardSchema);