<template>
  <v-card class="ml-3 mr-3">
    <v-toolbar dense flat class="elevation-1">
      <slot name="toolbar-items"></slot>
    </v-toolbar>

    <v-container grid-list-xs fluid>
      <slot name="content">No content</slot>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: "PanelListMain",

  props: {
    title: String
  }
};
</script>
