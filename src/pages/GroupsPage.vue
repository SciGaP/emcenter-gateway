<template>
  <Page title="Groups" :breadcrumb-links="[]">

    <div class="text-right">
      <button class="rvt-button rvt-button--plain" size="sm" v-on:click="openCreateNewGroupModal">Create New PI Group
      </button>

      <button type="button" class="rvt-button" data-modal-trigger="modal-example-basic">Open modal example</button>

<div class="rvt-modal"
     id="modal-example-basic"
     role="dialog"
     aria-labelledby="modal-example-title"
     aria-hidden="true"
     tabindex=-1>
     <div class="rvt-modal__inner">
        <header class="rvt-modal__header">
            <h1 class="rvt-modal__title" id="modal-example-title">Modal title</h1>
        </header>
        <div class="rvt-modal__body">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor <a href="#">incididunt ut labore</a> et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>
        <div class="rvt-modal__controls">
            <button type="button" class="rvt-button">OK</button>
            <button type="button" class="rvt-button rvt-button--secondary" data-modal-close="modal-example-basic">Cancel</button>
        </div>
        <button type="button" class="rvt-button rvt-modal__close" data-modal-close="modal-example-basic">
            <span class="rvt-sr-only">Close</span>
            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                <path fill="currentColor" d="M9.41,8l5.29-5.29a1,1,0,0,0-1.41-1.41L8,6.59,2.71,1.29A1,1,0,0,0,1.29,2.71L6.59,8,1.29,13.29a1,1,0,1,0,1.41,1.41L8,9.41l5.29,5.29a1,1,0,0,0,1.41-1.41Z"/>
            </svg>
        </button>
    </div>
</div>

<!--      <div class="rvt-modal"-->
<!--           id="modal-example-basic"-->
<!--           role="dialog"-->
<!--           aria-labelledby="modal-example-title"-->
<!--           aria-hidden="true"-->
<!--           tabindex=-1>-->
<!--        <div class="rvt-modal__inner">-->
<!--          <header class="rvt-modal__header">-->
<!--            <h1 class="rvt-modal__title" id="modal-example-title">Modal title</h1>-->
<!--          </header>-->
<!--          <div class="rvt-modal__body">-->
<!--            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor <a href="#">incididunt ut-->
<!--              labore</a> et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi-->
<!--              ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum-->
<!--              dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia-->
<!--              deserunt mollit anim id est laborum.</p>-->
<!--          </div>-->
<!--          <div class="rvt-modal__controls">-->
<!--            <button type="button" class="rvt-button">OK</button>-->
<!--            <button type="button" class="rvt-button rvt-button&#45;&#45;secondary" data-modal-close="modal-example-basic">-->
<!--              Cancel-->
<!--            </button>-->
<!--          </div>-->
<!--          <button type="button" class="rvt-button rvt-modal__close" data-modal-close="modal-example-basic">-->
<!--            <span class="rvt-sr-only">Close</span>-->
<!--            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">-->
<!--              <path fill="currentColor"-->
<!--                    d="M9.41,8l5.29-5.29a1,1,0,0,0-1.41-1.41L8,6.59,2.71,1.29A1,1,0,0,0,1.29,2.71L6.59,8,1.29,13.29a1,1,0,1,0,1.41,1.41L8,9.41l5.29,5.29a1,1,0,0,0,1.41-1.41Z"/>-->
<!--            </svg>-->
<!--          </button>-->
<!--        </div>-->
<!--      </div>-->

      <b-modal id="create-new-group-modal" class="rvt-modal">
        <template slot="modal-header">
          <header class="rvt-modal__header">
            <h1 class="rvt-modal__title">Create New PI Group</h1>
          </header>
        </template>
        <template slot="default">
          <div class="rvt-modal__body">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor <a href="#">incididunt ut
              labore</a> et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
              ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
              dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
              deserunt mollit anim id est laborum.</p>

            <div class="p-2">
              <b-form-input size="sm" v-model="newGroup.name" placeholder="Name"></b-form-input>
            </div>
            <div class="p-2">
              <b-form-input size="sm" v-model="newGroup.description" placeholder="Description"></b-form-input>
            </div>
          </div>
        </template>
        <template slot="modal-footer">
          <div class="rvt-modal__controls">
            <button type="button" class="rvt-button" v-on:click="createNewGroup">Create</button>
            <button type="button" class="rvt-button rvt-button--secondary" data-modal-close="modal-example-basic">
              Cancel
            </button>
          </div>
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