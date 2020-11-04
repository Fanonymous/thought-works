import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'assets/css/index.scss' // 全局scss
import 'assets/fonts/fonts.css' // font图标

import '@/plugins' // 引入自定义全局组件
import '@/icons' // 引入svg组件

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
