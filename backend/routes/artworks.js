const express = require('express');
const Art = require('../models/Art');

module.exports = (io) => {
  const router = express.Router();

  // GET all artworks
  router.get('/', async (req, res) => {
    try {
      const artworks = await Art.find().sort({ _id: -1 });
      res.json(artworks);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // POST new artwork
  router.post('/', async (req, res) => {
    try {
      const newArt = new Art(req.body);
      await newArt.save();

      // Broadcast new artwork to all connected clients
      io.emit('new-artwork', newArt);

      res.status(201).json(newArt);
    } catch (err) {
      console.error('Error in POST /api/artworks:', err);
      res.status(500).json({ error: err.message });
    }
  });

  // PATCH save/bookmark toggle
  router.patch('/:id/save', async (req, res) => {
    try {
      const art = await Art.findById(req.params.id);
      if (!art) return res.status(404).json({ message: 'Not found' });

      art.isSaved = !art.isSaved;
      await art.save();

      // Broadcast update
      io.emit('update-artwork', art);

      res.json(art);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  return router;
};
