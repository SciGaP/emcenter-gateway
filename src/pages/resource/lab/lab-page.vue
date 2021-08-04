<template>
  <Page :title="title" :breadcrumb-links="breadcrumbLinks" :errors="errors">
    <template #header-right>
      <button-overlay :show="processing">
        <b-button variant="primary" v-on:click="onClickSave">Save</b-button>
      </button-overlay>
    </template>
    <div class="pr-4 pb-2">
      <input-select-users-or-groups :client-id="clientId" v-on:change="onSelect" :allow-groups="false"/>
      <b-form-text>
        Add new members to the lab by searching there username of this textfield. <br/>
        <strong>Note: </strong> The new users has to have signup by them self to be available here.
      </b-form-text>
    </div>
    <b-overlay :show="processing">
      <b-skeleton-table v-if="processing" :rows="4" :columns="3"/>
      <div v-else>
        <b-table-simple>
          <b-thead>
            <b-tr>
              <b-th>Username</b-th>
              <b-th>Role</b-th>
            </b-tr>
          </b-thead>
          <b-tbody>
            <b-tr v-for="(owner, ownerIndex) in notDroppedOwners" :key="ownerIndex">
              <b-td>{{ getOwnerName(owner) }}</b-td>
              <b-td>
                <b-dropdown variant="outline-secondary" size="sm" :id="`dropdown-permission-type-${ownerIndex}`"
                            offset="25"
                            :text="getPermissionTypeName(owner.permissionTypeId)" style="min-width: 100px;"
                            :disabled="owner.permissionTypeId === 'OWNER'">
                  <b-dropdown-item v-for="permissionType in permissionTypes" :key="permissionType.id" href="#"
                                   v-on:click="owner.saved = false; owner.permissionTypeId = permissionType.id"
                                   :disabled="permissionType.id === 'OWNER'">
                    {{ getPermissionTypeName(permissionType.id) }}
                  </b-dropdown-item>
                </b-dropdown>
              </b-td>
              <b-td>
                <button-overlay :show="processingDrop[owner.ownerId]">
                  <b-button variant="link" v-on:click="onDropShare(owner)" v-b-tooltip.hover="`Delete`"
                            :disabled="owner.permissionTypeId === 'OWNER'">
                    <b-icon icon="trash"></b-icon>
                  </b-button>
                </button-overlay>
              </b-td>
            </b-tr>
          </b-tbody>
        </b-table-simple>
      </div>
    </b-overlay>
  </Page>
</template>

<script>
import store from "../../../store";
import custosStore from "airavata-custos-portal/src/lib/store";
import InputSelectUsersOrGroups
  from "airavata-custos-portal/src/lib/components/input-fields/input-select-users-or-groups";
import ButtonOverlay from "airavata-custos-portal/src/lib/components/overlay/button-overlay";
import {custosService} from "airavata-custos-portal/src/lib/store/util/custos.util";
import Page from "@/components/Page";

export default {
  name: "lab-page",
  components: {Page, ButtonOverlay, InputSelectUsersOrGroups},
  data() {
    return {
      processing: false,
      processingDrop: {},
      errors: [],

      owners: []
    }
  },
  computed: {
    title() {
      return this.resource ? this.resource.name : "";
    },
    clientId() {
      return custosService.clientId;
    },
    resourceId() {
      return this.$route.params.resourceId;
    },
    resource() {
      return store.getters["emcResource/getResource"]({resourceId: this.resourceId});
    },
    breadcrumbLinks() {
      let collectionsLink = '/labs';
      let _breadcrumbLinks = [{to: collectionsLink, name: "Labs"}];

      if (this.resource) {
        _breadcrumbLinks.push({to: `${collectionsLink}/${this.resource.resourceId}`, name: this.resource.name});
      }

      return _breadcrumbLinks;
    },
    permissionTypes() {
      return custosStore.getters["sharing/getPermissionTypes"]({clientId: this.clientId});
    },
    permissionTypesDropdownOptions() {
      return this.permissionTypes.map(permissionType => {
        return {text: this.getPermissionTypeName(permissionType), value: permissionType};
      });
    },
    savedOwners() {
      return custosStore.getters["sharing/getEntitySharedOwners"]({clientId: this.clientId, entityId: this.resourceId});
    },
    notDroppedOwners() {
      return this.owners.filter(({dropped}) => !dropped);
    },
    currentUsername() {
      return custosStore.getters["auth/currentUsername"];
    }
  },
  methods: {
    getPermissionTypeName(permissionType) {
      if (permissionType === "OWNER") {
        return "Owner";
      } else if (permissionType === "ADMIN") {
        return "Principle Investigator";
      } else if (permissionType === "EDITOR") {
        return "Observer";
      } else if (permissionType === "VIEWER") {
        return "Researcher";
      }
    },
    getOwnerName({ownerId, ownerType}) {
      if (ownerType === "group") {
        const group = custosStore.getters["group/getGroup"]({clientId: this.clientId, groupId: ownerId});
        if (group) {
          return group.name;
        }
      } else if (ownerType === "user") {
        const user = custosStore.getters["user/getUser"]({clientId: this.clientId, username: ownerId});
        if (user) {
          return `${user.firstName}, ${user.lastName}`;
        }
      }
    },
    async refreshData() {
      this.processing = true;

      await store.dispatch("emcResource/fetchResource", {resourceId: this.resourceId});

      await custosStore.dispatch("sharing/fetchPermissionTypes", {clientId: this.clientId});
      await custosStore.dispatch("sharing/fetchSharedOwners", {clientId: this.clientId, entityId: this.resourceId});

      if (this.savedOwners) {
        this.owners = this.savedOwners.map(({ownerId, ownerType, permission}) => {
          if (ownerType === "group") {
            custosStore.dispatch("group/fetchGroup", {clientId: this.clientId, groupId: ownerId});
          } else if (ownerType === "user") {
            custosStore.dispatch("user/fetchUsers", {clientId: this.clientId, username: ownerId});
          }

          return {ownerId, ownerType, permissionTypeId: permission.id, dropped: false, saved: true};
        });
      }

      this.processing = false;
    },
    indexOf({ownerId, ownerType}) {
      for (let i = 0; i < this.owners.length; i++) {
        const owner = this.owners[i];
        if (owner.ownerId === ownerId && owner.ownerType === ownerType) {
          return i;
        }
      }

      return -1;
    },
    onSelect(obj) {
      let ownerId = null;
      let ownerType = null;
      if (obj.username) {
        ownerId = obj.username;
        ownerType = "user";
      } else if (obj.groupId) {
        ownerId = obj.groupId;
        ownerType = "group";
      }

      const newOwner = {
        ownerId: ownerId,
        ownerType: ownerType,
        permissionTypeId: null,
        dropped: false,
        saved: false
      };
      const existingIndex = this.indexOf(newOwner);

      if (existingIndex >= 0) {
        if (this.owners[existingIndex].dropped) {
          this.owners = this.owners.map((owner, ownerIndex) => {
            return ownerIndex === existingIndex ? newOwner : owner;
          });
        }
      } else {
        this.owners.push(newOwner)
      }
    },
    onDropShare({ownerId, ownerType, saved}) {
      this.processingDrop[ownerId] = true;
      const _owners = [];
      for (let i = 0; i < this.owners.length; i++) {
        const owner = this.owners[i];
        if (owner.permissionTypeId === "OWNER" || !(owner.ownerId === ownerId && owner.ownerType === ownerType)) {
          _owners.push(owner);
        } else if (saved) {
          owner.dropped = true;
          _owners.push(owner);
        }
      }

      this.owners = _owners;
      this.processingDrop[ownerId] = false;
    },
    onClickSave() {
      this.processing = true;

      for (let i = 0; i < this.owners.length; i++) {
        const owner = this.owners[i];
        if (owner.dropped) {
          custosStore.dispatch("sharing/dropEntitySharedOwner", {
            clientId: this.clientId,
            entityId: this.resourceId,
            permissionTypeId: owner.permissionTypeId,
            groupIds: owner.ownerType === "group" ? [owner.ownerId] : [],
            usernames: owner.ownerType === "user" ? [owner.ownerId] : [],
            sharedBy: this.currentUsername
          });
        } else if (!owner.saved && owner.permissionTypeId) {
          custosStore.dispatch("sharing/shareEntity", {
            clientId: this.clientId,
            entityId: this.resourceId,
            permissionTypeId: owner.permissionTypeId,
            groupIds: owner.ownerType === "group" ? [owner.ownerId] : [],
            usernames: owner.ownerType === "user" ? [owner.ownerId] : [],
            sharedBy: this.currentUsername
          });
        }
      }

      this.processing = false;
    },
    reset() {
      this.refreshData();
    }
  },
  mounted() {
    this.reset();
  }
}
</script>

<style scoped>

</style>
