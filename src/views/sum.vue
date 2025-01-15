<template>
    <div class="font-impact font-black w-screen h-screen bg-bgWOSP bg-cover flex flex-col overflow-hidden">
        <div class="WOSPShadow flex w-screen h-2/3 items-center justify-center text-white flex-col">
            <div class="flex flex-col">
                <h4 class="font-normal leading-none text-left tracking-wider text-7xl -translate-x-8">
                    <span class="text-1ZST2024">Z</span>
                    <span class="text-2ZST2024">S</span>
                    <span class="text-1ZST2024">T </span> 
                    <span class="text-2ZST2024"> 2</span>
                    <span class="text-1ZST2024">0</span>
                    <span class="text-2ZST2024">2</span>
                    <span class="text-1ZST2024">5</span>
                </h4>
                <h1 class="leading-none text-center text-bigMain font-black WOSPShadowMain tracking-wide" data-text="{{ totalSum }}zł" >{{ totalSum }}zł</h1>
                <h3 class=" italic leading-none text-right tracking-wider text-9xl">
                    <span class="text-FINAŁ1">F</span>
                    <span class="text-FINAŁ2">I</span>
                    <span class="text-FINAŁ3">N</span>
                    <span class="text-FINAŁ4">A</span>
                    <span class="text-FINAŁ5">Ł</span>
                </h3>
            </div>
        </div>
        <div class=" font-normal text-center WOSPShadow text-white w-screen h-1/3 flex items-center justify-start flex-col text-5xl -translate-y-16 tracking-wider">
            <h2>Ostatnie wpłaty</h2>
            <ul class="text-7xl">
                <li v-for="(payment, index) in payments" :key="index"  class="">{{ payment }}zł</li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import anime from 'animejs/lib/anime.es.js';
import io from 'socket.io-client';

const socket = io(import.meta.env.VITE_LOCAL_IP+':4001');
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
        if (payments.value.length > 3) { // Jeśli lista ma więcej niż 5 wpłat
            payments.value.pop(); // Usuń najstarszą wpłatę
        }
    }

    // Animacja sumy wszystkich wpłat
    anime({
        targets: totalSum,
        value: sum,
        round: 1,
        easing: 'easeInOutCubic',
        duration: 1500
    });
});
</script>