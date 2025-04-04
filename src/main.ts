import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import './assets/styles/main.css'

import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import tz from 'dayjs/plugin/timezone'
import persist from 'pinia-plugin-persistedstate'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

dayjs.extend(utc)
dayjs.extend(tz)
const pinia = createPinia()
pinia.use(persist)
app.use(pinia)
app.use(router)

app.mount('#app')
