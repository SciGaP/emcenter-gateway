<template>
  <page :title="title" :breadcrumb-links="breadcrumbLinks" :errors="errors">
    <template #header-right>
      <button-overlay :show="processing">
        <b-button variant="primary" v-on:click="onCreateClick">Create</b-button>
      </button-overlay>
    </template>
    <div class="pr-3">
      <div class="pt-3">
        <label class="form-label">Auth Type</label>
        <b-form-select :options="availableAuthTypes" v-model="authType"
                       :state="inputState.authType"/>
      </div>

      <div class="pt-3" v-if="authType === 'sda'">
        <label class="form-label">SDA path</label>
        <b-form-input v-model="sdaPath" :state="inputState.sdaPath"/>
      </div>

      <div class="pt-3" v-if="authType === 'ssh' || authType === 'sda'">
        <label class="form-label">Username</label>
        <b-form-input v-model="userName" :state="inputState.userName"/>
      </div>

      <div class="pt-3" v-if="authType === 'ssh' || authType === 'sda'">
        <label class="form-label">Credential Token</label>
        <div style="display: flex; flex-direction: row;">
          <b-form-select v-model="credentialToken" :options="availableSecretEntities"
                         :state="inputState.credentialToken" style="flex: 1;"
                         :disabled="processingCredentialToken"/>
          <div class="pl-3">
            <button-overlay :show="processingCredentialToken">
              <b-button variant="outline-secondary" v-on:click="onClickCreateNewCredentialToken">
                Create New Credential Token
              </b-button>
            </button-overlay>
          </div>
        </div>
        <b-form-invalid-feedback :state="inputState.credentialToken">
          Select credentialToken from options or create new credentialToken
        </b-form-invalid-feedback>
      </div>

      <!--      <div class="pt-3" v-if="this.storageId">-->
      <!--        <label class="form-label">StorageId</label>-->
      <!--        <b-form-input-->
      <!--            v-model="this.storageId"-->
      <!--            :readonly="true"-->
      <!--        />-->
      <!--      </div>-->

      <div class="pt-3" v-if="!this.storageId">
        <label class="form-label">Hostname</label>
        <b-form-input v-model="hostName" type="text" :state="inputState.hostName"/>
        <b-form-invalid-feedback>
          Host name should be either 'localhost' or in format of '192.168.23.45' or 'emc.portal.wsd'
        </b-form-invalid-feedback>
      </div>

      <div class="pt-3" v-if="!this.storageId">
        <label class="form-label">Port</label>
        <b-form-input v-model="port" type="number" :state="inputState.port"/>
        <b-form-invalid-feedback>
          Port should be number in range from 1024 to 65535
        </b-form-invalid-feedback>
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

      authType: null,

      sdaPath: null,
      userName: null,
      credentialToken: null,
      hostName: null,
      port: null,

      availableAuthTypes: ["ssh", "sda"]
    };
  },
  computed: {
    inputFieldsList() {
      if (this.authType === "sda") {
        return ['authType', 'sdaPath', 'userName', 'credentialToken', 'hostName', 'port'];
      } else if (this.authType === "ssh") {
        return ['authType', 'userName', 'credentialToken', 'hostName', 'port'];
      } else {
        return ['authType', 'hostName', 'port'];
      }
    },
    title() {
      return "New Storage Preference"
    },
    inputState() {
      return {
        hostName: this.hostName == null ? null : this.isValid.hostName,
        port: this.port == null ? null : this.isValid.port,
        authType: this.authType == null ? null : this.isValid.authType,
        sdaPath: this.sdaPath == null ? null : this.isValid.sdaPath,
        userName: this.userName == null ? null : this.isValid.userName,
        credentialToken: this.credentialToken == null ? null : this.isValid.credentialToken,
      }
    },
    storageId() {
      return this.$route.query.storageId;
    },
    isValid() {
      return {
        hostName: this.hostName == 'localhost' ? true :
            /^(?:(?:(?:[a-zA-z-]+):\/{1,3})?(?:[a-zA-Z0-9])(?:[a-zA-Z0-9\-.]){1,61}(?:\.[a-zA-Z]{2,})+|\[(?:(?:(?:[a-fA-F0-9]){1,4})(?::(?:[a-fA-F0-9]){1,4}){7}|::1|::)\]|(?:(?:[0-9]{1,3})(?:\.[0-9]{1,3}){3}))(?::[0-9]{1,5})?$/.test(this.hostName) ? true : false,
        port: this.port >= 1024 && this.port <= 65535 ? true : false,
        authType: !!this.authType,
        sdaPath: !!this.sdaPath,
        userName: !!this.userName && this.userName.length > 0,
        credentialToken: this.credentialToken == null ? false : (this.credentialToken.replaceAll('-', '').length == 32 ? true : false),

      }
    },
    breadcrumbLinks() {
      const _breadcrumbLinks = [{to: '/storages', name: 'Storages'}];
      if (this.storageId) {
        _breadcrumbLinks.push({to: `/storages/${this.storageId}`, name: `${this.storageId}`, disabled: true});
      }

      _breadcrumbLinks.push({to: `/storage-preferences/new?storageId=${this.storageId}`, name: this.title});

      return _breadcrumbLinks;
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
    isFormValid() {
      let _isFormValid = true;
      for (let i = 0; i < this.inputFieldsList.length; i++) {
        if (this.inputFieldsList[i] == 'hostName' || this.inputFieldsList[i] == 'port') {
          if (this.storageId == null)
            _isFormValid = _isFormValid && this.isValid[this.inputFieldsList[i]];
        } else {
          _isFormValid = _isFormValid && this.isValid[this.inputFieldsList[i]];
        }
      }

      return _isFormValid;
    },
    makeFormVisited() {
      for (let i = 0; i < this.inputFieldsList.length; i++) {
        if (this[this.inputFieldsList[i]] === null) this[this.inputFieldsList[i]] = "";
      }
    },
    async onCreateClick() {

      this.makeFormVisited();

      if (this.isFormValid()) {
        this.processing = true;

        let storage = this.$store.getters["emcStorage/getStorage"]({storageId: this.storageId});

        try {
          if (this.authType === "ssh") {
            await this.$store.dispatch("emcStoragePreference/createSSHStoragePreference", {
              storagePreferenceId: `storagePreference-${performance.now()}`,
              userName: this.userName,
              credentialToken: this.credentialToken,
              storageId: this.storageId ? storage.storageId : `storage-${this.hostName}-${this.port}`,
              hostName: this.storageId ? storage.hostName : this.hostName,
              port: this.storageId ? storage.port : this.port
            });
          } else if (this.authType === "sda") {
            await this.$store.dispatch("emcStoragePreference/createSdaStoragePreference", {
              storagePreferenceId: `storagePreference-${performance.now()}`,
              sdaPath: this.sdaPath,
              userName: this.userName,
              credentialToken: this.credentialToken,
              storageId: this.storageId ? storage.storageId : `storage-${this.hostName}-${this.port}`,
              hostName: this.storageId ? storage.hostName : this.hostName,
              port: this.storageId ? storage.port : this.port
            });
          }

          await this.$router.push(`/storages`);
        } catch (error) {
          this.errors.push({
            title: `Unknown error while creating the storage preference.`,
            source: error, variant: "danger"
          });
        }

        this.processing = false;
      }
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