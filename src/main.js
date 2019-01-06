import Vue from "vue";
import "./plugins/vuetify";
import store from "./store/index";
import App from "./App.vue";
import VueSocketIO from "vue-socket.io";
import router from "./router";

Vue.config.productionTip = false;

Vue.use(
  new VueSocketIO({
    debug: true,
    connection: "http://localhost:3001", // or use `//${window.location.host}`, if the connection URL will use the same host as window
    vuex: {
      store,
      actionPrefix: "SOCKET_",
      mutationPrefix: "SOCKET_"
    }
  })
);

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");
