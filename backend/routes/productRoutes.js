const express = require("express");
const Product = require("../models/productModel");
const router = express.Router();

// Add product
router.post("/", async (req, res) => {
  try {
    const { title, description, price, image, category } = req.body;

    if (!category) {
      return res.status(400).json({ message: "Category is required" });
    }

    const product = new Product({ title, description, price, image, category });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    console.error("Error saving product:", err);
    res.status(500).json({ message: "Error saving product" });
  }
});

// Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Error fetching products" });
  }
});

module.exports = router;
