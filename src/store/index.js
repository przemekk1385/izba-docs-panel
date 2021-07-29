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
    async documentList({ commit, getters }) {
      try {
        const documentListPromise = await axios.get(
          `${process.env.VUE_APP_API_HOST}/api/v1/document/`,
          getters.headers
        );
        const { data = [] } = documentListPromise;
        return data;
      } catch ({ response: { data, status } }) {
        commit(
          "errorMessage",
          `Failed to get documents, got ${status} response code.`
        );
        return [];
      }
    },
    async documentServe({ commit, getters }, documentUrl) {
      try {
        const documentPromise = await axios.get(
          documentUrl,
          Object.assign({}, getters.headers, {
            responseType: "blob",
          })
        );
        const { data } = documentPromise;

        const type = {
          pdf: "application/pdf",
        }[documentUrl.split(".").slice(-1).pop()];
        const blob = new Blob([data], { type });

        return blob;
      } catch ({ response: { data, status } }) {
        commit(
          "errorMessage",
          `Failed to get document, got ${status} response code.`
        );
      }
    },
    async eventList({ commit, getters }) {
      try {
        const eventListPromise = await axios.get(
          `${process.env.VUE_APP_API_HOST}/api/v1/event/`,
          getters.headers
        );
        const { data = [] } = eventListPromise;
        return data;
      } catch ({ response: { data, status } }) {
        commit(
          "errorMessage",
          `Failed to get events, got ${status} response code.`
        );
        return [];
      }
    },
    async tagList({ commit, getters }) {
      try {
        const tagListPromise = await axios.get(
          `${process.env.VUE_APP_API_HOST}/api/v1/tag/`,
          getters.headers
        );
        const { data = [] } = tagListPromise;

        return data.map(({ text }) => text);
      } catch ({ response: { data, status } }) {
        commit(
          "errorMessage",
          `Failed to get tags, got ${status} response code.`
        );
        return [];
      }
    },
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
