<template>
  <v-dialog v-model="showDialog" persistent max-width="1100px">
    <SubPanel>
      <template slot="toolbar-items">
        <span class="subtitle-2">New/Edit Contact</span>
      </template>

      <template slot="content">
        <v-card flat>
          <v-card-text>
            <v-form ref="form" v-model="validInput">
              <v-row>
                <v-col cols="12" md="3">
                  <v-select
                    :items="['Request', 'Complaint']"
                    label="Type"
                    v-model="activeContact['type_cd']"
                    required
                  ></v-select>
                </v-col>
                <v-col cols="12" md="3">
                  <v-select
                    :items="['Created', 'In Progress', 'Closed', 'Cancelled']"
                    label="Status"
                    v-model="activeContact['status_cd']"
                    required
                  ></v-select>
                </v-col>

                <v-col cols="12" md="3">
                  <DatePick label="Start Date" :field.sync="activeContact.planned_start_date"></DatePick>
                </v-col>
                <v-col cols="12" md="3">
                  <DatePick label="End Date" :field.sync="activeContact.planned_end_date"></DatePick>
                </v-col>
                <v-col cols="12" md="6">
                  <v-textarea label="Description" v-model="activeContact['description']"></v-textarea>
                </v-col>
                <v-col cols="12" md="6">
                  <v-textarea label="Remarks" v-model="activeContact['remarks']"></v-textarea>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn outlined @click="closeDialog">Cancel</v-btn>
            <v-btn color="primary" @click="saveRecord">Save</v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </SubPanel>
  </v-dialog>
</template>

<script>
import { sync } from "vuex-pathify";
import { mapActions } from "vuex";
import SubPanel from "./layouts/SubPanel";

export default {
  data() {
    return {
      validInput: true
    };
  },
  props: {
    value: Boolean
  },

  computed: {
    ...sync("contact", ["activeContact"]),

    showDialog: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      }
    }
  },

  components: {
    SubPanel,
    DatePick: () => import("./util/DatePick")
  },

  methods: {
    ...mapActions("contact", ["createContact", "updateContact"]),

    saveRecord() {
      if (!this.activeContact["id"]) this.createContact(this.activeContact);
      else this.updateContact(this.activeContact);

      this.closeDialog();
    },

    closeDialog() {
      this.showDialog = false;
    }
  }
};
</script>
