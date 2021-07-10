<template>
  <page :title="title" :breadcrumb-links="breadcrumbLinks">
    <template #header-right>
      <button-overlay :show="processing">
        <b-button variant="primary" v-on:click="onCreateClick">Create</b-button>
      </button-overlay>
    </template>
    currentUsername:{{ currentUsername }}
    <div>
      <div>
        <label>Auth Type</label>
        <b-form-input v-model="authType"/>
      </div>

      <div>
        <label>Username</label>
        <b-form-input v-model="username"/>
      </div>

      <div>
        <label>Credential Token</label>
        <div style="display: flex; flex-direction: row;">
          <b-form-select v-model="credentialToken" :options="availableSecretEntities" style="flex: 1;"
                         :disabled="processingCredentialToken"/>
          <div class="pl-3">
            <button-overlay :show="processingCredentialToken">
              <b-button variant="primary" size="sm" v-on:click="onClickCreateNewCredentialToken">
                Create New Credential Token
              </b-button>
            </button-overlay>
          </div>
        </div>
      </div>

      <div>
        <label>Hostname</label>
        <b-form-input v-model="hostName"/>
      </div>

      <div>
        <label>Port</label>
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

      try {
        await this.$store.dispatch("emcStoragePreference/createSSHStoragePreference", {
          storagePreferenceId: `storagePreference-${performance.now()}`,
          authType: this.authType,
          username: this.username,
          credentialToken: this.credentialToken,
          storageId: `storage-${performance.now()}`,
          hostName: this.hostName,
          port: this.port
        });

        await this.$router.push(`/storage-preferences`);

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