<template>
  <div>
    <h1>Login</h1>
    <input v-model="username" placeholder="Username" />
    <button @click="login">Login</button>
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