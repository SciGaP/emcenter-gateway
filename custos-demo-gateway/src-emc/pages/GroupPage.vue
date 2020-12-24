<template>
  <div>
    <h1>Group</h1>
    <div v-if="group">{{ group.groupId }} - {{ group.name }} - {{ group.description }}</div>

    <h2>Users</h2>
    <ul v-if="users">
      <li v-for="user in users" :key="user.userId">{{ user.username }}</li>
    </ul>
  </div>
</template>

<script>

import {mapGetters, mapActions} from "vuex";
import store from "../store";

export default {
  name: "SettingsPage",
  store: store,
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