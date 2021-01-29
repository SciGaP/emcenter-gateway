<template>
  <div id="app">
    <AppHeader/>
    <div class="h-100 p-3 page-body">

      <AppLeftNav/>

      <div class="pl-3 pr-3" style="flex: 1;">
        <router-view/>
      </div>

    </div>
    <AppFooter/>
  </div>
</template>

<script>
import store from "./store";
import {mapGetters, mapActions} from "vuex";
import exampleProfilePicture from "./assets/120493210_1443413932520618_6347067080170311282_n.jpg";
import "./styles.css";
import AppHeader from "./components/AppHeader";
import AppLeftNav from "./components/AppLeftNav";
import AppFooter from "./components/AppFooter";

export default {
  name: 'App',
  components: {AppFooter, AppLeftNav, AppHeader},
  store: store,
  data: () => {
    return {exampleProfilePicture: exampleProfilePicture}
  },
  computed: {
    ...mapGetters({
      authenticated: "auth/authenticated",
      currentUsername: "auth/currentUsername",
      isAdmin: "auth/isAdmin",
      getUser: "user/getUser"
    }),
    user() {
      return this.getUser({username: this.currentUsername});
    }
  },
  methods: {
    ...mapActions({
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
  }
}
</script>

<style>
.page-body {
  display: flex;
  flex-direction: row;
  background: #f6f6f6;
}
</style>
