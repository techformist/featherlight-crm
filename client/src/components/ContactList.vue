<template>
  <PanelListMain>
    <template slot="toolbar-items">
      <span class="subtitle-2">Contact List</span>
      <v-spacer></v-spacer>
      <v-btn @click="newRecord" small outlined>
        <v-icon small>mdi-plus</v-icon>New
      </v-btn>
    </template>
    <template slot="content">
      <v-row dense>
        <v-col cols="12">
          <v-card flat color="transparent" height="100%" style="overflow:auto">
            <v-card-title>
              <v-spacer></v-spacer>

              <v-text-field
                v-model="srchSrNum"
                prepend-icon="mdi-magnify"
                label="Search Name"
                single-line
              ></v-text-field>
            </v-card-title>
            <v-data-table
              :headers="headers"
              :items="contacts.data"
              :options.sync="options"
              :server-items-length="Number(contacts.total)"
              hide-default-footer
            >
              <template v-slot:item="props">
                <tr @click="activeContact = props.item">
                  <td>{{ props.item.sr_number }}</td>
                  <td>{{ props.item.type_cd }}</td>
                  <td>{{ props.item.description }}</td>
                  <td>{{ props.item.status_cd }}</td>
                  <td>{{ props.item.planned_start_date }}</td>
                  <td>
                    <v-icon color="success" @click="editRecord(props.item)">mdi-pencil</v-icon>
                  </td>
                </tr>
              </template>
            </v-data-table>
          </v-card>
        </v-col>
        <v-col cols="12" class="text-md-right pt-2">
          <v-pagination
            v-model="contacts.page"
            :total-visible="7"
            :length="contacts.lastPage"
            @input="changePage"
            justify="end"
          ></v-pagination>
        </v-col>
      </v-row>
      <ContactEdit v-model="detailDialog" />
    </template>
  </PanelListMain>
</template>

<script>
import { sync } from "vuex-pathify";
import { mapActions } from "vuex";

import PanelListMain from "./layouts/PanelListMain";

export default {
  data() {
    return {
      options: {},
      detailDialog: false,
      headers: [
        { text: "SR Num.", value: "sr_number" },
        { text: "Type", value: "type_cd" },
        { text: "Description", value: "description" },
        { text: "Status", value: "status_cd", sortable: false },
        { text: "Planned Start", value: "planned_start_date", sortable: false },
        { text: "Actions", value: "actions", sortable: false }
      ],
      srchSrNum: "",
      srchSrDesc: "",
      awaitingSearch: false
    };
  },
  watch: {
    options: {
      handler() {
        this.fetchContact({
          page: 1,
          query: this.search
        });
      },
      deep: true
    },

    search: function() {
      if (!this.awaitingSearch) {
        setTimeout(() => {
          this.fetchContact({
            page: 1,
            query: this.search
          });
          this.awaitingSearch = false;
        }, 1000);
      }
      this.awaitingSearch = true;
    }
  },

  computed: {
    ...sync("contact", ["contacts", "activeContact"]),

    search() {
      const srchStr = {};
      if (this.srchSrNum) srchStr["sr_number"] = this.srchSrNum;
      if (this.srchSrDesc) srchStr["description"] = this.srchSrDesc;

      return srchStr;
    }
  },

  methods: {
    ...mapActions("contact", ["fetchContact"]),

    changePage(page) {
      this.fetchContact({
        page: page,
        query: this.search
      });
    },

    editRecord(item) {
      this.activeContact = item;
      this.detailDialog = true;
    },

    newRecord() {
      this.activeContact = { type_cd: "Request", status_cd: "Created" };
      this.detailDialog = true;
    }
  },

  components: {
    PanelListMain,
    ContactEdit: () => import("./ContactEdit")
  }
};
</script>
