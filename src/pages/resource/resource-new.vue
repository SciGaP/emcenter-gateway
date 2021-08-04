<template>
  <page :title="title" :breadcrumb-links="breadcrumbLinks">
    <template #header-right>
      <button-overlay :show="processing">
        <b-button variant="primary" v-on:click="onCreateClick">Create</b-button>
      </button-overlay>
    </template>
    <div>
      <div class="pt-3">
        <label class="form-label">Name</label>
        <b-form-input v-model="name"/>
      </div>
    </div>
  </page>
</template>

<script>
import Page from "@/components/Page";
import EmcResource from "@/service/emc-service/emc-service-resource";
import store from "@/store";
import ButtonOverlay from "airavata-custos-portal/src/lib/components/overlay/button-overlay";

export default {
  name: "resource-new",
  components: {Page, ButtonOverlay},
  store: store,
  data() {
    return {
      errors: [],
      processing: false,

      name: ""
    };
  },
  computed: {
    title() {
      if (this.resourceType === EmcResource.EMC_RESOURCE_TYPE.EMC_RESOURCE_TYPE_COLLECTION_GROUP) {
        return "New Collection Group";
      } else if (this.resourceType === EmcResource.EMC_RESOURCE_TYPE.EMC_RESOURCE_TYPE_LAB) {
        return "New Lab";
      } else if (this.resourceType === EmcResource.EMC_RESOURCE_TYPE.EMC_RESOURCE_TYPE_COLLECTION) {
        return "New Collection";
      } else if (this.resourceType === EmcResource.EMC_RESOURCE_TYPE.EMC_RESOURCE_TYPE_DATASET) {
        return "New Dataset";
      } else {
        return "New Resource";
      }
    },
    breadcrumbLinks() {
      return [
        {to: '/collections', name: 'Collections'},
        {to: `/collections/new?type=${this.resourceType}`, name: this.title}
      ];
    },
    resourceType() {
      return this.$route.query.type;
    },
  },
  methods: {
    async onCreateClick() {
      this.processing = true;

      try {
        await this.$store.dispatch("emcResource/createResource", {
          type: this.resourceType,
          name: this.name
        });

        if (this.resourceType === EmcResource.EMC_RESOURCE_TYPE.EMC_RESOURCE_TYPE_COLLECTION_GROUP) {
          await this.$router.push(`/collections?type=${this.resourceType}`);
        } else if (this.resourceType === EmcResource.EMC_RESOURCE_TYPE.EMC_RESOURCE_TYPE_LAB) {
          await this.$router.push(`/labs`);
        } else {
          await this.$router.push(`/collections`);
        }

      } catch (error) {
        this.errors.push({
          title: `Unknown error when mapping to the collection group.`,
          source: error, variant: "danger"
        });
      }

      this.processing = false;
    },
    refreshData() {
      let name = "resource";
      if (this.resourceType === EmcResource.EMC_RESOURCE_TYPE.EMC_RESOURCE_TYPE_COLLECTION_GROUP) {
        name = "collection-group";
      } else if (this.resourceType === EmcResource.EMC_RESOURCE_TYPE.EMC_RESOURCE_TYPE_LAB) {
        name = "lab";
      } else if (this.resourceType === EmcResource.EMC_RESOURCE_TYPE.EMC_RESOURCE_TYPE_COLLECTION) {
        name = "collection";
      } else if (this.resourceType === EmcResource.EMC_RESOURCE_TYPE.EMC_RESOURCE_TYPE_DATASET) {
        name = "dataset";
      }

      this.name = `new-${name}-${window.performance.now()}`;
    }
  },
  mounted() {
    this.refreshData();
  }
}
</script>

<style scoped>

</style>