const getDefaultState = () => {
  return {
    snack: {},
  };
};
const state = getDefaultState();

export default {
  namespaced: true,
  name: "snackbar",
  state: state,
  mutations: {
    // ok, I am lazy!
    setSnack(state, showSnack) {
      state.snack = { ...showSnack };
    },
  },
};
