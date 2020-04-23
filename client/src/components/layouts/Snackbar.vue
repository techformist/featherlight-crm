<template>
  <v-snackbar v-model="show" top center :color="color" :timeout="timeout">
    {{ message }}
    <v-btn small color="white" text @click.native="show = false">
      <v-icon>mdi-close</v-icon>
    </v-btn>
  </v-snackbar>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      top: true,
      message: "",
      color: "",
      timeout: 6000
    };
  },
  created: function() {
    this.$store.watch(
      state => state.snackbar.snack,
      () => {
        const message = this.$store.state.snackbar.snack.message;
        if (message) {
          this.show = true;
          this.message = message;
          this.timeout = this.$store.state.snackbar.snack.timeout || 6000;
          this.color = this.$store.state.snackbar.snack.color || "info";
          this.$store.commit("snackbar/setSnack", {});
        }
      }
    );
  }
};
</script>
