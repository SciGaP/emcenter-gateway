<template>
  <Page
      v-if="group" :title="group.name"
      :breadcrumb-links="breadcrumbLinks"
  >
    <GroupMembership :group-id="groupId"/>
  </Page>
</template>

<script>

import {mapGetters, mapActions} from "vuex";
import store from "../store";
import GroupMembership from "../components/GroupMembership";
import Page from "../components/Page";

export default {
  name: "GroupPage",
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
    breadcrumbLinks() {
      const _breadcrumbLinks = [{to: '/groups', name: 'Datasets'}]
      if (this.group && this.group.name) {
        _breadcrumbLinks.push({to: this.groupLink, name: this.group.name});

        console.log("#########")
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
        return ["session-1", "session-2", "session-3", "session-4", "session-5"].map((collectionName) => {
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