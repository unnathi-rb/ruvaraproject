const mongoose = require('mongoose');

const artSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artForm: { type: String, required: true },
  description: { type: String, required: true },
  artist: String,
  tags: [String],
  imageUrl: { type: String, required: true },
  isSaved: { type: Boolean, default: false },
});

module.exports = mongoose.model('Art', artSchema);
