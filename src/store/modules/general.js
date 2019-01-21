const state = {
  loading: false,
  error: null
};

const getters = {
  error(state) {
    return state.error;
  },
  loading(state) {
    return state.loading;
  }
};

const mutations = {
  setLoading(state, payload) {
    state.loading = payload;
  },
  setError(state, payload) {
    state.error = payload;
  },
  clearError(state) {
    state.error = null;
  },
  SOCKET_ERROR(state, msg) {
    // eslint-disable-next-line
    console.log("%c socket_error", "color:green");
    state.error = msg;
  },
};

const actions = {
  clearError({
    commit
  }) {
    commit("clearError");
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
