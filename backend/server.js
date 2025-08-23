const express = require('express');
const connectDB = require('./db');
const cors = require('cors');
const http = require('http'); // for Socket.IO
const { Server } = require('socket.io');
const Art = require('./models/Art');

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

// --- User routes ---
const userRoutes = require('./routes/user');
app.use('/api/users', userRoutes);

// --- Art routes ---
// Get all artworks
app.get('/api/artworks', async (req, res) => {
  try {
    const artworks = await Art.find().sort({ _id: -1 });
    res.json(artworks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add new artwork
app.post('/api/artworks', async (req, res) => {
  try {
    const newArt = new Art(req.body);
    await newArt.save();

    // Emit to all connected clients
    io.emit('new-artwork', newArt);

    res.status(201).json(newArt);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Toggle save/bookmark
app.patch('/api/artworks/:id/save', async (req, res) => {
  try {
    const art = await Art.findById(req.params.id);
    if (!art) return res.status(404).json({ message: 'Not found' });
    art.isSaved = !art.isSaved;
    await art.save();

    io.emit('update-artwork', art); // broadcast save toggle

    res.json(art);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- Socket.IO setup ---
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' },
});

io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

const PORT = 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
