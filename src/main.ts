import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { VueQueryPlugin } from '@tanstack/vue-query'
import router from './router'
import './assets/styles.css'
import App from './App.vue'

const app = createApp(App)
const pinia = createPinia()

// Register Pinia for state management
app.use(pinia)

// Register Vue Router
app.use(router)

// Register Vue Query for async state management
app.use(VueQueryPlugin)

app.mount('#app')
