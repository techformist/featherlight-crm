<template>
  <v-app>
    <Toolbar></Toolbar>

    <Snackbar />

    <v-content>
      <!-- <v-container fluid> -->
      <!-- 
        The key refreshes component in some wierd cases. 
        You may or may not want this 
      -->
      <router-view :key="$route.fullPath" />
      <!-- </v-container> -->
    </v-content>

    <Footer></Footer>
  </v-app>
</template>

<script>
import Toolbar from "@/components/layouts/Toolbar";
import Footer from "@/components/layouts/Footer";

export default {
  name: "App",

  components: {
    Toolbar,
    Footer,
    Snackbar: () => import("./components/util/Snackbar")
  },

  filters: {
    capitalize: function(value) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
    fmtCurrency: function(value) {
      if (!value) value = 0;
      return value.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR"
      });
    }
  }
};
</script>

<style>
/* @import url("https://fonts.googleapis.com/css?family=Open Sans");
.v-application {
  font-family: "open sans";
} */

/* .application {
  font-family: "open sans" !important;
} */

@import "./assets/css/main.css";
</style>
