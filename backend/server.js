const express = require('express');
const connectDB = require('./db');
const cors = require('cors');
const http = require('http'); // Needed for Socket.IO
const { Server } = require('socket.io');

const app = express();

// --- Connect to MongoDB ---
connectDB();

// --- Middleware ---
app.use(cors());
app.use(express.json());

// --- Create HTTP server for Socket.IO ---
const server = http.createServer(app);

// --- Socket.IO setup ---
const io = new Server(server, {
  cors: { origin: '*' }, // allow all origins for now
});

io.on('connection', (socket) => {
  console.log('✅ New client connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('❌ Client disconnected:', socket.id);
  });
});

// --- Routes ---
// Users
const userRoutes = require('./routes/user');
app.use('/api/users', userRoutes);

// Artworks (pass io)
const artworkRoutes = require('./routes/artworks'); 
app.use('/api/artworks', artworkRoutes);

// Products
const productRoutes = require('./routes/productRoutes');
app.use('/api/products', productRoutes);

// --- Start server ---
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
