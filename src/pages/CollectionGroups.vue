<template>
  <Page :title="title" :breadcrumb-links="breadcrumbLinks">
    <div class="w-100">
      <!--      <div class="w-100 mt-2" style="display: flex; flex-direction: row;display: inline-flex;align-items: center;">-->
      <!--        <div style="flex: 1;">-->
      <!--          <span v-if="numberOfFoldersSelected > 0">-->
      <!--            {{ numberOfFoldersSelected }} collection groups<span v-if="numberOfFoldersSelected > 1">s</span>-->
      <!--          </span>-->
      <!--          &lt;!&ndash;          <span v-if="numberOfFoldersSelected > 0 && numberOfFilesSelected > 0">&ndash;&gt;-->
      <!--          &lt;!&ndash;            &&ndash;&gt;-->
      <!--          &lt;!&ndash;          </span>&ndash;&gt;-->
      <!--          &lt;!&ndash;          <span v-if="numberOfFilesSelected > 0">&ndash;&gt;-->
      <!--          &lt;!&ndash;            {{ numberOfFilesSelected }} file(s)&ndash;&gt;-->
      <!--          &lt;!&ndash;          </span>&ndash;&gt;-->
      <!--          <span v-if="numberOfFoldersSelected > 0 || numberOfFilesSelected > 0">-->
      <!--            selected-->
      <!--          </span>-->
      <!--        </div>-->
      <!--      </div>-->

      <div class="w-100"
           style="display: flex; flex-direction: row;min-height:45px; display: inline-flex;align-items: center;">
        <div style="flex: 1;">
          <span v-if="numberOfCollectionGroupsSelected > 0">
            {{ numberOfCollectionGroupsSelected }} collection group<span
              v-if="numberOfCollectionGroupsSelected > 1">s</span>
          </span>
          <span v-if="numberOfFoldersSelected > 0">
            {{ numberOfFoldersSelected }} folder<span v-if="numberOfFoldersSelected > 1">s</span>
          </span>
          <span v-if="numberOfFilesSelected > 0">
            {{ numberOfFilesSelected }} file<span v-if="numberOfFilesSelected > 1">s</span>
          </span>
          <!--          <span v-if="numberOfFoldersSelected > 0 && numberOfFilesSelected > 0">-->
          <!--            &-->
          <!--          </span>-->
          <!--          <span v-if="numberOfFilesSelected > 0">-->
          <!--            {{ numberOfFilesSelected }} dataset<span v-if="numberOfFilesSelected > 1">s</span>-->
          <!--          </span>-->
          <span v-if="numberOfCollectionGroupsSelected > 0|| numberOfFoldersSelected > 0 || numberOfFilesSelected > 0">
            selected
          </span>
        </div>
        <div class="text-left">
          <b-button variant="link" v-if="hasAnythingSelected()">
            <b-icon icon="download"></b-icon>
            Download
          </b-button>
          <b-button variant="link" v-if="hasAnythingSelected()">
            <b-icon icon="cloud"></b-icon>
            Copy to
          </b-button>

          <b-button variant="link" v-if="hasAnythingSelected()">
            <b-icon icon="share"></b-icon>
            Share
          </b-button>

<!--          <b-button variant="link" v-if="hasAnythingSelected()">-->
<!--            <b-icon icon="folder"></b-icon>-->
<!--            Group Collections-->
<!--          </b-button>-->

          <b-button variant="link" v-if="hasAnythingSelected()">
            <b-icon icon="archive"></b-icon>
            Archive
          </b-button>

          <b-button variant="link" v-if="hasAnythingSelected()">
            <b-icon icon="trash"></b-icon>
            Delete
          </b-button>

          <b-button variant="link" v-b-modal="`modal-create-collection-group`">
            <b-icon icon="plus"></b-icon>
            Create New
          </b-button>

          <CreateNewCollectionGroupModal modal-id="modal-create-collection-group"/>
          <!--          <b-modal :id="`modal-create-collection-group`" title="Collection Group">-->
          <!--            <div>-->
          <!--              <label for="collection-group-name">Collection Group Name</label>-->
          <!--              <b-form-input id="collection-group-name"></b-form-input>-->
          <!--            </div>-->
          <!--            <template #modal-footer="{close}">-->
          <!--              <b-button size="sm" variant="outline-primary" v-on:click="close()">Cancel</b-button>-->
          <!--              <b-button size="sm" variant="primary" v-on:click="close()">Save</b-button>-->
          <!--            </template>-->
          <!--          </b-modal>-->

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

      <div class="w-100" v-if="collectionGroups || folders || files">
        <div class="w-100">
          <b-table-simple class="w-100">
            <b-thead>
              <b-tr>
                <b-th>
                  <input type="checkbox" name="all" id="all" :checked="isAllSelected()"
                         v-on:click="toggleAllSelection()"/>
                  <label for="all"></label>
                </b-th>
                <b-th>Name</b-th>
                <b-th>size</b-th>
                <b-th>Created On</b-th>
                <b-th>Last Updated</b-th>
                <b-th>Owner</b-th>
              </b-tr>
            </b-thead>
            <b-tbody>
              <b-tr v-for="collectionGroup in collectionGroups"
                    :key="collectionGroup.folderId"
                    :class="{selected: isCollectionGroupSelected(collectionGroup)}">
                <b-td>
                  <input type="checkbox" :checked="isCollectionGroupSelected(collectionGroup)"
                         v-on:click="toggleCollectionGroupSelection(collectionGroup)"
                         :name="getCollectionGroupSelectionCheckboxId(collectionGroup)"
                         :id="getCollectionGroupSelectionCheckboxId(collectionGroup)"/>
                  <label :for="getCollectionGroupSelectionCheckboxId(collectionGroup)"></label>
                </b-td>
                <b-td>
                  <router-link :to="getFolderLink(collectionGroup)"
                               v-slot="{ href, route, navigate, isActive,isExactActive }">
                    <!--                      <b-icon v-if="folder.own === false" style="height: 100%;" icon="people-fill"-->
                    <!--                              aria-hidden="true"></b-icon>-->
                    <!--                      <b-icon style="height: 100%;" icon="folder-fill" aria-hidden="true"></b-icon>-->

                    <a :class="{active: isExactActive}" :href="href" @click="navigate"
                       style="flex: 1;display: inline; padding-left: 5px;line-height: 24px;">
                      {{ collectionGroup.name }}
                    </a>
                  </router-link>
                </b-td>
                <b-td>2MB</b-td>
                <b-td>08/31/2020 14:00 PM</b-td>
                <b-td>09/07/2020 13:00 PM</b-td>
                <b-td>{{ collectionGroup.createdBy }}</b-td>
              </b-tr>

              <b-tr v-if="collectionGroups.length > 0" class="w-100 pt-5"></b-tr>

              <b-tr v-for="folder in folders" :key="folder.folderId"
                    :class="{selected: isFolderSelected(folder)}">
                <b-td>
                  <input type="checkbox" :checked="isFolderSelected(folder)"
                         v-on:click="toggleFolderSelection(folder)"
                         :name="getFolderSelectionCheckboxId(folder)"
                         :id="getFolderSelectionCheckboxId(folder)"/>
                  <label :for="getFolderSelectionCheckboxId(folder)"></label>
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
              </b-tr>

              <b-tr v-if="folders.length > 0" class="w-100 pt-5"></b-tr>

              <b-tr v-for="file in files" :key="file.fileId" :class="{selected: isFileSelected(file)}">
                <b-td>
                  <input type="checkbox" :checked="isFileSelected(file)" v-on:click="toggleFileSelection(file)"
                         :name="getFileSelectionCheckboxId(file)" :id="getFileSelectionCheckboxId(file)"/>
                  <label :for="getFileSelectionCheckboxId(file)"></label>
                </b-td>
                <b-td>
                  <b-icon style="height: 100%;" icon="card-image" aria-hidden="true"></b-icon>
                  <a href="#" style="flex: 1;display: inline; padding-left: 5px;line-height: 24px;">
                    {{ file.name }}
                  </a>
                </b-td>
                <b-td>1MB</b-td>
                <b-td>08/31/2020 14:00 PM</b-td>
                <b-td>09/07/2020 13:00 PM</b-td>
                <b-td>{{ file.createdBy }}</b-td>
              </b-tr>

            </b-tbody>
          </b-table-simple>
        </div>
        <div style="padding: 10px;" class="text-left">
          <Pagination/>
        </div>
      </div>
    </div>

  </Page>
</template>

<script>

// import {mapGetters, mapActions} from "vuex";
import store from "../store";
import Page from "../components/Page";
import Pagination from "@/components/Pagination";
import CreateNewCollectionGroupModal from "@/components/modals/create-new-collection-group-modal";
// import UserSearchAndSelect from "@/components/EntitySelectInput";

export default {
  name: "GroupDataPage",
  components: {CreateNewCollectionGroupModal, Pagination, Page},
  store: store,
  data() {
    return {
      memberTypes: ['ADMIN', 'MEMBER'],
      displayMode: "list",
      selectedFileIdMap: {},
      selectedFolderIdMap: {},
      selectedCollectionGroupIdMap: {}
      // allFilesAndFoldersSelected: false
    }
  },
  computed: {
    // ...mapGetters({
    //   getGroup: "group/getGroup",
    //   getUsers: "user/getUsers",
    //   getFiles: "emcFile/getFiles",
    //   getFolders: "emcFolder/getFolders",
    //   getFolderPath: "emcFolder/getFolderPath",
    // }),
    title() {
      if (this.group) {
        return this.group.name;
      } else {
        return "Collection Groups"
      }
    },
    breadcrumbLinks() {
      let _breadcrumbLinks = [{to: '/collection-groups', name: 'Collection Groups'}]

      if (this.group && this.group.name) {
        _breadcrumbLinks.push({to: this.groupLink, name: this.group.name});
      }

      if (this.collectionGroup) {
        _breadcrumbLinks.push({
          to: this.getFolderLink({collectionGroupId: this.collectionGroup.collectionGroupId}),
          name: this.collectionGroup.name
        });
      } else if (this.parentFolderId) {
        const folderPath = this.getFolderPath({folderId: this.parentFolderId});
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
    collectionGroups() {
      if (this.collectionGroupId) {
        return [];
      } else {
        return this.$store.getters["emcCollectionGroup/getCollectionGroups"]();
      }
    },
    collectionGroup() {
      return this.$store.getters["emcCollectionGroup/getCollectionGroup"]({collectionGroupId: this.collectionGroupId});
    },
    // groupId() {
    //   return this.$route.query.groupId;
    // },
    // group() {
    //   return this.getGroup({groupId: this.groupId});
    // },

    collectionGroupId() {
      if (this.$route.query.collectionGroupId) {
        return window.decodeURIComponent(this.$route.query.collectionGroupId);
      } else {
        return null;
      }
    },

    // TODO remove. Added temporary for demo purpose.
    // mode() {
    //   const folderCountInPath = this.path.length === 0 ? 0 : this.path.split("/").length;
    //   if (folderCountInPath === 1) {
    //     return "user";
    //   } else if (folderCountInPath === 2) {
    //     return "collection";
    //   } else {
    //     return "group";
    //   }
    // },
    // nextMode() {
    //   if (this.mode === "group") {
    //     return "user"
    //   } else if (this.mode === "user") {
    //     return "collection"
    //   } else {
    //     return null;
    //   }
    // },

    files() {
      const _files = this.$store.getters["emcCollectionGroup/getCollectionGroupFiles"]({collectionGroupId: this.collectionGroupId});

      return _files;
    },
    folders() {
      const _folders = this.$store.getters["emcCollectionGroup/getCollectionGroupFolders"]({collectionGroupId: this.collectionGroupId});

      return _folders
    },
    // users() {
    //   return this.getUsers({groupId: this.groupId});
    // },
    // groupLink() {
    //   return this.getDataLink({groupId: this.groupId});
    // },
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
    numberOfCollectionGroupsSelected() {
      let _numberOfCollectionGroupsSelected = 0;
      for (let i = 0; this.collectionGroups && i < this.collectionGroups.length; i++) {
        if (this.isCollectionGroupSelected(this.collectionGroups[i])) {
          _numberOfCollectionGroupsSelected++;
        }
      }

      return _numberOfCollectionGroupsSelected;
    }
  },
  methods: {
    // ...mapActions({
    //   fetchGroup: "group/fetchGroup",
    //   fetchUsers: "user/fetchUsers",
    //   fetchFiles: "emcFile/fetchFiles",
    //   fetchFolders: "emcFolder/fetchFolders",
    //   fetchFolderPath: "emcFolder/fetchFolderPath"
    // }),
    reset() {
      this.displayMode = "list";
      this.selectedFileIdMap = {};
      this.selectedFolderIdMap = {};
      this.selectedCollectionGroupIdMap = {};
    },
    getDataLink({folderId, collectionGroupId} = {}) {
      let _dataLink = "/collections?";
      if (collectionGroupId !== null) {
        _dataLink = `/collection-groups?collectionGroupId=${collectionGroupId}&`
      } else if (folderId !== null) {
        _dataLink = `/collections?parentFolderId=${folderId}&`
      }

      return _dataLink;
    },
    // switchDisplayMode(displayMode) {
    //   this.displayMode = displayMode;
    // },
    getFolderLink({folderId, collectionGroupId}) {
      return this.getDataLink({folderId, collectionGroupId});
    },
    getCollectionGroupSelectionCheckboxId({collectionGroupId}) {
      return `collection-group-select-checkbox-${collectionGroupId}`;
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
    toggleCollectionGroupSelection({collectionGroupId}, selected = null) {
      if (typeof selected !== "boolean") {
        selected = !this.selectedCollectionGroupIdMap[collectionGroupId];
      }

      // this.toggleAllSelection(false);
      this.selectedCollectionGroupIdMap = {
        ...this.selectedCollectionGroupIdMap,
        [collectionGroupId]: selected
      }
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
    isCollectionGroupSelected({collectionGroupId}) {
      if (this.selectedCollectionGroupIdMap[collectionGroupId]) return true;
      else return false;
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
      for (let collectionGroupId in this.selectedCollectionGroupIdMap) {
        if (this.isCollectionGroupSelected({collectionGroupId})) {
          return true;
        }
      }

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
    }
  },
  watch: {
    // groupId() {
    //   this.reset();
    //   if (this.groupId) this.fetchGroup({groupId: this.groupId});
    //   // this.fetchUsers({groupId: this.groupId});
    //
    //   this.fetchFolders({groupId: this.groupId, parentFolderId: this.parentFolderId});
    //   this.fetchFiles({groupId: this.groupId, parentFolderId: this.parentFolderId});
    //   this.fetchFolderPath({folderId: this.parentFolderId});
    // },
    parentFolderId() {
      this.reset();
      this.$store.dispatch("emcFolder/fetchFolders", {groupId: this.groupId, parentFolderId: this.parentFolderId});
      this.$store.dispatch("emcFile/fetchFiles", {groupId: this.groupId, parentFolderId: this.parentFolderId});
      this.$store.dispatch("emcFolder/fetchFolderPath", {folderId: this.parentFolderId});
    }
  },
  beforeMount() {
    // if (this.groupId) this.fetchGroup({groupId: this.groupId});
    // this.fetchUsers({groupId: this.groupId});

    this.$store.dispatch("emcFolder/fetchFolders", {groupId: this.groupId, parentFolderId: this.parentFolderId});
    this.$store.dispatch("emcFile/fetchFiles", {groupId: this.groupId, parentFolderId: this.parentFolderId});
    this.$store.dispatch("emcFolder/fetchFolderPath", {folderId: this.parentFolderId});
  }
}
</script>

<style scoped>
.selected,
table tbody tr.selected {
  background-color: #d6e2ed;
}

</style>