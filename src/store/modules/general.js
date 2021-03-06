// import * as Cookies from 'js-cookie'

const state = {
  connected: false,
  loading: false,
  info: null,
  waitingForOtherPlayer: false,
  error: null
};

const getters = {
  info(state) {
    return state.info;
  },
  loading(state) {
    return state.loading;
  },
  waitingForOtherPlayer(state) {
    return state.waitingForOtherPlayer;
  }
};

const mutations = {
  setLoading(state, payload) {
    state.loading = payload;
  },
  setInfo(state, payload) {
    state.error = payload;
  },
  setWaitingForOtherPlayer(state, payload) {
    state.waitingForOtherPlayer = payload;
  },
  clearInfo(state) {
    state.info = null;
  },
  SOCKET_connect(state) {
    // eslint-disable-next-line
    console.log("%c socket_connect", "color:green");
    state.connected = true;
    state.info = {
      message: "Connected!",
      type: "success",
      time: "4000"
    };
  },
  SOCKET_disconnect(state) {
    // eslint-disable-next-line
    console.log("%c socket_disconnect", "color:orange");
    state.connected = false;

  },
  SOCKET_reconnect(state) {
    // eslint-disable-next-line
    console.log("%c socket_reconnect", "color:green");
    // TODO doesn't work. Save that reconnect worked and then send this in the connect
    // setTimeout(function () {
    //   state.io.emit("USER_RECONNECT", me);
    // }, 2000);

  },
  SOCKET_reconnect_attempt() {
    // eslint-disable-next-line
    console.log("%c socket_reconnecting", "color:orange");
  },
  SOCKET_reconnecting(state) {
    // eslint-disable-next-line
    console.log("%c socket_reconnect_attempt", "color:orange");
    state.info = {
      message: "Disconnected. Trying to reconnect...",
      type: "error"
    };
  },
  SOCKET_reconnect_error() {
    // eslint-disable-next-line
    console.log("%c socket_reconnect_error", "color:red");
  },
  SOCKET_connect_error() {
    // eslint-disable-next-line
    console.log("%c socket_connect_timeout", "color:red");
  },
  SOCKET_connect_timeout() {
    // eslint-disable-next-line
    console.log("%c socket_connect_timeout", "color:red");
  },
  SOCKET_connecting() {
    // eslint-disable-next-line
    console.log("%c socket_connecting", "color:orange");
  },

  SOCKET_ERROR(state, msg) {
    // eslint-disable-next-line
    console.log("%c socket_error", "color:red");
    state.info = msg;
  },
};

const actions = {

  clearInfo({
    commit
  }) {
    commit("clearInfo");
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
