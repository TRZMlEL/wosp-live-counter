<template>
  <div class="font-impacto w-screen min-h-dvh bg-bgWOSP bg-cover flex flex-col overflow-hidden items-center justify-center text-white gap-5">
    <input v-model="username" class="bg-white border-black border-solid border-8 rounded-xl w-5/6 md:w-96 h-16 text-black p-5 text-lg md:text-2xl" placeholder="Imię i Nazwisko Wolontariusza" />
    <button @click="login" class="bg-white border-black border-solid border-4 text-black p-5 w-32 rounded-xl text-2xl WOSPshadow active:bg-gray-300">Zaloguj!</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { io } from 'socket.io-client';
import VueCookies from 'vue-cookies';

const socket = io(import.meta.env.VITE_LOCAL_IP+':4001');
const router = useRouter();
const username = ref('');

const usernameSave = VueCookies.get('username');
if(usernameSave !== null){
  router.push({ path: '/user' });
  router.push({ name: 'User' });
}

const login = () => {
  VueCookies.set('username', username.value);
  router.push({ path: '/user' });
  router.push({ name: 'User' });
};
</script>