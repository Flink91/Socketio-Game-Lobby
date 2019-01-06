const state = {
  isRunning: true,
  score: ""
};

const getters = {
  game(state) {
    return state.game;
  }
};

const mutations = {
  setGame(state, payload) {
    state.game = payload;
  }
};

const actions = {};

export default {
  state,
  getters,
  mutations,
  actions
};
