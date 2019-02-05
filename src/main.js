import Vue from "vue";
import Vuetify from 'vuetify';
import "./plugins/vuetify";
import colors from 'vuetify/es5/util/colors';
import store from "./store/index";
import App from "./App.vue";
import VueSocketIO from "vue-socket.io";
import router from "./router";

import Toast from "./components/shared/Toast.vue";

import VueChatScroll from 'vue-chat-scroll';
Vue.use(VueChatScroll);

Vue.config.productionTip = false;

Vue.use(Vuetify, {
  theme: {
    primary: "#3f51b5",
    secondary: "#f44336",
    accent: "#ffc107",
    error: "#ff5722",
    warning: "#ff9800",
    info: "#00bcd4",
    success: "#8bc34a"
  }
});

Vue.use(
  new VueSocketIO({
    debug: true,
    connection: `${window.location.host}`, // or use `${window.location.host}`, if the connection URL will use the same host as window
    vuex: {
      store,
      actionPrefix: "SOCKET_",
      mutationPrefix: "SOCKET_"
    }
  })
);

Vue.component('app-toast', Toast);

new Vue({
  store,
  router,
  render: h => h(App),
  created() {
    this.$router.push("/");
    this.$store.commit('setLoading', false);
  },
  watch: {

  }
}).$mount("#app");
