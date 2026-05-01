const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  productId: { type: String, required: true },
  productName: { type: String, required: true },
  nominal: { type: Number, required: true },
  price: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  finalPrice: { type: Number, required: true },
  game: { type: String, required: true }, // 'mlbb', 'pubg', 'freefire'
  gameUsername: { type: String, required: true },
  gameUserId: { type: String, required: true },
  paymentMethod: { type: String, required: true }, // 'bank_transfer', 'gopay', 'ovo', 'linkaja', 'dana'
  paymentStatus: { type: String, default: 'pending' }, // pending, confirmed, failed
  orderStatus: { type: String, default: 'pending' }, // pending, processing, completed, cancelled
  receiptNumber: { type: String, unique: true, sparse: true },
  proofImage: { type: String }, // payment proof image
  notes: { type: String },
  paidAt: { type: Date },
  completedAt: { type: Date },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', orderSchema);
