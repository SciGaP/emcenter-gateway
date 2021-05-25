<template>
  <b-modal :id="modalId" v-on:show="reset" title="Copy To">
    <ul>
      <li v-for="storagePreference in storagePreferences" :key="storagePreference.storagePreferenceId"
          v-on:click="selectedStoragePreferenceId = storagePreference.storagePreferenceId"
          :class="{selected: selectedStoragePreferenceId===storagePreference.storagePreferenceId}">
        <img :src="storageIcons[storagePreference.storageType]"/>
        <div>
          {{ storagePreference.storageEmail }}
        </div>

        <b-radio v-model="selectedStoragePreferenceId" name="storage-selection"
                 :value="storagePreference.storagePreferenceId"></b-radio>
        <!--        <input type="radio" name="storage-selection"-->
        <!--               :checked="selectedStoragePreferenceId === storagePreference.storagePreferenceId"-->
        <!--               :id="`storagePreference-${storagePreference.storagePreferenceId}`"/>-->
      </li>
    </ul>
    <template #modal-footer={close}>
      <b-button variant="primary" size="sm" v-on:click="close">Copy</b-button>
      <b-button variant="secondary" size="sm" v-on:click="close">Cancel</b-button>
    </template>
  </b-modal>
</template>

<script>
import store from "../../store";
import googleDriveIcon from "@/assets/external-storage-icons/google-drive-96dp.png";
import oneDriveIcon from "@/assets/external-storage-icons/onedrive.png";
import dropboxIcon from "@/assets/external-storage-icons/1101px-Dropbox_Icon.svg.png";

export default {
  name: "copy-modal",
  props: {
    modalId: {
      default: "copy-modal"
    },
    fileIds: {
      default() {
        return []
      }
    },
    folderIds: {
      default() {
        return []
      }
    }
  },
  store: store,
  data() {
    return {
      storageIcons: {
        "google-drive": googleDriveIcon,
        "onedrive": oneDriveIcon,
        "dropbox": dropboxIcon,
      },
      selectedStoragePreferenceId: 0
    };
  },
  methods: {
    reset() {
      this.selectedStoragePreferenceId = this.$store.getters["emcStorageSettings/getDefaultStoragePreference"]();
    }
  },
  computed: {
    storagePreferences() {
      return this.$store.getters["emcStorageSettings/getStoragePreferences"]();
    }
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

li {
  display: flex;
  flex-direction: row;
  cursor: pointer;
}

li.selected {
  background-color: #e2eeff;
}

li div:nth-child(2) {
  flex: 1;
  line-height: 38px;
}

li div:nth-child(3) {
  padding: 5px;
}
</style>