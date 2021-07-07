<template>
  <b-modal :id="modalId" hide-footer title="Resource Metadata" v-on:show="refreshData">
    <table-overlay-info :columns="1" :rows="5" :data="metadata">
      <template #empty>No metadata to be displayed.</template>
      <pre>{{ metadata }}</pre>
    </table-overlay-info>
  </b-modal>
</template>

<script>
import store from "../../store";
import TableOverlayInfo from "airavata-custos-portal/src/lib/components/overlay/table-overlay-info";

export default {
  name: "resource-metadata-modal",
  components: {TableOverlayInfo},
  store: store,
  props: {
    modalId: {
      default: ""
    },
    resourceId: {},
  },
  data() {
    return {
      errors: [],
      processing: false
    }
  },
  computed: {
    resource() {
      return this.$store.getters["emcResource/getResource"]({resourceId: this.resourceId});
    },
    metadata() {
      return this.$store.getters["emcResource/getResourceMetadata"]({resourceId: this.resourceId});
    }
  },
  methods: {
    async refreshData() {
      this.processing = true;

      await this.$store.dispatch("emcResource/fetchResourceMetadata", {
        resourceId: this.resourceId,
        type: this.resource.type
      });

      this.processing = false;
    }
  },
  // watch: {
  //   resource() {
  //     this.refreshData();
  //   }
  // }
}
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0px;
  padding: 10px;
}

ul li {
  display: flex;
  flex-direction: row;
}

ul li label {
  padding-left: 10px;
}
</style>