<template>
  <div>
    <v-toolbar flat class="subtitle-2 grey--text" dense color="#ECEFF1">
      <span class="font-weight-bold">
        <v-avatar class="mr-3" v-if="isLoggedIn">
          <v-icon>mdi-account-circle</v-icon>
        </v-avatar>
        <span>{{ formattedUserId }}</span>
      </span>
    </v-toolbar>

    <v-list v-if="isLoggedIn" dense>
      <v-list-item
        v-for="(item, i) in userItems"
        :key="i"
        :to="item.to"
        color="item.color"
      >
        <v-list-item-avatar>
          <v-icon color="item.iconColor">{{ item.icon }}</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="body-2">{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-list v-else dense>
      <v-list-item v-for="(item, i) in anonNavItems" :key="i" :href="item.to">
        <v-list-item-avatar>
          <v-icon color="item.iconColor">{{ item.icon }}</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title
            v-html="item.title"
            class="body-2"
          ></v-list-item-title>
          <!-- <v-list-item-subtitle  v-html="item.subtitle"></v-list-item-subtitle> -->
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-list v-if="!isLoggedIn" dense>
      <v-list-item v-for="(item, i) in anonItems" :key="i" :to="item.to">
        <v-list-item-avatar>
          <v-icon color="item.iconColor">{{ item.icon }}</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title
            v-html="item.title"
            class="body-2"
          ></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <span v-if="isOrgAdmin" dense>
      <v-toolbar
        dense
        tile
        flat
        class="subtitle-2 mt-5 elevation-1"
        height="35"
      >
        <v-avatar class="mr-3">
          <v-icon disabled>mdi-account-key</v-icon>
        </v-avatar>
        <span class="grey--text">Admin</span>
      </v-toolbar>

      <v-list dense>
        <v-list-item v-for="(item, i) in adminItems" :key="i" :to="item.to">
          <v-list-item-avatar>
            <v-icon color="item.iconColor">{{ item.icon }}</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title
              v-html="item.title"
              class="body-2"
            ></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </span>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  computed: {
    ...mapGetters("authentication", ["isLoggedIn", "isOrgAdmin"]),
    ...mapState("authentication", ["user"]),
    ...mapState(["loading"]),
    formattedUserId() {
      let userId = this.user && this.user.userid;
      if (userId && userId.length > 12)
        userId = `${this.user.userid.substr(0, 10)}..`;

      return userId;
    }
  },
  props: {
    anonItems: Array,
    anonNavItems: Array,
    userItems: Array,
    adminItems: Array
  },
  methods: {
    goGo(to) {
      this.$router.go(to);
    }
  }
};
</script>
