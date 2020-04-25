<template>
  <Panel title="Register">
    <template slot="content">
      <v-container grid-list-mg text-xs-center class="pt-5">
        <FeathersVuexFormWrapper :item="item" watch>
          <template v-slot="{ clone, save, reset }">
            <v-form ref="form" v-model="validInput">
              <v-row justify="center" dense>
                <v-col cols="12" md="6" class="info-text mb-5"
                  >Fill up some basic information and we will set you up.</v-col
                >
                <v-col md="12"></v-col>

                <v-col cols="12" md="6">
                  <v-text-field
                    id="userName"
                    name="userName"
                    label="Full Name"
                    autocomplete="name"
                    :rules="[rules.required]"
                    v-model="user['name']"
                  ></v-text-field>
                </v-col>

                <v-col md="12"></v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    autocomplete="userid"
                    label="Enter your email"
                    :rules="[rules.required, rules.userlen, rules.email]"
                    v-model="user['email']"
                  >
                    <template slot="append">
                      <v-icon>mdi-account</v-icon>
                    </template>
                  </v-text-field>
                </v-col>
                <v-col md="12"></v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    name="password"
                    autocomplete="password"
                    v-model="user['password']"
                    label="Password"
                    hint="At least 8 characters"
                    :append-icon="value ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="value ? 'password' : 'text'"
                    :rules="[rules.required]"
                    @click:append="() => (value = !value)"
                  ></v-text-field>
                </v-col>
                <v-col md="12"></v-col>

                <v-col cols="12"></v-col>
                <v-col cols="12" md="6" class="pt-3 text-right">
                  <v-btn outlined to="/" class="mr-3">Cancel</v-btn>
                  <v-btn
                    color="primary"
                    @click="
                      () => {
                        if (validateAndRegister())
                          save().then(handleSaveResponse());
                        else showError();
                      }
                    "
                  >
                    <v-icon small class="mr-2">mdi-send</v-icon>Sign up
                  </v-btn>
                </v-col>
              </v-row>
            </v-form>
          </template>
        </FeathersVuexFormWrapper>
      </v-container>
    </template>
  </Panel>
</template>

<script>
import { mapMutations } from "vuex";
import { FeathersVuexFormWrapper } from "feathers-vuex";
import { models } from "feathers-vuex";

import Panel from "../components/layouts/Panel";
import PgtUtilMix from "../mixins/PgtUtilMix.vue";

export default {
  components: { Panel },
  mixins: [PgtUtilMix],
  data() {
    return {
      value: String,
      validInput: true,
      user: {},
    };
  },

  computed: {
    // item() {
    //   const { User } = this.$FeathersVuex.api;
    //   return new User();
    // },
  },

  created() {
    const { User } = models.api;
    console.log("User: ", User);
    const userModel = new User();
    this.user = userModel.clone();
  },

  methods: {
    ...mapMutations("snackbar", ["setSnack"]),

    handleSaveResponse(savedItem) {
      this.setSnack({
        message: "You have been registered.",
        color: "success",
      });
      console.log("savedItem", savedItem);
      // The item returned from the API call

      // we could directly log the user in..
      // .. but where's the fun in that?
      this.$router.push("/login");
    },

    showError() {
      // you can do other housekeeping here.
      this.setSnack({ message: "Error validating data.", color: "error" });
    },

    validateAndRegister() {
      // return this.$refs.form.validate();
      if (this.$refs.form.validate()) this.user.commit();
    },
  },
};
</script>
