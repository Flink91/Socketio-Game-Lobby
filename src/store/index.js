import Vue from "vue";
import Vuex from "vuex";
import general from "./modules/general";
import user from "./modules/user";
import game from "./modules/game";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    general,
    user,
    game
  }
});
