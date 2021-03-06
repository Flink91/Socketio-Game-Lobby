import Vue from "vue";
import Vuetify from 'vuetify';
import "./plugins/vuetify";
// import colors from 'vuetify/es5/util/colors';
import store from "./store/index";
import App from "./App.vue";
import VueSocketIO from "vue-socket.io";
import router from "./router";

import Toast from "./components/shared/Toast.vue";

import VueChatScroll from 'vue-chat-scroll';
Vue.use(VueChatScroll);

// Vue.config.productionTip = false;

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
    },
    options: {
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 99999,
      timeout: 20000
    }
  })
);

Vue.component('app-toast', Toast);

new Vue({
  store,
  router,
  render: h => h(App),
  computed: {
    user() {
      return store.getters.user;
    }
  },
  beforeCreate() {
    let myLocalStorage = localStorage.getItem('vuex_socket_lobby');
    console.log("checking local storage");
    if (myLocalStorage !== null) {
      if (store.getters.userId !== null) {
        console.log("local storage and userid found");
        console.log(store.getters.userId);

        this.$socket.emit("RECONNECT_USER", store.getters.uniqueId);
        store.commit("setLoading", true);
      }
    }
  },
  created() {
    this.$router.push("/");
    this.$store.commit('setLoading', false);
  },
  watch: {

  }
}).$mount("#app");
