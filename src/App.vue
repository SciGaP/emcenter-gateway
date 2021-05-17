<template>
  <div id="app" class="v-100 bg-light">
    <AppHeader/>
    <div class="v-100" style="display: flex;">
      <AppLeftNav style="width: 250px;"/>
      <router-view style="flex: 1;"/>
    </div>
    <!--    <div class="h-100 p-3 page-body">-->

    <!--      <AppLeftNav/>-->

    <!--      <div class="pl-3 pr-3" style="flex: 1;">-->
    <!--        <router-view/>-->
    <!--      </div>-->

    <!--    </div>-->
    <AppFooter/>
  </div>
</template>

<script>
import store from "./store";
import {mapGetters, mapActions} from "vuex";
import exampleProfilePicture from "./assets/120493210_1443413932520618_6347067080170311282_n.jpg";
import "./styles.scss";
import AppHeader from "./components/AppHeader";
import AppFooter from "./components/AppFooter";
import AppLeftNav from "@/components/AppLeftNav";

export default {
  name: 'App',
  components: {AppLeftNav, AppFooter, AppHeader},
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
