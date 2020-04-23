<template>
  <Panel title="Login">
    <template slot="content">
      <v-container grid-list-md class="pt-5">
        <v-form
          ref="form"
          v-model="validInput"
          @submit.prevent="validateAndLogin"
        >
          <v-row justify="center">
            <v-col cols="12" md="6" class="pt-3">
              <v-text-field
                v-model="registerUserId"
                name="userid"
                autocomplete="userid"
                label="User Id"
                :rules="[rules.required]"
                :append-icon="'mdi-account-box'"
                hint="Enter your user id."
              ></v-text-field>
            </v-col>
            <v-col md="12"></v-col>
            <v-col cols="12" md="6" class="pt-3">
              <v-text-field
                name="password"
                autocomplete="password"
                v-model="registerPass"
                label="Enter your password"
                hint="At least 8 characters."
                :rules="[rules.max20Chars]"
                :append-icon="passShow ? 'mdi-eye' : 'mdi-eye-off'"
                :type="passShow ? 'password' : 'text'"
                @click:append="() => (passShow = !passShow)"
              ></v-text-field>
            </v-col>
            <v-col md="12"></v-col>
            <v-col cols="12" md="6" class="pt-3 text-right">
              <v-btn outlined to="/" class="mr-5">Cancel</v-btn>
              <span class="text-center">
                <v-btn type="submit" color="primary" class="mr-3">Login</v-btn>
                <br />

                <a
                  class="pt-3 caption grey--text text-darken-5"
                  style="text-decoration: none"
                  @click="confirmAndPassReset"
                  >Forgot Password?</a
                >
              </span>
            </v-col>
            <v-col md="12"></v-col>
            <v-col cols="12" md="6" class="info-text mt-5"
              >You should've confirmed your registration through email before
              logging into the application.</v-col
            >
          </v-row>
        </v-form>
      </v-container>
    </template>
  </Panel>
</template>

<script>
import { mapMutations, mapActions } from "vuex";
import { sync } from "vuex-pathify";

import PgtUtilMix from "../mixins/PgtUtilMix.vue";

export default {
  components: { Panel: () => import("../components/layouts/Panel") },

  mixins: [PgtUtilMix],

  data() {
    return {
      validInput: true,
      passShow: false
    };
  },
  computed: {
    ...sync("authentication", [
      "registerUserId",
      "registerEmail",
      "registerPass",
      "registerError"
    ])
  },
  methods: {
    // ...mapMutations("authentication", [
    //   "setRegisterUserId",
    //   "setRegisterPass",
    //   "setRegisterError"
    // ]),
    ...mapActions("authentication", ["login", "resetPasswordInitiate"]),
    ...mapMutations("alert", ["setAlert"]),
    ...mapMutations("snackbar", ["setSnack"]),

    validateAndLogin() {
      if (this.$refs.form.validate()) {
        this.login();
      }
    },

    confirmAndPassReset() {
      if (this.registerUserId != "") {
        window.confirm("Do you want to reset your password?") &&
          this.resetPasswordInitiate();
      } else {
        window.alert("Enter your user id to reset password.");
      }
    }
  }
};
</script>
