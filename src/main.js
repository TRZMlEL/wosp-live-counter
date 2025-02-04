import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import Admin from './views/admin.vue'
import User from './views/user.vue'
import Login from './views/login.vue'
import Sum from './views/sum.vue'
import Skarbonka from './views/skarbonka.vue'
import './style.css'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),  // Dodanie BASE_URL
  routes: [
    { path: '/', component: Login },
    { path: '/admin', component: Admin },
    { path: '/user', component: User },
    { path: '/sum', component: Sum},
    { path: '/eskarbonka', component: Skarbonka},
  ]
})

createApp(App).use(router).mount('#app')