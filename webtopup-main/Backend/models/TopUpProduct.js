const mongoose = require('mongoose');

const topUpProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  nominal: { type: Number, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  icon: { type: String },
  game: { type: String, required: true },
  category: { type: String, required: true },
  isPopular: { type: Boolean, default: false },
  discount: { type: Number, default: 0 },
  status: { type: String, default: 'active', enum: ['active', 'inactive'] },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('TopUpProduct', topUpProductSchema);
