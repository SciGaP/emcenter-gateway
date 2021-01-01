<template>
  <div>
    <h1>PI Groups</h1>
    <ul>
      <li v-for="group in groups" :key="group.groupId">
        <router-link
            :to="getGroupLink({groupId: group.groupId})"
            v-slot="{ href, route, navigate}"
        >
          <a :href="href" @click="navigate">
            {{ group.name }}
          </a>
        </router-link>
      </li>
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
      getGroups: "group/getGroups",
    }),
    groups() {
      return this.getGroups()
    }
  },
  methods: {
    ...mapActions({
      fetchGroups: "group/fetchGroups",
    }),
    getGroupLink({groupId}) {
      return `groups/${groupId}`;
    }
  },
  beforeMount() {
    this.fetchGroups()
  }
}
</script>

<style scoped>

</style>