<template>
  <div class="w-100 autocomplete-input">
    <b-form-input size="sm" v-model="usernameSearch"
                  @keydown.down="selectedIndex = selectedIndex < users.length - 1 ? selectedIndex + 1 : selectedIndex;"
                  @keydown.up="selectedIndex = selectedIndex > - 1 ? selectedIndex - 1 : selectedIndex;"
                  @keydown.enter="selectSearchResult(users[selectedIndex])"
                  @focusin="visible=true"
                  @focusout="visible=false; selectedIndex = 0;"
    ></b-form-input>
    <div class="autocomplete-results-list"
         :class="{ hide: !mouseoverAutocomplete && !visible}" v-if="usernameSearch && usernameSearch.length > 0">
      <div class="autocomplete-results-list-item info" v-if="!users">Searching...</div>
      <div class="autocomplete-results-list-item info" v-else-if="users.length === 0">Not found</div>
      <div class="autocomplete-results-list-item" v-else v-for="(user, index) in users" :key="user.userId"
           :class="{active:selectedIndex == index}"
           @click="selectSearchResult(users[selectedIndex]);"
           @mouseover="selectedIndex = index; mouseoverAutocomplete=true;"
           @mouseleave="mouseoverAutocomplete=false;"
      >
        <div class="w-100" style="display: flex;line-height: 40px;">
          <b-icon icon="person-circle" style="width: 20px; height: 20px;margin: 10px;"></b-icon>
          <div class="pl-3" style="flex: 1">{{ user.username }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import {mapGetters, mapActions} from "vuex";
import store from "../store";

export default {
  name: "UserSearchAndSelect",
  store: store,
  data() {
    return {
      mouseoverAutocomplete: false,
      selectedIndex: 0,
      visible: false,
      usernameSearch: ""
    }
  },
  computed: {
    ...mapGetters({
      getGroup: "group/getGroup",
      getUsers: "user/getUsers",
    }),
    users() {
      return this.getUsers({
        limit: 5,
        offset: 0,
        username: this.usernameSearch
      });
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
      this.mouseoverAutocomplete = false;
      this.visible = false;
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