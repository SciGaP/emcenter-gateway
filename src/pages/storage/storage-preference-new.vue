<template>
  <page :title="title" :breadcrumb-links="breadcrumbLinks">
    <template #header-right>
      <button-overlay :show="processing">
        <b-button variant="primary" v-on:click="onCreateClick">Create</b-button>
      </button-overlay>
    </template>
    <div class="pr-3">
      <div class="pt-3">
        <label class="form-label">Auth Type</label>
        <b-form-input v-model="authType"/>
      </div>

      <div class="pt-3">
        <label class="form-label">Username</label>
        <b-form-input v-model="username"/>
      </div>

      <div class="pt-3">
        <label class="form-label">Credential Token</label>
        <div style="display: flex; flex-direction: row;">
          <b-form-select v-model="credentialToken" :options="availableSecretEntities" style="flex: 1;"
                         :disabled="processingCredentialToken"/>
          <div class="pl-3">
            <button-overlay :show="processingCredentialToken">
              <b-button variant="outline-secondary" v-on:click="onClickCreateNewCredentialToken">
                Create New Credential Token
              </b-button>
            </button-overlay>
          </div>
        </div>
      </div>

      <div class="pt-3" v-if="this.storageId">
        <label class="form-label">StorageId</label>
        <b-form-input
          v-model="this.storageId"
          :readonly="true"
        />
      </div>

      <div class="pt-3" v-if="!this.storageId">
        <label class="form-label">Hostname</label>
        <b-form-input v-model="hostName" type="text" :state="hostnameValidation"/>
      </div>

      <div class="pt-3" v-if="!this.storageId">
        <label class="form-label">Port</label>
        <b-form-input v-model="port" type="number" :state="portValidation"/>
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
  name: "storage-preference-new",
  components: {Page, ButtonOverlay},
  store: store,
  data() {
    return {
      errors: [],
      processing: false,
      processingCredentialToken: false,

      authType: "ssh",
      username: null,
      credentialToken: null,
      hostName: null,
      port: null
    };
  },
  computed: {
    title() {
      return "New Storage Preference"
    },
    hostnameValidation() {
      if(this.hostName == null || this.hostName.length == 0)
        return null;
      if(this.hostName == 'localhost')
        return true;
      if(/^(?:(?:(?:[a-zA-z-]+):\/{1,3})?(?:[a-zA-Z0-9])(?:[a-zA-Z0-9\-.]){1,61}(?:\.[a-zA-Z]{2,})+|\[(?:(?:(?:[a-fA-F0-9]){1,4})(?::(?:[a-fA-F0-9]){1,4}){7}|::1|::)\]|(?:(?:[0-9]{1,3})(?:\.[0-9]{1,3}){3}))(?::[0-9]{1,5})?$/.test(this.hostName))
        return true;
      return false;
    },
    portValidation() {
      if(this.port == null || this.port.length == 0)
        return null;
      return this.port >= 1024 && this.port <= 65535? true: false;
    },
    storageId() {
      return this.$route.query.storageId;
    },
    breadcrumbLinks() {
      return [
        {to: '/storage-preferences', name: 'Storage Preferences'},
        {to: `/storage-preferences/new`, name: this.title}
      ];
    },
    currentUsername() {
      return custosStore.getters["auth/currentUsername"];
    },
    entities() {
      return custosStore.getters["entity/getEntities"]({
        clientId: custosService.clientId,
        ownerId: this.currentUsername
      });
    },
    availableSecretEntities() {
      if (this.entities) {
        return this.entities.filter(({type}) => type === "SECRET").map(({entityId}) => {
          return entityId
        });
      } else {
        return null;
      }
    },
  },
  methods: {
    async onCreateClick() {
      this.processing = true;

      let storage = this.$store.getters["emcStorage/getStorage"]({storageId:this.storageId});
      console.log(storage);

      try {
        await this.$store.dispatch("emcStoragePreference/createSSHStoragePreference", {
          storagePreferenceId: `storagePreference-${performance.now()}`,
          authType: this.authType,
          userName: this.username,
          credentialToken: this.credentialToken,
          storageId: this.storageId?storage.storageId:`storage-${this.hostName}-${this.port}`,
          hostName: this.storageId?storage.hostName:this.hostName,
          port: this.storageId?storage.port:this.port
        });

        if(this.storageId){
          await this.$router.push(`/storages`);
        }else{
          await this.$router.push(`/storage-preferences`);
        }
        

      } catch (error) {
        this.errors.push({
          title: `Unknown error when mapping to the collection group.`,
          source: error, variant: "danger"
        });
      }

      this.processing = false;
    },
    async onClickCreateNewCredentialToken() {
      this.processingCredentialToken = true;

      try {
        const entityId = await custosStore.dispatch("entity/createEntity", {
          entityId: `${this.clientId}_${window.performance.now()}`,
          clientId: custosService.clientId,
          name: `entity-${window.performance.now()}`,
          description: "",
          type: "SECRET",
          ownerId: this.currentUsername
        });
        console.log("#### onClickCreateNewCredentialToken  : entityId : ", entityId);
        await this.refreshData();
        this.credentialToken = entityId;
      } catch (error) {
        this.errors.push({
          title: "Unknown error when creating the entity.",
          source: error, variant: "danger"
        });
      }

      this.processingCredentialToken = false;
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