<template>
  <v-dialog v-model="showDialog" persistent max-width="1100px">
    <SubPanel>
      <template slot="toolbar-items">
        <span class="subtitle-2">New/Edit Activity</span>
      </template>

      <template slot="content"> </template>
    </SubPanel>
  </v-dialog>
</template>

<script>
import { mapMutations } from "vuex";
import SubPanel from "./layouts/SubPanel";

export default {
  data() {
    return {
      validInput: true,
    };
  },
  props: {
    value: Boolean,
  },

  computed: {
    ...sync("contact", ["activeContact"]),

    showDialog: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },

  components: {
    SubPanel,
    // DatePick: () => import("./util/DatePick"),
  },

  methods: {},
};
</script>
