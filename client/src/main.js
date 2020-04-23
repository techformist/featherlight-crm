import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";

import VTooltip from "v-tooltip";

Vue.config.productionTip = false;

Vue.use(VTooltip);
// Vuetify tooltip is a pain.
// This should be removed when Vuetify has better tooltip

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
