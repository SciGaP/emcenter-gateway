<template>
  <page :title="title" :breadcrumb-links="breadcrumbLinks">
    <template #header-right>
      <button-overlay :show="processing">
        <b-button variant="primary" v-on:click="onCreateClick">Create</b-button>
      </button-overlay>
    </template>
    <div class="pr-3">
      <div class="pt-3">
        <label class="form-label">Hostname</label>
        <b-form-input v-model="hostName"/>
      </div>

      <div class="pt-3">
        <label class="form-label">Port</label>
        <b-form-input v-model="port"/>
      </div>
    </div>

  </page>
</template>

<script>
import Page from "@/components/Page";
import store from "@/store";
import ButtonOverlay from "airavata-custos-portal/src/lib/components/overlay/button-overlay";
import custosStore from "airavata-custos-portal/src/lib/store";
import {custosService} from "airavata-custos-portal/src/lib/store/util/custos.util";

export default {
  name: "storage-new",
  components: {Page, ButtonOverlay},
  store: store,
  data() {
    return {
      errors: [],
      processing: false,
      hostName: null,
      port: null
    };
  },
  computed: {
    title() {
      return "New Storage"
    },
    breadcrumbLinks() {
      return [
        {to: '/storages', name: 'Storage'},
        {to: `/storages/new`, name: this.title}
      ];
    },
    currentUsername() {
      return custosStore.getters["auth/currentUsername"];
    },
  },
  methods: {
    async onCreateClick() {
      this.processing = true;

      try {
        await this.$store.dispatch("emcStorage/createSSHStorage", {
          storageId: `storage-${this.hostName}-${this.port}`,
          hostName: this.hostName,
          port: this.port
        });

        await this.$router.push(`/storages`);

      } catch (error) {
        this.errors.push({
          title: `Unknown error when mapping to the collection group.`,
          source: error, variant: "danger"
        });
      }

      this.processing = false;
    },
    async refreshData() {
      await custosStore.dispatch("entity/fetchEntities", {
        clientId: custosService.clientId,
        ownerId: this.currentUsername
      });
    }
  },
  mounted() {
    this.refreshData();
  }
}
</script>

<style scoped>

</style>