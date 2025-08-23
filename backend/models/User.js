const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },

  // NEW fields
  photos: { type: [String], default: [] },   // array of photo URLs
  isVerified: { type: Boolean, default: false },  // auto badge after 3 photos
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
