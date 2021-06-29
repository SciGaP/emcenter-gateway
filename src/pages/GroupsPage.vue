<template>
  <Page title="Groups" :breadcrumb-links="[]">

    <div class="text-right w-100">
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

    <!--    <b-table-->
    <!--        id="table-transition-example"-->
    <!--        :busy.sync="!groups"-->
    <!--        class="w-100"-->
    <!--        :items="groups"-->
    <!--        :fields="['name', 'ownerId', '']"-->
    <!--        small-->
    <!--        primary-key="groupId"-->
    <!--    ></b-table>-->

    <b-overlay :show="!groups" rounded="sm" class="w-100">
      <div class="mt-2">

        <b-table-simple class="w-100">
          <b-thead class="bg-light">
            <b-tr>
              <b-th>Group Name</b-th>
              <b-th>Owner</b-th>
              <b-th>Members</b-th>
              <b-th></b-th>
            </b-tr>
          </b-thead>
          <b-tbody>
            <b-tr v-for="group in groups" :key="group.groupId">
              <b-td>
                {{ group.name }}
              </b-td>
              <b-td>
                {{ group.ownerId }}
              </b-td>
              <b-td>5</b-td>
              <b-td>
                <router-link :to="`/groups/${group.groupId}`" v-slot="{ href, route, navigate}">
                  <a :href="href" @click="navigate">
                    Edit
                  </a>
                </router-link>
                <a href="#" v-on:click.prevent="deleteGroup(group)">
                  Delete
                </a>
              </b-td>
            </b-tr>
          </b-tbody>
        </b-table-simple>
      </div>
      <div style="padding: 10px;" class="bg-light text-right">
        <Pagination/>
      </div>
    </b-overlay>

  </Page>
</template>

<script>
import {custosStore} from "../store";
import Page from "../components/Page";
import Pagination from "../components/Pagination";

export default {
  name: "GroupsPage",
  components: {Pagination, Page},
  store: custosStore,
  data() {
    return {
      newGroup: {name: null, description: null},
      filterExpanded: false
    }
  },
  computed: {
    groups() {
      return this.$store.getters["group/getGroups"]();
    }
  },
  methods: {
    getGroupLink({groupId}) {
      return `/groups/${groupId}`;
    },
    openCreateNewGroupModal() {
      this.newGroup = {name: null, description: null};
      this.$bvModal.show("create-new-group-modal");
    },
    async deleteGroup({groupId}) {
      await this.$store.dispatch("group/fetchGroups", {groupId});
    },
    async createNewGroup() {
      await this.$store.dispatch("group/createGroup", {
        name: this.newGroup.name,
        description: this.newGroup.description,
        ownerId: this.$store.getters["auth/currentUsername"],
        realm_roles: [],
        client_roles: [],
        attributes: [],
        sub_groups: []
      })
      await this.$store.dispatch("group/fetchGroups");
      this.$bvModal.hide("create-new-group-modal");
    }
  },
  async beforeMount() {
    await this.$store.dispatch("group/fetchGroups");
  }
}
</script>

<style>
</style>