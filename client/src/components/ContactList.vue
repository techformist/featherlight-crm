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
                v-model="srchLastName"
                prepend-icon="mdi-magnify"
                label="Search Last Name"
                single-line
              ></v-text-field>
            </v-card-title>

            <v-data-table
              :headers="headers"
              :items="contacts"
              :server-items-length="Number(contacts.total)"
              hide-default-footer
            >
              <template v-slot:item="props">
                <tr @click="activeContact = props.item">
                  <td>{{ props.item.first_name }}</td>
                  <td>{{ props.item.last_name }}</td>
                  <td>{{ props.item.title }}</td>
                  <td>{{ props.item.status_cd }}</td>
                  <td>{{ props.item.email }}</td>
                  <td>{{ props.item.phone }}</td>
                  <td>
                    <v-icon color="success" @click="editRecord(props.item)"
                      >mdi-pencil</v-icon
                    >
                  </td>
                </tr>
              </template>
            </v-data-table>
          </v-card>
        </v-col>
        <!-- <v-col cols="12" class="text-md-right pt-2">
          <v-pagination
            v-model="contacts.page"
            :total-visible="7"
            :length="contacts.lastPage"
            @input="changePage"
            justify="end"
          ></v-pagination>
        </v-col> -->
      </v-row>

      <ContactEdit
        v-if="detailDialog"
        v-model="detailDialog"
        :currentItem="currentItem"
      />
    </template>
  </PanelListMain>
</template>

<script>
import { makeFindMixin } from "feathers-vuex";
import PanelListMain from "./layouts/PanelListMain";

export default {
  data() {
    return {
      detailDialog: false,
      headers: [
        { text: "First Name", value: "first_name" },
        { text: "Last Name", value: "last_name" },
        { text: "Title", value: "title" },
        { text: "Status", value: "status_cd", sortable: false },
        { text: "Email", value: "email", sortable: false },
        { text: "Phone", value: "phone", sortable: false },
        { text: "Actions", value: "actions", sortable: false },
      ],
      srchLastName: "",
      currentItem: {},
    };
  },

  computed: {
    contactsParams() {
      return { query: this.search };
    },
    search() {
      const srchStr = {};
      if (this.srchLastName) srchStr["last_name"] = this.srchLastName;

      return srchStr;
    },
  },
  mixins: [makeFindMixin({ service: "contacts" })],

  methods: {
    // changePage(page) {
    //   this.fetchContact({
    //     page: page,
    //     query: this.search,
    //   });
    // },

    editRecord(item) {
      this.currentItem = item;
      this.detailDialog = true;
    },

    newRecord() {
      this.currentItem = {};
      this.detailDialog = true;
    },
  },

  components: {
    PanelListMain,
    ContactEdit: () => import("./ContactEdit"),
  },
};
</script>
