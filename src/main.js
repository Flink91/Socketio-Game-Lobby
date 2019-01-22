import Vue from "vue";
import "./plugins/vuetify";
import store from "./store/index";
import App from "./App.vue";
import VueSocketIO from "vue-socket.io";
import router from "./router";

import Alert from "./components/shared/Alert.vue"

import VueChatScroll from 'vue-chat-scroll'
Vue.use(VueChatScroll)

Vue.config.productionTip = false;

Vue.use(
  new VueSocketIO({
    debug: true,
    connection: `${window.location.host}`, // or use `//${window.location.host}`, if the connection URL will use the same host as window
    vuex: {
      store,
      actionPrefix: "SOCKET_",
      mutationPrefix: "SOCKET_"
    }
  })
);

Vue.component('app-alert', Alert)

new Vue({
  store,
  router,
  render: h => h(App),
  created() {
    this.$store.commit('setLoading', false);
  }
}).$mount("#app");
