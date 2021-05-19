<template>
  <b-modal :id="id" title="Collection Group">
    <div>
      <div v-for="collectionGroup in collectionGroups" :key="collectionGroup.collectionGroupId">
        <input type="checkbox" :checked="isCollectionGroupMapped(collectionGroup)"
               v-on:click="toggleCollectionGroup(collectionGroup)"
               :name="collectionGroup.collectionGroupId" :id="collectionGroup.collectionGroupId"/>
        <label :for="collectionGroup.collectionGroupId">{{collectionGroup.name}}</label>
      </div>
    </div>
    <template #modal-footer="{close}">
      <b-button size="sm" variant="outline-primary" v-on:click="close()">
        Cancel
      </b-button>
      <b-button size="sm" variant="primary" v-on:click="close()">
        Save
      </b-button>
    </template>
  </b-modal>
</template>

<script>
import store from "../../store";

export default {
  name: "map-selected-files-and-folders-to-collection-groups-modal",
  store: store,
  props: {
    id: {
      default: ""
    },
    fileIds: {
      default: []
    },
    folderIds: {
      default: []
    }
  },
  data() {
    return {
      selectedCollectionGroupsMap: {}
    }
  },
  computed: {
    collectionGroups() {
      return this.$store.getters["emcCollectionGroup/getCollectionGroups"]();
    }
  },
  methods: {
    isCollectionGroupMapped({collectionGroupId}) {
      return !!this.selectedCollectionGroupsMap[collectionGroupId];
    },
    toggleCollectionGroup({collectionGroupId}) {
      for (let i = 0; i < this.fileIds.length; i++) {
        this.$store.dispatch("emcCollectionGroup/mapFileToCollectionGroup", {
          collectionGroupId,
          fileId: this.fileIds[0]
        })
      }
      for (let i = 0; i < this.folderIds.length; i++) {
        this.$store.dispatch("emcCollectionGroup/mapFolderToCollectionGroup", {
          collectionGroupId,
          folderId: this.folderIds[0]
        })
      }
    }
  }
}
</script>

<style scoped>

</style>