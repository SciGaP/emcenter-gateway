<template>
  <div v-if="authenticated" class="p-3">
    <ul>
      <li>
        <router-link to="/dashboard" v-slot="{ href, route, navigate, isActive, isExactActive}" tag="">
          <a :class="{active: isExactActive}" :href="href" @click="navigate">
            <img :src="svgDashboard" style="width: 16px;height: 16px;"/>
            Dashboard
          </a>
        </router-link>
      </li>
      <li>
        <router-link to="/collections" v-slot="{ href, route, navigate, isActive, isExactActive}" tag="">
          <a :class="{active: isExactActive}" :href="href" @click="navigate">
            <img :src="svgFileRuled" style="width: 16px;height: 16px;"/>
            Collections
          </a>
        </router-link>
        <ul>
          <li>
            <router-link to="/collections/recent" v-slot="{ href, route, navigate, isActive, isExactActive}" tag="">
              <a :class="{active: isExactActive}" :href="href" @click="navigate">
                Recent
              </a>
            </router-link>
          </li>
          <li>
            <router-link to="/collections/downloaded" v-slot="{ href, route, navigate, isActive, isExactActive}" tag="">
              <a :class="{active: isExactActive}" :href="href" @click="navigate">
                Downloaded
              </a>
            </router-link>
          </li>
          <li>
            <router-link to="/collections/shared" v-slot="{ href, route, navigate, isActive, isExactActive}" tag="">
              <a :class="{active: isExactActive}" :href="href" @click="navigate">
                Shared
              </a>
            </router-link>
          </li>
          <li>
            <router-link to="/collections/received" v-slot="{ href, route, navigate, isActive, isExactActive}" tag="">
              <a :class="{active: isExactActive}" :href="href" @click="navigate">
                Received
              </a>
            </router-link>
          </li>
          <li>
            <router-link to="/collections/uploaded" v-slot="{ href, route, navigate, isActive, isExactActive}" tag="">
              <a :class="{active: isExactActive}" :href="href" @click="navigate">
                Uploaded
              </a>
            </router-link>
          </li>
          <li>
            <router-link to="/collections/deleted" v-slot="{ href, route, navigate, isActive, isExactActive}" tag="">
              <a :class="{active: isExactActive}" :href="href" @click="navigate">
                Deleted
              </a>
            </router-link>
          </li>
        </ul>
      </li>
      <li>
        <router-link to="/groups" v-slot="{ href, route, navigate, isActive, isExactActive}" tag="">
          <a :class="{active: isExactActive}" :href="href" @click="navigate">
            <img :src="svgPeople" style="width: 16px;height: 16px;"/>
            Groups
          </a>
        </router-link>
      </li>
      <li>
        <router-link to="/settings" v-slot="{ href, route, navigate, isActive, isExactActive}" tag="">
          <a :class="{active: isExactActive}" :href="href" @click="navigate">
            <img :src="svgGear" style="width: 16px;height: 16px;"/>
            Storage Settings
          </a>
        </router-link>
      </li>
      <!--    <li v-for="group in groups" :key="group.groupId">-->
      <!--      <router-link :to="`/data?groupId=${group.groupId}`" v-slot="{ href, route, navigate, isActive, isExactActive}"-->
      <!--                   tag="">-->
      <!--        <a :class="{active: isExactActive}" :href="href" @click="navigate">-->
      <!--          <b-icon icon="people-fill"></b-icon>-->
      <!--          {{ group.name }}-->
      <!--        </a>-->
      <!--      </router-link>-->
      <!--    </li>-->
    </ul>
  </div>
</template>

<script>
import store from "../store";
import {mapGetters, mapActions} from "vuex";
import exampleProfilePicture from "../assets/120493210_1443413932520618_6347067080170311282_n.jpg";
import svgPeople from "../assets/people.svg";
import svgDashboard from "../assets/dashboard.svg";
import svgFileRuled from "../assets/file-ruled.svg";
import svgGear from "../assets/gear.svg";

export default {
  name: 'AppLeftNav',
  store: store,
  data: () => {
    return {
      svgPeople: svgPeople,
      svgDashboard: svgDashboard,
      svgFileRuled: svgFileRuled,
      svgGear: svgGear,
      exampleProfilePicture: exampleProfilePicture
    }
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

<style scoped>
ul {
  list-style: none;
  padding: 0px;
}

ul li ul {
  padding-left: 40px;
}

ul li a {
  text-align: left;
  letter-spacing: 0px;
  color: #4A3C31;
  padding: 10px 15px;
  margin-bottom: 2px;
  display: block;
  font-size: 1rem;
}


ul li a:hover {
  color: #196fa0;
  text-decoration: none;
}

ul li a.active {
  color: #196fa0;
  background: #0062981A 0% 0% no-repeat padding-box;
  border-radius: 30px;
  opacity: 1;
  text-decoration: none;
}
</style>
