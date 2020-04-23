<template>
  <v-card flat class="mt-1">
    <v-toolbar dense flat color="grey lighten-5" height="40">
      <slot name="toolbar-items"></slot>
    </v-toolbar>

    <v-container grid-list-xs fluid>
      <slot name="content">No content</slot>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: "SubPanel"
};
</script>
