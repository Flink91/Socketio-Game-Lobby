import router from "../../router";

const state = {
  // todo: unpack this user.user, ew
  userId: null,
  uniqueId: null,
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
  user(state) {
    return {
      "username": state.name,
      "color": state.color,
      "id": state.userId
    };
  },
  userId(state) {
    return state.userId;
  },
  uniqueId(state) {
    return state.uniqueId;
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
  },
  isAllReady(state) {
    if ((state.room.clients.filter(e => {
        return e.ready === false;
      }).length <= 1) && state.room.clients.length > 1) {
      // only one is not ready which is the host and there are at least 2 clients, so all are ready
      return true;
    } else {
      return false;
    }
  },
};

const mutations = {
  SOCKET_JOINED_SERVER(state, user) {
    // eslint-disable-next-line
    console.log("%c socket_on_joined_server", "color:green");
    // state.user = user;
    state.userId = user.id;
    state.uniqueId = user.uniqueId;
    state.name = user.name;
    state.color = user.color;
  },
  SOCKET_NEW_USER(state, user) {
    // eslint-disable-next-line
    console.log("%c socket_on_new_user", "color:green");
    state.users.push(user);
    state.broadcastMessages.push(user);

  },
  //reconnection to the main page
  // SOCKET_RECONNECT_USER(state, user) {
  // eslint-disable-next-line
  // console.log("%c socket_on_reconnect_user", "color:green");
  //},
  //reconnection to the main page
  SOCKET_RECONNECT(state, user) {
    // eslint-disable-next-line
    console.log("%c socket_on_reconnect_myself", "color:green");
    // eslint-disable-next-line
    console.log(user);

  },
  //when user to reconnect wasn't found on server go back to login
  SOCKET_RECONNECT_DECLINED(state) {
    // eslint-disable-next-line
    console.log("%c socket_on_reconnect_declined", "color:green");
    // TODO: Find way to reset whole state
    // state.user = null;
    state.userId = null;
    state.name = null;
    state.color = null;
    state.users = [];
    state.broadcastMessages = [];
    state.rooms = null;
    state.messages = [];
    state.room = null;
    state.isHost = false;
    router.push("/login");
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
    // eslint-disable-next-line
    console.log("%c socket_get_room_info", "color:green");
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
    state.messages.push(message)
  },
  // setUser(state, payload) {
  //   state.user = payload;
  // },
  clearMessages(state) {
    state.messages = [];
  }

};

const actions = {
  SOCKET_USER_DISCONNECTING({
    rootState
  }, user) {
    // eslint-disable-next-line
    console.log("%c socket_on_user_disconnecting", "color:orange");
    // eslint-disable-next-line
    console.log(user);
    rootState.general.waitingForOtherPlayer = user;
  },
  SOCKET_USER_DISCONNECTED({
    state,
    rootState
  }, user) {
    // eslint-disable-next-line
    console.log("%c socket_on_user_disconnected", "color:green");
    // eslint-disable-next-line
    console.log(user);
    // eslint-disable-next-line
    console.log(state.users);
    // delete user from local users, if not disconnected before name pick
    if (user) {
      rootState.general.waitingForOtherPlayer = false;
      var disconnectedUser = state.users.find(x => x.id === user.id);
      var posInArray = state.users.indexOf(disconnectedUser);
      // delete state.users[posInArray];
      state.users.splice(posInArray, 1);
      //save disconnects to show on screen
      user.disconnected = true;
      state.broadcastMessages.push(user);
    }
  },
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
  SOCKET_HOST_LEFT({
    state,
    commit,
    rootState
  }, myparam) {
    // eslint-disable-next-line
    console.log("%c socket_host_left", "color:green");
    state.room = null;
    state.messages = [];
    rootState.general.info = {
      message: "The host left the room. Room was closed.",
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
