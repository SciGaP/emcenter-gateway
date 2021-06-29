<template>
  <Page :title="title" :breadcrumb-links="breadcrumbLinks">
    <div class="w-100">
      <div class="w-100"
           style="display: flex; flex-direction: row;min-height:45px; display: inline-flex;align-items: center;">
        <div style="flex: 1;">
          <span v-if="numberOfFoldersSelected > 0">
            {{ numberOfFoldersSelected }} collection<span v-if="numberOfFoldersSelected > 1">s</span>
          </span>
          <span v-if="numberOfFoldersSelected > 0 && numberOfFilesSelected > 0">
            &
          </span>
          <span v-if="numberOfFilesSelected > 0">
            {{ numberOfFilesSelected }} dataset<span v-if="numberOfFilesSelected > 1">s</span>
          </span>
          <span v-if="numberOfFoldersSelected > 0 || numberOfFilesSelected > 0">
            selected
          </span>
        </div>
        <div class="text-left">
          <b-button variant="link" v-if="hasAnythingSelected()" @click="downloadEverythingSelected()">
            <b-icon icon="download"></b-icon>
            Download
          </b-button>

          <b-button variant="link" v-if="hasAnythingSelected()" v-b-modal="`copy-modal`">
            <b-icon icon="cloud"></b-icon>
            Copy to
          </b-button>
          <CopyModal modal-id="copy-modal"/>

          <b-button variant="link" v-if="hasAnythingSelected()" v-b-modal="`share-modal`">
            <b-icon icon="share"></b-icon>
            Share
          </b-button>
          <ShareModal modal-id="share-modal"/>

          <b-button variant="link" v-if="hasAnythingSelected()" v-b-modal="`map-to-collection-groups-modal`">
            <b-icon icon="folder"></b-icon>
            Group Collections
          </b-button>
          <MapSelectedFilesAndFoldersToCollectionGroupsModal modal-id="map-to-collection-groups-modal"
                                                             :folder-ids="selectedFolderIds"
                                                             :file-ids="selectedFileIds"/>

          <b-button variant="link" v-if="hasAnythingSelected()">
            <b-icon icon="archive"></b-icon>
            Archive
          </b-button>

          <b-button variant="link" v-if="hasAnythingSelected()">
            <b-icon icon="trash"></b-icon>
            Delete
          </b-button>


          <!--          <b-button variant="link" v-b-modal.modal-selected-collections-download-->
          <!--                    v-if="displayMode === 'grid' && hasAnythingSelected()">-->
          <!--            Download-->
          <!--          </b-button>-->
          <!--          <b-modal id="modal-selected-collections-download" title="Download">-->
          <!--            <p class="my-4">Preparing to download...... </p>-->
          <!--          </b-modal>-->

          <!--          <b-button variant="link" v-b-modal.modal-selected-collections-share-->
          <!--                    v-if="displayMode === 'grid' && hasAnythingSelected()">-->
          <!--            Share-->
          <!--          </b-button>-->
          <!--          <b-modal id="modal-selected-collections-share" title="Share">-->
          <!--            <b-table-simple small>-->
          <!--              <b-thead>-->
          <!--                <b-tr>-->
          <!--                  <b-th>User</b-th>-->
          <!--                  <b-th>Read</b-th>-->
          <!--                  <b-th>Write</b-th>-->
          <!--                  <b-th>Share</b-th>-->
          <!--                </b-tr>-->
          <!--              </b-thead>-->
          <!--              <b-tbody>-->
          <!--                <b-tr>-->
          <!--                  <b-td>Dinuka</b-td>-->
          <!--                  <b-td>-->
          <!--                    <b-checkbox :checked="true" :disabled="true"/>-->
          <!--                  </b-td>-->
          <!--                  <b-td>-->
          <!--                    <b-checkbox/>-->
          <!--                  </b-td>-->
          <!--                  <b-td>-->
          <!--                    <b-checkbox/>-->
          <!--                  </b-td>-->
          <!--                </b-tr>-->
          <!--                <tr>-->
          <!--                  <b-td>Tanya</b-td>-->
          <!--                  <b-td>-->
          <!--                    <b-checkbox :checked="true" :disabled="true"/>-->
          <!--                  </b-td>-->
          <!--                  <b-td>-->
          <!--                    <b-checkbox/>-->
          <!--                  </b-td>-->
          <!--                  <b-td>-->
          <!--                    <b-checkbox/>-->
          <!--                  </b-td>-->
          <!--                </tr>-->
          <!--                <b-tr>-->
          <!--                  <b-td>Thomas</b-td>-->
          <!--                  <b-td>-->
          <!--                    <b-checkbox :checked="true" :disabled="true"/>-->
          <!--                  </b-td>-->
          <!--                  <b-td>-->
          <!--                    <b-checkbox/>-->
          <!--                  </b-td>-->
          <!--                  <b-td>-->
          <!--                    <b-checkbox/>-->
          <!--                  </b-td>-->
          <!--                </b-tr>-->
          <!--                <b-tr>-->
          <!--                  <b-td>-->
          <!--                    <UserSearchAndSelect v-on:change="(u) => u"/>-->
          <!--                  </b-td>-->
          <!--                </b-tr>-->
          <!--              </b-tbody>-->
          <!--            </b-table-simple>-->
          <!--          </b-modal>-->

          <!--          <b-button variant="link" v-b-modal.modal-selected-collections-history v-if="hasAnythingSelected()">-->
          <!--            History-->
          <!--          </b-button>-->
          <!--          <b-modal id="modal-selected-collections-history" title="History">-->
          <!--            <b-table-simple small>-->
          <!--              <b-thead>-->
          <!--                <b-tr>-->
          <!--                  <b-th>User</b-th>-->
          <!--                  <b-th>Date & Time</b-th>-->
          <!--                </b-tr>-->
          <!--              </b-thead>-->
          <!--              <b-tbody>-->
          <!--                <tr>-->
          <!--                  <b-td>Dinuka</b-td>-->
          <!--                  <b-td>03/05/2021 11.33am</b-td>-->
          <!--                </tr>-->
          <!--                <tr>-->
          <!--                  <b-td>Dinuka</b-td>-->
          <!--                  <b-td>03/05/2021 11.46am</b-td>-->
          <!--                </tr>-->
          <!--                <tr>-->
          <!--                  <b-td>Thomas</b-td>-->
          <!--                  <b-td>03/06/2021 01.12pm</b-td>-->
          <!--                </tr>-->
          <!--                <tr>-->
          <!--                  <b-td>Sarah</b-td>-->
          <!--                  <b-td>03/06/2021 05.22pm</b-td>-->
          <!--                </tr>-->
          <!--                <tr>-->
          <!--                  <b-td>Sarah</b-td>-->
          <!--                  <b-td>03/06/2021 05.37am</b-td>-->
          <!--                </tr>-->
          <!--              </b-tbody>-->
          <!--            </b-table-simple>-->
          <!--          </b-modal>-->

          <!--          <b-button size="sm" v-if="parentFolderId" :variant="displayMode !== 'list'? 'outline-primary': 'primary'"-->
          <!--                    v-on:click="switchDisplayMode('list')">-->
          <!--            <b-icon icon="list" aria-hidden="true"></b-icon>-->
          <!--          </b-button>-->
          <!--          <b-button size="sm" v-if="parentFolderId" :variant="displayMode !== 'grid'? 'outline-primary': 'primary'"-->
          <!--                    class="ml-2" v-on:click="switchDisplayMode('grid')">-->
          <!--            <b-icon icon="grid" aria-hidden="true"></b-icon>-->
          <!--          </b-button>-->
        </div>
      </div>

      <!--      <div class="w-100" style="display: flex;flex-direction: row;">-->
      <!--        <div v-if="displayMode === 'grid'">-->
      <!--          <input type="checkbox" name="all-grid" id="all-grid" :checked="isAllSelected()"-->
      <!--                 v-on:click="toggleAllSelection()" style="margin: 3px 10px;"/>-->
      <!--          <label for="all-grid">Select All</label>-->
      <!--        </div>-->
      <!--                        <div>-->
      <!--                          <span v-if="numberOfFoldersSelected > 0">-->
      <!--                            {{ numberOfFoldersSelected }} folder(s)-->
      <!--                          </span>-->
      <!--                          <span v-if="numberOfFoldersSelected > 0 && numberOfFilesSelected > 0">-->
      <!--                            {{ numberOfFoldersSelected }} folder(s)-->
      <!--                          </span>-->
      <!--                          <span v-if="numberOfFilesSelected > 0">-->
      <!--                            {{ numberOfFilesSelected }} file(s)-->
      <!--                          </span>-->
      <!--                          <span v-if="numberOfFoldersSelected > 0 || numberOfFilesSelected > 0">-->
      <!--                            selected-->
      <!--                          </span>-->
      <!--                        </div>-->
      <!--      </div>-->

      <div class="w-100" v-if="files && folders">

        <!--        <b-row v-if="displayMode === 'grid'">-->
        <!--          <b-col style="min-width: 300px;max-width: 300px;padding: 5px;" v-for="folder in folders"-->
        <!--                 :key="folder.folderId">-->
        <!--            <div class="w-100" style="border-radius: 10px;border: 1px solid #aaa;padding: 10px; display: flex;"-->
        <!--                 :class="{selected: isFolderSelected(folder)}">-->
        <!--              <div style="margin: 3px 10px;">-->
        <!--                <input type="checkbox" :checked="isFolderSelected(folder)" v-on:click="toggleFolderSelection(folder)"-->
        <!--                       :name="getFolderSelectionCheckboxId(folder)" :id="getFolderSelectionCheckboxId(folder)"/>-->
        <!--                <label :for="getFolderSelectionCheckboxId(folder)" style="margin: 0px !important;"></label>-->
        <!--              </div>-->
        <!--              <div style="flex: 1;">-->
        <!--                <router-link :to="getFolderLink(folder)" v-slot="{ href, route, navigate}">-->
        <!--                  <b-icon icon="folder-fill" aria-hidden="true"></b-icon>-->
        <!--                  <b-button size="sm" variant="link" :for="getFolderSelectionCheckboxId(folder)" @click="navigate">-->
        <!--                    {{ folder.name }}-->
        <!--                  </b-button>-->
        <!--                </router-link>-->
        <!--              </div>-->
        <!--              <div>-->
        <!--                <b-button size="sm" variant="link" data-modal-trigger="modal-share">-->
        <!--                  <b-icon icon="share-fill"></b-icon>-->
        <!--                </b-button>-->
        <!--                <b-button size="sm" variant="link">-->
        <!--                  <b-icon icon="pencil"></b-icon>-->
        <!--                </b-button>-->
        <!--                <b-button size="sm" variant="link">-->
        <!--                  <b-icon icon="download"></b-icon>-->
        <!--                </b-button>-->
        <!--              </div>-->
        <!--            </div>-->
        <!--          </b-col>-->
        <!--          <div class="w-100 pt-5"></div>-->
        <!--          <b-col style="min-width: 300px;max-width: 300px;padding: 5px;"-->
        <!--                 v-for="file in files" :key="file.fileId">-->
        <!--            <div class="w-100" style="border-radius: 10px;border: 1px solid #aaa;padding: 15px"-->
        <!--                 :class="{selected: isFileSelected(file)}">-->
        <!--              <div class="w-100" style="display: flex; flex-direction: row">-->
        <!--                <div>-->
        <!--                  <input type="checkbox" :checked="isFileSelected(file)" v-on:click="toggleFileSelection(file)"-->
        <!--                         :name="getFileSelectionCheckboxId(file)" :id="getFileSelectionCheckboxId(file)"/>-->
        <!--                  <label :for="getFileSelectionCheckboxId(file)"-->
        <!--                         style="margin: 0px !important;"></label>-->
        <!--                </div>-->
        <!--                <div style="flex: 1;">-->
        <!--                  <b-button variant="link" :for="getFileSelectionCheckboxId(file)"-->
        <!--                  >-->
        <!--                    {{ file.name }}-->
        <!--                  </b-button>-->
        <!--                </div>-->
        <!--                <div>-->
        <!--                  <b-button size="sm" variant="link" data-modal-trigger="modal-share">-->
        <!--                    <b-icon icon="share-fill"></b-icon>-->
        <!--                  </b-button>-->
        <!--                  <b-button size="sm" variant="link">-->
        <!--                    <b-icon icon="pencil"></b-icon>-->
        <!--                  </b-button>-->
        <!--                  <b-button size="sm" variant="link">-->
        <!--                    <b-icon icon="download"></b-icon>-->
        <!--                  </b-button>-->
        <!--                </div>-->
        <!--              </div>-->
        <!--              <div class="w-100 text-center"-->
        <!--                   style="font-size: 10px;height: 180px;overflow: hidden; display: flex; flex-direction: column;">-->
        <!--                <b-icon icon="image" style="width: 100%; height: 100%;"></b-icon>-->
        <!--              </div>-->
        <!--              <div class="w-100" style="display: flex;">-->
        <!--                <div style="flex: 1;">Microscope 1</div>-->
        <!--                <div>2MB</div>-->
        <!--              </div>-->
        <!--            </div>-->
        <!--          </b-col>-->
        <!--        </b-row>-->


        <div v-if="displayMode === 'list'" class="w-100">
          <div class="w-100">
            <b-table-simple class="w-100">
              <b-thead>
                <b-tr>
                  <b-th>
                    <b-checkbox type="checkbox" name="all" id="all" :checked="isAllSelected()"
                                v-on:change="toggleAllSelection()"/>
                    <label for="all">Select all</label>
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
                <b-tr v-for="folder in folders" :key="folder.folderId" :class="{selected: isFolderSelected(folder)}">
                  <b-td>
                    <b-checkbox type="checkbox" :checked="isFolderSelected(folder)"
                                v-on:change="toggleFolderSelection(folder)"
                                :name="getFolderSelectionCheckboxId(folder)"
                                :id="getFolderSelectionCheckboxId(folder)"/>
                    <label :for="getFolderSelectionCheckboxId(folder)">{{ folder.name }}</label>
                  </b-td>
                  <b-td>
                    <router-link :to="getFolderLink(folder)" v-slot="{ href, route, navigate, isActive,isExactActive }">
                      <!--                      <b-icon v-if="folder.own === false" style="height: 100%;" icon="people-fill"-->
                      <!--                              aria-hidden="true"></b-icon>-->
                      <!--                      <b-icon style="height: 100%;" icon="folder-fill" aria-hidden="true"></b-icon>-->

                      <a :class="{active: isExactActive}" :href="href" @click="navigate"
                         style="flex: 1;display: inline; padding-left: 5px;line-height: 24px;">
                        {{ folder.name }}
                      </a>
                    </router-link>
                  </b-td>
                  <b-td>2MB</b-td>
                  <b-td>08/31/2020 14:00 PM</b-td>
                  <b-td>09/07/2020 13:00 PM</b-td>
                  <b-td>{{ folder.createdBy }}</b-td>
                  <b-td>
                    <b-button variant="link" size="sm" @click="downloadEverythingSelected()"
                              v-b-tooltip.hover="`Download`">
                      <b-icon icon="download"></b-icon>
                    </b-button>

                    <b-button variant="link" size="sm" v-b-modal="`copy-modal-${folder.folderId}`"
                              v-b-tooltip.hover="`Copy to`">
                      <b-icon icon="cloud"></b-icon>
                    </b-button>
                    <CopyModal :modal-id="`copy-modal-${folder.folderId}`" :folder-ids="[folder.folderId]"/>

                    <b-button variant="link" size="sm" v-b-modal="`share-modal-${folder.folderId}`"
                              v-b-tooltip.hover="`Share`">
                      <b-icon icon="share"></b-icon>
                    </b-button>
                    <ModalShareEntity :modal-id="`share-modal-${folder.folderId}`" :entity-id="folder.entityId"/>

                    <b-button variant="link" size="sm" v-b-modal="`map-to-collection-groups-modal-${folder.folderId}`"
                              v-b-tooltip.hover="`Group Collections`">
                      <b-icon icon="folder"></b-icon>
                    </b-button>
                    <MapSelectedFilesAndFoldersToCollectionGroupsModal
                        :modal-id="`map-to-collection-groups-modal-${folder.folderId}`"
                        :folder-ids="[folder.folderId]"/>

                    <b-button variant="link" size="sm" v-b-tooltip.hover="`Archive`">
                      <b-icon icon="archive"></b-icon>
                    </b-button>

                    <b-button variant="link" size="sm" v-b-tooltip.hover="`Delete`">
                      <b-icon icon="trash"></b-icon>
                    </b-button>

                    <b-button variant="link" size="sm" v-b-tooltip.hover="`Notes`"
                              v-b-modal="`folder-notes-modal-${folder.folderId}`">
                      <b-icon icon="chat-square-text"></b-icon>
                    </b-button>
                    <NotesModal :modal-id="`folder-notes-modal-${folder.folderId}`" :folder-id="folder.folderId"/>

                  </b-td>

                </b-tr>

                <b-tr v-if="folders.length > 0" class="w-100 pt-5"></b-tr>

                <b-tr v-for="(file) in files" :key="file.fileId" :class="{selected: isFileSelected(file)}">
                  <b-td>
                    <b-checkbox type="checkbox" :checked="isFileSelected(file)" v-on:change="toggleFileSelection(file)"
                                :name="getFileSelectionCheckboxId(file)" :id="getFileSelectionCheckboxId(file)"/>
                    <label :for="getFileSelectionCheckboxId(file)">{{ file.name }}</label>
                  </b-td>
                  <b-td>
                    <b-icon style="height: 100%;" icon="card-image" aria-hidden="true"></b-icon>
                    <a href="#" style="flex: 1;display: inline; padding-left: 5px;line-height: 24px;"
                       v-b-modal="`file-preview-modal-${file.fileId}`">
                      {{ file.name }}
                    </a>
                    <FilePreviewModal :modal-id="`file-preview-modal-${file.fileId}`" :file-id="file.fileId"/>
                  </b-td>
                  <b-td>1MB</b-td>
                  <b-td>08/31/2020 14:00 PM</b-td>
                  <b-td>09/07/2020 13:00 PM</b-td>
                  <b-td>{{ file.createdBy }}</b-td>
                  <b-td>
                    <b-button variant="link" size="sm" @click="downloadEverythingSelected()"
                              v-b-tooltip.hover="`Download`">
                      <b-icon icon="download"></b-icon>
                    </b-button>

                    <b-button variant="link" size="sm" v-b-modal="`copy-modal-${file.fileId}`"
                              v-b-tooltip.hover="`Copy to`">
                      <b-icon icon="cloud"></b-icon>
                    </b-button>
                    <CopyModal :modal-id="`copy-modal-${file.fileId}`" :file-ids="[file.fileId]"/>

                    <b-button variant="link" size="sm" v-b-modal="`share-modal-${file.fileId}`"
                              v-b-tooltip.hover="`Share`">
                      <b-icon icon="share"></b-icon>
                    </b-button>
                    <ModalShareEntity :modal-id="`share-modal-${file.fileId}`" :entity-id="file.entityId"/>

                    <b-button variant="link" size="sm" v-b-modal="`map-to-collection-groups-modal-${file.fileId}`"
                              v-b-tooltip.hover="`Group Collections`">
                      <b-icon icon="folder"></b-icon>
                    </b-button>
                    <MapSelectedFilesAndFoldersToCollectionGroupsModal
                        :modal-id="`map-to-collection-groups-modal-${file.fileId}`"
                        :file-ids="[file.fileId]"/>

                    <b-button variant="link" size="sm" v-b-tooltip.hover="`Archive`">
                      <b-icon icon="archive"></b-icon>
                    </b-button>

                    <b-button variant="link" size="sm" v-b-tooltip.hover="`Delete`">
                      <b-icon icon="trash"></b-icon>
                    </b-button>

                    <b-button variant="link" size="sm" v-b-tooltip.hover="`Notes`"
                              v-b-modal="`file-notes-modal-${file.fileId}`">
                      <b-icon icon="chat-square-text"></b-icon>
                    </b-button>
                    <NotesModal :modal-id="`file-notes-modal-${file.fileId}`" :file-id="file.fileId"/>

                  </b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </div>
        </div>

        <div style="padding: 10px;" class="text-left">
          <Pagination/>
        </div>

      </div>
    </div>
  </Page>
</template>

<script>
import store from "../store";
import Page from "../components/Page";
import Pagination from "@/components/Pagination";
import MapSelectedFilesAndFoldersToCollectionGroupsModal
  from "@/components/modals/map-selected-files-and-folders-to-collection-groups-modal";
import FilePreviewModal from "@/components/modals/file-preview-modal";
import ShareModal from "@/components/modals/share-modal";
import CopyModal from "@/components/modals/copy-modal";
import NotesModal from "@/components/modals/notes-modal";
import ModalShareEntity from "custos-demo-gateway/src/lib/components/modals/modal-share-entity";

export default {
  name: "GroupDataPage",
  components: {
    ModalShareEntity,
    NotesModal,
    CopyModal,
    ShareModal, FilePreviewModal, MapSelectedFilesAndFoldersToCollectionGroupsModal, Pagination, Page
  },
  store: store,
  data() {
    return {
      memberTypes: ['ADMIN', 'MEMBER'],
      displayMode: "list",
      selectedFileIdMap: {},
      selectedFolderIdMap: {},
      // allFilesAndFoldersSelected: false
    }
  },
  computed: {
    title() {
      return "Collections";
    },
    breadcrumbLinks() {
      let _breadcrumbLinks = [{to: '/collections', name: 'Collections'}]

      const folderPath = this.$store.getters["emcFolder/getFolderPath"]({folderId: this.parentFolderId});
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
    parentFolderId() {
      if (this.$route.query.parentFolderId) {
        return window.decodeURIComponent(this.$route.query.parentFolderId);
      } else {
        return null;
      }
    },
    files() {
      const _files = this.$store.getters["emcFile/getFiles"]({parentFolderId: this.parentFolderId});

      return _files;
    },
    folders() {
      const _folders = this.$store.getters["emcFolder/getFolders"]({parentFolderId: this.parentFolderId});

      return _folders;
    },
    numberOfFilesSelected() {
      let _numberOfFilesSelected = 0;
      for (let i = 0; this.files && i < this.files.length; i++) {
        if (this.isFileSelected(this.files[i])) {
          _numberOfFilesSelected++;
        }
      }

      return _numberOfFilesSelected;
    },
    numberOfFoldersSelected() {
      let _numberOfFoldersSelected = 0;
      for (let i = 0; this.folders && i < this.folders.length; i++) {
        if (this.isFolderSelected(this.folders[i])) {
          _numberOfFoldersSelected++;
        }
      }

      return _numberOfFoldersSelected;
    },
    selectedFileIds() {
      const fileIds = [];
      for (let fileId in this.selectedFileIdMap) {
        if (this.selectedFileIdMap[fileId]) {
          fileIds.push(fileId);
        }
      }

      return fileIds;
    },
    selectedFolderIds() {
      const folderIds = [];
      for (let folderId in this.selectedFolderIdMap) {
        if (this.selectedFolderIdMap[folderId]) {
          folderIds.push(folderId);
        }
      }

      return folderIds;
    }
  },
  methods: {
    reset() {
      this.displayMode = "list";
      this.selectedFileIdMap = {};
      this.selectedFolderIdMap = {};
    },
    getDataLink({folderId} = {}) {
      let _dataLink = "/collections?";

      if (folderId) {
        _dataLink += `parentFolderId=${folderId}&`
      }

      return _dataLink;
    },
    switchDisplayMode(displayMode) {
      this.displayMode = displayMode;
    },
    getFolderLink({folderId}) {
      return this.getDataLink({folderId});
    },
    getFolderSelectionCheckboxId({folderId}) {
      return `folder-select-checkbox-${folderId}`;
    },
    getFileSelectionCheckboxId({fileId}) {
      return `file-select-checkbox-${fileId}`;
    },
    getFolderActionsDropdownId({folderId}) {
      return `folder-actions-dropdown-${folderId}`;
    },
    getFileActionsDropdownId({fileId}) {
      return `file-actions-dropdown-${fileId}`;
    },
    toggleAllSelection(selected = null) {
      if (typeof selected !== "boolean") {
        selected = !this.isAllSelected();
      }

      // this.allFilesAndFoldersSelected = selected;

      this.folders.map(folder => {
        this.toggleFolderSelection(folder, selected);
      });

      this.files.map(file => {
        this.toggleFileSelection(file, selected);
      });
    },
    toggleFolderSelection({folderId}, selected = null) {
      if (typeof selected !== "boolean") {
        selected = !this.selectedFolderIdMap[folderId];
      }

      // this.toggleAllSelection(false);
      this.selectedFolderIdMap = {
        ...this.selectedFolderIdMap,
        [folderId]: selected
      }
    },
    toggleFileSelection({fileId}, selected = null) {
      if (typeof selected !== "boolean") {
        selected = !this.selectedFileIdMap[fileId];
      }

      // this.toggleAllSelection(false);
      this.selectedFileIdMap = {
        ...this.selectedFileIdMap,
        [fileId]: selected
      }
    },
    isAllSelected() {
      console.log("isAllSelected");
      let _isAllSelected = false;

      for (let i = 0; i < this.folders.length; i++) {
        if (!this.isFolderSelected(this.folders[i])) {
          return false;
        } else {
          _isAllSelected = true;
        }
      }

      for (let i = 0; i < this.files.length; i++) {
        if (!this.isFileSelected(this.files[i])) {
          return false;
        } else {
          _isAllSelected = true;
        }
      }

      console.log("isAllSelected TRUE");

      return _isAllSelected;
    },
    isFolderSelected({folderId}) {
      if (this.selectedFolderIdMap[folderId]) return true;
      else return false;
    },
    isFileSelected({fileId}) {
      if (this.selectedFileIdMap[fileId]) return true;
      else return false;
    },
    hasAnythingSelected() {
      for (let folderId in this.selectedFolderIdMap) {
        if (this.isFolderSelected({folderId})) {
          return true;
        }
      }

      for (let fileId in this.selectedFileIdMap) {
        if (this.isFileSelected({fileId})) {
          return true;
        }
      }

      return false;
    },
    downloadEverythingSelected() {
      this.downloadSelectedFiles();
      this.downloadSelectedFolders();
    },
    downloadSelectedFiles() {
      for (let fileId in this.selectedFileIdMap) {
        if (this.selectedFileIdMap[fileId]) {
          this.$store.dispatch("emcFile/downloadFile", {fileId});
        }
      }
    },
    downloadSelectedFolders() {
      for (let folderId in this.selectedFolderIdMap) {
        if (this.selectedFolderIdMap[folderId]) {
          this.$store.dispatch("emcFolder/downloadFolder", {folderId});
        }
      }
    }
  },
  watch: {
    parentFolderId() {
      this.reset();
      this.$store.dispatch("emcFolder/fetchFolders", {parentFolderId: this.parentFolderId});
      this.$store.dispatch("emcFile/fetchFiles", {parentFolderId: this.parentFolderId});
      this.$store.dispatch("emcFolder/fetchFolderPath", {folderId: this.parentFolderId});
    }
  },
  beforeMount() {
    this.$store.dispatch("emcFolder/fetchFolders", {parentFolderId: this.parentFolderId});
    this.$store.dispatch("emcFile/fetchFiles", {parentFolderId: this.parentFolderId});
    this.$store.dispatch("emcFolder/fetchFolderPath", {folderId: this.parentFolderId});
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