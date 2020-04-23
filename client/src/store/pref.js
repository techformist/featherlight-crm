import { make } from "vuex-pathify";

const getDefaultState = () => {
  return {
    leftDrawOpen: false,
    rightDrawOpen: false,
    rightDrawEnabled: false
  };
};
const state = getDefaultState();

export default {
  namespaced: true,
  name: "pref",
  state: state,
  mutations: {
    ...make.mutations(state)
  }
};
