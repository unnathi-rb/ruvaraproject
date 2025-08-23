const mongoose = require('mongoose');

const artSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artForm: { type: String, enum: ['Madhubani', 'Warli', 'Pithora'], required: true },
  imageUrl: { type: String, required: true },
  description: { type: String },
  artist: { type: String },
  tags: [{ type: String }],
  isSaved: { type: Boolean, default: false },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // 👈 linked to user
}, { timestamps: true });

module.exports = mongoose.model('Art', artSchema);
