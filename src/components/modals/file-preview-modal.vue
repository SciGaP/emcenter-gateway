<template>
  <b-modal :id="modalId" :title="file.name" size="md">
    <div>
      <div>
        <b-button variant="link">
          <b-icon icon="download"></b-icon>
          Download
        </b-button>

        <b-button variant="link">
          <b-icon icon="cloud"></b-icon>
          Copy to
        </b-button>

        <b-button variant="link">
          <b-icon icon="share"></b-icon>
          Share
        </b-button>

        <b-button variant="link" v-b-modal="`map-to-collection-groups-modal`">
          <b-icon icon="folder"></b-icon>
          Group Collections
        </b-button>
        <MapSelectedFilesAndFoldersToCollectionGroupsModal modal-id="map-to-collection-groups-modal"
                                                           :folder-ids="[]"
                                                           :file-ids="[fileId]"/>
      </div>
      <div>
        <!--        <div>{{ file }}</div>-->
        <b-icon icon="image" style="width: 100%;height: 300px;"></b-icon>
      </div>
    </div>
    <template #modal-footer="{close}">
      <b-button size="sm" variant="outline-primary" v-on:click="close()">
        Close
      </b-button>
    </template>
  </b-modal>
</template>

<script>
import store from "../../store";

import MapSelectedFilesAndFoldersToCollectionGroupsModal
  from "@/components/modals/map-selected-files-and-folders-to-collection-groups-modal";

export default {
  name: "file-preview-modal",
  store: store,
  components: {MapSelectedFilesAndFoldersToCollectionGroupsModal},
  props: {
    modalId: {default: ""},
    fileId: {default: ""}
  },
  computed: {
    file() {
      return this.$store.getters["emcFile/getFile"]({fileId: this.fileId});
    }
  }
}
</script>

<style scoped>

</style>