import { make } from "vuex-pathify";

const getDefaultState = () => {
  return {
    snack: {}
  };
};
const state = getDefaultState();

export default {
  namespaced: true,
  name: "snackbar",
  state: state,
  mutations: {
    ...make.mutations(state),
    // ok, I am lazy!
    setSnack(state, showSnack) {
      state.snack = { ...showSnack };
    }
  }
};
