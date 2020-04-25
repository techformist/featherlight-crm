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
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  computed: {
    ...mapGetters(["isLoggedIn"]),
    ...mapState("auth", ["user"]),

    formattedUserId() {
      let userName = this.user && this.user.name;
      if (userName && userName.length > 12)
        userName = `${this.user.userid.substr(0, 10)}..`;

      return userName;
    },
  },
  props: {
    anonItems: Array,
    anonNavItems: Array,
    userItems: Array,
  },
  methods: {
    goGo(to) {
      this.$router.go(to);
    },
  },
};
</script>
