<template>
  <Page title="Groups" :breadcrumb-links="[]">

    <div class="text-right">
      <b-button variant="primary" size="sm" v-on:click="openCreateNewGroupModal">Create New PI Group
      </b-button>

      <b-modal id="create-new-group-modal" title="Create New PI Group">
        <template slot="default">
          <div class="p-2">
            <b-form-input size="sm" v-model="newGroup.name" placeholder="Name"></b-form-input>
          </div>
          <div class="p-2">
            <b-form-input size="sm" v-model="newGroup.description" placeholder="Description"></b-form-input>
          </div>
        </template>
        <template slot="modal-footer">
          <b-button size="sm" variant="primary" v-on:click="createNewGroup">Create</b-button>
          <b-button size="sm" data-modal-close="create-new-group-modal">
            Cancel
          </b-button>
        </template>
      </b-modal>
    </div>

    <b-overlay :show="!groups" rounded="sm">
      <div class="mt-2">
        <table class="w-100">
          <thead>
          <tr>
            <th>Group Name</th>
            <th>Owner</th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="group in groups" :key="group.groupId">
            <td>
              {{ group.name }}
            </td>
            <td>
              {{ group.ownerId }}
            </td>
            <td>
              <router-link :to="`/groups/${group.groupId}`" v-slot="{ href, route, navigate}">
                <a :href="href" @click="navigate">
                  Edit
                </a>
              </router-link>
              <a href="#" v-on:click.prevent="deleteGroup({groupId:group.groupId})">
                Delete
              </a>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <div style="padding: 10px;text-align: right;">
        <Pagination/>
      </div>
    </b-overlay>

  </Page>
</template>

<script>

import {mapGetters, mapActions} from "vuex";
import store from "../store";
import Page from "../components/Page";
import Pagination from "../components/Pagination";

export default {
  name: "GroupsPage",
  components: {Pagination, Page},
  store: store,
  data() {
    return {
      newGroup: {name: null, description: null},
      filterExpanded: false
    }
  },
  computed: {
    ...mapGetters({
      currentUsername: "auth/currentUsername",
      getGroups: "group/getGroups"
    }),
    groups() {
      return this.getGroups()
    }
  },
  methods: {
    ...mapActions({
      fetchGroups: "group/fetchGroups",
      createGroup: "group/createGroup",
      deleteGroup: "group/deleteGroup"
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

<style>
</style>