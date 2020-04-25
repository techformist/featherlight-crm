import Vue from "vue";
import Vuex from "vuex";

import { FeathersVuex } from "../feathers-client";

import snackbar from "./snackbar";
import pref from "./pref";
import alert from "./alert";

import auth from "./auth";
import servicePlugin from "./services/users";
import contactsPlugin from "./services/contacts";

Vue.use(Vuex);
Vue.use(FeathersVuex);

export default new Vuex.Store({
  namespaced: true,
  name: "global",

  modules: {
    snackbar,
    pref,
    alert,
    auth,
    servicePlugin,
    contactsPlugin,
  },
  plugins: [auth, servicePlugin, contactsPlugin],

  state: {},
  getters: {
    isLoggedIn(state, getters, rootState) {
      return !!rootState.auth.accessToken;
    },
  },
});
