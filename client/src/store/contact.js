import req from "../util/req";

import { make } from "vuex-pathify";
import store from ".";

const getDefaultState = () => {
  return {
    contacts: [],
    activeContact: {},
  };
};

const state = getDefaultState();

export default {
  namespaced: true,
  name: "contact",
  state: state,

  actions: {
    async fetchContact(args, params) {
      let { page, query } = params;
      let url = `v0/sr-my`;
      page = page ? page : 1;
      url += `?page=${page}`;

      if (query && !!Object.entries(query).length)
        url += "&query=" + JSON.stringify(query);

      const { data } = await req("get", url);
      if (data) store.set("contact/contacts", data);
      else store.set("contact/contacts", { data: [] });
    },

    async createContact({ commit }, sr) {
      const { data } = await req("post", "v0/sr/", sr);
      store.set("contact/activeContact", data);
      commit("appendContact", data);
      return data;
    },

    async updateContact({ state }) {
      try {
        const { data } = await req(
          "patch",
          `v0/sr/${state.activeContact.id}`,
          state.activeContact
        );

        if (data) {
          store.set("contact/activeContact", data);
          store.set("snackbar/snack", {
            message: "Contact updated.",
            color: "success",
          });
        } else {
          store.set("snackbar/snack", {
            message: "Contact update failed.",
            color: "error",
          });
          store.commit(
            "pgtalert/setAlertMsg",
            "Contact update failed. Retry later or contact us for assistance."
          );
        }
      } catch (e) {
        // i am error}
      }
    },
  },

  mutations: {
    ...make.mutations(state),

    appendContact(state, record) {
      if (state.contacts && state.contacts.data)
        state.contacts.data.unshift(record);
    },

    resetState(state) {
      Object.assign(state, getDefaultState());
    },
  },
};
