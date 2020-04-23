<template>
  <div>
    <v-app-bar :clipped-left="clippedLeft" flat app min-height="65">
      <v-app-bar-nav-icon
        @click="leftDrawOpen = !leftDrawOpen"
      ></v-app-bar-nav-icon>
      <router-link to="/">
        <v-img
          src="../../assets/img/logo.png"
          contain
          max-height="50px"
          max-width="50px"
        />
      </router-link>
      <span class="title ml-1">Awesome Monkey</span>
      <!-- <span class="caption grey--text text-lighten-5">beta</span> -->

      <v-spacer></v-spacer>
      <v-card color="transparent" class="hidden-md-and-down" flat>
        <v-btn-toggle group v-if="!isLoggedIn">
          <span v-for="item in anonNavItems" :key="item.title">
            <v-btn :href="item.to" text :key="item.title">
              {{ item.title }}
            </v-btn>
          </span>
          <span v-for="(item, index) in anonItems" :key="index">
            <v-btn :to="item.to" text :key="index">
              <v-icon color="item.iconColor">{{ item.icon }}</v-icon>
              {{ item.title }}
            </v-btn>
          </span>
        </v-btn-toggle>
      </v-card>

      <v-card color="transparent" flat v-if="isLoggedIn">
        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-btn text icon v-on="on">
              <v-icon color="darker">mdi-account-circle</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item
              v-for="(item, index) in userToolbarItems"
              dense
              :key="index"
              :to="item.to"
            >
              <v-list-item-avatar>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-avatar>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <!-- <v-btn
          text
          v-if="rightDrawEnabled || rightDrawOpen"
          @click="rightDrawOpen = !rightDrawOpen"
          :disabled="!rightDrawOpen"
        >
          <v-icon>mdi-menu</v-icon>
        </v-btn>-->
      </v-card>
    </v-app-bar>

    <v-navigation-drawer v-model="leftDrawOpen" clipped hide-overlay app>
      <!-- Items are passed from here since we may want to reuse these at 
          toolbar level at some point in time -->
      <NavDrawer
        :userItems="userItems"
        :adminItems="adminItems"
        :anonItems="anonItems"
        :anonNavItems="anonNavItems"
      ></NavDrawer>
    </v-navigation-drawer>

    <!-- <v-navigation-drawer
      :value="rightDrawOpen"
      clipped
      app
      right
      width="200px"
      v-if="!rightDrawEnabled"
    >
      <NavDrawerRight title="Data Validation"></NavDrawerRight>
    </v-navigation-drawer>-->
  </div>
</template>

<script>
import NavDrawer from "./NavDrawer";
import { sync } from "vuex-pathify";
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      clippedLeft: true,
      anonNavItems: [
        { title: "How it works?", to: "/#howitworks" },
        { title: "Features", to: "/#features" },
        { title: "Pricing", to: "/#pricing" }
      ],
      anonItems: [
        { title: "Login", to: "/login", icon: "mdi-fingerprint" },
        { title: "Signup", to: "/signup", icon: "mdi-account-box-outline" }
      ],
      userItems: [
        {
          icon: "mdi-view-dashboard",
          title: "Dashboard",
          to: "/dashboard",
          color: "success"
        },
        {
          icon: "mdi-book-plus",
          title: "Service Request",
          to: "/sr"
        },
        {
          icon: "mdi-bank",
          title: "Partners",
          to: "/companies"
        }
      ],
      adminItems: [
        { icon: "mdi-account-outline", title: "Users", to: "/admin/users" },
        {
          icon: "mdi-printer",
          title: "Export Templates",
          to: "/admin/templates"
        }
      ],
      userToolbarItems: [
        { icon: "mdi-folder-account", title: "Account", to: "/my-account" },
        { icon: "mdi-logout", title: "Logout", to: "/logout" }
      ]
    };
  },
  computed: {
    ...mapGetters("authentication", ["isLoggedIn", "registerEmail"]),
    ...sync("pref", ["leftDrawOpen", "rightDrawOpen", "rightDrawEnabled"])
  },
  methods: {
    ...mapActions("authentication", ["logout"])
  },

  components: {
    NavDrawer
    // NavDrawerRight: () => import("./NavDrawerRight")
  }
};
</script>
<style scoped>
.v-toolbar__extension {
  padding: 0px !important;
}
</style>
