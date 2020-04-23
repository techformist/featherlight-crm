<template>
  <div>
    <v-toolbar
      flat
      dense
      color="#ECEFF1"
      v-if="title"
      fill-height
      class="align-center ma-0 pa-0"
    >
      <v-toolbar-title class="title primary--text">
        <v-icon v-if="icon" color="primary" class="mr-2">{{ icon }}</v-icon>
        <span color="primary" class="font-weight-bold">{{ title }}</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <slot name="toolbar-items"></slot>

      <template v-slot:extension v-if="extn">
        <slot name="toolbar-extn"></slot>
      </template>

      <v-progress-linear
        :active="loading"
        :loading="loading"
        :indeterminate="true"
        bottom
        absolute
        color="#2196F3"
      />
    </v-toolbar>

    <Alert />
    <v-row>
      <v-col cols="12">
        <slot name="content">No content</slot>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "panel",

  props: {
    title: String,
    icon: String,
    extn: Boolean
  },
  data() {
    return {};
  },
  computed: {
    ...mapState(["loading"])
  },
  components: {
    Alert: () => import("../util/Alert")
  }
};
</script>
