<template>
    <div class="">
        <div>
            <h1>{{ totalSum }}</h1>
        </div>
        <div>
            <h2>Ostatnie wpłaty</h2>
            <ul>
                <li v-for="(payment, index) in payments" :key="index">{{ payment }}</li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import io from 'socket.io-client';

const socket = io('http://localhost:4001');
const totalSum = ref(0); // Utwórz reaktywne dane dla sumy wszystkich wpłat
const payments = ref([]); // Utwórz listę wpłat

socket.on('connect', () => {
    // Zaloguj się jako administrator
    socket.emit('login', 'admin');

    // Wywołaj zdarzenie getSum od razu po połączeniu
    socket.emit('getSum');
});

// Nasłuchuj na zdarzenie updateSum
socket.on('updateSum', (sum) => {
    const newPayment = sum - totalSum.value; // Oblicz wartość ostatniej wpłaty
    if (newPayment > 0) { // Jeżeli ostatnia wpłata jest większa od 0
        payments.value.unshift(newPayment); // Dodaj nową wpłatę na początek listy
        if (payments.value.length > 5) { // Jeśli lista ma więcej niż 5 wpłat
            payments.value.pop(); // Usuń najstarszą wpłatę
        }
    }
    totalSum.value = sum; // Aktualizuj sumę wszystkich wpłat
    console.log('Suma wszystkich wpłat: ' + totalSum.value);
});
</script>
