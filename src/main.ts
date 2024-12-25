import './assets/styles/main.css'

import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import tz from 'dayjs/plugin/timezone'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

dayjs.extend(utc)
dayjs.extend(tz)
const pinia = createPinia()
app.use(pinia)
app.use(router)

app.mount('#app')
