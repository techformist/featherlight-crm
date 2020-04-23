<script>
export default {
  data() {
    return {
      rules: {
        required: value => !!value || "Required",
        max20Chars: value =>
          (!!value && value.length <= 20) || "Max 20 characters",
        min8Chars: value =>
          (!!value && value.length >= 8) || "Min 8 characters",
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        },
        userlen: value =>
          (!!value && value.length <= 100) || "Max 100 characters"
      }
    };
  },
  computed: {
    pgtSmallView() {
      return this.$vuetify.breakpoint.smAndDown;
    }
  },
  methods: {
    pgtDebounce(func, delay) {
      let debounceTimer;
      return function() {
        const context = this;
        const args = arguments;
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => func.apply(context, args), delay);
      };
    }
  }
};
</script>
