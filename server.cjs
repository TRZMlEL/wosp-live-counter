const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const fs = require('fs');
const puppeteer = require('puppeteer');
let previousResult = 0;
let result

require('dotenv').config();

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

    //Dodanie nowego wolontariusza
    socket.on('login', (username) => {
        console.log('User logged in with username:', username);
        users[socket.id] = username;
    });

    //Dane o kwocie wrzuconej do puszki od wolontariusza
    socket.on('transaction', (amount) => {
        console.log('tranzakcja')
        sum += amount;
        io.emit('updateSum', sum);
        let date = new Date();
            let formattedDate = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}:${date.getMilliseconds()}`;
            let transactionData = `${amount}zł, ${formattedDate}, ${users[socket.id]}, ` + (sum-result) + `\n`;
            fs.appendFile('transactions.txt', transactionData, (err) => {
                if (err) throw err;
                fs.readFile('transactions.txt', 'utf8', (err, data) => {
                    if (err) throw err;
                    io.emit('logs', data);
                });
            });
    });

    //prośba o wysłanie sumy pieniędzy na stronę internetową
    socket.on('getSum', () => {
        io.emit('updateSum', sum);
    });

    //administrator pobiera wszelkie dane do wglądu
    socket.on('getData', () => {
        fs.readFile('transactions.txt', 'utf8', (err, data) => {
            if (err) throw err;
            io.emit('logs', data);
            io.emit('updateSum', sum);
            io.emit('pig', result);
        });
    });

    socket.on('disconnect', () => {
        delete users[socket.id];
        console.log('Client disconnected');
    });

    socket.on('skarbonka', () => {
        io.emit('pig', result);
    })
});

async function scrape() {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    await page.goto(process.env.VITE_ESKARBONKA);

    result = await page.evaluate(() => {
        return document.querySelector('div.text-center.bg-white.rounded-pill.py-3.fs-2.fw-bold.mx-auto span').innerText;
    });
    console.log(result.replace('zł', ''))
    result = result.replace('zł', '');
    result = result.replace(' ', '');
    result = parseInt(result);
    console.log(result)
    console.log(previousResult)
    console.log("porównanie")
    io.emit('pig', result);

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
