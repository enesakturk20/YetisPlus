const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const connectDB = require('./config');
const orderRoutes = require('./routes/orderRoutes');
const carrierRoutes = require('./routes/carrierRoutes');
const userRoutes = require('./routes/userRoutes');

require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*",
    }
});

app.use(cors());
app.use(express.json());

connectDB();

app.use('/orders', orderRoutes);
app.use('/carriers', carrierRoutes);
app.use('/auth', userRoutes);

io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = { io, server };
