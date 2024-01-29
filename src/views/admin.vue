<template>
  <div class="font-Scansky w-screen h-screen bg-bgWOSP bg-cover overflow-hidden text-white">
    <aside class="float-right p-10 bg-black">
      <h2>Logi</h2>
      <pre>{{ logData }}</pre>
    </aside>
    <main class="flex flex-col items-center">
        <div class="flex gap-10 text-6xl m-10">
            <h1>{{ totalSum }}zł</h1>
            <h1>{{ pig }}zł</h1>
            <h1>{{ live }}zł</h1>
        </div>
      <div class="p-1 bg-white rounded-lg w-1/2 mt-15">
        <input v-model="amount" class="text-black pl-2 text-4xl rounded-lg border-8 border-black border-solid w-full" placeholder="0" type="number" />
      </div>
      <div class="grid grid-cols-4 grid-rows-3 gap-5 m-5">
        <button class="bg-white text-black text-2xl flex items-center justify-center p-5 md:p-10 rounded-lg border-4 border-black border-solid active:bg-gray-300" @click="ChangeValue(-1)">-1zł</button>
        <button class="bg-white text-black text-2xl flex items-center justify-center p-5 md:p-10 rounded-lg border-4 border-black border-solid active:bg-gray-300" @click="ChangeValue(-2)">-2zł</button>
        <button class="bg-white text-black text-2xl flex items-center justify-center p-5 md:p-10 rounded-lg border-4 border-black border-solid active:bg-gray-300" @click="ChangeValue(1)">+1zł</button>
        <button class="bg-white text-black text-2xl flex items-center justify-center p-5 md:p-10 rounded-lg border-4 border-black border-solid active:bg-gray-300" @click="ChangeValue(2)">+2zł</button>
        <button class="bg-white text-black text-2xl flex items-center justify-center p-5 md:p-10 rounded-lg border-4 border-black border-solid active:bg-gray-300" @click="ChangeValue(-5)">-5zł</button>
        <button class="bg-white text-black text-2xl flex items-center justify-center p-5 md:p-10 rounded-lg border-4 border-black border-solid active:bg-gray-300" @click="ChangeValue(-10)">-10zł</button>
        <button class="bg-white text-black text-2xl flex items-center justify-center p-5 md:p-10 rounded-lg border-4 border-black border-solid active:bg-gray-300" @click="ChangeValue(5)">+5zł</button>
        <button class="bg-white text-black text-2xl flex items-center justify-center p-5 md:p-10 rounded-lg border-4 border-black border-solid active:bg-gray-300" @click="ChangeValue(10)">+10zł</button>
        <button class="bg-white text-black text-2xl flex items-center justify-center p-5 md:p-10 rounded-lg border-4 border-black border-solid active:bg-gray-300" @click="ChangeValue(-20)">-20zł</button>
        <button class="bg-white text-black text-2xl flex items-center justify-center p-5 md:p-10 rounded-lg border-4 border-black border-solid active:bg-gray-300" @click="ChangeValue(-50)">-50zł</button>
        <button class="bg-white text-black text-2xl flex items-center justify-center p-5 md:p-10 rounded-lg border-4 border-black border-solid active:bg-gray-300" @click="ChangeValue(20)">+20zł</button>
        <button class="bg-white text-black text-2xl flex items-center justify-center p-5 md:p-10 rounded-lg border-4 border-black border-solid active:bg-gray-300" @click="ChangeValue(50)">+50zł</button>
      </div>
      <button  class="bg-white text-black text-4xl flex items-center justify-center p-5 mb-5 w-1/2 rounded-lg border-4 border-black border-solid active:bg-gray-300 m-5"  @click="send">Wpłać!</button>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import io from 'socket.io-client';
import VueCookies from 'vue-cookies';

const ip = VueCookies.get('ip');
console.log(ip)

const socket = io('http://'+ip+':4001');

const logData = ref('');
const totalSum = ref(0);
const amount = ref(0);
const pig = ref(0);
const live = ref(0);
live.value = totalSum.value - pig.value

socket.on('connect', () => {
    // Zaloguj się jako administrator
    socket.emit('login', 'admin');

    // Wywołaj zdarzenie getSum od razu po połączeniu
    socket.emit('getData');
    socket.emit('skarbonka');
    live.value = totalSum.value - pig.value
});

socket.on('updateSum', (sum) => {
  totalSum.value = sum
  live.value = totalSum.value - pig.value
});

socket.on('pig', (result) => {
    pig.value = result
    live.value = totalSum.value - pig.value
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
    live.value = totalSum.value - pig.value
});

function ChangeValue(x) {
    amount.value += x;
}

const send = () => {
    socket.emit('transaction', amount.value)
    live.value = totalSum.value - pig.value
    amount.value = 0
}
</script>