import { createApp } from 'vue'
// import './style.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import store from './store/index'
import router from './router/index'
import './permission'
import './mock/index.js'
import hasPermission from './utils/btnPermission.js' // vite.config.js配置utils别名
import App from './App.vue'


const app = createApp(App)
app.use(ElementPlus).use(router).use(store).use(hasPermission).mount('#app')
