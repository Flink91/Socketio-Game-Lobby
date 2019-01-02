import Vue from 'vue'
import './plugins/vuetify'
import store from './store'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
