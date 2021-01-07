<template>
  <div>
    <h1>PI Groups</h1>
    <div class="mt-2">
      <b-button size="sm" v-on:click="openCreateNewGroupModal">Create New PI Group</b-button>

      <b-modal id="create-new-group-modal" title="Create New PI Group">
        <div class="p-2">
          <b-form-input size="sm" v-model="newGroup.name" placeholder="Name"></b-form-input>
        </div>
        <div class="p-2">
          <b-form-input size="sm" v-model="newGroup.description" placeholder="Description"></b-form-input>
        </div>
        <template slot="modal-footer">
          <b-button size="sm" variant="primary" v-on:click="createNewGroup">Create</b-button>
        </template>
      </b-modal>
    </div>
    <div class="mt-2">
      <ul style="list-style: none; padding: 0px;margin: 0px;">
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
  </div>
</template>

<script>

import {mapGetters, mapActions} from "vuex";
import store from "../store";
import Groups from "@/components/workspace/Groups";

export default {
  name: "SettingsPage",
  store: store,
  data() {
    return {
      newGroup: {name: null, description: null}
    }
  },
  computed: {
    ...mapGetters({
      currentUsername: "auth/currentUsername",
      getGroups: "group/getGroups",
    }),
    groups() {
      return this.getGroups()
    }
  },
  methods: {
    ...mapActions({
      fetchGroups: "group/fetchGroups",
      createGroup: "group/createGroup"
    }),
    getGroupLink({groupId}) {
      return `/groups/${groupId}`;
    },
    openCreateNewGroupModal() {
      this.newGroup = {name: null, description: null};
      this.$bvModal.show("create-new-group-modal");
    },
    async createNewGroup() {
      await this.createGroup({
        name: this.newGroup.name,
        description: this.newGroup.description,
        ownerId: this.currentUsername,
        realm_roles: [],
        client_roles: [],
        attributes: [],
        sub_groups: []
      })
      await this.fetchGroups();
      this.$bvModal.hide("create-new-group-modal");
    }
  },
  beforeMount() {
    this.fetchGroups();
  }
}
</script>

<style scoped>

</style>