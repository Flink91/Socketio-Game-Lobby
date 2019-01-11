const state = {
  connected: false,
  name: null,
  color: null,
  rooms: null,
  room: null,
  isHost: false
};

const getters = {
  conncected(state) {
    return state.connected;
  },
  name(state) {
    return state.name;
  },
  rooms(state) {
    return state.rooms
  }
};

const mutations = {
  SOCKET_CONNECT(state) {
    state.connected = true;
  },
  SOCKET_DISCONNECT(state) {
    state.connected = false;
  },
  SOCKET_NEW_USER(state, user) {
    // eslint-disable-next-line
    console.log("%c socket_on_new_user", "color:green");
    state.name = user.username;
    state.color = user.color;
  },
  SOCKET_HOST(state, message) {
    // eslint-disable-next-line
    console.log("%c socket_host", "color:green");
    state.room = message.room;
  },
  SOCKET_JOIN(state, message) {
    // eslint-disable-next-line
    console.log("%c socket_join", "color:green");
    state.room = message.room;
  },
  SOCKET_UPDATE_ROOMS(state, message) {
    // eslint-disable-next-line
    console.log("%c socket_update_rooms" + message, "color:green");
    let newRooms = [];
    for (let key in message) {
      // skip loop if the property is from prototype
      if (!message.hasOwnProperty(key)) continue;
      newRooms.push(message[key]);
    }
    state.rooms = newRooms;
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
