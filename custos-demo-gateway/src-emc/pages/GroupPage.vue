<template>
  <Page
      v-if="group" :title="group.name"
      :breadcrumb-links="[{to: '/groups', name: 'Datasets'}, {to: groupLink, name: group.name}]"
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
        <template slot="modal-footer">
          <b-button>Search</b-button>
        </template>
      </b-modal>
    </div>


    <b-row class="pt-3">
      <b-col class="pt-2" style="max-width: 200px;">
        <GroupMembership :group-id="groupId"/>
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
      </b-col>
      <b-col class="pt-2">
        <div class="w-100" style="display: flex;">
          <div style="flex: 1;">
            /{{ path }}
          </div>
          <div>
            <b-button size="sm" :variant="displayMode === 'list' ? 'primary':'outline-primary'"
                      v-on:click="switchDisplayMode('list')">
              <b-icon icon="list" aria-hidden="true"></b-icon>
            </b-button>
            <b-button size="sm" :variant="displayMode === 'grid' ? 'primary':'outline-primary'" class="ml-2"
                      v-on:click="switchDisplayMode('grid')">
              <b-icon icon="grid" aria-hidden="true"></b-icon>
            </b-button>
          </div>
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
            <b-row style="border-bottom: 1px solid #dee2e6; margin-bottom: 5px;" v-for="folder in folders"
                   :key="folder.folderId">
              <b-col style="max-width: 150px;display: flex;flex-direction: row;">
                <!--                <b-icon style="height: 100%;" icon="folder-fill" aria-hidden="true"></b-icon>-->
                <!--                <div style="flex: 1;display: inline; padding-left: 5px;">{{ folder.name }}</div>-->
                <router-link :to="getFolderLink(folder)" v-slot="{ href, route, navigate, isActive,isExactActive }">
                  <b-icon style="height: 100%;" icon="folder-fill" aria-hidden="true"></b-icon>
                  <a :class="{active: isExactActive}" :href="href" @click="navigate"
                     style="flex: 1;display: inline; padding-left: 5px;">
                    {{ folder.name }}
                  </a>
                </router-link>
              </b-col>
              <!--              <b-col style="padding-top: 5px; padding-bottom: 5px;font-size: 12px;display: flex;">-->
              <!--                <div v-if="folder.status.uploading > 0" class="pr-4">-->
              <!--                  Uploading (<a href="#">{{ folder.status.uploading }}</a>), {{ folder.status.uploadingPercentage }}%-->
              <!--                </div>-->
              <!--                <div v-if="folder.status.failed > 0">-->
              <!--                  <a href="#" class="text-danger">-->
              <!--                    <b-icon icon="exclamation-triangle-fill" aria-hidden="true"></b-icon>-->
              <!--                    Failed ({{ folder.status.failed }})-->
              <!--                  </a>-->
              <!--                </div>-->
              <!--              </b-col>-->
              <b-col style="font-size: 10px; max-width: 150px;overflow: hidden;line-height: 24px;">Dec 23, 2020,
                Thomas
              </b-col>
            </b-row>
          </div>
          <div v-if="folders.length > 0" class="w-100 pt-5"></div>
          <b-row style="border-bottom: 1px solid #dee2e6; margin-bottom: 5px;" v-for="file in files" :key="file.fileId">
            <b-col style="max-width: 150px;display: flex;flex-direction: row;">
              <b-icon style="height: 100%;" icon="card-image" aria-hidden="true"></b-icon>
              <div style="flex:1;display: inline; padding-left: 5px;overflow: hidden;">{{ file.name }}</div>
            </b-col>
            <!--            <b-col style="padding-top: 5px; padding-bottom: 5px;font-size: 12px;">-->
            <!--              <div v-if="file.status.uploading > 0" class="pr-4">-->
            <!--                Uploading {{ file.status.uploadingPercentage }}%-->
            <!--              </div>-->

            <!--              <div v-else-if="file.status.failed > 0">-->
            <!--                <a class="text-danger" href="#">-->
            <!--                  <b-icon icon="exclamation-triangle-fill" aria-hidden="true"></b-icon>-->
            <!--                  Failed-->
            <!--                </a>-->
            <!--              </div>-->
            <!--            </b-col>-->
            <b-col style="font-size: 10px; max-width: 150px;overflow: hidden;line-height: 24px;">Dec 23, 2020, Thomas
            </b-col>
          </b-row>
        </div>

      </b-col>
    </b-row>
  </Page>
</template>

<script>

import {mapGetters, mapActions} from "vuex";
import store from "../store";
import GroupMembership from "../components/GroupMembership";
import Page from "../components/Page";

export default {
  name: "SettingsPage",
  components: {Page, GroupMembership},
  store: store,
  data() {
    return {
      memberTypes: ['ADMIN', 'MEMBER'],
      displayMode: "list",
      // folders: [
      //   {folderId: 1, name: "Dinuka", status: {total: 2345, uploading: 10, failed: 3, uploadingPercentage: 20}},
      //   {folderId: 2, name: "Isuru", status: {total: 234, uploading: 0, failed: 0, uploadingPercentage: 0}},
      //   {folderId: 3, name: "Eroma", status: {total: 300, uploading: 105, failed: 1, uploadingPercentage: 70}},
      //   {folderId: 4, name: "Jane", status: {total: 3000, uploading: 56, failed: 0, uploadingPercentage: 90}},
      //   {folderId: 5, name: "Thomas", status: {total: 900, uploading: 0, failed: 0, uploadingPercentage: 0}},
      //   {folderId: 6, name: "Jack", status: {total: 456, uploading: 0, failed: 0, uploadingPercentage: 0}},
      //   {folderId: 7, name: "Mike", status: {total: 399, uploading: 13, failed: 45, uploadingPercentage: 0}},
      // ],
      // files: [
      // {fileId: 1, name: "file 1", status: {total: 1, uploading: 1, failed: 0, uploadingPercentage: 70}},
      // {fileId: 2, name: "file 2", status: {total: 1, uploading: 1, failed: 0, uploadingPercentage: 0}},
      // {fileId: 3, name: "file 3", status: {total: 1, uploading: 1, failed: 0, uploadingPercentage: 50}},
      // {fileId: 4, name: "file 4", status: {total: 1, uploading: 1, failed: 0, uploadingPercentage: 34}},
      // {fileId: 5, name: "file 5", status: {total: 1, uploading: 1, failed: 0, uploadingPercentage: 0}},
      // {fileId: 6, name: "file 6", status: {total: 1, uploading: 0, failed: 1, uploadingPercentage: 0}},
      // {fileId: 7, name: "file 7", status: {total: 1, uploading: 0, failed: 0, uploadingPercentage: 0}},
      // {fileId: 8, name: "file 8", status: {total: 1, uploading: 1, failed: 0, uploadingPercentage: 0}},
      // {fileId: 9, name: "file 9", status: {total: 1, uploading: 1, failed: 0, uploadingPercentage: 25}},
      // {fileId: 10, name: "file 10", status: {total: 1, uploading: 1, failed: 0, uploadingPercentage: 34}},
      // {fileId: 11, name: "file 11", status: {total: 1, uploading: 0, failed: 0, uploadingPercentage: 0}},
      // {fileId: 12, name: "file 12", status: {total: 1, uploading: 1, failed: 0, uploadingPercentage: 90}},
      // {fileId: 13, name: "file 13", status: {total: 1, uploading: 1, failed: 0, uploadingPercentage: 99}},
      // {fileId: 14, name: "file 14", status: {total: 1, uploading: 1, failed: 0, uploadingPercentage: 14}}
      // ]
    }
  },
  computed: {
    ...mapGetters({
      getGroup: "group/getGroup",
      getUsers: "user/getUsers",
    }),
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
            fileId: 1, name: datasetName,
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
              folderId: 1,
              path: user.username,
              name: user.username,
              status: {total: 2345, uploading: 10, failed: 3, uploadingPercentage: 20}
            }
          });
        } else {
          return []
        }
      } else if (this.mode === "user") {
        return ["collection-1", "collection-2", "collection-3", "collection-4", "collection-5"].map((collectionName) => {
          return {
            folderId: 1,
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
      return `/groups/${this.groupId}`;
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