<template>
  <div class="font-impacto w-screen h-dvh bg-bgWOSP bg-cover flex flex-col overflow-hidden items-center justify-center text-white">

    <div class="grid grid-cols-2 grid-rows-5 gap-2 m-5">
      <div class="col-span-2 p-1 bg-white rounded-lg h-min">
        <input v-model="amount" class="text-black  pl-2 text-4xl rounded-lg border-8 border-black border-solid w-full" placeholder="0" type="number" inputmode="numeric" min="0" pattern="[0-9]*" />
      </div>
      <button class="bg-white text-black text-3xl flex items-center justify-center p-5 md:p-10 rounded-lg border-4 border-black border-solid hover:bg-gray-200 active:bg-gray-300" @click="add1">+1zł</button>
      <button class="bg-white text-black text-3xl flex items-center justify-center p-5 md:p-10 rounded-lg border-4 border-black border-solid hover:bg-gray-200 active:bg-gray-300" @click="add2">+2zł</button>
      <button class="bg-white text-black text-3xl flex items-center justify-center p-5 md:p-10 rounded-lg border-4 border-black border-solid hover:bg-gray-200 active:bg-gray-300" @click="add5">+5zł</button>
      <button class="bg-white text-black text-3xl flex items-center justify-center p-5 md:p-10 rounded-lg border-4 border-black border-solid hover:bg-gray-200 active:bg-gray-300" @click="add10">+10zł</button>
      <button class="bg-white text-black text-3xl flex items-center justify-center p-5 md:p-10 rounded-lg border-4 border-black border-solid hover:bg-gray-200 active:bg-gray-300" @click="add20">+20zł</button>
      <button class="bg-white text-black text-3xl flex items-center justify-center p-5 md:p-10 rounded-lg border-4 border-black border-solid hover:bg-gray-200 active:bg-gray-300" @click="add50">+50zł</button>
      <button  class="bg-white text-black text-4xl tracking-wide flex items-center justify-center p-5 mb-5 rounded-lg border-4 border-black border-solid hover:bg-gray-200 active:bg-gray-300 col-span-2"  @click="send">Wpłać!</button>
    </div>
    
  </div>
</template>

<script setup>
import { ref } from 'vue';
import io from 'socket.io-client';
import { useRouter } from 'vue-router';
import VueCookies from 'vue-cookies';

const socket = io(import.meta.env.VITE_LOCAL_IP+':4001');
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
