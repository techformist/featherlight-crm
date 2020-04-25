<template>
  <Panel icon="mdi-view-dashboard" title="Dashboard">
    <template slot="content">
      <v-container>
        Welcome to this beautiful dashboard.
        <v-row dense class="mt-3">
          <v-col cols="12" md="4" v-for="(item, ctr) in navItems" :key="ctr">
            <v-card
              align="center"
              :to="item.to"
              height="4em"
              :color="item.color"
              class="pt-5"
            >
              {{ item.title }}
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </template>
  </Panel>
</template>

<script>
import Panel from "../components/layouts/Panel";

export default {
  data() {
    return {
      navItems: [
        { title: "😎😎 Contacts", to: "/contacts", color: "light-blue" },
        { title: "🚀🚀 Activities", to: "#", color: "light-green" },
      ],
    };
  },
  components: { Panel },
};
</script>
