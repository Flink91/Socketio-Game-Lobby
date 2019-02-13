import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from 'vuex-persistedstate'
import general from "./modules/general";
import user from "./modules/user";
import game from "./modules/game";

Vue.use(Vuex);

const inAnHour = new Date(new Date().getTime() + 60 * 60 * 1000);

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    general,
    user,
    game
  }
});
