const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{ pizza: { type: mongoose.Schema.Types.ObjectId, ref: 'Pizza', required: true }, quantity: { type: Number, required: true, min: 1 }, price: { type: Number, required: true, min: 0 } }],
  total: { type: Number, required: true, min: 0 },
  status: { type: String, enum: ['pending', 'preparing', 'ready', 'delivered', 'cancelled'], default: 'pending' },
  deliveryAddress: { street: { type: String, required: true, trim: true }, city: { type: String, required: true, trim: true }, zipCode: { type: String, required: true, trim: true } }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);