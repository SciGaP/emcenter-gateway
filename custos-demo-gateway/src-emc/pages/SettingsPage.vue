<template>
  <div>
    <h1>Groups</h1>
    <ul>
      <li v-for="group in groups" :key="group.groupId">
        <a v-on:click.prevent="onGroupSelect({groupId:group.groupId})">
          {{ group.groupId }} - {{ group.name }} - {{ group.description }}
        </a>
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
    onGroupSelect({groupId}) {
      this.$router.push(`groups/${groupId}`);
    }
  },
  beforeMount() {
    this.fetchGroups()
  }
}
</script>

<style scoped>

</style>