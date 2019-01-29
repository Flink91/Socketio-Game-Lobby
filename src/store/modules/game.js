import router from "../../router";

const state = {
  game: null,
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
  },
  SOCKET_START_GAME(state, message) {
    // eslint-disable-next-line
    console.log("%c socket_start_game", "color:green");
    // eslint-disable-next-line
    console.log(message);
    router.push("/game")
  },
};

const actions = {};

export default {
  state,
  getters,
  mutations,
  actions
};
