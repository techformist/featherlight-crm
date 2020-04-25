<template>
  <Panel icon="mdi-book-plus" title="Activities">
    <template slot="toolbar-items"></template>
    <template slot="content"> </template>
  </Panel>
</template>

<script>
import Panel from "../components/layouts/Panel";
// import ActivityList from "../components/ActivityList";

export default {
  components: {
    Panel,
    // ContactList,
  },
};
</script>
