import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


import 'jquery'
import 'popper.js'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap-icons/font/bootstrap-icons.css'



createApp(App).use(store).use(router).mount('#app')

