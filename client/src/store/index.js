import Vue from "vue";
import Vuex from "vuex";

import pathify from "./pathify";
// pathify.debug();

import VuexPersist from "vuex-persist";
import Cookies from "js-cookie";

import snackbar from "./snackbar";

import pref from "./pref";
import authentication from "./authentication";
import alert from "./alert";

import contact from "./contact";

Vue.use(Vuex);

const vuexCookie = new VuexPersist({
  key: "cookieStore", // The key to store the state on in the storage provider.
  restoreState: (key) => Cookies.getJSON(key),
  saveState: (key, state) =>
    Cookies.set(key, state, {
      expires: 3,
    }),
  modules: ["authentication"], //only save user module
});

const vuexLocal = new VuexPersist({
  key: "localStore", // The key to store the state on in the storage provider.
  storage: localStorage, // or window.sessionStorage or localForage
  modules: ["pref", "contact"],
});

import { make } from "vuex-pathify";

const getDefaultState = () => {
  return {
    baseURL: "/api",
    isMobileApp: false,
    loading: false,
    tinyKey: "6bsm37mwzh123b23iaqvjzvn594567n9fu3zrwga8or29wsr",
  };
};

const state = getDefaultState();

export default new Vuex.Store({
  namespaced: true,
  name: "global",

  state: state,

  mutations: {
    ...make.mutations(state),
  },
  actions: {},
  modules: {
    snackbar,
    pref,
    authentication,
    alert,
    contact,
  },
  plugins: [pathify.plugin, vuexCookie.plugin, vuexLocal.plugin],
});
