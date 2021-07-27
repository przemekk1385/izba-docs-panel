import { createStore } from "vuex";

import axios from "axios";

export default createStore({
  state: {
    errorMessage: undefined,
    token: undefined,
  },
  getters: {
    errorMessage: ({ errorMessage }) => errorMessage,
    headers: ({ token }) => ({ headers: { Authorization: `Token ${token}` } }),
    isAuthenticated: ({ token }) => !!token,
  },
  mutations: {
    errorMessage(state, message) {
      state.errorMessage = message;
    },
    token(state, token) {
      state.token = token;
    },
  },
  actions: {
    async login({ commit }, { username, password }) {
      try {
        const tokenPromise = await axios.post(
          `${process.env.VUE_APP_API_HOST}/api-token-auth/`,
          {
            username,
            password,
          }
        );
        const { data: { token } = {} } = tokenPromise;
        commit("token", token);
      } catch ({ response: { status } }) {
        commit("errorMessage", `Login failed, got ${status} response code.`);
      }
    },
    logout({ commit }) {
      commit("token", undefined);
    },
  },
  modules: {},
});
