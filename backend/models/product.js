const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true }, // changed title → name
  description: String,
  price: { type: Number, required: true },
  image: String,
  category: { 
    type: String, 
    required: true, 
    enum: ["Art", "Print", "Merchandise", "Other"] 
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Product", productSchema);
