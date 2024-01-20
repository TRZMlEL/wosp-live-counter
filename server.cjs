const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const fs = require('fs');

const app = express();

app.use(cors());

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
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

    socket.on('transaction', (amount) => {
        if (users[socket.id] === 'admin') {
            let date = new Date();
            let formattedDate = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}:${date.getMilliseconds()}`;
            let transactionData = `User: ${users[socket.id]}, Amount: ${amount}, Time: ${formattedDate}\n`;
            fs.appendFile('transactions.txt', transactionData, (err) => {
                if (err) throw err;
                fs.readFile('transactions.txt', 'utf8', (err, data) => {
                    if (err) throw err;
                    io.emit('logs', data);
                });
            });
        }
    });

    socket.on('getData', () => {
        fs.readFile('transactions.txt', 'utf8', (err, data) => {
            if (err) throw err;
            io.emit('logs', data);
        });
    });

    socket.on('disconnect', () => {
        delete users[socket.id];
        console.log('Client disconnected');
    });
});

server.listen(4001, () => console.log('Listening on port 4001'));
