/**
 * Author: Cherepanov lev
 * Contact: lev.cherepanov2001@yandex.ru
 * Date: 13.04.2025
 * Данный код для тестового задания компании Rocont
 */
import '@/assets/styles/main.scss'

import { createApp } from 'vue'
import App from '@/App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.mount('#app')
