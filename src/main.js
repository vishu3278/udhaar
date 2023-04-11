import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import '../node_modules/spectre.css/dist/spectre.min.css'
import '../node_modules/spectre.css/dist/spectre-icons.css'
import 'remixicon/fonts/remixicon.css'
import './assets/main.css'

import './firebase.js'

// import './constants.js'

const app = createApp(App)

app.use(router)

app.mount('#app')
