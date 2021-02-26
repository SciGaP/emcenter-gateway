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
    })
  },
  beforeMount() {
    this.fetchGroup({groupId: this.groupId});
    this.fetchUsers({groupId: this.groupId});
  }
}
</script>

<style scoped>

</style>