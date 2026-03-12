import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@/app/styles/main.css'

import App from './App.vue'
import router from '@/app/routes'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
