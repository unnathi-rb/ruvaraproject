const express = require('express');
const connectDB = require('./db');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

// --- User routes ---
const userRoutes = require('./routes/user');
app.use('/api/users', userRoutes);

// --- Art routes ---
const artRoutes = require('./routes/art');
app.use('/api/artworks', artRoutes);

// --- Socket.IO setup ---
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });
app.set('io', io);

io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);
  socket.on('disconnect', () => console.log('Client disconnected:', socket.id));
});

const PORT = 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
