import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'
import general from "./modules/general";
import user from "./modules/user";
import game from "./modules/game";

Vue.use(Vuex);

const inAnHour = new Date(new Date().getTime() + 60 * 60 * 1000);

export default new Vuex.Store({
  plugins: [createPersistedState({
    storage: {
      getItem: key => Cookies.get(key),
      // Please see https://github.com/js-cookie/js-cookie#json, on how to handle JSON.
      setItem: (key, value) => Cookies.set(key, value, {
        expires: inAnHour
      }),
      removeItem: key => Cookies.remove(key)
    }
  })],
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
