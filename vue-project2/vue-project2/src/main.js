import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './assets/Moviestyle.css'   //  전역 스타일 추가

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
