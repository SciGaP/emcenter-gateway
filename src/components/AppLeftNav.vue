<template>
  <div class="p-2 left-menu" v-if="authenticated">
    <div class="left-menu-navigation">
      <ul>
        <li class="pb-3" style="border-bottom: 1px solid #eee;">
          <router-link to="/data" v-slot="{ href, route, navigate, isActive, isExactActive}">
            <a :class="{active: isExactActive}" :href="href" @click="navigate">
              <b-icon icon="person-fill"></b-icon>
              My Folders / Files
            </a>
          </router-link>
        </li>
        <li v-for="group in groups" :key="group.groupId">
          <router-link :to="`/data?groupId=${group.groupId}`"
                       v-slot="{ href, route, navigate, isActive, isExactActive}">
            <a :class="{active: isExactActive}" :href="href" @click="navigate">
              <b-icon icon="people-fill"></b-icon>
              {{ group.name }}
            </a>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import store from "../store";
import {mapGetters, mapActions} from "vuex";
import exampleProfilePicture from "../assets/120493210_1443413932520618_6347067080170311282_n.jpg";

export default {
  name: 'AppLeftNav',
  store: store,
  data: () => {
    return {exampleProfilePicture: exampleProfilePicture}
  },
  computed: {
    ...mapGetters({
      authenticated: "auth/authenticated",
      currentUsername: "auth/currentUsername",
      isAdmin: "auth/isAdmin",
      getUser: "user/getUser",
      getGroups: "group/getGroups",
    }),
    user() {
      return this.getUser({username: this.currentUsername});
    },
    groups() {
      return this.getGroups()
    }
  },
  methods: {
    ...mapActions({
      fetchGroups: "group/fetchGroups",
      fetchUsers: "user/fetchUsers",
      logoutAction: "auth/logout",
      refreshAuthentication: "auth/refreshAuthentication"
    }),
    async logout() {
      await this.logoutAction();
    },
    async fetchAuthenticatedUser() {
      if (this.authenticated && (!this.user || this.user.username !== this.currentUsername)) {
        await this.fetchUsers({
          offset: 0,
          limit: 1,
          username: this.currentUsername
        });
      }
    },
    redirectToLoginIfNotAuthenticated() {
      if (!this.authenticated && this.$router.currentRoute.path !== "/") {
        this.$router.push('/')
      }
    }
  },
  watch: {
    authenticated() {
      this.redirectToLoginIfNotAuthenticated();
    },
    currentUsername() {
      if (this.currentUsername) {
        this.fetchAuthenticatedUser()
      }
    }
  },
  beforeMount() {
    this.refreshAuthentication();
    this.fetchAuthenticatedUser();
    this.redirectToLoginIfNotAuthenticated();
    this.fetchGroups();
  }
}
</script>

<style>
.left-menu {
  width: 250px;
  background-color: white;
  border-radius: 10px;
}

.left-menu-navigation {

}

.left-menu-profile {
  text-align: center;
  color: #707070;
}

.left-menu-profile .left-menu-profile-name {
  font-weight: 600;
  font-size: 21px;
}

.left-menu-profile .left-menu-profile-role {
  font-size: 13px;
}

.left-menu-navigation ul {
  list-style: none;
  margin: 0px;
  padding: 0px;
}

.left-menu-navigation ul li a {
  color: #707070;
  display: block;
  padding: 6px 23px;
}

.left-menu-navigation ul li a.active {
  background-color: #fdf3f6;
  color: #c64f59;
  border-radius: 18px;
}

.left-menu-navigation ul li a:hover {
  color: #c64f59;
  text-decoration: none;
}

.left-menu-navigation ul li a svg {
  margin-right: 10px;
}
</style>
