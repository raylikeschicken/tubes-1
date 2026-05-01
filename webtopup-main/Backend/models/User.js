const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  nickname: { type: String },
  fullName: { type: String },
  phoneNumber: { type: String },
  role: { type: String, default: 'user' }, // 'user' or 'admin'
  balance: { type: Number, default: 0 }, // saldo user
  gameAccounts: [
    {
      game: { type: String }, // 'mlbb', 'pubg', 'freefire'
      username: { type: String },
      userId: { type: String },
      serverId: { type: String },
    }
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema);