const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const fs = require('fs');
const puppeteer = require('puppeteer');
let previousResult = 0;

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
        console.log('User logged in with username:', username);
        users[socket.id] = username;
    });

    socket.on('transaction', (amount) => {
        sum += amount;
        io.emit('updateSum', sum);
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
    });

    socket.on('getSum', () => {
        io.emit('updateSum', sum);
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

async function scrape() {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    await page.goto('https://eskarbonka.wosp.org.pl/muhusajape');

    let result = await page.evaluate(() => {
        return document.querySelector('div.col-md-10.mx-auto span').innerText;
    });

    result = result.replace('zł', '');
    result = result.replace(' ', '');
    result = parseInt(result);
    console.log(result)
    console.log(previousResult)
    console.log("porównanie")

    if (result > previousResult) {
        const difference = result - previousResult;
        sum += difference;
        io.emit('updateSum', sum);
        previousResult = result;
    }

    await browser.close();
}

// Wywołaj funkcję scrape co 10 minut
setInterval(scrape, 5 * 60 * 1000);

scrape();

server.listen(4001, () => console.log('Listening on port 4001'));
