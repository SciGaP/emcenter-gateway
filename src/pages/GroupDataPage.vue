<template>
  <Page
      v-if="group" :title="group.name"
      :breadcrumb-links="breadcrumbLinks"
  >
    <div class="w-100">
      <b-input-group size="sm">
        <b-form-input placeholder="Search" size="sm"></b-form-input>
        <b-input-group-append>
          <b-button v-b-modal.modal-1>
            <b-icon icon="caret-down-fill" aria-hidden="true"></b-icon>
          </b-button>
        </b-input-group-append>
      </b-input-group>

      <b-modal id="modal-1" title="Search / Filter">
        <p class="my-4">Advanced searching/ filtering criteria. </p>
        <div>
          <strong>Microscope</strong>
          <ul style="list-style: none; padding: 0px;">
            <li v-for="microscope in ['IU Cardiac-MS1', 'IU-med-MS1', 'IU-med-MS2']" :key="microscope">
              <b-form-checkbox
                  :id="`checkbox-group-user-${microscope}`"
                  :name="`checkbox-group-user-${microscope}`"
                  :checked="true"
              >
                {{ microscope }}
              </b-form-checkbox>
            </li>
          </ul>
        </div>
        <template slot="modal-footer">
          <b-button>Search</b-button>
        </template>
      </b-modal>
    </div>

    <div class="w-100">
      <div class="w-100 text-right mt-2">
        <button type="button" class="rvt-button" :class="{'rvt-button--secondary': displayMode !== 'list'}"
                v-on:click="switchDisplayMode('list')">
          <b-icon icon="list" aria-hidden="true"></b-icon>
        </button>
        <button type="button" class="ml-2 rvt-button" :class="{'rvt-button--secondary': displayMode !== 'grid'}"
                v-on:click="switchDisplayMode('grid')">
          <b-icon icon="grid" aria-hidden="true"></b-icon>
        </button>
      </div>

      <div class="w-100 pt-4"></div>

      <b-row v-if="displayMode === 'grid'">
        <b-col style="min-width: 120px;max-width: 120px;" v-for="folder in folders" :key="folder.folderId">
          <a>
            <b-icon icon="folder-fill" aria-hidden="true"></b-icon>
            <div style="display: inline; padding-left: 5px;">{{ folder.name }}</div>
          </a>
        </b-col>
        <div class="w-100 pt-5"></div>
        <b-col style="min-width: 120px;max-width: 120px;" v-for="file in files" :key="file.fileId">
          <a>
            <b-icon icon="card-image" aria-hidden="true"></b-icon>
            <div style="display: inline; padding-left: 5px;">{{ file.name }}</div>
          </a>
        </b-col>
      </b-row>

      <div v-if="displayMode === 'list'" class="w-100">
        <div class="w-100">
          <table class="w-100">
            <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Last Updated</th>
              <th></th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="folder in folders" :key="folder.folderId">
              <td>
                <input type="checkbox" :name="folder.folderId" :id="folder.folderId"/>
                <label :for="folder.folderId" class="rvt-m-right-sm"></label>
              </td>
              <td>
                <router-link :to="getFolderLink(folder)" v-slot="{ href, route, navigate, isActive,isExactActive }">
                  <b-icon style="height: 100%;" icon="folder-fill" aria-hidden="true"></b-icon>
                  <a :class="{active: isExactActive}" :href="href" @click="navigate"
                     style="flex: 1;display: inline; padding-left: 5px;line-height: 24px;">
                    {{ folder.name }}
                  </a>
                </router-link>
              </td>
              <td>Dec 23d, 2020, Thomas</td>
              <td>
                <div class="rvt-dropdown">
                  <button type="button" class="rvt-button rvt-button--small rvt-button--secondary"
                          data-dropdown-toggle="dropdown-1"
                          aria-haspopup="true" aria-expanded="false">
                    <span>Actions</span>
                    <svg aria-hidden="true" class="rvt-m-left-xs" xmlns="http://www.w3.org/2000/svg" width="16"
                         height="16" viewBox="0 0 16 16">
                      <path fill="currentColor"
                            d="M8,12.46a2,2,0,0,1-1.52-.7L1.24,5.65a1,1,0,1,1,1.52-1.3L8,10.46l5.24-6.11a1,1,0,0,1,1.52,1.3L9.52,11.76A2,2,0,0,1,8,12.46Z"/>
                    </svg>
                  </button>
                  <div class="rvt-dropdown__menu" id="dropdown-1" role="menu" aria-hidden="true">
                    <button type="button" role="menuitemradio">Download</button>
                    <button type="button" role="menuitemradio">Share</button>
                    <button type="button" role="menuitemradio">View History</button>
                  </div>
                </div>
              </td>
            </tr>


            <tr v-if="folders.length > 0" class="w-100 pt-5"></tr>

            <tr v-for="file in files" :key="file.fileId">
              <td>
                <input type="checkbox" :name="file.fileId" :id="file.fileId"/>
                <label :for="file.fileId" class="rvt-m-right-sm"></label>
              </td>
              <td>
                <b-icon style="height: 100%;" icon="card-image" aria-hidden="true"></b-icon>
                <a href="#" style="flex: 1;display: inline; padding-left: 5px;line-height: 24px;">
                  {{ file.name }}
                </a>
              </td>
              <td>Dec 23d, 2020, Thomas</td>
              <td>
                <div class="rvt-dropdown">
                  <button type="button" class="rvt-button rvt-button--small rvt-button--secondary"
                          data-dropdown-toggle="dropdown-1"
                          aria-haspopup="true" aria-expanded="false">
                    <span>Actions</span>
                    <svg aria-hidden="true" class="rvt-m-left-xs" xmlns="http://www.w3.org/2000/svg" width="16"
                         height="16" viewBox="0 0 16 16">
                      <path fill="currentColor"
                            d="M8,12.46a2,2,0,0,1-1.52-.7L1.24,5.65a1,1,0,1,1,1.52-1.3L8,10.46l5.24-6.11a1,1,0,0,1,1.52,1.3L9.52,11.76A2,2,0,0,1,8,12.46Z"/>
                    </svg>
                  </button>
                  <div class="rvt-dropdown__menu" id="dropdown-1" role="menu" aria-hidden="true">
                    <button type="button" role="menuitemradio">Download</button>
                    <button type="button" role="menuitemradio">Share</button>
                    <button type="button" role="menuitemradio">Edit</button>
                    <button type="button" role="menuitemradio">View History</button>
                  </div>
                </div>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

  </Page>
</template>

<script>

import {mapGetters, mapActions} from "vuex";
import store from "../store";
import Page from "../components/Page";

export default {
  name: "GroupDataPage",
  components: {Page},
  store: store,
  data() {
    return {
      memberTypes: ['ADMIN', 'MEMBER'],
      displayMode: "list"
    }
  },
  computed: {
    ...mapGetters({
      getGroup: "group/getGroup",
      getUsers: "user/getUsers",
    }),
    breadcrumbLinks() {
      const _breadcrumbLinks = [{to: '/data', name: 'Datasets'}]
      if (this.group && this.group.name) {
        _breadcrumbLinks.push({to: this.groupLink, name: this.group.name});

        if (this.path && this.path !== "") {
          const pathSegments = this.path.split("/");
          pathSegments.map((pathSegment, pathSegmentIndex) => {
            const _fullPathToSegment = pathSegments.slice(0, pathSegmentIndex + 1).join("/");
            _breadcrumbLinks.push({to: `${this.groupLink}?path=${_fullPathToSegment}`, name: pathSegment});
          });
        }
      }

      return _breadcrumbLinks;
    },
    groupId() {
      return this.$route.params.groupId;
    },
    group() {
      return this.getGroup({groupId: this.groupId});
    },

    path() {
      if (this.$route.query.path) {
        return window.decodeURIComponent(this.$route.query.path);
      } else {
        return "";
      }
    },

    // TODO remove. Added temporary for demo purpose.
    mode() {
      const folderCountInPath = this.path.length === 0 ? 0 : this.path.split("/").length;
      if (folderCountInPath === 1) {
        return "user";
      } else if (folderCountInPath === 2) {
        return "collection";
      } else {
        return "group";
      }
    },
    nextMode() {
      if (this.mode === "group") {
        return "user"
      } else if (this.mode === "user") {
        return "collection"
      } else {
        return null;
      }
    },

    files() {
      if (this.mode === "collection") {
        return ["dataset-1", "dataset-2", "dataset-3", "dataset-4", "dataset-5", "dataset-6", "dataset-7", "dataset-8"].map((datasetName) => {
          return {
            fileId: datasetName, name: datasetName,
            status: {total: 1, uploading: 1, failed: 0, uploadingPercentage: 70}
          }
        });
      } else {
        return []
      }
    },
    folders() {
      if (this.mode === "group") {
        if (this.users) {
          return this.users.map((user) => {
            return {
              folderId: user.username,
              path: user.username,
              name: user.username,
              status: {total: 2345, uploading: 10, failed: 3, uploadingPercentage: 20}
            }
          });
        } else {
          return []
        }
      } else if (this.mode === "user") {
        return ["session-1", "session-2", "session-3", "session-4", "session-5"].map((collectionName) => {
          return {
            folderId: collectionName,
            path: this.path + "/" + collectionName,
            name: collectionName,
            status: {total: 2345, uploading: 10, failed: 3, uploadingPercentage: 20}
          }
        });
      } else {
        return []
      }
    },
    users() {
      return this.getUsers({groupId: this.groupId});
    },
    groupLink() {
      return `/data/groups/${this.groupId}`;
    }
  },
  methods: {
    ...mapActions({
      fetchGroup: "group/fetchGroup",
      fetchUsers: "user/fetchUsers",
    }),
    switchDisplayMode(displayMode) {
      this.displayMode = displayMode;
    },
    getFolderLink(folder) {
      return this.groupLink + "?path=" + folder.path;
    }
  },
  beforeMount() {
    this.fetchGroup({groupId: this.groupId});
    this.fetchUsers({groupId: this.groupId});
  }
}
</script>

<style scoped>

</style>