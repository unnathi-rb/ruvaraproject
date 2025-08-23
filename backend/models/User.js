const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  fullName: String,
  profilePic: String,
  bio: String,
  savedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
  cart: [],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
