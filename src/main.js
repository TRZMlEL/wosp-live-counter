import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
// import router from './router.js'  // Importowanie routera
import Admin from './views/admin.vue'
import User from './views/user.vue'
import Login from './views/login.vue'
import Sum from './views/sum.vue'
import './style.css'

const router = createRouter({
    history: createWebHistory(),
    routes: [
      { path: '/', component: Login },
      { path: '/admin', component: Admin },
      { path: '/user', component: User },
      { path: '/sum', component: Sum}
    ]
  })

createApp(App).use(router).mount('#app')