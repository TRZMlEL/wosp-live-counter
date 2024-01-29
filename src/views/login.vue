<template>
  <div class="font-Scansky w-screen h-screen bg-bgWOSP bg-cover flex flex-col overflow-hidden items-center justify-center text-white gap-5">
    <input v-model="username" class="bg-white border-black border-solid border-8 rounded-xl w-5/6 md:w-96 h-16 text-black p-5 text-lg md:text-2xl" placeholder="Imię i Nazwisko Wolontariusza" />
    <input v-model="ip" class="bg-white border-black border-solid border-8 rounded-xl w-5/6 md:w-96 h-16 text-black p-5 text-lg md:text-2xl" placeholder="ip" />
    <button @click="login" class="bg-white border-black border-solid border-4 text-black p-5 w-32 rounded-xl text-xl WOSPshadow">Zaloguj</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import VueCookies from 'vue-cookies';

const router = useRouter();
const username = ref('');
const ip = ref('');

console.log(window.location.href)

// const usernameSave = VueCookies.get('username');
// if(usernameSave !== null){
//   router.push({ path: '/user' });
//   router.push({ name: 'User' });
// }

const login = () => {
  VueCookies.set('username', username.value);
  VueCookies.set('ip', ip.value);
  router.push({ path: '/user' });
  router.push({ name: 'User' });
};
</script>