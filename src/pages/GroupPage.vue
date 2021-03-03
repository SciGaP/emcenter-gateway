<template>
  <Page
      v-if="group" :title="group.name"
      :breadcrumb-links="breadcrumbLinks"
  >
    <div class="mt-2">
      <table class="w-100">
        <thead>
        <tr>
          <th style="width: 200px;">Username</th>
          <th v-for="memberType in memberTypes" :key="memberType" class="text-right" style="width: 100px;">
            {{ memberType }}
          </th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="user in users" :key="user.username">
          <td>
            {{ user.username }}
          </td>
          <td v-for="memberType in memberTypes" :key="memberType" class="text-right">
            <b-form-checkbox
                :id="`user-${user.username}-member_type_${memberType}`"
                :name="`user-${user.username}-member_type_${memberType}`"
                :checked="hasTenantRole(user, memberType)"
                v-on:change="changeMembership({username:user.username, membershipType:memberType})"
            >
            </b-form-checkbox>
          </td>
          <td class="text-center">
            <a href="#" v-on:click.prevent="removeUser({username: user.username})">Delete</a>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="w-100 mt-3">
      <UserSearchAndSelect v-on:change="onUserSelect"/>
    </div>
  </Page>
</template>

<script>

import {mapGetters, mapActions} from "vuex";
import store from "../store";
import Page from "../components/Page";
import UserSearchAndSelect from "@/components/UserSearchAndSelect";

export default {
  name: "GroupPage",
  components: {UserSearchAndSelect, Page},
  store: store,
  data() {
    return {
      memberTypes: ['OWNER', 'MEMBER'],
      displayMode: "list",
    }
  },
  computed: {
    ...mapGetters({
      getGroup: "group/getGroup",
      getUsers: "user/getUsers",
      getTenantRoles: "tenant/getTenantRoles"
    }),
    breadcrumbLinks() {
      const _breadcrumbLinks = [{to: '/groups', name: 'Groups'}]
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
    tenantRoles() {
      return this.getTenantRoles();
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
      fetchTenantRoles: "tenant/fetchTenantRoles",
      addUserToGroup: "group/addUserToGroup",
      changeGroupMembership: "group/changeGroupMembership",
      removeUserFromGroup: "group/removeUserFromGroup"
    }),
    async onUserSelect({username}) {
      await this.addUserToGroup({groupId: this.groupId, username, membershipType: "MEMBER"});
      await this.fetchUsers({groupId: this.groupId});
    },
    hasTenantRole(user, membershipType) {
      console.log("###### " + user.membership_type + " - " + membershipType)
      return membershipType === "MEMBER" || user.membership_type === membershipType;
    },
    async removeUser({username}) {
      await this.removeUserFromGroup({groupId: this.groupId, username});
      await this.fetchUsers({groupId: this.groupId});
    },
    async changeMembership({username, membershipType}) {
      console.log("changeMembership ", {username, membershipType})
      // await this.changeGroupMembership({groupId: this.groupId, username: username, membershipType: membershipType})
      await this.fetchUsers({groupId: this.groupId});
    }
  },
  beforeMount() {
    this.fetchGroup({groupId: this.groupId});
    this.fetchUsers({groupId: this.groupId});
    this.fetchTenantRoles()
  }
}
</script>

<style scoped>

</style>