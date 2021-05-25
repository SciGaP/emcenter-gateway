<template>
  <b-modal :id="modalId" size="md" title="Share" v-on:show="reset">
    <EntitySelectInput v-on:change="onEntitySelect"/>
    <ul>
      <li v-for="user in users" :key="user.username">
        <div>
          <b-icon icon="person"></b-icon>
          {{ user.firstName }} {{ user.lastName }}
        </div>
        <b-dropdown :id="`${modalId}-user-${user.username}`" offset="30" text="Viewer" variant="link" size="sm">
          <b-dropdown-item href="#">Viewer</b-dropdown-item>
          <b-dropdown-item href="#">Editor</b-dropdown-item>
          <b-dropdown-item href="#">Owner</b-dropdown-item>
        </b-dropdown>
        <b-button variant="link" size="sm">
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
        <b-dropdown :id="`${modalId}-group-${group.groupId}`" offset="30" text="Viewer" variant="link" size="sm">
          <b-dropdown-item href="#">Viewer</b-dropdown-item>
          <b-dropdown-item href="#">Editor</b-dropdown-item>
          <b-dropdown-item href="#">Owner</b-dropdown-item>
        </b-dropdown>
      </li>
    </ul>
    <template #modal-footer>
      <div class="text-right">
        <b-button variant="primary" size="sm">Save</b-button>
        <b-button class="ml-2" variant="secondary" size="sm">Cancel</b-button>
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
    }
  },
  store: store,
  data() {
    return {
      usernames: [],
      groupIds: []
    }
  },
  computed: {
    users() {
      return this.usernames.map(username => this.$store.getters["user/getUser"]({username}));
    },
    groups() {
      return this.groupIds.map(groupId => this.$store.getters["group/getGroup"]({groupId}));
    }
  },
  methods: {
    reset() {
      this.usernames = [];
      this.groupIds = [];
    },
    onEntitySelect({username, groupId}) {
      if (username && this.usernames.indexOf(username) < 0) {
        this.usernames.push(username)
      } else if (groupId && this.groupIds.indexOf(groupId) < 0) {
        this.groupIds.push(groupId)
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