<template>
  <div class="font-Scansky w-screen h-screen bg-bgWOSP bg-cover flex flex-col overflow-hidden items-center justify-center text-white">
    <div class="p-1 bg-white rounded-lg w-4/6 md:w-2/5 lg:w-1/5 mt-15">
      <input v-model="amount" class="text-black pl-2 text-4xl rounded-lg border-8 border-black border-solid w-full" placeholder="0" type="number" />
    </div>
    <div class="grid grid-cols-2 grid-rows-3 gap-5 m-5">
      <button class="bg-white text-black text-2xl flex items-center justify-center p-5 md:p-10 rounded-lg border-4 border-black border-solid active:bg-gray-300" @click="add1">+1zł</button>
      <button class="bg-white text-black text-2xl flex items-center justify-center p-5 md:p-10 rounded-lg border-4 border-black border-solid active:bg-gray-300" @click="add2">+2zł</button>
      <button class="bg-white text-black text-2xl flex items-center justify-center p-5 md:p-10 rounded-lg border-4 border-black border-solid active:bg-gray-300" @click="add5">+5zł</button>
      <button class="bg-white text-black text-2xl flex items-center justify-center p-5 md:p-10 rounded-lg border-4 border-black border-solid active:bg-gray-300" @click="add10">+10zł</button>
      <button class="bg-white text-black text-2xl flex items-center justify-center p-5 md:p-10 rounded-lg border-4 border-black border-solid active:bg-gray-300" @click="add20">+20zł</button>
      <button class="bg-white text-black text-2xl flex items-center justify-center p-5 md:p-10 rounded-lg border-4 border-black border-solid active:bg-gray-300" @click="add50">+50zł</button>
    </div>
    <button  class="bg-white text-black text-4xl flex items-center justify-center p-5 mb-5 w-4/6 md:w-2/5 lg:w-1/5 rounded-lg border-4 border-black border-solid active:bg-gray-300"  @click="send">Wpłać!</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import io from 'socket.io-client';
import { useRouter } from 'vue-router';
import VueCookies from 'vue-cookies';

const socket = io('http://192.168.1.193:4001');
const amount = ref(0);
const router = useRouter();

socket.on('connect', () => {
  const username = VueCookies.get('username');
  console.log(username) // Pobierz wartość username z plików cookie
  if(username === null){
    router.push({ path: '/' });
    router.push({ name: 'Login' });
  }else{
    socket.emit('login', username);
  }
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
  amount.value = parseInt(amount.value)
    socket.emit('transaction', amount.value)
  amount.value = 0
}

</script>
