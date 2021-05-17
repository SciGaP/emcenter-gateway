<template>
  <Page :title="title" :breadcrumb-links="breadcrumbLinks">
    <div class="w-100">
      <div class="w-100 mt-2" style="display: flex; flex-direction: row;display: inline-flex;align-items: center;">
        <div style="flex: 1;">
          <span v-if="numberOfFoldersSelected > 0">
            {{ numberOfFoldersSelected }} collection groups<span v-if="numberOfFoldersSelected > 1">s</span>
          </span>
          <!--          <span v-if="numberOfFoldersSelected > 0 && numberOfFilesSelected > 0">-->
          <!--            &-->
          <!--          </span>-->
          <!--          <span v-if="numberOfFilesSelected > 0">-->
          <!--            {{ numberOfFilesSelected }} file(s)-->
          <!--          </span>-->
          <span v-if="numberOfFoldersSelected > 0 || numberOfFilesSelected > 0">
            selected
          </span>
        </div>
      </div>


      <div class="w-100 pt-4"></div>

      <div class="w-100 text-right">
        <b-button variant="link" v-b-modal="`modal-create-collection-group`">
          <b-icon icon="plus"></b-icon>
          Create New
        </b-button>
        <b-modal :id="`modal-create-collection-group`" title="Collection Group">
          <div>
            <label for="collection-group-name">Collection Group Name</label>
            <b-form-input id="collection-group-name"></b-form-input>
          </div>
          <template #modal-footer="{close}">
            <b-button size="sm" variant="outline-primary" v-on:click="close()">Cancel</b-button>
            <b-button size="sm" variant="primary" v-on:click="close()">Save</b-button>
          </template>
        </b-modal>
      </div>

      <div class="w-100" v-if="folders">
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
              <b-tr v-for="folder in folders" :key="folder.folderId" :class="{selected: isFolderSelected(folder)}">
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

import {mapGetters, mapActions} from "vuex";
import store from "../store";
import Page from "../components/Page";
import Pagination from "@/components/Pagination";
// import UserSearchAndSelect from "@/components/EntitySelectInput";

export default {
  name: "GroupDataPage",
  components: {Pagination, Page},
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
    ...mapGetters({
      getGroup: "group/getGroup",
      getUsers: "user/getUsers",
      getFiles: "emcFile/getFiles",
      getFolders: "emcFolder/getFolders",
      getFolderPath: "emcFolder/getFolderPath",
    }),
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

      const folderPath = this.getFolderPath({folderId: this.parentFolderId});
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
    groupId() {
      return this.$route.query.groupId;
    },
    group() {
      return this.getGroup({groupId: this.groupId});
    },

    parentFolderId() {
      if (this.$route.query.parentFolderId) {
        return window.decodeURIComponent(this.$route.query.parentFolderId);
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
      const _files = this.getFiles({groupId: this.groupId, parentFolderId: this.parentFolderId});

      // TODO remove
      if (_files && this.group) {
        return _files.map(file => {
          return {...file, name: `${this.group.name.replace(/ /ig, "-").toLowerCase()}-${file.name}`}

        });
      } else {
        return _files;
      }
    },
    folders() {
      const _folders = this.getFolders({groupId: this.groupId, parentFolderId: this.parentFolderId});

      // TODO remove
      if (_folders && this.group) {
        return _folders.map(folder => {
          return {...folder, name: `${this.group.name.replace(/ /ig, "-").toLowerCase()}-${folder.name}`}
        })
      } else {
        return _folders
      }
    },
    users() {
      return this.getUsers({groupId: this.groupId});
    },
    groupLink() {
      return this.getDataLink({groupId: this.groupId});
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
    }
  },
  methods: {
    ...mapActions({
      fetchGroup: "group/fetchGroup",
      fetchUsers: "user/fetchUsers",
      fetchFiles: "emcFile/fetchFiles",
      fetchFolders: "emcFolder/fetchFolders",
      fetchFolderPath: "emcFolder/fetchFolderPath"
    }),
    reset() {
      this.displayMode = "list";
      this.selectedFileIdMap = {};
      this.selectedFolderIdMap = {};
    },
    getDataLink({groupId} = {}, {folderId} = {}) {
      let _dataLink = "/collections?";

      if (groupId) {
        _dataLink += `groupId=${groupId}&`
      }

      if (folderId) {
        _dataLink += `parentFolderId=${folderId}&`
      }

      return _dataLink;
    },
    switchDisplayMode(displayMode) {
      this.displayMode = displayMode;
    },
    getFolderLink({folderId}) {
      return this.getDataLink({groupId: this.groupId}, {folderId});
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
    }
  },
  watch: {
    groupId() {
      this.reset();
      if (this.groupId) this.fetchGroup({groupId: this.groupId});
      // this.fetchUsers({groupId: this.groupId});

      this.fetchFolders({groupId: this.groupId, parentFolderId: this.parentFolderId});
      this.fetchFiles({groupId: this.groupId, parentFolderId: this.parentFolderId});
      this.fetchFolderPath({folderId: this.parentFolderId});
    },
    parentFolderId() {
      this.reset();
      this.fetchFolders({groupId: this.groupId, parentFolderId: this.parentFolderId});
      this.fetchFiles({groupId: this.groupId, parentFolderId: this.parentFolderId});
      this.fetchFolderPath({folderId: this.parentFolderId});
    }
  },
  beforeMount() {
    if (this.groupId) this.fetchGroup({groupId: this.groupId});
    // this.fetchUsers({groupId: this.groupId});
    this.fetchFolders({groupId: this.groupId, parentFolderId: this.parentFolderId});
    this.fetchFiles({groupId: this.groupId, parentFolderId: this.parentFolderId});
    this.fetchFolderPath({folderId: this.parentFolderId});
  }
}
</script>

<style scoped>
.selected,
table tbody tr.selected {
  background-color: #d6e2ed;
}

</style>