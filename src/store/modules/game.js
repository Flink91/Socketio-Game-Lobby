import router from "../../router";

const state = {
  currentPlayer: null,
  boardState: [],
  isRunning: true,
  winner: null,
};

const getters = {
  game(state) {
    return state.game;
  },
  board(state) {
    return state.boardState;
  },
  currentPlayer(state) {
    return state.currentPlayer;
  }
};

const mutations = {
  setCurrentPlayer(state, payload) {
    state.currentPlayer = payload;
  },
  setBoard(state, payload) {
    state.boardState = payload;
  },
  setWinner(state, payload) {
    state.winner = payload;
  },
  setRunning(state, payload) {
    state.isRunning = payload;
  },
  SOCKET_GAME_TURN(state, payload) {
    state.boardState = payload;
  },
  SOCKET_END_GAME(state, payload) {
    state.winner = payload.winner;
    state.isRunning = false;
  }
};

const actions = {
  SOCKET_START_GAME({
    state,
    commit,
    rootState
  }, payload) {
    // eslint-disable-next-line
    console.log("%c socket_start_game", "color:green");
    router.push({
      name: "game",
      params: {
        gameID: rootState.user.room.id
      }
    });
    commit("setRunning", true);
    commit("setBoard", [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0]
    ]);
    commit("setCurrentPlayer", payload.currentPlayer);
  },
};

export default {
  state,
  getters,
  mutations,
  actions
};
