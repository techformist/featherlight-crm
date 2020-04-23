<template>
  <v-menu
    ref="menu"
    v-model="menu"
    transition="scale-transition"
    offset-y
    scrollable
    min-width="290px"
  >
    <template v-slot:activator="{ on }">
      <v-text-field
        :value="localFieldFmt"
        @change="setLocalFieldFmt"
        :label="label"
        prepend-icon="mdi-calendar"
        @blur="localField = parseDate(localFieldFmt)"
        slot="activator"
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker v-model="localField" no-title scrollable></v-date-picker>
  </v-menu>
</template>

<script>
export default {
  data() {
    return {
      menu: false,
      modal: false,
      localField: ""
    };
  },
  props: {
    label: { type: String, default: "" },
    appendIcon: { type: String, default: "mdi-calendar" },
    field: { type: String, default: "" },
    min: { type: String, default: "" },
    max: { type: String, default: "" }
  },
  mounted() {
    this.localField = this.parseDate(this.field);
  },
  watch: {
    localFieldFmt: function(val) {
      this.$emit("update:field", val);
    }
  },
  computed: {
    localFieldFmt: {
      get: function() {
        return this.formatDate(this.localField);
      },
      set: function(val) {
        this.$emit("update:field", val);
      }
    }
  },
  methods: {
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },

    parseDate(date) {
      if (!date) return null;

      const [day, month, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },

    setLocalFieldFmt(val) {
      this.localFieldFmt = val;
      this.localField = this.parseDate(val);
    }
  }
};
</script>
