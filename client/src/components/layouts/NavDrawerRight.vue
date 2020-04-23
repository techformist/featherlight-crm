<template>
  <div>
    <v-toolbar flat class="subtitle-2 grey--text" dense color="#ECEFF1">
      <span>
        <v-icon class="mr-2">{{ icon }}</v-icon>
        <span>{{ title }}</span>
      </span>
    </v-toolbar>

    <slot name="content"></slot>
  </div>
</template>

<script>
export default {
  computed: {},
  props: {}
};
</script>