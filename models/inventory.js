const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  set: { type: String, required: true },
  number: { type: String, required: true },
  rarity: { type: String, required: true },
  type: { type: String, required: true },
  condition: { type: String, enum: ["NM", "LP", "MP", "HP", "DMG"], required: true },
  quantity: { type: Number, required: true, min: 0 },
  price: { type: Number, required: true, min: 0 }
}, { timestamps: true });

const Inventory = mongoose.model("Inventory", inventorySchema);

module.exports = Inventory;