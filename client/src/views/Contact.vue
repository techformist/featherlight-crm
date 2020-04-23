<template>
  <Panel icon="mdi-book-plus" title="Contacts">
    <template slot="toolbar-items"></template>
    <template slot="content">
      <ContactList />
    </template>
  </Panel>
</template>

<script>
import Panel from "../components/layouts/Panel";
import ContactList from "../components/ContactList";

export default {
  components: {
    Panel,
    ContactList
  }
};
</script>
