<template>
  <Page title="Storage Settings" :breadcrumb-links="[]">
    <template #header-right>
      <router-link to="/storages/new" v-slot="{ href, route, navigate}" tag="">
        <b-button variant="primary" @click="navigate">Create New Storage</b-button>
      </router-link>
    </template>
    <div class='w-100 p-3'>
      <ul>
        <li v-for="storage in storages" :key="storage.storageId">
          <b-button v-if="storageExpanded[storage.storageId]" variant="link" size="sm" v-b-tooltip.hover title="Collapse" v-on:click="onClickExpandOrCollapse(storage.storageId)">
            <b-icon icon="chevron-down"></b-icon>
          </b-button>
          <b-button v-else variant="link" size="sm" v-b-tooltip.hover title="View Storage Preferences" v-on:click="onClickExpandOrCollapse(storage.storageId)">
            <b-icon icon="chevron-right"></b-icon>
          </b-button>
          <span>{{ storage.storageId }}
            <router-link 
              :to="{name: 'storage-preferences-new', query:{storageId: `${storage.storageId}`}}" 
              v-slot="{ href, route, navigate}" tag="">
              <b-button variant="link" size="sm" @click="navigate" v-b-tooltip.hover title="Create Storage Preferences">
                <b-icon icon="folder-plus"></b-icon>
              </b-button>
            </router-link>
          </span>
          <div v-if="storageExpanded[storage.storageId]" class="w-100 p-2">
            <table-overlay-info :rows="5" :columns="5" :data="storagePreferencesByStorageId[storage.storageId]">
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
                  <b-tr v-for="storagePreference in storagePreferencesByStorageId[storage.storageId]" :key="storagePreference.storagePreferenceId">
                    <b-td>{{ storagePreference.storagePreferenceId }}</b-td>
                    <b-td>{{ storagePreference.authType }}</b-td>
                    <b-td>{{ storagePreference.username }}</b-td>
                    <b-td>{{ storagePreference.credentialToken }}</b-td>
                    <b-td>
                      <b-button variant="link" disabled>
                        <b-icon icon="trash"></b-icon>
                      </b-button>
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
import store from "@/store";

export default {
  name: "storage-list",
  store: store,
  components: {Page, TableOverlayInfo},
  data() {
    return {
      storageExpanded: {},
      storagePreferencesByStorageId: {}
    }
  },
  computed: {
    storages() {
      return this.$store.getters["emcStorage/getStorages"]();
    },
    storagePreferences() {
      return this.$store.getters["emcStoragePreference/getStoragePreferences"]();
    }
  },
  watch: {
    storagePreferences() {
      if(this.storagePreferences && this.storagePreferences instanceof Array){
        this.storages.forEach( storage => {
          this.storagePreferencesByStorageId = { 
            ...this.storagePreferencesByStorageId, 
            [storage.storageId]: this.storagePreferences.filter(storagePreference => storagePreference.storageId == storage.storageId)
          }
        });
      }
    }
  },
  methods: {
    refreshData() {
      this.$store.dispatch("emcStoragePreference/fetchStoragePreferences");
      this.$store.dispatch("emcStorage/fetchStorages");
    },
    onClickExpandOrCollapse(storageId) {
      this.storageExpanded = { ...this.storageExpanded, [storageId]: this.storageExpanded[storageId]^1 }
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