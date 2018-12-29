import Vue from 'vue'
import './plugins/vuetify'
import store from './store'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
