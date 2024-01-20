<template>
  <h1>
    Hello user
  </h1>
  <input v-model="amount" type="number" />
  <button @click="send">Send</button>
</template>

<script setup>
import { ref } from 'vue';
import io from 'socket.io-client';

const socket = io('http://localhost:4001');
const amount = ref(0);

socket.on('connect', () => {
    // Zaloguj się jako użytkownik
    socket.emit('login', 'user');
});

const send = () => {
    socket.emit('transaction', amount.value);
}
</script>
