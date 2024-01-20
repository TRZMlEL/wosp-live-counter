const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();

app.use(cors()); // Umieść to tutaj

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*", // Zezwól na żądania z dowolnego pochodzenia
    methods: ["GET", "POST"] // Metody, które chcesz zezwolić
  }
});

let sum = 0;
let users = {};

io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('login', (username) => {
        users[socket.id] = username;
    });

    socket.on('transaction', (amount) => {
        if (users[socket.id] === 'user') {
            sum += amount;
            io.emit('updateSum', sum);
        }
    });

    socket.on('getSum', () => {
        io.emit('updateSum', sum);
    });

    socket.on('disconnect', () => {
        delete users[socket.id];
        console.log('Client disconnected');
    });
});

server.listen(4001, () => console.log('Listening on port 4001'));