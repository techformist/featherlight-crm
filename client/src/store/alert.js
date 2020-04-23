import { make } from "vuex-pathify";

const getDefaultState = () => {
  return {
    alert: {}
  };
};
const state = getDefaultState();

export default {
  namespaced: true,
  name: "alert",

  state: state,

  mutations: {
    ...make.mutations(state),

    setAlertMsg(state, alertMsg) {
      state.alert = { message: alertMsg };
    }
  }
};
