<template>
  <Page title="Groups" :breadcrumb-links="[]">

    <div class="text-right">
      <button class="rvt-button rvt-button--plain" size="sm" v-on:click="openCreateNewGroupModal">Create New PI Group</button>

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
      <table class="w-100">
        <thead>
        <tr>
          <th>Group Name</th>
          <th></th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="group in groups" :key="group.groupId">
          <td>
            {{ group.name }}
          </td>
          <td>
            <router-link :to="`/data/groups/${group.groupId}`" v-slot="{ href, route, navigate}">
              <a :href="href" @click="navigate">
                Datasets
              </a>
            </router-link>
          </td>
          <td>
            <router-link :to="`/groups/${group.groupId}`" v-slot="{ href, route, navigate}">
              <a :href="href" @click="navigate">
                Settings
              </a>
            </router-link>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div style="padding: 10px;text-align: right;">
      <Pagination/>
    </div>

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

<style>


/*table thead tr th {*/
/*  background-color: #a9050f;*/
/*  color: #ffffff;*/
/*  font-size: 16px;*/
/*  font-weight: normal;*/
/*  padding: 9px;*/
/*}*/

/*table thead tr th:first-child {*/
/*  border-bottom-left-radius: 4px;*/
/*  border-top-left-radius: 4px;*/
/*}*/

/*table thead tr th:last-child {*/
/*  border-bottom-right-radius: 4px;*/
/*  border-top-right-radius: 4px;*/
/*}*/

/*table tbody tr td {*/
/*  color: #373a3c;*/
/*  font-size: 14px;*/
/*  padding: 9px;*/
/*  border-bottom: solid 1px #dddddd;*/
/*}*/

/*table tbody tr:last-child td {*/
/*  border-bottom: none;*/
/*}*/

/*table tbody tr td a {*/
/*  color: #a9050f;*/
/*}*/

.pagination {
  display: block;
}

.pagination button {
  border: solid 1px #dddddd;
  background-color: #ffffff;
  color: #a9050f;
  font-size: 14px;
  padding: 3px 15px;
  border-radius: 0px;
}

.pagination button:first-child {
  border-bottom-left-radius: 4px;
  border-top-left-radius: 4px;
}

.pagination button:last-child {
  border-bottom-right-radius: 4px;
  border-top-right-radius: 4px;
}
</style>