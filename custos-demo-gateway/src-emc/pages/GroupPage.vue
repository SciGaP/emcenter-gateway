<template>
  <b-container>
    <b-row>
      <b-col>
        <router-link to="/groups">PI Group</router-link>
        <span> / </span>
        <router-link :to="groupLink" v-if="group">{{ group.name }}</router-link>
      </b-col>
    </b-row>
    <b-row v-if="group">
      <b-col>
        <h1>{{ group.name }}</h1>
        <div>{{ group.description }}</div>
      </b-col>
    </b-row>

    <b-row class="pt-3">
      <b-col style="max-width: 100%; min-width: 100%">
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
      </b-col>
      <b-col class="pt-2" style="max-width: 200px;">
        <strong>Users</strong>
        <ul v-if="users" style="list-style: none; padding: 0px;">
          <li v-for="user in users" :key="user.userId">
            <b-form-checkbox
                :id="`checkbox-group-user-${user.username}`"
                :name="`checkbox-group-user-${user.username}`"
                :checked="true"
            >
              {{ user.username }}
            </b-form-checkbox>
          </li>
        </ul>
      </b-col>
      <b-col class="pt-2">
        <div class="w-100" style="display: flex;">
          <div style="flex: 1;">
            /
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


        <div class="w-100" v-if="displayMode === 'list'">
          <b-row style="border-bottom: 1px solid #dee2e6; margin-bottom: 5px;" v-for="folder in folders"
                 :key="folder.folderId">
            <b-col>
              <b-icon icon="folder-fill" aria-hidden="true"></b-icon>
              <div style="display: inline; padding-left: 5px;">{{ folder.name }}</div>
            </b-col>
            <b-col style="padding-top: 2px; padding-bottom: 2px;">
              <b-progress style="height: 100%;" :value="30" :max="100" show-progress animated></b-progress>
            </b-col>
            <b-col>Dec 23, 2020</b-col>
            <b-col>Thomas</b-col>
          </b-row>
          <div class="w-100 pt-5"></div>
          <b-row style="border-bottom: 1px solid #dee2e6; margin-bottom: 5px;" v-for="file in files" :key="file.fileId">
            <b-col>
              <b-icon icon="card-image" aria-hidden="true"></b-icon>
              <div style="display: inline; padding-left: 5px;">{{ file.name }}</div>
            </b-col>
            <b-col style="padding-top: 2px; padding-bottom: 2px;">
              <b-progress style="height: 100%;" :value="30" :max="100" show-progress animated></b-progress>
            </b-col>
            <b-col>Dec 23, 2020</b-col>
            <b-col>Thomas</b-col>
          </b-row>
        </div>

      </b-col>
    </b-row>
  </b-container>
</template>

<script>

import {mapGetters, mapActions} from "vuex";
import store from "../store";

export default {
  name: "SettingsPage",
  store: store,
  data() {
    return {
      displayMode: "list",
      folders: [
        {folderId: 1, name: "Dinuka"},
        {folderId: 2, name: "Isuru"},
        {folderId: 3, name: "Eroma"},
        {folderId: 4, name: "Jane"},
        {folderId: 5, name: "Thomas"},
        {folderId: 6, name: "Jack"},
        {folderId: 7, name: "Mike"},
      ],
      files: [
        {fileId: 1, name: "file 1"},
        {fileId: 2, name: "file 2"},
        {fileId: 3, name: "file 3"},
        {fileId: 4, name: "file 4"},
        {fileId: 5, name: "file 5"},
        {fileId: 6, name: "file 6"},
        {fileId: 7, name: "file 7"},
        {fileId: 8, name: "file 8"},
        {fileId: 9, name: "file 9"},
        {fileId: 10, name: "file 10"},
        {fileId: 11, name: "file 11"},
        {fileId: 12, name: "file 12"},
        {fileId: 13, name: "file 13"},
        {fileId: 14, name: "file 14"}
      ]
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