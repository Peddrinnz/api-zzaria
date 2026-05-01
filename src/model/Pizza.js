const mongoose = require('mongoose');

const pizzaSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  price: { type: Number, required: true, min: 0 },
  ingredients: [{ type: String, trim: true }],
  image: { type: String, trim: true },
  available: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Pizza', pizzaSchema);