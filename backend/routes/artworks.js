const express = require('express');
const router = express.Router();
const Art = require('../models/Art');

// --- Create new artwork ---
router.post('/', async (req, res) => {
  try {
    const { title, artForm, imageUrl, description, artist, tags, userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: 'userId is required' });
    }

    const newArt = new Art({
      title,
      artForm,
      imageUrl,
      description,
      artist,
      tags,
      userId,
    });

    await newArt.save();
    res.status(201).json(newArt);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating artwork' });
  }
});

// --- Get all artworks ---
router.get('/', async (req, res) => {
  try {
    const artworks = await Art.find();
    res.json(artworks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching artworks' });
  }
});

// --- Get artworks by user ---
router.get('/user/:userId', async (req, res) => {
  try {
    const artworks = await Art.find({ userId: req.params.userId });
    res.json(artworks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching user artworks' });
  }
});

// --- Save/Unsave artwork ---
router.put('/:id/save', async (req, res) => {
  try {
    const art = await Art.findById(req.params.id);
    if (!art) {
      return res.status(404).json({ message: 'Artwork not found' });
    }

    art.isSaved = !art.isSaved; // toggle saved status
    await art.save();

    res.json(art);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error saving artwork' });
  }
});

module.exports = router;
