const express = require('express');
const router = express.Router();
const Art = require('../models/Art');

// Get all artworks, optionally filter by userId
router.get('/', async (req, res) => {
  try {
    const { userId } = req.query;
    let query = {};
    if (userId) query.userId = userId;

    const artworks = await Art.find(query).sort({ _id: -1 });
    res.json(artworks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add new artwork
router.post('/', async (req, res) => {
  try {
    const newArt = new Art(req.body); // req.body must contain userId
    await newArt.save();

    // Emit via Socket.IO if using real-time updates
    if (req.app.get('io')) {
      req.app.get('io').emit('new-artwork', newArt);
    }

    res.status(201).json(newArt);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Toggle save/bookmark
router.patch('/:id/save', async (req, res) => {
  try {
    const art = await Art.findById(req.params.id);
    if (!art) return res.status(404).json({ message: 'Not found' });

    art.isSaved = !art.isSaved;
    await art.save();

    if (req.app.get('io')) {
      req.app.get('io').emit('update-artwork', art);
    }

    res.json(art);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
