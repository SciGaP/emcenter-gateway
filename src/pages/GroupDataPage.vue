<template>
  <Page :title="title" :breadcrumb-links="breadcrumbLinks">
    <template #header-right>
      <b-button variant="primary">Create New Collection Group</b-button>
    </template>
    <div class="w-100">
      <!--      <div class="w-100"-->
      <!--           style="display: flex; flex-direction: row;min-height:45px; display: inline-flex;align-items: center;">-->
      <!--        <div style="flex: 1;">-->
      <!--          <span v-if="numberOfFoldersSelected > 0">-->
      <!--            {{ numberOfFoldersSelected }} collection<span v-if="numberOfFoldersSelected > 1">s</span>-->
      <!--          </span>-->
      <!--          <span v-if="numberOfFoldersSelected > 0 && numberOfFilesSelected > 0">-->
      <!--            &-->
      <!--          </span>-->
      <!--          <span v-if="numberOfFilesSelected > 0">-->
      <!--            {{ numberOfFilesSelected }} dataset<span v-if="numberOfFilesSelected > 1">s</span>-->
      <!--          </span>-->
      <!--          <span v-if="numberOfFoldersSelected > 0 || numberOfFilesSelected > 0">-->
      <!--            selected-->
      <!--          </span>-->
      <!--        </div>-->
      <!--        <div class="text-left">-->
      <!--          <b-button variant="link" v-if="hasAnythingSelected()" @click="downloadEverythingSelected()">-->
      <!--            <b-icon icon="download"></b-icon>-->
      <!--            Download-->
      <!--          </b-button>-->

      <!--          <b-button variant="link" v-if="hasAnythingSelected()" v-b-modal="`copy-modal`">-->
      <!--            <b-icon icon="cloud"></b-icon>-->
      <!--            Copy to-->
      <!--          </b-button>-->
      <!--          <CopyModal modal-id="copy-modal"/>-->

      <!--          <b-button variant="link" v-if="hasAnythingSelected()" v-b-modal="`share-modal`">-->
      <!--            <b-icon icon="share"></b-icon>-->
      <!--            Share-->
      <!--          </b-button>-->
      <!--          <ShareModal modal-id="share-modal"/>-->

      <!--          <b-button variant="link" v-if="hasAnythingSelected()" v-b-modal="`map-to-collection-groups-modal`">-->
      <!--            <b-icon icon="folder"></b-icon>-->
      <!--            Group Collections-->
      <!--          </b-button>-->
      <!--          <MapSelectedFilesAndFoldersToCollectionGroupsModal modal-id="map-to-collection-groups-modal"-->
      <!--                                                             :folder-ids="selectedFolderIds"-->
      <!--                                                             :file-ids="selectedFileIds"/>-->

      <!--          <b-button variant="link" v-if="hasAnythingSelected()">-->
      <!--            <b-icon icon="archive"></b-icon>-->
      <!--            Archive-->
      <!--          </b-button>-->

      <!--          <b-button variant="link" v-if="hasAnythingSelected()">-->
      <!--            <b-icon icon="trash"></b-icon>-->
      <!--            Delete-->
      <!--          </b-button>-->
      <!--        </div>-->
      <!--      </div>-->

      <div class="w-100">

        <div class="w-100">
          <div class="w-100">
            <b-table-simple class="w-100">
              <b-thead>
                <b-tr>
                  <b-th>
                    <!--                    <b-checkbox type="checkbox" name="all" id="all" :checked="isAllSelected()"-->
                    <!--                                v-on:change="toggleAllSelection()"/>-->
                    <!--                    <label for="all">Select all</label>-->
                  </b-th>
                  <b-th>Collection</b-th>
                  <b-th>size</b-th>
                  <b-th>Created On</b-th>
                  <b-th>Last Updated</b-th>
                  <b-th>Owner</b-th>
                  <b-th></b-th>
                </b-tr>
              </b-thead>
              <b-tbody>

                <b-tr v-if="!folders || !files || !collectionGroups">
                  <b-td colspan="7">
                    <b-skeleton-table :rows="2" :columns="6"/>
                  </b-td>
                </b-tr>
                <b-tr v-for="(resource) in resources" :key="resource.resourceId" :class="{selected: false}">
                  <b-td>
                    <!--                    <b-checkbox type="checkbox" :checked="isFileSelected(file)"-->
                    <!--                                v-on:change="toggleFileSelection(file)"-->
                    <!--                                :name="getFileSelectionCheckboxId(file)" :id="getFileSelectionCheckboxId(file)"/>-->
                    <!--                    <label :for="getFileSelectionCheckboxId(file)">{{ file.name }}</label>-->
                  </b-td>
                  <b-td>
                    <div v-if="resource.type === 'FILE'" v-b-tooltip.hover="`Dataset`">
                      <b-icon style="height: 100%;" icon="card-image" aria-hidden="true"></b-icon>
                      <a href="#" style="flex: 1;display: inline; padding-left: 5px;line-height: 24px;"
                         v-b-modal="`file-preview-modal-${resource.resourceId}`">
                        {{ resource.name }}
                      </a>
                      <FilePreviewModal :modal-id="`file-preview-modal-${resource.resourceId}`"
                                        :file-id="resource.resourceId"/>
                    </div>
                    <div v-else-if="resource.type === 'COLLECTION'" v-b-tooltip.hover="`Collection`">
                      <b-icon style="height: 100%;" icon="folder" aria-hidden="true"></b-icon>
                      <router-link :to="`/collections?parentResourceId=${resource.resourceId}`"
                                   v-slot="{ href, route, navigate, isActive,isExactActive }">
                        <a style="flex: 1;display: inline; padding-left: 5px;line-height: 24px;"
                           :class="{active: isExactActive}" :href="href" @click="navigate">
                          {{ resource.name }}
                        </a>
                      </router-link>
                    </div>
                    <div v-else-if="resource.type === 'COLLECTION_GROUP'" v-b-tooltip.hover="`Collection Group`">
                      <b-icon style="height: 100%;" icon="folder-symlink" aria-hidden="true"></b-icon>
                      <router-link :to="`/collections?parentResourceId=${resource.resourceId}`"
                                   v-slot="{ href, route, navigate, isActive,isExactActive }">
                        <a style="flex: 1;display: inline; padding-left: 5px;line-height: 24px;"
                           :class="{active: isExactActive}" :href="href" @click="navigate">
                          {{ resource.name }}
                        </a>
                      </router-link>
                    </div>
                  </b-td>
                  <b-td>{{ resource.size }}</b-td>
                  <b-td>{{ resource.createdAt }}</b-td>
                  <b-td>{{ resource.lastUpdatedAt }}</b-td>
                  <b-td>{{ resource.createdBy }}</b-td>
                  <b-td>
                    <!--                    <b-button variant="link" size="sm" @click="downloadEverythingSelected()"-->
                    <!--                              v-b-tooltip.hover="`Download`">-->
                    <!--                      <b-icon icon="download"></b-icon>-->
                    <!--                    </b-button>-->

                    <!--                    <b-button variant="link" size="sm" v-b-modal="`copy-modal-${file.fileId}`"-->
                    <!--                              v-b-tooltip.hover="`Copy to`">-->
                    <!--                      <b-icon icon="cloud"></b-icon>-->
                    <!--                    </b-button>-->
                    <!--                    <CopyModal :modal-id="`copy-modal-${file.fileId}`" :file-ids="[file.fileId]"/>-->

                    <b-button variant="link" size="sm" v-b-modal="`share-modal-${resource.resourceId}`"
                              v-b-tooltip.hover="`Share`">
                      <b-icon icon="share"></b-icon>
                    </b-button>
                    <ModalShareEntity :modal-id="`share-modal-${resource.resourceId}`"
                                      :entity-id="resource.resourceId"/>

                    <b-button variant="link" size="sm"
                              v-b-modal="`map-to-collection-groups-modal-${resource.resourceId}`"
                              v-b-tooltip.hover="`Group Collections`">
                      <b-icon icon="folder"></b-icon>
                    </b-button>
                    <MapSelectedFilesAndFoldersToCollectionGroupsModal
                        :modal-id="`map-to-collection-groups-modal-${resource.resourceId}`"
                        :file-ids="[resource.resourceId]"/>

                    <!--                    <b-button variant="link" size="sm" v-b-tooltip.hover="`Archive`">-->
                    <!--                      <b-icon icon="archive"></b-icon>-->
                    <!--                    </b-button>-->

                    <b-button variant="link" size="sm" v-b-tooltip.hover="`Delete`">
                      <b-icon icon="trash"></b-icon>
                    </b-button>

                    <b-button variant="link" size="sm" v-b-tooltip.hover="`Notes`"
                              v-b-modal="`file-notes-modal-${resource.resourceId}`">
                      <b-icon icon="chat-square-text"></b-icon>
                    </b-button>
                    <NotesModal :modal-id="`file-notes-modal-${resource.resourceId}`" :file-id="resource.resourceId"/>

                  </b-td>
                </b-tr>

              </b-tbody>
            </b-table-simple>
          </div>
        </div>

        <!--        <div style="padding: 10px;" class="text-left">-->
        <!--          <Pagination/>-->
        <!--        </div>-->

      </div>
    </div>
  </Page>
</template>

<script>
import store from "../store";
import Page from "../components/Page";
// import Pagination from "@/components/Pagination";
import MapSelectedFilesAndFoldersToCollectionGroupsModal
  from "@/components/modals/map-selected-files-and-folders-to-collection-groups-modal";
import FilePreviewModal from "@/components/modals/file-preview-modal";
// import ShareModal from "@/components/modals/share-modal";
// import CopyModal from "@/components/modals/copy-modal";
import NotesModal from "@/components/modals/notes-modal";
import ModalShareEntity from "airavata-custos-portal/src/lib/components/modals/modal-share-entity";
import EmcResource from "@/service/emc-service/emc-service-resource";
// import TableOverlayInfo from "airavata-custos-portal/src/lib/components/overlay/table-overlay-info";
// import ButtonOverlay from "airavata-custos-portal/src/lib/components/overlay/button-overlay";

export default {
  name: "GroupDataPage",
  components: {
    ModalShareEntity,
    NotesModal,
    // CopyModal,
    // ShareModal,
    FilePreviewModal, MapSelectedFilesAndFoldersToCollectionGroupsModal, Page
  },
  store: store,
  computed: {
    title() {
      return "Collections";
    },
    breadcrumbLinks() {
      let _breadcrumbLinks = [{to: '/collections', name: 'Collections'}]

      const folderPath = this.$store.getters["emcFolder/getFolderPath"]({resourceId: this.parentResourceId});
      if (folderPath) {
        for (let i = 0; i < folderPath.length; i++) {
          const folder = folderPath[i];
          if (folder) {
            const {folderId, name} = folder;
            _breadcrumbLinks.push({
              to: this.getFolderLink({folderId}),
              name: name
            });
          }
        }
      }

      return _breadcrumbLinks;
    },
    parentResourceId() {
      if (this.$route.query.parentResourceId) {
        return window.decodeURIComponent(this.$route.query.parentResourceId);
      } else {
        return null;
      }
    },
    resources() {
      let _resources = [];

      if (this.collectionGroups) {
        _resources = [..._resources, ...this.collectionGroups];
      }

      if (this.folders) {
        _resources = [..._resources, ...this.folders];
      }

      if (this.files) {
        _resources = [..._resources, ...this.files];
      }

      return _resources;
    },
    collectionGroups() {
      const _resources = this.$store.getters["emcResource/getResources"]({
        parentResourceId: this.parentResourceId,
        type: EmcResource.EMC_RESOURCE_TYPE.EMC_RESOURCE_TYPE_COLLECTION_GROUP
      })

      if (_resources) {
        return _resources.map(file => {
          return {fileId: file.resourceId, ...file};
        });
      } else {
        return null;
      }
    },
    files() {
      const _files = this.$store.getters["emcResource/getResources"]({
        parentResourceId: this.parentResourceId,
        type: EmcResource.EMC_RESOURCE_TYPE.EMC_RESOURCE_TYPE_DATASET
      })

      if (_files) {
        return _files.map(file => {
          return {fileId: file.resourceId, ...file};
        });
      } else {
        return null;
      }
    },
    folders() {
      const _folders = this.$store.getters["emcResource/getResources"]({
        parentResourceId: this.parentResourceId,
        type: EmcResource.EMC_RESOURCE_TYPE.EMC_RESOURCE_TYPE_COLLECTION
      })

      if (_folders) {
        return _folders.map(folder => {
          return {folderId: folder.resourceId, ...folder};
        });
      } else {
        return null
      }
    }
  },
  methods: {
    getDataLink({folderId} = {}) {
      let _dataLink = "/collections?";

      if (folderId) {
        _dataLink += `parentResourceId=${folderId}&`
      }

      return _dataLink;
    },
    async refreshData() {
      await this.$store.dispatch("emcResource/fetchResources", {
        parentResourceId: this.parentResourceId,
        type: EmcResource.EMC_RESOURCE_TYPE.EMC_RESOURCE_TYPE_COLLECTION
      });
      await this.$store.dispatch("emcResource/fetchResources", {
        parentResourceId: this.parentResourceId,
        type: EmcResource.EMC_RESOURCE_TYPE.EMC_RESOURCE_TYPE_COLLECTION_GROUP
      });
      await this.$store.dispatch("emcResource/fetchResources", {
        parentResourceId: this.parentResourceId,
        type: EmcResource.EMC_RESOURCE_TYPE.EMC_RESOURCE_TYPE_DATASET
      });
    }
  },
  watch: {
    parentResourceId() {
      this.refreshData();
    }
  },
  beforeMount() {
    this.refreshData();
  }
}
</script>

<style scoped>
.selected,
table tbody tr.selected {
  background-color: #d6e2ed;
}

table label {
  visibility: hidden;
  position: fixed;
  top: -100px;
}

</style>