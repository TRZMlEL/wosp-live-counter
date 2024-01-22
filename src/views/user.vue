<template>
  <div class="font-Scansky w-screen h-screen bg-bgWOSP bg-cover flex flex-col overflow-hidden items-center justify-center text-white gap-5">
    <input v-model="amount" class="text-black" type="number" />
    <div class="grid grid-cols-2 grid-rows-3 gap-10">
      <button class="bg-white text-black text-2xl flex items-center justify-center p-10 rounded-lg" @click="add1">+1zł</button>
      <button class="bg-white text-black text-2xl flex items-center justify-center p-10 rounded-lg" @click="add2">+2zł</button>
      <button class="bg-white text-black text-2xl flex items-center justify-center p-10 rounded-lg" @click="add5">+5zł</button>
      <button class="bg-white text-black text-2xl flex items-center justify-center p-10 rounded-lg" @click="add10">+10zł</button>
      <button class="bg-white text-black text-2xl flex items-center justify-center p-10 rounded-lg" @click="add20">+20zł</button>
      <button class="bg-white text-black text-2xl flex items-center justify-center p-10 rounded-lg" @click="add50">+20zł</button>
    </div>
    <button @click="send">Send</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import io from 'socket.io-client';

const socket = io('http://192.168.115.144:4001');
const amount = ref(0);

socket.on('connect', () => {
    // Zaloguj się jako użytkownik
    socket.emit('login', 'user');
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

const send = () => {
    socket.emit('transaction', amount.value);
}
</script>
