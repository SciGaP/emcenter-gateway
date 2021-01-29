<template>
  <div class="p-3 left-menu" v-if="authenticated">
    <div class="p-3 left-menu-profile" v-if="user">
      <img style="width: 100px; height: 100px;border-radius: 50px;" :src="exampleProfilePicture"/>
      <div class="left-menu-profile-name">{{ user.first_name }} {{ user.last_name }}</div>
      <div class="left-menu-profile-role">{{ user.realm_roles.join(" / ") }}</div>
    </div>
    <div class="p-3 left-menu-navigation">
      <ul>
        <li>
          <router-link to="/dashboard" v-slot="{ href, route, navigate, isActive}">
            <a :class="{active: isActive}" :href="href" @click="navigate">
              <b-icon icon="bounding-box"></b-icon>
              {{ $t('app.left-nav.menu.item.name.dashboard') }}
            </a>
          </router-link>
        </li>
        <li>
          <router-link to="/data" v-slot="{ href, route, navigate, isActive}">
            <a :class="{active: isActive}" :href="href" @click="navigate">
              <b-icon icon="bar-chart-line-fill"></b-icon>
              {{ $t('app.left-nav.menu.item.name.datasets') }}
            </a>
          </router-link>
        </li>
        <li>
          <router-link to="/groups" v-slot="{ href, route, navigate, isActive}">
            <a :class="{active: isActive}" :href="href" @click="navigate">
              <b-icon icon="bar-chart-line-fill"></b-icon>
              {{ $t('app.left-nav.menu.item.name.groups') }}
            </a>
          </router-link>
        </li>
        <li>
          <router-link to="/researchers" v-slot="{ href, route, navigate, isActive}">
            <a :class="{active: isActive}" :href="href" @click="navigate">
              <b-icon icon="bar-chart-line-fill"></b-icon>
              {{ $t('app.left-nav.menu.item.name.researchers') }}
            </a>
          </router-link>
        </li>
        <li>
          <router-link to="/profile" v-slot="{ href, route, navigate, isActive}">
            <a :class="{active: isActive}" :href="href" @click="navigate">
              <b-icon icon="person-fill"></b-icon>
              {{ $t('app.left-nav.menu.item.name.profile') }}
            </a>
          </router-link>
        </li>
        <li>
          <router-link to="/support" v-slot="{ href, route, navigate, isActive}">
            <a :class="{active: isActive}" :href="href" @click="navigate">
              <b-icon icon="person-fill"></b-icon>
              {{ $t('app.left-nav.menu.item.name.support') }}
            </a>
          </router-link>
        </li>
        <!--            <li>-->
        <!--              <router-link to="/groups">-->
        <!--                <b-icon icon="people-fill"></b-icon>-->
        <!--                {{ $t('app.left-nav.menu.item.name.groups') }}-->
        <!--              </router-link>-->
        <!--            </li>-->
        <!--            <li>-->
        <!--              <router-link to="/settings">-->
        <!--                <b-icon icon="tools"></b-icon>-->
        <!--                {{ $t('app.left-nav.menu.item.name.settings') }}-->
        <!--              </router-link>-->
        <!--            </li>-->
        <li style="margin-top: 100px;">
          <a v-on:click.prevent="logout" href="#">
            <b-icon icon="box-arrow-left"></b-icon>
            {{ $t('app.left-nav.menu.item.name.logout') }}
          </a>
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
