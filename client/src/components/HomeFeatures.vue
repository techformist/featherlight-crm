<template>
  <v-card class="pa-2 transparent" flat>
    <v-row align="start">
      <v-col md="2" />
      <v-col cols="12" md="10">
        <v-row>
          <v-col cols="12" class="mb-3">
            <span class="mt-6 display-2 font-weight-bold">Features</span>
            <br />
            <!-- <span class="body-2 grey--text">
              Why should Vue API Boost be part of your toolbox?
            </span> -->
          </v-col>

          <v-col cols="12">
            <p class="title">
              Here are the reasons that makes this placeholder awesome..!
            </p>
          </v-col>

          <v-col cols="12">
            <v-list three-line color="transparent">
              <v-row no-gutters>
                <template v-for="item in featureItems">
                  <v-col :key="item.header" cols="12" md="6">
                    <v-card height="100%" flat color="transparent">
                      <v-subheader
                        v-if="item.header"
                        :key="item.header"
                        v-text="item.header"
                      />

                      <v-list-item :key="item.title">
                        <v-list-item-avatar>
                          <v-icon
                            :class="[item.iconClass]"
                            v-text="item.icon"
                          />
                        </v-list-item-avatar>

                        <v-list-item-content>
                          <v-list-item-title
                            class="subtitle-1 font-weight-bold"
                            v-text="item.title"
                          />
                          <v-list-item-subtitle
                            class="body-2"
                            v-text="item.subtitle"
                          />
                        </v-list-item-content>
                      </v-list-item>
                    </v-card>
                    <v-divider></v-divider>
                  </v-col>
                </template>
              </v-row>
            </v-list>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      featureItems: [
        {
          title: "Easy to use",
          subtitle: "Set up and go. No fluff!",
          icon: "mdi-cursor-pointer",
          iconClass: "green white--text"
        },
        {
          title: "Efficient",
          subtitle: "All necessary Vue components built in.",
          icon: "mdi-call-made",
          iconClass: "blue white--text"
        },
        {
          title: "Ready to deploy",
          subtitle: "Clone repository. Change. Deploy.",
          icon: "mdi-cloud-check",
          iconClass: "amber white--text"
        },

        {
          title: "Made by humans, for humans.",
          subtitle:
            "We made this for professionals like ourselves. We listen to our clients and continuously improve. ",
          icon: "mdi-heart",
          iconClass: "red white--text"
        }
      ]
    };
  }
};
</script>
