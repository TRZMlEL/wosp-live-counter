<template>
  <div class="font-Scansky w-screen h-screen bg-bgWOSP bg-cover overflow-hidden text-white">
    <aside class="float-right p-10">
      <h2>Logi</h2>
      <pre>{{ logData }}</pre>
    </aside>
    <main>
      <h1>{{ totalSum }}zł</h1>
      <div class="p-1 bg-white rounded-lg w-4/6 md:w-2/5 lg:w-1/5 mt-15">
        <input v-model="amount" class="text-black pl-2 text-4xl rounded-lg border-8 border-black border-solid w-full" placeholder="0" type="number" />
      </div>
      <div class="grid grid-cols-4 grid-rows-3 gap-5 m-5">
        <button class="bg-white text-black text-2xl flex items-center justify-center p-5 md:p-10 rounded-lg border-4 border-black border-solid active:bg-gray-300" @click="minus1">-1zł</button>
        <button class="bg-white text-black text-2xl flex items-center justify-center p-5 md:p-10 rounded-lg border-4 border-black border-solid active:bg-gray-300" @click="minus2">-2zł</button>
        <button class="bg-white text-black text-2xl flex items-center justify-center p-5 md:p-10 rounded-lg border-4 border-black border-solid active:bg-gray-300" @click="add1">+1zł</button>
        <button class="bg-white text-black text-2xl flex items-center justify-center p-5 md:p-10 rounded-lg border-4 border-black border-solid active:bg-gray-300" @click="add2">+2zł</button>
        <button class="bg-white text-black text-2xl flex items-center justify-center p-5 md:p-10 rounded-lg border-4 border-black border-solid active:bg-gray-300" @click="minus5">-5zł</button>
        <button class="bg-white text-black text-2xl flex items-center justify-center p-5 md:p-10 rounded-lg border-4 border-black border-solid active:bg-gray-300" @click="minus10">-10zł</button>
        <button class="bg-white text-black text-2xl flex items-center justify-center p-5 md:p-10 rounded-lg border-4 border-black border-solid active:bg-gray-300" @click="add5">+5zł</button>
        <button class="bg-white text-black text-2xl flex items-center justify-center p-5 md:p-10 rounded-lg border-4 border-black border-solid active:bg-gray-300" @click="add10">+10zł</button>
        <button class="bg-white text-black text-2xl flex items-center justify-center p-5 md:p-10 rounded-lg border-4 border-black border-solid active:bg-gray-300" @click="minus20">-20zł</button>
        <button class="bg-white text-black text-2xl flex items-center justify-center p-5 md:p-10 rounded-lg border-4 border-black border-solid active:bg-gray-300" @click="minus50">-50zł</button>
        <button class="bg-white text-black text-2xl flex items-center justify-center p-5 md:p-10 rounded-lg border-4 border-black border-solid active:bg-gray-300" @click="add20">+20zł</button>
        <button class="bg-white text-black text-2xl flex items-center justify-center p-5 md:p-10 rounded-lg border-4 border-black border-solid active:bg-gray-300" @click="add50">+50zł</button>
      </div>
      <button  class="bg-white text-black text-4xl flex items-center justify-center p-5 mb-5 w-4/6 md:w-2/5 lg:w-1/5 rounded-lg border-4 border-black border-solid active:bg-gray-300"  @click="send">Wpłać!</button>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import io from 'socket.io-client';

const socket = io('http://localhost:4001');
const logData = ref('');
const totalSum = ref(0);
const amount = ref(0);

socket.on('connect', () => {
    // Zaloguj się jako administrator
    socket.emit('login', 'admin');

    // Wywołaj zdarzenie getSum od razu po połączeniu
    socket.emit('getData');
    socket.emit('getSum');
});

socket.on('updateSum', (sum) => {
  totalSum.value = sum
});

socket.on('logs', (data) => {
    console.log(data)
    // Przekształć dane na tablicę linii
    let lines = data.split('\n');
    // Usuń puste linie
    lines = lines.filter(line => line.trim() !== '');
    // Odwróć kolejność linii
    lines.reverse();
    // Przekształć linie z powrotem na ciąg znaków
    logData.value = lines.join('\n');
});

const add1 = () => {
    amount.value += 1;
}

const add2 = () => {
    amount.value += 2;
}

const add5 = () => {
    amount.value += 5;
}

const add10 = () => {
    amount.value += 10;
}

const add20 = () => {
    amount.value += 20;
}

const add50 = () => {
    amount.value += 50;
}

const minus1 = () => {
    amount.value -= 1;
}

const minus2 = () => {
    amount.value -= 2;
}

const minus5 = () => {
    amount.value -= 5;
}

const minus10 = () => {
    amount.value -= 10;
}

const minus20 = () => {
    amount.value -= 20;
}

const minus50 = () => {
    amount.value -= 50;
}

const send = () => {
    socket.emit('transaction', amount.value)
}
</script>