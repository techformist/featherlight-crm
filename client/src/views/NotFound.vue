<template>
  <v-container>
    <v-card flat class="transparent pt-5" justify="center">
      <v-row class="mt-5">
        <v-col cols="12" md="3">
          <v-card flat height="100%">
            <v-col align="end">
              <v-img
                contain
                height="200px"
                width="200px"
                src="../assets/img/logo-jaz.jpg"
                justify="end"
              ></v-img>
            </v-col>
          </v-card>
        </v-col>
        <v-col cols="12" md="9">
          <v-card flat height="100%">
            <p class="display-1 font-weight-bold mt-5">
              Page not found.
            </p>
            <p class="title ">
              Try going back to home page and repeating your action. Or, contact
              us for assistance.
            </p>
            <v-btn color="primary" large to="/">Take me home</v-btn>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style>
.about-text {
  font-size: 18px;
}
</style>
