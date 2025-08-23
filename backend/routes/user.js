const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const router = express.Router();


// --- Signup ---
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = new User({
      username: name.split(' ').join('').toLowerCase(),
      email,
      passwordHash,
      fullName: name,
      photos: [],
      isVerified: false
    });

    await user.save();
    res.json({ 
      message: 'User created', 
      userId: user._id, 
      username: user.username,
      isVerified: user.isVerified 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});


// --- Login ---
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    res.json({ 
      message: 'Login successful', 
      userId: user._id, 
      username: user.username,
      isVerified: user.isVerified 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});


// --- Upload Photo & Auto Verify ---
router.post('/upload-photo', async (req, res) => {
  try {
    const { userId, photoUrl } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Save photo
    user.photos.push(photoUrl);

    // Auto verify if user has 3+ photos
    if (user.photos.length >= 3) {
      user.isVerified = true;
    }

    await user.save();

    res.json({ 
      message: 'Photo uploaded', 
      photoCount: user.photos.length, 
      isVerified: user.isVerified 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;
