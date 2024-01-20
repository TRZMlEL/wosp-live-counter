<template>
    <h1>{{ newSum }}</h1>
</template>

<script setup>
import { ref } from 'vue';
import io from 'socket.io-client';

const socket = io('http://localhost:4001');
const newSum = ref(0); // Utwórz reaktywne dane

socket.on('connect', () => {
    // Zaloguj się jako administrator
    socket.emit('login', 'admin');

    // Wywołaj zdarzenie getSum od razu po połączeniu
    socket.emit('getSum');
});

// Nasłuchuj na zdarzenie updateSum
socket.on('updateSum', (sum) => {
    newSum.value = sum; // Aktualizuj newSum
    console.log('Nowa suma: ' + newSum.value);
});
</script>