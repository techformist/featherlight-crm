<template>
  <v-card flat class="elevation-1 ml-3 mr-3">
    <v-toolbar color="grey lighten-3" dense flat class="mt-3">
      <template v-slot:extension>
        <v-tabs
          v-model="tab"
          fixed-tabs
          color="grey"
          background-color="transparent"
        >
          <v-tabs-slider></v-tabs-slider>

          <v-tab
            v-for="(item, index) in tabItems"
            :key="index"
            v-shortkey="['alt', 'shift', index]"
            @shortkey="navToTab(index)"
          >
            <span>
              <v-icon class="mr-1">{{ item.icon }}</v-icon>
              {{ item.text }}
            </span>
          </v-tab>
        </v-tabs>
      </template>
    </v-toolbar>

    <v-tabs-items v-model="tab">
      <v-tab-item>
        <ClaimEditContainer />
      </v-tab-item>

      <v-tab-item>
        <ClaimEditRemarks />
      </v-tab-item>

      <v-tab-item>
        <AssessmentEdit />
      </v-tab-item>

      <v-tab-item>
        <AttachmentEdit />
      </v-tab-item>

      <v-tab-item>
        <ImageEdit />
      </v-tab-item>

      <v-tab-item>
        <ActionEdit />
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import ClaimEditContainer from "./ClaimEditContainer";
import PanelFormMain from "./layouts/PanelFormMain";

export default {
  name: "tabPanel",
  components: {
    ClaimEditContainer,
    PanelFormMain,

    ClaimEditRemarks: () => import("./ClaimEditRemarks"),
    AttachmentEdit: () => import("./AttachmentEdit"),
    ImageEdit: () => import("./ImageEdit"),
    AssessmentEdit: () => import("./AssessmentEdit"),
    ActionEdit: () => import("./ActionEdit")
  },
  data() {
    return {
      tab: null,
      tabItems: [
        { text: "Detail", icon: "mdi-details" },
        { text: "Remarks", icon: "mdi-note-outline" },
        { text: "Assessment", icon: "mdi-bookmark-check" },
        { text: "Attachments", icon: "mdi-attachment" },
        { text: "Images", icon: "mdi-image-outline" },
        { text: "Action", icon: "mdi-format-list-checks" }
      ]
    };
  },
  methods: {
    navToTab(tab) {
      this.tab = tab;
    }
  }
};
</script>
