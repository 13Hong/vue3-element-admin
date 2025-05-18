import { createApp } from 'vue'
import './style.css'
import setupPlugins from '@/plugins'
import App from './App.vue'


const app = createApp(App)
app.use(setupPlugins)
app.mount('#app')
