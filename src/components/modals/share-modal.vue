<template>
  <b-modal :id="modalId" :title="title" v-on:show="reset" size="md">
    <Errors :errors="errors"/>
    <input-select-users-or-groups :client-id="clientId" v-on:change="onSelect"/>
    <b-overlay :show="processing">
      <b-skeleton-table v-if="processing" :rows="4" :columns="3"/>
      <ul v-else style="list-style: none;">
        <li v-for="(owner, ownerIndex) in notDroppedOwners" :key="ownerIndex">
          <div style="display: flex; flex-direction: row;line-height: 38px;">
            <div style="flex: 1;">
              <small v-if="owner.ownerType=== 'group'">GROUP&nbsp;</small>
              {{ getOwnerName(owner) }}
            </div>
            <div>
              <b-dropdown variant="outline-secondary" size="sm" :id="`dropdown-permission-type-${ownerIndex}`"
                          offset="25"
                          :text=" getPermissionTypeName(owner) " style="min-width: 100px;"
                          :disabled="disablePermissions(owner)">
                <b-dropdown-item v-for="permissionType in permissionTypes" :key="permissionType.id" href="#"
                                 v-on:click="owner.saved = false; owner.permissionTypeId = permissionType.id"
                                 :disabled="permissionType.id === 'OWNER'">
                  {{ permissionType.name }}
                </b-dropdown-item>
              </b-dropdown>
            </div>
            <div>
              <button-overlay :show="processingDrop[owner.ownerId]">
                <b-button variant="link" v-on:click="onDropShare(owner)" :disabled="disablePermissions(owner)">
                  <b-icon icon="x"></b-icon>
                </b-button>
              </button-overlay>
            </div>
          </div>
        </li>
      </ul>
    </b-overlay>
    <template #modal-footer="{close}">
      <b-button variant="primary" size="sm" v-on:click="onClickSave">Save</b-button>
      <b-button variant="secondary" size="sm" @click="close">Cancel</b-button>
    </template>
  </b-modal>
</template>

<script>
import store from "airavata-custos-portal/src/lib/store";
import InputSelectUsersOrGroups
  from "airavata-custos-portal/src/lib/components/input-fields/input-select-users-or-groups";
import ButtonOverlay from "airavata-custos-portal/src/lib/components/overlay/button-overlay";
import {custosService} from "airavata-custos-portal/src/lib/store/util/custos.util";
import Errors from "@/components/Errors";
import config from "../../config";

export default {
  name: "share-modal",
  components: {Errors, ButtonOverlay, InputSelectUsersOrGroups},
  store: store,
  props: {
    modalId: {},
    clientId: {
      default: custosService.clientId
    },
    entityId: {},
    title: {
      default: "Select Users or Groups"
    }
  },
  data() {
    return {
      restrictedOwners: [config.value("clientUsersGroupId"), config.value("clientAdminGroupId")],

      processing: false,
      processingDrop: {},
      errors: [],

      owners: []
    }
  },
  computed: {
    permissionTypes() {
      return this.$store.getters["sharing/getPermissionTypes"]({clientId: this.clientId});
    },
    savedOwners() {
      return this.$store.getters["sharing/getEntitySharedOwners"]({clientId: this.clientId, entityId: this.entityId});
    },
    notDroppedOwners() {
      return this.owners.filter(({dropped}) => !dropped);
    },
    currentUsername() {
      return this.$store.getters["auth/currentUsername"];
    }
  },
  methods: {
    getPermissionTypeName({permissionTypeId}) {
      const permissionType = this.getPermissionType({permissionTypeId});
      if (permissionType) {
        return permissionType.name;
      }
    },
    getPermissionType({permissionTypeId}) {
      return this.$store.getters["sharing/getPermissionType"]({clientId: this.clientId, id: permissionTypeId});
    },
    disablePermissions({ownerId, permissionTypeId}) {
      return permissionTypeId === 'OWNER' || this.restrictedOwners.indexOf(ownerId) >= 0
    },
    getOwnerName({ownerId, ownerType}) {
      if (ownerType === "group") {
        const group = this.$store.getters["group/getGroup"]({clientId: this.clientId, groupId: ownerId});
        if (group) {
          return group.name;
        }
      } else if (ownerType === "user") {
        const user = this.$store.getters["user/getUser"]({clientId: this.clientId, username: ownerId});
        if (user) {
          return `${user.firstName}, ${user.lastName}`;
        }
      }
    },
    getPermissionTypeLevel({id}) {
      if (id === "OWNER") {
        return 1;
      } else if (id === "EDITOR") {
        return 2;
      } else if (id === "VIEWER") {
        return 3;
      }
    },
    async refreshData() {
      this.processing = true;

      try {
        await this.$store.dispatch("sharing/fetchPermissionTypes", {clientId: this.clientId});
        await this.$store.dispatch("sharing/fetchSharedOwners", {clientId: this.clientId, entityId: this.entityId});

        const promises = []
        if (this.savedOwners) {
          this.owners = this.savedOwners.map(({ownerId, ownerType, permissions}) => {
            permissions = permissions.sort((a, b) => this.getPermissionTypeLevel(a) - this.getPermissionTypeLevel(b));
            const permission = permissions[0];

            let _promise;
            if (ownerType === "group") {
              _promise = this.$store.dispatch("group/fetchGroup", {clientId: this.clientId, groupId: ownerId});
            } else if (ownerType === "user") {
              _promise = this.$store.dispatch("user/fetchUsers", {clientId: this.clientId, username: ownerId});
            }

            promises.push(_promise);

            return {ownerId, ownerType, permissionTypeId: permission.id, dropped: false, saved: true};
          });
        }

        await Promise.all(promises);
      } catch (e) {
        this.errors.push({
          title: "Unknown Error",
          description: `Unknown error when fetching sharing details.`,
          source: e, variant: "danger"
        });
        throw e;
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
      for (let i = 0; i < this.owners.length; i++) {
        const owner = this.owners[i];
        if (owner.dropped) {
          this.$store.dispatch("sharing/dropEntitySharedOwner", {
            clientId: this.clientId,
            entityId: this.entityId,
            permissionTypeId: owner.permissionTypeId,
            groupIds: owner.ownerType === "group" ? [owner.ownerId] : [],
            usernames: owner.ownerType === "user" ? [owner.ownerId] : [],
            sharedBy: this.currentUsername
          });
        } else if (!owner.saved && owner.permissionTypeId) {
          this.$store.dispatch("sharing/shareEntity", {
            clientId: this.clientId,
            entityId: this.entityId,
            permissionTypeId: owner.permissionTypeId,
            groupIds: owner.ownerType === "group" ? [owner.ownerId] : [],
            usernames: owner.ownerType === "user" ? [owner.ownerId] : [],
            sharedBy: this.currentUsername
          });
        }
      }


      this.$emit("close");
      this.$bvModal.hide(this.modalId);
    },
    reset() {
      this.errors = [];
      this.selectedUsersMap = {};
      this.selectedGroupsMap = {};
      this.refreshData();
    }
  }
}
</script>

<style scoped>

</style>
