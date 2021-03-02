<template>
  <vue-typeahead-bootstrap
      v-model="usernameSearch"
      :data="users"
      :serializer="user => user.username"
      @hit="selectSearchResult"
  />
</template>

<script>

import {mapGetters, mapActions} from "vuex";
import store from "../store";

export default {
  name: "UserSearchAndSelect",
  store: store,
  data() {
    return {
      usernameSearch: ""
    }
  },
  computed: {
    ...mapGetters({
      getGroup: "group/getGroup",
      getUsers: "user/getUsers",
    }),
    users() {
      const _users = this.getUsers({
        limit: 5,
        offset: 0,
        username: this.usernameSearch
      });

      if (_users) {
        return _users
      } else {
        return []
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
      }
    }
  },
  methods: {
    ...mapActions({
      fetchGroup: "group/fetchGroup",
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

<style scoped>
.autocomplete-input {
  position: relative;
}

.autocomplete-input .autocomplete-results-list {
  position: absolute;
  width: inherit;
}

.autocomplete-input .autocomplete-results-list .autocomplete-results-list-item,
.autocomplete-input .autocomplete-results-list .autocomplete-results-list-item.info,
.autocomplete-input .autocomplete-results-list .autocomplete-results-list-item.info:hover {
  background-color: #ffffff;
  color: #707070;
  cursor: pointer;
  border-left: 5px solid #ffffff;
}

.autocomplete-input .autocomplete-results-list .autocomplete-results-list-item:hover,
.autocomplete-input .autocomplete-results-list .autocomplete-results-list-item.active {
  background-color: #3d8fff14;
  border-left-color: #037bfe;
}

.autocomplete-input .autocomplete-results-list.hide {
  display: none;
}

</style>