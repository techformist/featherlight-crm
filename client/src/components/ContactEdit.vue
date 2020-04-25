<template>
  <v-dialog v-model="showDialog" persistent max-width="1100px">
    <SubPanel>
      <template slot="toolbar-items">
        <span class="subtitle-2">New/Edit Contact</span>
      </template>

      <template slot="content" v-if="item">
        <FeathersVuexFormWrapper :item="item" watch>
          <template v-slot="{ clone, save, reset, remove }">
            <v-form ref="form" v-model="validInput">
              <v-card flat>
                <v-card-text>
                  <v-row>
                    <v-col cols="12" md="3">
                      <v-text-field v-model="item['first_name']">
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" md="3">
                      <v-text-field v-model="item['last_name']" required>
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" md="3">
                      <v-select
                        :items="['active', 'inactive']"
                        label="Status"
                        v-model="item['status_cd']"
                        required
                      ></v-select>
                    </v-col>
                  </v-row>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn outlined @click="closeDialog">Cancel</v-btn>
                  <v-btn color="primary" @click="saveRecord">
                    Save
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-form>
          </template>
        </FeathersVuexFormWrapper>
      </template>
    </SubPanel>
  </v-dialog>
</template>

<script>
import { mapMutations } from "vuex";
import SubPanel from "./layouts/SubPanel";

import { FeathersVuexFormWrapper } from "feathers-vuex";

export default {
  data() {
    return {
      validInput: true,
      item: null,
    };
  },
  props: {
    value: Boolean,
    currentItem: {
      type: Object,
      required: true,
    },
  },

  mounted() {
    const { Contact } = this.$FeathersVuex.api;

    const contactModel = new Contact();
    this.item =
      !this.currentItem || !this.currentItem["id"]
        ? contactModel
        : Contact.getFromStore(this.currentItem["id"]);
  },
  computed: {
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
  },

  methods: {
    ...mapMutations("snackbar", ["setSnack"]),

    saveRecord() {
      if (this.$refs.form.validate()) {
        if (!this.item["id"]) {
          this.item.save().catch((e) => {
            this.showError(e);
          });
        } else this.item.update();

        this.closeDialog();
      }
    },

    closeDialog() {
      this.showDialog = false;
    },

    showError(e) {
      // you can do other housekeeping here.
      this.setSnack({ message: "Error saving contact.", color: "error" });
      console.error("Error saving record", e);
    },
  },
};
</script>
