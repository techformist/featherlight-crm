<template>
  <Panel title="Login">
    <template slot="content">
      <v-container grid-list-md class="pt-5">
        <v-form ref="form" v-model="validInput">
          <v-row justify="center">
            <v-col cols="12" md="6" class="pt-3">
              <v-text-field
                v-model="loginEmail"
                name="userid"
                autocomplete="userid"
                label="Email"
                :rules="[rules.required]"
                :append-icon="'mdi-account-box'"
                hint="Enter your login email."
              ></v-text-field>
            </v-col>
            <v-col md="12"></v-col>
            <v-col cols="12" md="6" class="pt-3">
              <v-text-field
                name="password"
                autocomplete="password"
                v-model="loginPass"
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
                <v-btn @click="validateAndLogin" color="primary" class="mr-3">
                  Login
                </v-btn>
                <br />
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
import PgtUtilMix from "../mixins/PgtUtilMix.vue";

export default {
  components: { Panel: () => import("../components/layouts/Panel") },

  mixins: [PgtUtilMix],

  data() {
    return {
      validInput: true,
      passShow: false,
      loginEmail: "",
      loginPass: "",
      loginError: "",
    };
  },

  methods: {
    ...mapActions("auth", ["authentticate"]),
    ...mapMutations("snackbar", ["setSnack"]),
    ...mapMutations("pref", ["setLeftDrawOpen"]),

    validateAndLogin() {
      if (this.$refs.form.validate()) {
        this.$store
          .dispatch("auth/authenticate", {
            strategy: "local",
            email: this.loginEmail,
            password: this.loginPass,
          })
          .then((data) => {
            this.setLeftDrawOpen(true);
            this.$router.push("/");
          })
          .catch((e) => {
            this.setSnack({ message: "Invalid login.", color: "error" });
            console.error("error", e);
          });
      } else {
        this.setSnack({ message: "Error validating data.", color: "error" });
      }
    },
  },
};
</script>
