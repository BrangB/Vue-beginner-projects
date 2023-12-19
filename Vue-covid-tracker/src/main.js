import './assets/main.css'
import { createRouter, createWebHistory } from 'vue-router'

import { createApp } from 'vue'
import App from './App.vue'
import Home from "./components/Home.vue"
const routes = [{
  path: '/',
  name: 'Home',
  component: Home
}
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

createApp(App).use(router).mount('#app')
