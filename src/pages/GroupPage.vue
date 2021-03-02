<template>
  <Page
      v-if="group" :title="group.name"
      :breadcrumb-links="breadcrumbLinks"
  >
    <div class="mt-2">
      <table class="w-100">
        <thead>
        <tr>
          <th>Username</th>
          <th v-for="tenantRole in tenantRoles" :key="tenantRole.tenantRoleId" class="text-right">
            {{ tenantRole.name }}
          </th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="user in users" :key="user.username">
          <td>
            {{ user.username }}
          </td>
          <td v-for="tenantRole in tenantRoles" :key="tenantRole.tenantRoleId" class="text-right">
            <b-form-checkbox
                :id="`user-${user.username}-tenant_role_${tenantRole.tenantRoleId}`"
                :name="`user-${user.username}-tenant_role_${tenantRole.tenantRoleId}`"
                :checked="hasTenantRole(user, tenantRole)"
            >
            </b-form-checkbox>
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
      memberTypes: ['ADMIN', 'MEMBER'],
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
      addUserToGroup: "group/addUserToGroup"
    }),
    async onUserSelect({username}) {
      await this.addUserToGroup({groupId: this.groupId, username, membershipType: "MEMBER"});
      await this.fetchUsers({groupId: this.groupId});
    },
    hasTenantRole(user, tenantRole) {
      return user.realm_roles.indexOf(tenantRole.name) >= 0;
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