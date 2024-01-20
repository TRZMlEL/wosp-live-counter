<template>
  <div>
    <main></main>
    <aside>
      <h2>Logi</h2>
      <pre>{{ logData }}</pre>
    </aside>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import io from 'socket.io-client';

const socket = io('http://localhost:4001');
const logData = ref('');

socket.on('connect', () => {
    // Zaloguj się jako administrator
    socket.emit('login', 'admin');

    // Wywołaj zdarzenie getSum od razu po połączeniu
    socket.emit('getData');
});

socket.on('logs', (data) => {
    console.log(data)
    logData.value = data;
  });

</script>