<template>
  <page :title="title" :breadcrumb-links="breadcrumbLinks" :errors="errors">
    <template #header-right>
      <button-overlay :show="processing">
        <b-button variant="primary" :disabled="!isValidData" v-on:click="onCreateClick">Create</b-button>
      </button-overlay>
    </template>
    <div class="pr-3">
      <div class="pt-3">
        <label class="form-label">Hostname</label>
        <b-form-input placeholder="Host Name" v-model="hostName" type="text" :state="inputState.hostNameValidation()"/>
      </div>

      <div class="pt-3">
        <label class="form-label">Port</label>
        <b-form-input placeholder="Port Number" v-model="port" type="number" :state="inputState.portValidation()"/>
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
    inputState () {
      return {
        hostNameValidation: () => {
          if(this.hostName == null || this.hostName.length == 0)
            return null;
          if(this.hostName == 'localhost')
            return true;
          if(/^(?:(?:(?:[a-zA-z-]+):\/{1,3})?(?:[a-zA-Z0-9])(?:[a-zA-Z0-9\-.]){1,61}(?:\.[a-zA-Z]{2,})+|\[(?:(?:(?:[a-fA-F0-9]){1,4})(?::(?:[a-fA-F0-9]){1,4}){7}|::1|::)\]|(?:(?:[0-9]{1,3})(?:\.[0-9]{1,3}){3}))(?::[0-9]{1,5})?$/.test(this.hostName))
            return true;
          return false;
        },
        portValidation: () => {
          if(this.port == null || this.port.length == 0)
            return null;
          return this.port >= 1024 && this.port <= 65535? true: false;
        }
      }
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
    isValidData() {
      return (this.inputState.hostNameValidation()==null? false:this.inputState.hostNameValidation()) && 
        (this.inputState.portValidation()==null? false:this.inputState.portValidation());
    }
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