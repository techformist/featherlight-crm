const getDefaultState = () => {
  return {
    leftDrawOpen: false,
  };
};
const state = getDefaultState();

export default {
  namespaced: true,
  name: "pref",
  state: state,
  mutations: {
    setLeftDrawOpen(state, val) {
      state.leftDrawOpen = val;
    },
  },
};
