<template>
  <b-navbar toggleable="lg" type="light" variant="light" class="bg-white" v-if="authenticated"
            style="box-shadow: 0px 0px 4px 0px #adb5bd;">
    <b-navbar-brand href="#" style="font-size: 1.6rem;color: #9a0002;padding-left: 20px;">
      {{ $t('app.top-header.title') }}
    </b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <!--        <router-link to="/settings" v-slot="{ href, route, navigate, isActive, isExactActive}">-->
        <!--          <b-nav-item :active="isExactActive" :href="href" @click="navigate">Settings</b-nav-item>-->
        <!--        </router-link>-->

        <!--        <b-nav-item href="#" disabled>Data</b-nav-item>-->
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <!--        <b-nav-form>-->
        <!--          <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>-->
        <!--          <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>-->
        <!--        </b-nav-form>-->

        <!--        <b-nav-item-dropdown text="Lang" right>-->
        <!--          <b-dropdown-item href="#">EN</b-dropdown-item>-->
        <!--          <b-dropdown-item href="#">ES</b-dropdown-item>-->
        <!--          <b-dropdown-item href="#">RU</b-dropdown-item>-->
        <!--          <b-dropdown-item href="#">FA</b-dropdown-item>-->
        <!--        </b-nav-item-dropdown>-->

        <b-nav-item href="#">
          <div class="text-center text-dark">
            <div>
              <b-icon icon="bell"></b-icon>
            </div>
            <div><small>Notifications</small></div>
          </div>
        </b-nav-item>
        <b-nav-item-dropdown right no-caret>
          <!-- Using 'button-content' slot -->
          <template #button-content>
            <div class="text-center text-dark">
              <div>
                <b-icon icon="person-circle"></b-icon>
              </div>
              <div><small>{{ currentUsername }}</small></div>
            </div>
          </template>
          <b-dropdown-item href="#">Profile</b-dropdown-item>
          <b-dropdown-item href="#" v-on:click.prevent="logout">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>

import store from "../store";
import {mapActions, mapGetters} from "vuex";

export default {
  name: 'AppHeader',
  store: store,
  computed: {
    ...mapGetters({
      authenticated: "auth/authenticated",
      currentUsername: "auth/currentUsername",
      isAdmin: "auth/isAdmin",
      getUser: "user/getUser"
    }),
    user() {
      return this.getUser({username: this.currentUsername});
    },
    currentUsernameInTwoLetters() {
      return this.currentUsername.substring(0, 2).toUpperCase();
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

<style scoped>
</style>
