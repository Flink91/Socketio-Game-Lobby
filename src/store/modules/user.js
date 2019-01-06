const state = {
  connected: false,
  name: null,
  color: null,
  room: null,
  isHost: false
};

const getters = {
  conncected(state) {
    return state.connected;
  },
  name(state) {
    return state.name;
  }
};

const mutations = {
  SOCKET_CONNECT(state) {
    state.connected = true;
  },
  SOCKET_DISCONNECT(state) {
    state.connected = false;
  },
  SOCKET_ON_NEW_USER(state, user) {
    state.name = user.username;
    state.color = user.color;
    alert("hi from store!" + state.name);
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
