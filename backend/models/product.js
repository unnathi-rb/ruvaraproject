const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  imageUrl: { type: String },
  exportReady: { type: Boolean, default: false }  // ✅ NEW FIELD
});

module.exports = mongoose.model('Product', productSchema);


