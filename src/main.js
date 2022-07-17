import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import '../node_modules/spectre.css/dist/spectre.min.css'
import './assets/main.css'

import './firebase.js'

const app = createApp(App)

app.use(router)

app.mount('#app')
