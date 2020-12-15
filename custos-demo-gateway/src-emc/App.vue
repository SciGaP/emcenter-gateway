<template>
  <div id="app">
    <div class="h-100 page-header">
      {{ $t('app.top-header.title') }}
    </div>
    <div class="h-100 p-3 page-body">

      <div class="p-3 left-menu" v-if="authenticated">
        <div class="p-3 left-menu-profile" v-if="user">
          <b-icon icon="person" style="width: 100px; height: 100px;"></b-icon>
          <div class="left-menu-profile-name">{{ user.first_name }} {{ user.last_name }}</div>
          <div class="left-menu-profile-role">{{ user.realm_roles.join(" / ") }}</div>
        </div>
        <div class="p-3 left-menu-navigation">
          <ul>
            <li>
              <router-link to="/dashboard">
                <b-icon icon="bounding-box"></b-icon>
                {{ $t('app.left-nav.menu.item.name.dashboard') }}
              </router-link>
            </li>
            <li>
              <router-link to="/collections">
                <b-icon icon="bar-chart-line-fill"></b-icon>
                {{ $t('app.left-nav.menu.item.name.datasets') }}
              </router-link>
            </li>
            <li>
              <router-link to="/profile">
                <b-icon icon="person-fill"></b-icon>
                {{ $t('app.left-nav.menu.item.name.profile') }}
              </router-link>
            </li>
            <li>
              <router-link to="/settings">
                <b-icon icon="tools"></b-icon>
                {{ $t('app.left-nav.menu.item.name.settings') }}
              </router-link>
            </li>
            <li style="margin-top: 100px;">
              <a v-on:click.prevent="logout" href="#">
                <b-icon icon="box-arrow-left"></b-icon>
                {{ $t('app.left-nav.menu.item.name.logout') }}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div class="p-3" style="flex: 1;">
        <router-view/>
      </div>

    </div>
  </div>
</template>

<script>
import store from "./store";
import {mapGetters, mapActions} from "vuex";
import config from "@/config";

export default {
  name: 'App',
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
    }
  },
  methods: {
    ...mapActions({
      fetchUsers: "user/fetchUsers",
      logoutAction: "auth/logout",
      refreshAuthentication: "auth/refreshAuthentication"
    }),
    async logout() {
      await this.logoutAction({
        clientId: config.value('clientId'),
        clientSecret: config.value('clientSec'),
      })
    },
    async fetchAuthenticatedUser() {
      if (this.authenticated && (!this.user || this.user.username !== this.currentUsername)) {
        await this.fetchUsers({
          offset: 0,
          limit: 1,
          clientId: config.value('clientId'),
          clientSecret: config.value('clientSec'),
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
    this.refreshAuthentication({
      clientId: config.value('clientId'),
      clientSecret: config.value('clientSec'),
    });
    this.fetchAuthenticatedUser();
    this.redirectToLoginIfNotAuthenticated();
  }
}
</script>

<style>
.page-header {
  padding: 10px 25px;
  font-size: 25px;
  color: #990201;
}

.page-body {
  display: flex;
  flex-direction: row;
  background: #f6f6f6;
}

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
  margin-bottom: 20px;
  display: block;
}

.left-menu-navigation ul li a:hover {
  color: #990201;
  text-decoration: none;
}

.left-menu-navigation ul li a svg {
  margin-right: 10px;
}
</style>
