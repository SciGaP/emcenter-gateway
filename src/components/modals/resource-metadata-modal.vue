<template>
  <b-modal :id="modalId" hide-footer title="Resource Metadata" v-on:show="refreshData">
    <PageErrors :errors="errors"/>
    <table-overlay-info :columns="1" :rows="5" :data="metadata">
      <template #empty>No metadata to be displayed.</template>
      <pre>{{ metadata }}</pre>
    </table-overlay-info>
  </b-modal>
</template>

<script>
import store from "../../store";
import TableOverlayInfo from "airavata-custos-portal/src/lib/components/overlay/table-overlay-info";
import PageErrors from "@/components/PageErrors";

export default {
  name: "resource-metadata-modal",
  components: {PageErrors, TableOverlayInfo},
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

      try {
        await this.$store.dispatch("emcResource/fetchResourceMetadata", {
          resourceId: this.resourceId,
          type: this.resource.type
        });
      } catch (e) {
        this.errors.push({
          variant: "danger",
          title: "Network Error",
          description: "Please contact the system administrator",
          source: e
        });
      }

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