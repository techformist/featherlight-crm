<template>
  <v-dialog :value="creditsDialog" width="65%" @input="$emit('input')">
    <template v-slot:activator="{ on }">
      <span v-on="on">
        <a>Credits</a>
      </span>
    </template>

    <v-card flat width="100%" height="100%">
      <v-card-title class="subheading grey lighten-3" primary-title
        >Credits</v-card-title
      >

      <v-row>
        <v-col cols="12" class="ml-5">
          <p class="credit-text mt-3">
            This application could not have happened without the awesome
            contributions from our team and from the wider community.
          </p>
        </v-col>

        <v-col cols="12" class="ml-5 credit-text">
          <ul>
            <li>
              Images and icons
              <ul>
                <li>
                  Images on
                  <a
                    href="https://www.pexels.com"
                    target="_blank"
                    rel="nofollow"
                    >Pexels</a
                  >
                </li>
                <li>
                  Icons by
                  <a
                    href="https://www.flaticon.com/"
                    target="_blank"
                    rel="nofollow"
                    >Awesome people</a
                  >
                  on Flaticon
                </li>
              </ul>
            </li>
          </ul>
        </v-col>
      </v-row>

      <v-divider></v-divider>

      <!-- <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="$emit('input')">Close</v-btn>
      </v-card-actions>-->
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    creditsDialog: {
      type: Boolean,
      default: false
    }
  }
};
</script>
