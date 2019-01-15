const state = {
  connected: false,
  name: null,
  color: null,
  users: [],
  rooms: null,
  messages: [],
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
    return state.rooms;
  },
  room(state) {
    return state.room;
  },
  users(state) {
    return state.users;
  },
  messages(state) {
    return state.messages;
  },
  last5Users(state) {
    if (state.users.length <= 5) {
      return state.users;
    } else {
      return state.users.slice(-5);
    }
  }
};

const mutations = {
  SOCKET_CONNECT(state) {
    // eslint-disable-next-line
    // console.log("%c socket_connect", "color:green");
    state.connected = true;
  },
  SOCKET_DISCONNECT(state) {
    state.connected = false;
  },
  SOCKET_NEW_USER(state, user) {
    state.users.push(user);
    // eslint-disable-next-line
    console.log("%c socket_on_new_user", "color:green");
    state.name = user.username;
    state.color = user.color;
  },
  SOCKET_HOST(state, message) {
    // eslint-disable-next-line
    console.log("%c socket_host", "color:green");
    state.isHost = true;
    state.room = message.room;
    // eslint-disable-next-line
    console.log(state.room);

  },
  SOCKET_JOIN(state, message) {
    // eslint-disable-next-line
    console.log("%c socket_join", "color:green");
    state.room = message.room;
  },
  //this shall replace host and join
  SOCKET_GET_ROOM_INFO(state, message) {
    state.room = message;
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
    // eslint-disable-next-line
    console.log(state.rooms);
  },
  SOCKET_CHAT_MESSAGE(state, message) {
    // eslint-disable-next-line
    console.log("%c socket_chat_message", "color:green");
    // eslint-disable-next-line
    console.log(message);
    state.messages.push(message)
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
