<template>
  <div>
    <strong>Group Members</strong>
<!--    <ul v-if="users" style="list-style: none; padding: 0px;">-->
<!--      <li v-for="user in users" :key="user.userId">-->
<!--        <b-form-checkbox-->
<!--            :id="`checkbox-group-user-${user.username}`"-->
<!--            :name="`checkbox-group-user-${user.username}`"-->
<!--            :checked="true"-->
<!--        >-->
<!--          {{ user.username }}-->
<!--        </b-form-checkbox>-->
<!--      </li>-->
<!--    </ul>-->
    <div class="mt-2">
      <table class="w-100">
        <thead>
        <tr>
          <th>Username</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="user in users" :key="user.username">
          <td>
            {{user.username}}
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="w-100 mt-3">
      <UserSearchAndSelect v-on:change="onUserSelect"/>
    </div>
  </div>
</template>

<script>

import {mapGetters, mapActions} from "vuex";
import store from "../store";
import UserSearchAndSelect from "./UserSearchAndSelect";

export default {
  name: "GroupMembership",
  components: {UserSearchAndSelect},
  store: store,
  props: {
    groupId: {
      type: String
    }
  },
  data() {
    return {
      memberTypes: ['ADMIN', 'MEMBER']
    }
  },
  computed: {
    ...mapGetters({
      getGroup: "group/getGroup",
      getUsers: "user/getUsers",
    }),
    group() {
      return this.getGroup({groupId: this.groupId});
    },
    users() {
      return this.getUsers({groupId: this.groupId});
    },
    groupLink() {
      return `/groups/${this.groupId}`;
    }
  },
  methods: {
    ...mapActions({
      fetchGroup: "group/fetchGroup",
      fetchUsers: "user/fetchUsers",
      addUserToGroup: "group/addUserToGroup",
    }),
    switchDisplayMode(displayMode) {
      this.displayMode = displayMode;
    },
    refreshUsers() {
      this.fetchUsers({groupId: this.groupId});
    },
    async onUserSelect({username}) {
      await this.addUserToGroup({groupId: this.groupId, username, membershipType: "MEMBER"});
      await this.refreshUsers();
    }
  },
  beforeMount() {
    this.fetchGroup({groupId: this.groupId});
    this.refreshUsers();
  }
}
</script>

<style scoped>

</style>