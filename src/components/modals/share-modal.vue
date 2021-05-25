<template>
  <b-modal :id="modalId" size="md" title="Share" v-on:show="reset">
    <EntitySelectInput v-on:change="onEntitySelect"/>
    <ul>
      <li v-for="user in users" :key="user.username">
        <div>
          <b-icon icon="person"></b-icon>
          {{ user.firstName }} {{ user.lastName }}
        </div>
        <b-dropdown :id="`${modalId}-user-${user.username}`" v-model="userToPermissionMap[user.username]" offset="30"
                    :text="userToPermissionMap[user.username]" variant="link" size="sm">
          <b-dropdown-item v-for="permissionType in permissionTypes" :key="permissionType"
                           v-on:click="onEntitySelect(user, permissionType)" href="#">
            {{ permissionType }}
          </b-dropdown-item>
        </b-dropdown>
        <b-button variant="link" size="sm" v-on:click="onEntitySelect(user, false)">
          <b-icon icon="x"></b-icon>
        </b-button>
      </li>
    </ul>
    <ul>
      <li v-for="group in groups" :key="group.groupId">
        <div>
          <b-icon icon="people"></b-icon>
          {{ group.name }}
        </div>
        <b-dropdown :id="`${modalId}-group-${group.groupId}`" v-model="groupToPermissionMap[group.groupId]" offset="30"
                    :text="groupToPermissionMap[group.groupId]" variant="link" size="sm">
          <b-dropdown-item v-for="permissionType in permissionTypes" :key="permissionType"
                           v-on:click="onEntitySelect(group, permissionType)" href="#">
            {{ permissionType }}
          </b-dropdown-item>
        </b-dropdown>
        <b-button variant="link" size="sm" v-on:click="onEntitySelect(group, false)">
          <b-icon icon="x"></b-icon>
        </b-button>
      </li>
    </ul>
    <template #modal-footer={close}>
      <div class="text-right">
        <b-button variant="primary" size="sm" v-on:click="close">Save</b-button>
        <b-button class="ml-2" variant="secondary" size="sm" v-on:click="close">Cancel</b-button>
      </div>
    </template>
  </b-modal>
</template>

<script>
import store from "../../store";
import EntitySelectInput from "@/components/EntitySelectInput";

export default {
  name: "share-modal",
  components: {EntitySelectInput},
  props: {
    modalId: {
      default: "share-modal"
    },
    fileIds: {
      default() {
        return []
      }
    },
    folderIds: {
      default() {
        return []
      }
    },
    permissionTypes: {
      type: Array,
      default() {
        return ["Viewer", "Editor", "Owner"]
      }
    },
    defaultPermissionType: {
      default: "Viewer"
    }
  },
  store: store,
  data() {
    return {
      userToPermissionMap: {},
      groupToPermissionMap: {}
    }
  },
  computed: {
    users() {
      const _users = [];
      for (let username in this.userToPermissionMap) {
        if (this.userToPermissionMap[username]) {
          _users.push(this.$store.getters["user/getUser"]({username}));
        }
      }

      return _users;
    },
    groups() {
      const _groups = [];
      for (let groupId in this.groupToPermissionMap) {
        if (this.groupToPermissionMap[groupId]) {
          _groups.push(this.$store.getters["group/getGroup"]({groupId}));
        }
      }

      return _groups;
    }
  },
  methods: {
    reset() {
      this.userToPermissionMap = {};
      this.groupToPermissionMap = {};
    },
    onEntitySelect({username, groupId}, permissionType = this.defaultPermissionType) {
      if (username) {
        this.userToPermissionMap = {
          ...this.userToPermissionMap,
          [username]: permissionType
        };
      } else if (groupId) {
        this.groupToPermissionMap = {
          ...this.groupToPermissionMap,
          [groupId]: permissionType
        };
      }
    }
  }
}
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0px;
  padding: 0px;
}

ul li {
  margin: 5px;
  padding: 5px 20px;
  display: flex;
  flex-direction: row;
  line-height: 31px;
  border-radius: 3px;
}

ul li:hover {
  background-color: #f0f1f2;
}

ul li div:first-child {
  flex: 1;
}

ul li div:nth-child(2) {
  width: 100px;
}
</style>