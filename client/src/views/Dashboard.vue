<template>
  <Panel icon="mdi-view-dashboard" title="Dashboard">
    <template slot="content">
      <v-container>
        This is a beautiful dashboard.
      </v-container>
    </template>
  </Panel>
</template>

<script>
import Panel from "../components/layouts/Panel";

export default {
  components: { Panel }
};
</script>
