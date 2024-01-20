<template>
  <div class="font-Scansky w-screen h-screen bg-bgWOSP bg-cover flex flex-col overflow-hidden items-center justify-center text-white drop-shadow-WOSPshadow2 gap-5">
    <input v-model="username" class="bg-white border-black border-solid border-8 rounded-xl w-96 h-16 text-black p-5 text-2xl" placeholder="ID" />
    <button @click="login" class="bg-white border-black border-solid text-black p-5 w-32 rounded-xl text-xl">Login</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { io } from 'socket.io-client';

const socket = io('http://localhost:4001');
const router = useRouter();
const username = ref('');

const login = () => {
  if (username.value === 'admin') {
    router.push('/admin');
  } else if (username.value === 'user') {
    router.push({ path: '/user' });
    router.push({ name: 'User' });
  }
  socket.emit('login', username.value);
};
</script>