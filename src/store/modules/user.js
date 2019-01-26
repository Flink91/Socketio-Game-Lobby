import router from "../../router";

const state = {
  name: null,
  color: null,
  users: [],
  broadcastMessages: [],
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
  isHost(state) {
    return state.isHost;
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
  },
  last10BroadcastMessages(state) {
    if (state.broadcastMessages.length <= 10) {
      return state.broadcastMessages;
    } else {
      return state.broadcastMessages.slice(-10);
    }
  }
};

const mutations = {
  SOCKET_USER_DISCONNECTED(state, user) {
    // eslint-disable-next-line
    console.log("%c socket_on_user_disconnected", "color:green");
    // delete user from local users
    var disconnectedUser = state.users.find(x => x.id === user.id);
    var posInArray = state.users.indexOf(disconnectedUser);
    delete state.users[posInArray];
    //save disconnects to show on screen
    user.disconnected = true;
    state.broadcastMessages.push(user);
  },
  SOCKET_JOINED_SERVER(state, user) {
    // eslint-disable-next-line
    console.log("%c socket_on_joined_server", "color:green");
    state.name = user.username;
    state.color = user.color;
  },
  SOCKET_NEW_USER(state, user) {
    // eslint-disable-next-line
    console.log("%c socket_on_new_user", "color:green");
    state.users.push(user);
    state.broadcastMessages.push(user);

  },
  SOCKET_HOST(state) {
    // eslint-disable-next-line
    console.log("%c socket_host", "color:green");
    state.isHost = true;

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

const actions = {
  SOCKET_KICKED({
    state,
    commit,
    rootState
  }, myparam) {
    // eslint-disable-next-line
    console.log("%c socket_kicked", "color:green");
    state.room = null;
    state.messages = [];
    rootState.general.info = {
      message: "You were kicked from the room",
      type: "warning",
      time: "4000"
    };
    router.push("/");
  },
};

export default {
  state,
  getters,
  mutations,
  actions
};
