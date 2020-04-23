<template>
  <div>
    <v-alert
      class="text-center pl-3 pr-3 elevation-1"
      :value="!!alert['message']"
      :type="alert['type'] || type"
      dismissible
      @input="closeAlert"
    >
      {{ alert["message"] }}
    </v-alert>
  </div>
</template>

<script>
import { sync } from "vuex-pathify";

export default {
  data() {
    return {
      show: false,
      message: "",
      type: "error"
    };
  },
  computed: {
    alert: sync("alert/alert")
  },
  methods: {
    closeAlert() {
      this.alert["message"] = "";
    }
  }
};
</script>
