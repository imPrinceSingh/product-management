import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Toast, { POSITION } from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import './style.css'
import App from './App.vue'

const app = createApp(App)
app.use(createPinia())
app.use(Toast, {
    position: POSITION.TOP_RIGHT,
    timeout: 3000,
    closeOnClick: true,
  });
app.mount('#app')