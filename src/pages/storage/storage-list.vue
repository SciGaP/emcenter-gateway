<template>
  <Page title="Storage Settings" :breadcrumb-links="breadcrumbLinks" :error=errors>
    <template #header-right>
      <router-link to="/storages/new" v-slot="{ href, route, navigate}" tag="">
        <b-button variant="primary" @click="navigate">Create New Storage</b-button>
      </router-link>
    </template>
    <div class='w-100 p-2'>
      <ul>
        <li v-for="storage in storages" :key="storage.storageId">
          <div style="display: flex; flex-direction: row;">
            <div>
              <b-button v-if="!storageExpanded[storage.storageId]" variant="link" size="sm" v-b-tooltip.hover
                        title="Collapse" v-on:click="onClickExpandOrCollapse(storage.storageId)">
                <b-icon icon="chevron-down"></b-icon>
              </b-button>
              <b-button v-else variant="link" size="sm" v-b-tooltip.hover title="View Storage Preferences"
                        v-on:click="onClickExpandOrCollapse(storage.storageId)">
                <b-icon icon="chevron-right"></b-icon>
              </b-button>
            </div>
            <div style="flex: 1;">
              <span>{{ storage.hostName }}:{{ storage.port }} <span style="font-size:12px">({{
                  storage.storageId
                }})</span></span>
            </div>
            <div style="margin-right: 25rem">
              <router-link
                  :to="{name: 'storage-preferences-new', query:{storageId: `${storage.storageId}`}}"
                  v-slot="{ href, route, navigate}" tag="">
                <b-button variant="link" size="sm" @click="navigate" v-b-tooltip.hover
                          title="Create Storage Preferences">
                  <b-icon icon="folder-plus"></b-icon>
                </b-button>
              </router-link>
            </div>
          </div>
          <div v-if="!storageExpanded[storage.storageId]" class="w-100 p-3">
            <table-overlay-info :rows="5" :columns="5" :data="storagePreferencesByStorageId[storage.storageId]">
              <template #empty>
                <div class="p-2" style="text-align: center">
                  <span>No Storage Preferences for this particular storage.</span>
                </div>
              </template>
              <b-table-simple>
                <b-thead>
                  <b-tr>
                    <b-th>Storage Preference Id</b-th>
                    <b-th>Auth Type</b-th>
                    <b-th>Username</b-th>
                    <b-th>CredentialToken</b-th>
                    <b-th></b-th>
                  </b-tr>
                </b-thead>
                <b-tbody>
                  <b-tr v-for="storagePreference in storagePreferencesByStorageId[storage.storageId]"
                        :key="storagePreference.storagePreferenceId">
                    <b-td>{{ storagePreference.storagePreferenceId }}</b-td>
                    <b-td>{{ storagePreference.authType }}</b-td>
                    <b-td>{{ storagePreference.userName }}</b-td>
                    <b-td>{{ storagePreference.credentialToken }}</b-td>
                    <b-td>
                      <button-overlay :show="processingDelete[storagePreference.storagePreferenceId]">
                        <button-delete-after-confirmation variant="link" size='sm' v-b-tooltip.hover title="Delete"
                                                          v-on:click="OnClickDeleteStoragePreference(storagePreference.storagePreferenceId)">
                          <b-icon icon="trash"></b-icon>
                        </button-delete-after-confirmation>
                      </button-overlay>
                    </b-td>
                  </b-tr>
                </b-tbody>
              </b-table-simple>
            </table-overlay-info>
          </div>
        </li>
      </ul>
    </div>
  </Page>
</template>

<script>
import Page from "@/components/Page";
import TableOverlayInfo from "airavata-custos-portal/src/lib/components/overlay/table-overlay-info";
import ButtonOverlay from "airavata-custos-portal/src/lib/components/overlay/button-overlay";
import ButtonDeleteAfterConfirmation
  from "airavata-custos-portal/src/lib/components/button/button-delete-after-confirmation";
import store from "@/store";

export default {
  name: "storage-list",
  store: store,
  components: {Page, TableOverlayInfo, ButtonOverlay, ButtonDeleteAfterConfirmation},
  data() {
    return {
      errors: [],
      storageExpanded: {},
      storagePreferencesByStorageId: {},
      processingDelete: {}
    }
  },
  computed: {
    storages() {
      return this.$store.getters["emcStorage/getStorages"]();
    },
    storagePreferences() {
      return this.$store.getters["emcStoragePreference/getStoragePreferences"]();
    },
    breadcrumbLinks() {
      return [{to: `/storages`, name: "Storages"}];
    }
  },
  watch: {
    storagePreferences() {
      if (this.storagePreferences && this.storagePreferences instanceof Array) {
        this.storages.forEach(storage => {
          this.storagePreferencesByStorageId = {
            ...this.storagePreferencesByStorageId,
            [storage.storageId]: this.storagePreferences.filter(storagePreference => storagePreference.storageId == storage.storageId)
          }
        });
      }
    }
  },
  methods: {
    async refreshData() {
      try {
        await this.$store.dispatch("emcStorage/fetchStorages");
        await this.$store.dispatch("emcStoragePreference/fetchStoragePreferences");
      } catch (error) {
        this.errors.push({
          title: `Unknown Error`,
          description: `Unknown error when mapping to the collection group.`,
          source: error, variant: "danger"
        });
      }
    },
    async OnClickDeleteStoragePreference(storagePreferenceId) {

      this.processingDelete = {...this.processingDelete, [storagePreferenceId]: true}
      try {
        await this.$store.dispatch("emcStoragePreference/deleteStoragePreference", {
          storagePreferenceId: storagePreferenceId
        });
        await this.$store.dispatch("emcStoragePreference/fetchStoragePreferences");

      } catch (error) {
        this.errors.push({
          title: `Unknown Error`,
          description: `Unknown error when deleting the storage preference ${storagePreferenceId}.`,
          source: error, variant: "danger"
        });
      }
      this.processingDelete = {...this.processingDelete, [storagePreferenceId]: false}

    },
    onClickExpandOrCollapse(storageId) {
      this.storageExpanded = {...this.storageExpanded, [storageId]: this.storageExpanded[storageId] ^ 1}
    },
  },
  mounted() {
    this.refreshData();
  }
}
</script>

<style scoped>
img {
  width: 38px;
  padding: 8px;
}

ul {
  list-style: none;
  margin: 0px;
  padding: 0px;
}

ul li > section {
  display: flex;
  flex-direction: row;
  padding-top: 40px;
}

ul li > section div:nth-child(2) {
  font-weight: 800;
  line-height: 38px;
}

</style>
