<template>
  <page :title="title" :breadcrumb-links="breadcrumbLinks" :errors="errors">
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
    collectionsLink() {
      let collectionsLink = '/collections';

      let queryParams = [];
      if (this.resourceType === EmcResource.EMC_RESOURCE_TYPE.EMC_RESOURCE_TYPE_COLLECTION_GROUP) {
        queryParams.push(`types=${EmcResource.EMC_RESOURCE_TYPE.EMC_RESOURCE_TYPE_COLLECTION_GROUP}`);
      }

      if (queryParams.length > 0) {
        collectionsLink += `?${queryParams.join("&")}`
      }

      return collectionsLink;
    },
    breadcrumbLinks() {
      return [
        {to: this.collectionsLink, name: this.title},
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

        await this.$router.push(this.collectionsLink);
      } catch (e) {
        this.errors.push({
          variant: "danger",
          title: "Unknown Error",
          description: "Error when creating the resource.",
          source: e
        });
      }

      this.processing = false;
    },
    refreshData() {
      let name = "resource";
      if (this.resourceType === EmcResource.EMC_RESOURCE_TYPE.EMC_RESOURCE_TYPE_COLLECTION_GROUP) {
        name = "Collection Group";
      } else if (this.resourceType === EmcResource.EMC_RESOURCE_TYPE.EMC_RESOURCE_TYPE_LAB) {
        name = "Lab";
      } else if (this.resourceType === EmcResource.EMC_RESOURCE_TYPE.EMC_RESOURCE_TYPE_COLLECTION) {
        name = "Collection";
      } else if (this.resourceType === EmcResource.EMC_RESOURCE_TYPE.EMC_RESOURCE_TYPE_DATASET) {
        name = "Dataset";
      }

      this.name = `New ${name} ${new Date().toLocaleString()}`;
    }
  },
  mounted() {
    this.refreshData();
  }
}
</script>

<style scoped>

</style>