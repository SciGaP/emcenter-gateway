<template>
  <Page :title="title" :breadcrumb-links="breadcrumbLinks" :errors="errors">
    <template #header-right>
      <router-link v-if="hasCollectionGroups" :to="createNewCollectionGroupLink" v-slot="{navigate}">
        <b-button variant="primary" @click="navigate">Create New Collection Group</b-button>
      </router-link>
      <router-link v-if="hasLabs" :to="createNewLabLink" v-slot="{navigate}">
        <b-button variant="primary" @click="navigate">Create New Lab</b-button>
      </router-link>
    </template>
    <div class="w-100">
      <!--      <div class="pr-3 pl-3" v-if="!parentResourceId">-->
      <!--        <b-form-input v-model="searchTyping" v-on:keydown.enter="onSearchEnter"/>-->
      <!--        <b-form-text>-->
      <!--          Metadata can be searched by inserting key values separated by commas. <br/>-->
      <!--          Eg:- microscope=emc123, angle=35-->
      <!--        </b-form-text>-->
      <!--      </div>-->
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
      <table-overlay-info :rows="5" :columns="6" :data="resources">
        <template #empty>
          <div class="w-100 p-4 text-center">
            No Collections to show. It's empty.
          </div>
        </template>
        <b-table-simple class="w-100">
          <b-thead>
            <b-tr>
              <b-th>
                <!--                    <b-checkbox type="checkbox" name="all" id="all" :checked="isAllSelected()"-->
                <!--                                v-on:change="toggleAllSelection()"/>-->
                <!--                    <label for="all">Select all</label>-->
              </b-th>
              <b-th></b-th>
              <b-th>Name</b-th>
              <!--              <b-th>size</b-th>-->
              <b-th>Created On</b-th>
              <b-th>Last Updated</b-th>
              <!--              <b-th>Lab</b-th>-->
              <b-th>Owner</b-th>
              <b-th></b-th>
            </b-tr>
          </b-thead>
          <b-tbody>
            <b-tr v-for="(resource, resourceIndex) in resources" :key="resourceIndex" :class="{selected: false}">
              <b-td>
                <!--                    <b-checkbox type="checkbox" :checked="isFileSelected(file)"-->
                <!--                                v-on:change="toggleFileSelection(file)"-->
                <!--                                :name="getFileSelectionCheckboxId(file)" :id="getFileSelectionCheckboxId(file)"/>-->
                <!--                    <label :for="getFileSelectionCheckboxId(file)">{{ file.name }}</label>-->
              </b-td>
              <b-td>
                <div style="font-size: 25px;line-height: 25px;">
                  <b-icon v-if="resource.type === 'FILE'" icon="card-image" aria-hidden="true"
                          v-b-tooltip.hover="`Dataset`"></b-icon>
                  <b-icon v-else-if="resource.type === 'COLLECTION'" icon="folder" aria-hidden="true"
                          v-b-tooltip.hover="`Collection`"></b-icon>
                  <b-icon v-else-if="resource.type === 'COLLECTION_GROUP'" icon="folder-symlink"
                          aria-hidden="true" v-b-tooltip.hover="`Collection Group`"></b-icon>
                  <b-icon v-else-if="resource.type === 'LAB'" icon="box-seam"
                          aria-hidden="true" v-b-tooltip.hover="`Lab`"></b-icon>
                </div>
              </b-td>
              <b-td>
                <div style="flex: 1;">
                  <div v-if="resource.type === 'FILE'">
                    <a href="#"
                       style="flex: 1;display: inline; padding-left: 5px;line-height: 24px;"
                       v-b-modal="`file-preview-modal-${resource.resourceId}`"
                       v-on:click.prevent="$bvModal.show(`file-preview-modal-${resource.resourceId}`)">
                      {{ resource.name }}
                    </a>
                    <FilePreviewModal :modal-id="`file-preview-modal-${resource.resourceId}`"
                                      :resource-id="resource.resourceId"/>
                  </div>
                  <router-link v-else :to="`/labs/${resource.resourceId}`"
                               v-slot="{ href, route, navigate, isActive,isExactActive }">
                    <a style="flex: 1;display: inline; padding-left: 5px;line-height: 24px;"
                       :class="{active: isExactActive}" :href="href" @click="navigate">
                      {{ resource.name }}
                    </a>
                  </router-link>
                </div>
              </b-td>
              <!--              <b-td>{{ resource.size }}</b-td>-->
              <b-td>{{ resource.createdAt }}</b-td>
              <b-td>{{ resource.lastUpdatedAt }}</b-td>
              <!--              <b-td>&#45;&#45; &#45;&#45;</b-td>-->
              <b-td>{{ resource.createdBy }}</b-td>
              <b-td>
                <!--                <button-overlay :show="processingDownload[resource.resourceId]">-->
                <!--                  <b-button variant="link" size="sm" v-on:click="downloadResource(resource)"-->
                <!--                            :disabled="!isDownloadAllowed(resource)" v-b-tooltip.hover="`Download`">-->
                <!--                    <b-icon icon="download"></b-icon>-->
                <!--                  </b-button>-->
                <!--                </button-overlay>-->

                <!--                    <b-button variant="link" size="sm" v-b-modal="`copy-modal-${file.fileId}`"-->
                <!--                              v-b-tooltip.hover="`Copy to`">-->
                <!--                      <b-icon icon="cloud"></b-icon>-->
                <!--                    </b-button>-->
                <!--                    <CopyModal :modal-id="`copy-modal-${file.fileId}`" :file-ids="[file.fileId]"/>-->

                <!--                <b-button variant="link" size="sm" v-b-modal="`share-modal-${resource.resourceId}`"-->
                <!--                          v-b-tooltip.hover="`Share`" :disabled="!resource.canShare">-->
                <!--                  <b-icon icon="share"></b-icon>-->
                <!--                </b-button>-->
                <!--                <ModalShareEntity :modal-id="`share-modal-${resource.resourceId}`"-->
                <!--                                  :entity-id="resource.resourceId"/>-->

                <!--                <b-button variant="link" size="sm"-->
                <!--                          v-b-modal="`map-to-collection-groups-modal-${resource.resourceId}`"-->
                <!--                          v-b-tooltip.hover="`Group Collections`">-->
                <!--                  <b-icon icon="folder"></b-icon>-->
                <!--                </b-button>-->

                <!--                <MapSelectedFilesAndFoldersToCollectionGroupsModal-->
                <!--                    :modal-id="`map-to-collection-groups-modal-${resource.resourceId}`"-->
                <!--                    :resource-ids="[resource.resourceId]"/>-->

                <!--                    <b-button variant="link" size="sm" v-b-tooltip.hover="`Archive`">-->
                <!--                      <b-icon icon="archive"></b-icon>-->
                <!--                    </b-button>-->

                <!--                <b-button variant="link" size="sm" v-b-tooltip.hover="`Delete`" disabled>-->
                <!--                  <b-icon icon="trash"></b-icon>-->
                <!--                </b-button>-->

                <!--                <b-button variant="link" size="sm" v-b-tooltip.hover="`Notes`"-->
                <!--                          v-b-modal="`file-notes-modal-${resource.resourceId}`">-->
                <!--                  <b-icon icon="chat-square-text"></b-icon>-->
                <!--                </b-button>-->
                <!--                <NotesModal :modal-id="`file-notes-modal-${resource.resourceId}`" :resource-id="resource.resourceId"/>-->

                <!--                <b-button variant="link" size="sm" v-b-tooltip.hover="`Metadata`"-->
                <!--                          v-b-modal="`resource-metadata-modal-${resource.resourceId}`">-->
                <!--                  <b-icon icon="info-circle"></b-icon>-->
                <!--                </b-button>-->
                <!--                <ResourceMetadataModal :modal-id="`resource-metadata-modal-${resource.resourceId}`"-->
                <!--                                       :resource-id="resource.resourceId"/>-->

              </b-td>
            </b-tr>

          </b-tbody>
        </b-table-simple>
      </table-overlay-info>

    </div>
  </Page>
</template>

<script>
import store from "../../../store";
import Page from "../../../components/Page";
// import Pagination from "@/components/Pagination";
// import MapSelectedFilesAndFoldersToCollectionGroupsModal
//   from "@/components/modals/map-selected-files-and-folders-to-collection-groups-modal";
import FilePreviewModal from "@/components/modals/file-preview-modal";
// import ShareModal from "@/components/modals/share-modal";
// import CopyModal from "@/components/modals/copy-modal";
// import NotesModal from "@/components/modals/notes-modal";
// import ModalShareEntity from "airavata-custos-portal/src/lib/components/modals/modal-share-entity";
import EmcResource from "@/service/emc-service/emc-service-resource";
import TableOverlayInfo from "airavata-custos-portal/src/lib/components/overlay/table-overlay-info";
// import ResourceMetadataModal from "@/components/modals/resource-metadata-modal";
import custosStore from "airavata-custos-portal/src/lib/store";
// import TableOverlayInfo from "airavata-custos-portal/src/lib/components/overlay/table-overlay-info";
// import ButtonOverlay from "airavata-custos-portal/src/lib/components/overlay/button-overlay";

export default {
  name: "lab-list",
  components: {
    // ResourceMetadataModal,
    // ModalShareEntity,
    // NotesModal,
    // CopyModal,
    // ShareModal,
    FilePreviewModal,
    // MapSelectedFilesAndFoldersToCollectionGroupsModal,
    Page,
    TableOverlayInfo,
    // ButtonOverlay
  },
  data() {
    return {
      processingDelete: {},
      processingDownload: {},
      errors: [],

      searchTyping: "",
      search: "",
      defaultTypes: [
        EmcResource.EMC_RESOURCE_TYPE.EMC_RESOURCE_TYPE_LAB
      ]
    }
  },
  store: store,
  computed: {
    hasCollectionGroups() {
      return this.types.indexOf(EmcResource.EMC_RESOURCE_TYPE.EMC_RESOURCE_TYPE_COLLECTION_GROUP) >= 0;
    },
    hasLabs() {
      return this.types.indexOf(EmcResource.EMC_RESOURCE_TYPE.EMC_RESOURCE_TYPE_LAB) >= 0;
    },
    searchQuery() {
      const _searchQuery = this.search.split(",").map(queryText => {
        const query = queryText.split("=");
        if (query.length === 1) {
          return {field: "resourceName", value: query[0].trim()};
        } else {
          return {field: query[0].trim(), value: query[1].trim()};
        }
      }).filter(({value}) => value && value.length > 0);

      if (this.sharedBy) {
        _searchQuery.push({field: "sharedBy", value: this.sharedBy});
      } else if (this.sharedWith) {
        _searchQuery.push({field: "sharedWith", value: this.sharedWith});
      }

      return _searchQuery;
    },
    types() {
      if (this.$route.query.types) {
        return this.$route.query.types.split(",").map(type => type.trim());
      } else {
        return this.defaultTypes
      }
    },
    sharedWith() {
      if (this.$route.query.sharedWithMe) {
        return this.currentUsername;
      } else {
        return null;
      }
    },
    sharedBy() {
      if (this.$route.query.sharedByMe) {
        return this.currentUsername;
      } else {
        return null;
      }
    },
    currentUsername() {
      return custosStore.getters["auth/currentUsername"];
    },
    createNewCollectionGroupLink() {
      return `/collections/new?type=${EmcResource.EMC_RESOURCE_TYPE.EMC_RESOURCE_TYPE_COLLECTION_GROUP}`;
    },
    createNewLabLink() {
      return `/collections/new?type=${EmcResource.EMC_RESOURCE_TYPE.EMC_RESOURCE_TYPE_LAB}`;
    },
    title() {
      let _title = "Collections";
      if (this.types.length === 1) {
        if (this.types[0] === EmcResource.EMC_RESOURCE_TYPE.EMC_RESOURCE_TYPE_COLLECTION_GROUP) {
          _title = "Collection Groups";
        } else if (this.types[0] === EmcResource.EMC_RESOURCE_TYPE.EMC_RESOURCE_TYPE_LAB) {
          _title = "Labs";
        }
      }

      if (this.sharedBy) {
        _title = "Shared By Me"
      } else if (this.sharedWith) {
        _title = "Shared With Me"
      }

      return _title;
    },
    breadcrumbLinks() {
      let collectionsLink = '/labs';

      let _breadcrumbLinks = [{to: collectionsLink, name: this.title}]

      if (this.parentResourceId) {
        if (this.parentResourcePath) {
          for (let i = 0; i < this.parentResourcePath.length; i++) {
            _breadcrumbLinks.push({
              to: `/collections?parentResourceId=${this.parentResourcePath[i].resourceId}`,
              name: this.parentResourcePath[i].name
            });
          }
        }

        if (this.parentResource) {
          _breadcrumbLinks.push({
            to: `/collections?parentResourceId=${this.parentResource.resourceId}`,
            name: this.parentResource.name
          });
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
    parentResource() {
      return this.$store.getters["emcResource/getResource"]({resourceId: this.parentResourceId});
    },
    parentResourcePath() {
      return this.$store.getters["emcResource/getResourcePath"]({resourceId: this.parentResourceId});
    },
    resources() {
      let _resources = [];

      for (let i = 0; i < this.types.length; i++) {
        const type = this.types[i];
        const list = this.$store.getters["emcResource/getResources"]({
          parentResourceId: this.parentResourceId,
          type: type,
          queries: this.searchQuery
        });

        if (list) {
          _resources = _resources.concat(list);
        } else {
          _resources = null;
          break;
        }
      }

      return _resources;
    }
  },
  methods: {
    isDownloadAllowed(resource) {
      return resource.type === EmcResource.EMC_RESOURCE_TYPE.EMC_RESOURCE_TYPE_DATASET;
    },
    onSearchEnter() {
      this.search = this.searchTyping;
    },
    async refreshData() {
      if (this.parentResourceId) {
        await Promise.all([
          this.$store.dispatch("emcResource/fetchResource", {resourceId: this.parentResourceId}),
          this.$store.dispatch("emcResource/fetchParentResources", {resourceId: this.parentResourceId})
        ]);
      }

      await Promise.all(this.types.map(type => this.$store.dispatch("emcResource/fetchResources", {
        parentResourceId: this.parentResourceId,
        type: type,
        queries: this.searchQuery
      })));
    },
    async downloadResource({resourceId}) {
      this.processingDownload = {...this.processingDownload, [resourceId]: true};
      try {
        await this.$store.dispatch("emcResource/downloadResource", {resourceId});
      } catch (error) {
        this.errors.push({
          title: "Unknown error when downloading.",
          source: error, variant: "danger"
        });
      }
      this.processingDownload = {...this.processingDownload, [resourceId]: false};
    }
  },
  watch: {
    parentResourceId() {
      this.refreshData();
    },
    searchQuery() {
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