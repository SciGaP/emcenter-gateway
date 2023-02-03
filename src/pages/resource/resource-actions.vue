<template>
  <div class="d-flex flex-row" v-if="!resource.hasChildren">
    <button-overlay :show="processingDownload[resource.resourceId]">
      <b-button variant="link" size="sm" v-on:click="downloadResource(resource)"
                :disabled="!isDownloadAllowed(resource)" v-b-tooltip.hover="`Download`">
        <b-icon icon="download"></b-icon>
      </b-button>
    </button-overlay>

    <b-button variant="link" size="sm" v-b-modal="`${modalHash}-share-modal-${resource.resourceId}`"
              v-b-tooltip.hover="`Share`" :disabled="!resource.canShare"
              v-if="resource.type !== 'COLLECTION_GROUP'">
      <b-icon icon="share"></b-icon>
    </b-button>
    <ModalShareEntity :modal-id="`${modalHash}-share-modal-${resource.resourceId}`"
                      :entity-id="resource.resourceId"/>

    <b-button variant="link" size="sm"
              v-b-modal="`${modalHash}-map-to-collection-groups-modal-${resource.resourceId}`"
              v-b-tooltip.hover="`Group Collections`">
      <b-icon icon="folder"></b-icon>
    </b-button>

    <MapSelectedFilesAndFoldersToCollectionGroupsModal
        :modal-id="`${modalHash}-map-to-collection-groups-modal-${resource.resourceId}`"
        :resource-ids="[resource.resourceId]" v-on:change="onCollectionGroupsChanged"/>

    <b-button variant="link" size="sm" v-b-tooltip.hover="`Notes`"
              v-b-modal="`${modalHash}-file-notes-modal-${resource.resourceId}`">
      <b-icon icon="chat-square-text"></b-icon>
    </b-button>
    <NotesModal :modal-id="`${modalHash}-file-notes-modal-${resource.resourceId}`" :resource-id="resource.resourceId"/>

    <b-button variant="link" size="sm" v-b-tooltip.hover="`Metadata`"
              v-b-modal="`${modalHash}-resource-metadata-modal-${resource.resourceId}`"
              v-if="resource.type !== 'COLLECTION_GROUP'">
      <b-icon icon="info-circle"></b-icon>
    </b-button>
    <ResourceMetadataModal :modal-id="`${modalHash}-resource-metadata-modal-${resource.resourceId}`"
                           :resource-id="resource.resourceId"/>

  </div>
</template>

<script>
import EmcResource from "@/service/emc-service/emc-service-resource";
import MapSelectedFilesAndFoldersToCollectionGroupsModal
  from "@/components/modals/map-selected-files-and-folders-to-collection-groups-modal";
import NotesModal from "@/components/modals/notes-modal";
import ResourceMetadataModal from "@/components/modals/resource-metadata-modal";
import ModalShareEntity from "@/components/modals/share-modal";
import ButtonOverlay from "airavata-custos-portal/src/lib/components/overlay/button-overlay";
import store from "@/store";

export default {
  name: "resource-actions",
  store: store,
  components: {
    ResourceMetadataModal, ModalShareEntity, NotesModal, MapSelectedFilesAndFoldersToCollectionGroupsModal,
    ButtonOverlay
  },
  props: ["resourceId", "errors"],
  data() {
    return {
      processingDownload: {},
      modalHash: null
    }
  },
  computed: {
    resource() {
      return this.$store.getters["emcResource/getResource"]({resourceId: this.resourceId});
    }
  },
  methods: {
    onCollectionGroupsChanged() {
      this.$emit("changeCollectionGroups");
    },
    isDownloadAllowed(resource) {
      return resource.type === EmcResource.EMC_RESOURCE_TYPE.EMC_RESOURCE_TYPE_DATASET;
    },
    async downloadResource({resourceId}) {
      this.processingDownload = {...this.processingDownload, [resourceId]: true};
      try {
        await this.$store.dispatch("emcResource/downloadResource", {resourceId});
      } catch (e) {
        this.errors.push({
          variant: "danger",
          title: "Error Downloading.",
          description: "Please contact the system administrator",
          source: e
        });
      }

      this.processingDownload = {...this.processingDownload, [resourceId]: false};
    }
  },
  beforeMount() {
    this.modalHash = window.performance.now();
  }
}
</script>

<style scoped>

</style>