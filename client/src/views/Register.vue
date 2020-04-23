<template>
  <Panel title="Register">
    <template slot="content">
      <v-container grid-list-mg text-xs-center class="pt-5">
        <v-form
          ref="form"
          v-model="validInput"
          @submit.prevent="validateAndRegister"
        >
          <v-row justify="center" dense>
            <v-col cols="12" md="6" class="info-text mb-5"
              >Fill up some basic information and we will set you up.</v-col
            >
            <v-col md="12"></v-col>

            <v-col cols="12" md="6">
              <v-text-field
                id="userName"
                v-model="registerDetails['registerUserName']"
                name="userName"
                label="Full Name"
                autocomplete="name"
                :rules="[rules.required]"
              ></v-text-field>
            </v-col>
            <!-- <v-col md="12"></v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="registerDetails['registerEmail']"
                name="email"
                autocomplete="email"
                label="Email"
                append-icon="mdi-email"
                hint="Used for all communications incl. registration confirmation."
                :rules="[rules.required, rules.email]"
                @change="defaultUserId"
              ></v-text-field>
            </v-col> -->
            <v-col md="12"></v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="registerDetails['registerUserId']"
                autocomplete="userid"
                label="Enter your email / user id"
                :rules="[rules.required, rules.userlen, rules.email]"
                :loading="validUserIdStatus == null"
                @input="checkExistingUserId"
              >
                <template slot="append">
                  <v-icon v-if="validUserIdStatus == true" color="success"
                    >mdi-check</v-icon
                  >
                  <v-icon v-else-if="validUserIdStatus == false" color="error"
                    >mdi-minus-circle-outline</v-icon
                  >

                  <v-icon>mdi-account</v-icon>
                </template>
              </v-text-field>
            </v-col>
            <v-col md="12"></v-col>
            <v-col cols="12" md="6">
              <v-text-field
                name="password"
                autocomplete="password"
                :value="registerPass"
                label="Password"
                hint="At least 8 characters"
                :append-icon="value ? 'mdi-eye' : 'mdi-eye-off'"
                :type="value ? 'password' : 'text'"
                :rules="[rules.required]"
                @click:append="() => (value = !value)"
                @change="setRegisterPass"
              ></v-text-field>
            </v-col>
            <v-col md="12"></v-col>

            <v-col cols="12"></v-col>
            <v-col cols="12" md="6" class="pt-3 text-right">
              <v-btn outlined to="/" class="mr-3">Cancel</v-btn>
              <v-btn color="primary" @click="validateAndRegister">
                <v-icon small class="mr-2">mdi-send</v-icon>Sign up
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-container>
    </template>
  </Panel>
</template>

<script>
import { sync } from "vuex-pathify";
import { mapState, mapMutations, mapActions } from "vuex";

import Panel from "../components/layouts/Panel";
import PgtUtilMix from "../mixins/PgtUtilMix.vue";

export default {
  components: { Panel },
  mixins: [PgtUtilMix],
  data() {
    return {
      value: String,
      validInput: true
    };
  },

  computed: {
    ...mapState("authentication", [
      "registerPass",
      "registerDetails",
      "registerError",
      "validUserIdStatus"
    ]),
    ...sync("authentication", ["validUserIdStatus"])
  },

  mounted() {
    this.setRegisterDetails({});
    this.setRegisterPass("");

    this.checkUserIdValid = this.pgtDebounce(this.checkUserIdValid, 1000);
  },

  methods: {
    ...mapMutations("authentication", [
      "setRegisterPass",
      "setRegisterDetails",
      "setValidUserIdStatus"
    ]),

    ...mapActions("authentication", ["register", "checkUserIdValid"]),

    validateAndRegister() {
      if (this.$refs.form.validate()) {
        this.register();
      }
    },

    checkExistingUserId() {
      if (this.registerDetails["registerUserId"]) {
        this.validUserIdStatus = null;
        this.checkUserIdValid();
      }
    },

    defaultUserId(val) {
      this.registerDetails["registerUserId"] = val;
      this.checkExistingUserId();
    }
  }
};
</script>
