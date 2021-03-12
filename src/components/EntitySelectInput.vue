<template>
  <div>
    <label style="font-size: 13px;font-weight: 600;margin: 0px;">Add new users</label>
    <vue-typeahead-bootstrap
        v-model="usernameSearch"
        :data="typeheadData"
        :serializer="item => item.username ? item.username : item.name"
        @hit="selectSearchResult"
    >
      <template slot="suggestion" slot-scope="{ data, htmlText }">
        <small v-if="!data.username" style="font-size: 10px">GROUP</small> <br/>
        <span v-html="htmlText"></span>
      </template>
    </vue-typeahead-bootstrap>
  </div>
</template>

<script>

import {mapGetters, mapActions} from "vuex";
import store from "../store";

export default {
  name: "EntitySelectInput.vue",
  store: store,
  data() {
    return {
      usernameSearch: ""
    }
  },
  computed: {
    ...mapGetters({
      getGroup: "group/getGroup",
      getGroups: "group/getGroups",
      getUsers: "user/getUsers",
    }),
    typeheadData() {
      // return this.users;
      return this.users.concat(this.groups);
    },
    typeheadDataSerializer() {
      return (obj) => {
        console.log("typeheadDataSerializer", obj)
        if (obj.username) {
          return obj.username;
        } else {
          // return obj.name;
          return `<small>GROUP </small> ${obj.name}`;
        }
      };
    },
    users() {
      const _users = this.getUsers({
        limit: 5,
        offset: 0,
        username: this.usernameSearch
      });

      if (_users) {
        return _users;
      } else {
        return [];
      }
    },
    groups() {
      const _groups = this.getGroups({
        limit: 5,
        offset: 0,
        groupId: this.groupId
      });

      if (_groups) {
        return _groups;
      } else {
        return [];
      }
    }
  },
  watch: {
    usernameSearch() {
      if (this.usernameSearch.length > 0) {
        this.fetchUsers({
          limit: 5,
          offset: 0,
          username: this.usernameSearch
        });
        this.fetchGroups({
          limit: 5,
          offset: 0,
          groupId: this.groupId
        });
      }
    }
  },
  methods: {
    ...mapActions({
      fetchGroup: "group/fetchGroup",
      fetchGroups: "group/fetchGroups",
      fetchUsers: "user/fetchUsers",
    }),
    selectSearchResult(user) {
      this.usernameSearch = user.username;
      this.$emit("change", user);
      this.usernameSearch = ""
    }
  }
}
</script>

<!--<style scoped>-->
<!--.autocomplete-input {-->
<!--  position: relative;-->
<!--}-->

<!--.autocomplete-input .autocomplete-results-list {-->
<!--  position: absolute;-->
<!--  width: inherit;-->
<!--}-->

<!--.autocomplete-input .autocomplete-results-list .autocomplete-results-list-item,-->
<!--.autocomplete-input .autocomplete-results-list .autocomplete-results-list-item.info,-->
<!--.autocomplete-input .autocomplete-results-list .autocomplete-results-list-item.info:hover {-->
<!--  background-color: #ffffff;-->
<!--  color: #707070;-->
<!--  cursor: pointer;-->
<!--  border-left: 5px solid #ffffff;-->
<!--}-->

<!--.autocomplete-input .autocomplete-results-list .autocomplete-results-list-item:hover,-->
<!--.autocomplete-input .autocomplete-results-list .autocomplete-results-list-item.active {-->
<!--  background-color: #3d8fff14;-->
<!--  border-left-color: #037bfe;-->
<!--}-->

<!--.autocomplete-input .autocomplete-results-list.hide {-->
<!--  display: none;-->
<!--}-->

<!--</style>-->