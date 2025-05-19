import { createApp } from 'vue'
import setupPlugins from '@/plugins'
import App from './App.vue'

// 暗黑主题样式
import 'element-plus/theme-chalk/dark/css-vars.css'
// 暗黑模式自定义变量
import '@/styles/dark/css-vars.css'
import "uno.css"


const app = createApp(App)
app.use(setupPlugins)
app.mount('#app')
