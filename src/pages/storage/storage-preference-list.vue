<template>
  <Page title="Storage Settings" :breadcrumb-links="[]">
    <template #header-right>
      <router-link to="/storage-preferences/new" v-slot="{ href, route, navigate}" tag="">
        <b-button variant="primary" @click="navigate">Create New Storage Preference</b-button>
      </router-link>
    </template>
    <table-overlay-info :rows="5" :columns="5" :data="storagePreferences">
      <b-table-simple>
        <b-thead>
          <b-tr>
            <!--            <b-th>storagePreferenceId</b-th>-->
            <b-th>authType</b-th>
            <b-th>username</b-th>
            <b-th>credentialToken</b-th>
            <!--            <b-th>storageId</b-th>-->
            <b-th>hostName</b-th>
            <b-th>port</b-th>
            <b-th></b-th>
          </b-tr>
        </b-thead>
        <b-tbody>
          <b-tr v-for="storagePreference in storagePreferences" :key="storagePreference.storagePreferenceId">
            <!--            <b-td>{{ storagePreference.storagePreferenceId }}</b-td>-->
            <b-td>{{ storagePreference.authType }}</b-td>
            <b-td>{{ storagePreference.username }}</b-td>
            <b-td>{{ storagePreference.credentialToken }}</b-td>
            <!--            <b-td>{{ storagePreference.storageId }}</b-td>-->
            <b-td>{{ storagePreference.hostName }}</b-td>
            <b-td>{{ storagePreference.port }}</b-td>
            <b-td>
              <b-button variant="link" disabled>
                <b-icon icon="trash"></b-icon>
              </b-button>
            </b-td>
          </b-tr>
        </b-tbody>
      </b-table-simple>
    </table-overlay-info>

  </Page>
</template>

<script>
import Page from "@/components/Page";
// import googleDriveIcon from "../assets/external-storage-icons/google-drive-96dp.png";
// import oneDriveIcon from "../assets/external-storage-icons/onedrive.png";
// import dropboxIcon from "../assets/external-storage-icons/1101px-Dropbox_Icon.svg.png";
// import ResourceMetadataModal from "@/components/modals/resource-metadata-modal";
// import ModalShareEntity from "airavata-custos-portal/src/lib/components/modals/modal-share-entity";
// import NotesModal from "@/components/modals/notes-modal";
// import FilePreviewModal from "@/components/modals/file-preview-modal";
// import MapSelectedFilesAndFoldersToCollectionGroupsModal
//   from "@/components/modals/map-selected-files-and-folders-to-collection-groups-modal";
import TableOverlayInfo from "airavata-custos-portal/src/lib/components/overlay/table-overlay-info";
import store from "@/store";

export default {
  name: "storage-preference-list",
  store: store,
  components: {Page, TableOverlayInfo},
  computed: {
    storagePreferences() {
      return this.$store.getters["emcStoragePreference/getStoragePreferences"]();
    }
  },
  methods: {
    refreshData() {
      this.$store.dispatch("emcStoragePreference/fetchStoragePreferences");
    }
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

ul li ul li {
  display: flex;
  flex-direction: row;
}

ul li ul li div:nth-child(2) {
  flex: 1;
  line-height: 38px;
}

ul li ul li div:nth-child(4) {
  flex: 1;
  padding: 3px;
  text-align: right;
}

ul li ul li div:nth-child(4) label {
  padding-left: 10px;
}
</style>
