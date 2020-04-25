const getDefaultState = () => {
  return {
    alert: {},
  };
};
const state = getDefaultState();

export default {
  namespaced: true,
  name: "alert",

  state: state,

  mutations: {
    setAlertMsg(state, alertMsg) {
      state.alert = { message: alertMsg };
    },
  },
};
