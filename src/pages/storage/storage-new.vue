<template>
  <page :title="title" :breadcrumb-links="breadcrumbLinks" :errors="errors">
    <template #header-right>
      <button-overlay :show="processing">
        <b-button variant="primary" v-on:click="onCreateClick">Create</b-button>
      </button-overlay>
    </template>
    <div class="pr-3">
      <div class="pt-3">
        <label class="form-label">Hostname</label>
        <b-form-input id="hostName" v-model="hostName" type="text" :state="inputState.hostName"/>
        <b-form-invalid-feedback>
          Host name should be either localhost or in format of 192.168.23.45 or emc.portal.wsd
        </b-form-invalid-feedback>
      </div>

      <div class="pt-3">
        <label class="form-label">Port</label>
        <b-form-input id="port" v-model="port" type="text" :state="inputState.port"/>
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
  name: "storage-new",
  components: {Page, ButtonOverlay},
  store: store,
  data() {
    return {
      errors: [],
      processing: false,
      hostName: null,
      port: null,
      inputFieldsList: ['hostName', 'port']
    };
  },
  computed: {
    title() {
      return "New Storage"
    },
    inputState () {
      return {
        hostName: this.hostName == null? null: this.isValid.hostName,
        port: this.port == null? null: this.isValid.port,
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
    isValid() {
      return {
        hostName: this.hostName == 'localhost'? true: 
          /^(?:(?:(?:[a-zA-z-]+):\/{1,3})?(?:[a-zA-Z0-9])(?:[a-zA-Z0-9\-.]){1,61}(?:\.[a-zA-Z]{2,})+|\[(?:(?:(?:[a-fA-F0-9]){1,4})(?::(?:[a-fA-F0-9]){1,4}){7}|::1|::)\]|(?:(?:[0-9]{1,3})(?:\.[0-9]{1,3}){3}))(?::[0-9]{1,5})?$/.test(this.hostName)? true: false,
        port: this.port>=1024 && this.port <= 65535? true: false
      }
    },
  },
  methods: {
    isFormValid() {
      let _isFormValid = true;
      for (let i = 0; i < this.inputFieldsList.length; i++) {
        _isFormValid = _isFormValid && this.isValid[this.inputFieldsList[i]];
      }
      return _isFormValid;
    },
    makeFormVisited() {
      for (let i = 0; i < this.inputFieldsList.length; i++) {
        if (this[this.inputFieldsList[i]] === null) this[this.inputFieldsList[i]] = "";
      }
    },
    async onCreateClick() {

      this.makeFormVisited()

      if (this.isFormValid) {
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
      }
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