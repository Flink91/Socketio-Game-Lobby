const state = {
  connected: false,
  name: null,
  color: null,
  room: null,
  isHost: false
};

const getters = {
  user(state) {
    return state.user;
  }
};

const mutations = {
  SOCKET_CONNECT(state) {
    state.connected = true;
  },
  SOCKET_DISCONNECT(state) {
    state.connected = false;
  },
  setUser(state, payload) {
    state.user = payload;
  }
};

const actions = {};

export default {
  state,
  getters,
  mutations,
  actions
};
