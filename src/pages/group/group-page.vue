<template>
  <Page :title="title" :breadcrumb-links="breadcrumbLinks" :errors="errors">
    <template #header-right>
      <b-overlay :show="processingAddNewUsers" rounded spinner-small spinner-variant="primary" class="d-inline-block">
        <b-button variant="primary" v-b-modal="`modal-select-users-or-groups`">Add Members</b-button>
      </b-overlay>
      <modal-select-users-or-groups :client-id="clientId" modal-id="modal-select-users-or-groups" title="Select Users"
                                    v-on:users="onAddNewUsers"/>
    </template>
    <table-overlay-info :rows="5" :columns="2" :data="users">
      <template #empty>
        <div class="w-100 p-4 text-center">
          No group members available or authorized to access.
        </div>
      </template>
      <b-table-simple>
        <b-thead>
          <b-tr>
            <b-th>Username</b-th>
            <b-th>Email</b-th>
            <b-th>Membership</b-th>
            <b-th></b-th>
          </b-tr>
        </b-thead>
        <b-tbody>
          <b-tr v-for="user in users" :key="user.username">
            <b-td>{{ user.username }}</b-td>
            <b-td>{{ user.email }}</b-td>
            <b-td>{{ user.membershipType }}</b-td>
            <b-td>
              <b-overlay :show="processingRemoveUser[user.username]"
                         rounded spinner-small spinner-variant="primary" class="d-inline-block">
                <button-delete-after-confirmation variant="link" size="sm" v-on:click="onRemoveUser(user)"
                                                  :disabled="user.membershipType === 'OWNER'">
                  <b-icon icon="trash"/>
                </button-delete-after-confirmation>
              </b-overlay>
            </b-td>
          </b-tr>
        </b-tbody>
      </b-table-simple>
      <!--    <b-pagination-->
      <!--        size="sm"-->
      <!--        class="float-right"-->
      <!--        v-model="activePage"-->
      <!--        :total-rows="tenantsPagination.totalRows"-->
      <!--        :per-page="tenantsPagination.perPage"-->
      <!--        aria-controls="my-table"-->
      <!--        :value="activePage"-->
      <!--    ></b-pagination>-->
    </table-overlay-info>
  </Page>
</template>

<script>
import store from "airavata-custos-portal/src/lib/store";
import TableOverlayInfo from "airavata-custos-portal/src/lib/components/overlay/table-overlay-info";
import ButtonDeleteAfterConfirmation
  from "airavata-custos-portal/src/lib/components/button/button-delete-after-confirmation";
import ModalSelectUsersOrGroups from "airavata-custos-portal/src/lib/components/modals/modal-select-users-or-groups";
import Page from "../../components/Page";

export default {
  name: "TenantGroup",
  components: {Page, ModalSelectUsersOrGroups, TableOverlayInfo, ButtonDeleteAfterConfirmation},
  store: store,
  data() {
    return {
      processingRemoveUser: {},
      processingAddNewUsers: false,
      errors: []
    };
  },
  computed: {
    title() {
      if (this.group) {
        return this.group.name;
      } else {
        return "";
      }
    },
    clientId() {
      return this.$route.params.clientId;
    },
    groupId() {
      return this.$route.params.groupId;
    },
    group() {
      return this.$store.getters["group/getGroup"]({groupId: this.groupId})
    },
    users() {
      return this.$store.getters["user/getUsers"]({groupId: this.groupId, clientId: this.clientId});
    },
    breadcrumbLinks() {
      const _breadcrumbLinks = [{to: `/groups`, name: "Groups"}];

      if (this.group) {
        _breadcrumbLinks.push({to: `/groups/${this.groupId}`, name: this.group.name});
      }

      return _breadcrumbLinks;
    }
  },
  methods: {
    async onAddNewUsers(newUsers) {
      this.processingAddNewUsers = true;
      await Promise.all(newUsers.map(newUser => {
        return this.$store.dispatch("group/addUserToGroup", {
          clientId: this.clientId,
          groupId: this.groupId,
          username: newUser.username,
          membershipType: "MEMBER"
        }).catch(error => {
          this.errors.push({
            title: "Unknown Error ",
            description: `Unknown error when adding the user '${newUser.username}'`,
            source: error, variant: "danger"
          });
        });
      }));

      this.refreshData();

      this.processingAddNewUsers = false;
    },
    async onRemoveUser({username}) {
      this.processingRemoveUser = {...this.processingRemoveUser, [username]: true};
      try {
        await this.$store.dispatch("group/removeUserFromGroup", {
          clientId: this.clientId,
          groupId: this.groupId,
          username
        });
      } catch (error) {
        this.errors.push({
          title: "Unknown Error",
          description: `Unknown error when removing the user '${username}'`,
          source: error, variant: "danger"
        });
      }
      this.refreshData();
      this.processingRemoveUser = {...this.processingRemoveUser, [username]: false};
    },
    async refreshData() {
      try {
        await Promise.all([
          this.$store.dispatch("user/fetchUsers", {clientId: this.clientId, groupId: this.groupId}),
          this.$store.dispatch("group/fetchGroup", {clientId: this.clientId, groupId: this.groupId})
        ]);
      } catch (e) {
        this.errors.push({
          variant: "danger",
          title: "Network Error",
          description: "Error when fetching groups.",
          source: e
        });
      }

    }
  },
  beforeMount() {
    this.refreshData();
  }
}
</script>

<style scoped>

</style>