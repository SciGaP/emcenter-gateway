<template>
  <Page title="Datasets" :breadcrumb-links="[]">

    <!--    <h1>Principle Investigators</h1>-->
    <!--    <div class="mt-2">-->
    <!--      <b-button size="sm" v-on:click="openCreateNewGroupModal">Create New PI Group</b-button>-->

    <!--      <b-modal id="create-new-group-modal" title="Create New PI Group">-->
    <!--        <div class="p-2">-->
    <!--          <b-form-input size="sm" v-model="newGroup.name" placeholder="Name"></b-form-input>-->
    <!--        </div>-->
    <!--        <div class="p-2">-->
    <!--          <b-form-input size="sm" v-model="newGroup.description" placeholder="Description"></b-form-input>-->
    <!--        </div>-->
    <!--        <template slot="modal-footer">-->
    <!--          <b-button size="sm" variant="primary" v-on:click="createNewGroup">Create</b-button>-->
    <!--        </template>-->
    <!--      </b-modal>-->
    <!--    </div>-->
    <div class="w-100" style="text-align: right;padding-bottom: 15px;">
      <div style="display:inline-block;max-width: 200px;">
        <b-form-input size="sm" placeholder="Search"></b-form-input>
      </div>
    </div>
    <div class="w-100" style="border-radius: 4px; border: solid 1px #dddddd;padding: 10px;">
      <div class="w-100" style="font-size: 18px;cursor: pointer;" v-on:click="filterExpanded = !filterExpanded">
        <div style="display: inline-block; padding: 0px 15px;">
          <b-icon v-if="filterExpanded" icon="chevron-down" aria-hidden="true"></b-icon>
          <b-icon v-else icon="chevron-right" aria-hidden="true"></b-icon>
        </div>
        Filters
      </div>
      <div v-if="filterExpanded" style="padding-right: 25px; padding-left: 25px; font-size: 14px;">
        <b-row style="padding-top: 10px; padding-bottom: 10px;">
          <b-col>
            <label>Principle Investigator</label>
            <b-form-input size="sm"></b-form-input>
          </b-col>
          <b-col>
            <label>Microscope</label>
            <b-form-input size="sm"></b-form-input>
          </b-col>
          <b-col>
            <label>Date</label>
            <b-form-input size="sm" value="04/10/2020 - 14/10/2020"></b-form-input>
          </b-col>
        </b-row>
        <div style="text-align: right;">
          <b-button class="emc-primary-btn mr-2">Apply</b-button>
          <b-button class="emc-default-btn">Reset</b-button>
        </div>
      </div>
    </div>
    <div class="mt-2">
      <table class="w-100">
        <thead>
        <tr>
          <th>Microscope</th>
          <th>Principle Investigator</th>
          <th>Collection</th>
          <th>Date and Time</th>
          <th>Status</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="group in groups" :key="group.groupId">
          <td>--TBA--</td>
          <td>
            <router-link :to="getGroupLink({groupId: group.groupId})" v-slot="{ href, route, navigate}">
              <a :href="href" @click="navigate">
                {{ group.name }}
              </a>
            </router-link>
          </td>
          <td>--TBA--</td>
          <td>--TBA--</td>
          <td>--TBA--</td>
        </tr>
        </tbody>
      </table>
    </div>
    <div style="background-color: #f6f6f6; padding: 10px;text-align: right;">
      <div class="pagination">
        <b-button>«</b-button>
        <b-button>1</b-button>
        <b-button>2</b-button>
        <b-button>3</b-button>
        <b-button>»</b-button>
      </div>
    </div>

  </Page>
</template>

<script>

import {mapGetters, mapActions} from "vuex";
import store from "../store";
import Page from "../components/Page";

export default {
  name: "SettingsPage",
  components: {Page},
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

<style scoped>
table thead tr th {
  background-color: #a9050f;
  color: #ffffff;
  font-size: 16px;
  font-weight: normal;
  padding: 9px;
}

table thead tr th:first-child {
  border-bottom-left-radius: 4px;
  border-top-left-radius: 4px;
}

table thead tr th:last-child {
  border-bottom-right-radius: 4px;
  border-top-right-radius: 4px;
}

table tbody tr td {
  color: #373a3c;
  font-size: 14px;
  padding: 9px;
  border-bottom: solid 1px #dddddd;
}

table tbody tr:last-child td {
  border-bottom: none;
}

table tbody tr td a {
  color: #a9050f;
}

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