<template>
  <div v-if="authenticated" class="p-3">
    <!--    <CollectionToastQueue/>-->
    <ul>
      <!--      <li>-->
      <!--        <router-link to="/dashboard" v-slot="{ href, route, navigate, isActive, isExactActive}" tag="">-->
      <!--          <a :class="{active: isExactActive}" :href="href" @click="navigate">-->
      <!--            <img :src="svgDashboard" style="width: 16px;height: 16px;"/>-->
      <!--            Dashboard-->
      <!--          </a>-->
      <!--        </router-link>-->
      <!--      </li>-->
      <li>
        <router-link to="/collections" v-slot="{ href, route, navigate, isActive, isExactActive}" tag="">
          <a :class="{active: isExactActive}" :href="href" @click="navigate">
            <img :src="svgFileRuled" style="width: 16px;height: 16px;"/>
            My Collections
          </a>
        </router-link>
      </li>
      <li>
        <router-link to="/collections?sharedByMe=true" v-slot="{ href, route, navigate, isActive, isExactActive}"
                     tag="">
          <a :class="{active: isExactActive}" :href="href" @click="navigate">
            <img :src="svgFileRuled" style="width: 16px;height: 16px;"/>
            Shared By Me
          </a>
        </router-link>
      </li>
      <li>
        <router-link to="/collections?sharedWithMe=true" v-slot="{ href, route, navigate, isActive, isExactActive}"
                     tag="">
          <a :class="{active: isExactActive}" :href="href" @click="navigate">
            <img :src="svgFileRuled" style="width: 16px;height: 16px;"/>
            Shared With Me
          </a>
        </router-link>
      </li>
      <!--      <li>-->
      <!--        <router-link to="/downloaded" v-slot="{ href, route, navigate, isActive}" tag="">-->
      <!--          <a :class="{active: isActive}" :href="href" @click="navigate">-->
      <!--            <b-icon icon="download"></b-icon>-->
      <!--            Downloaded-->
      <!--          </a>-->
      <!--        </router-link>-->
      <!--      </li>-->
      <!--      <li>-->
      <!--        <router-link to="/shared" v-slot="{ href, route, navigate, isActive}" tag="">-->
      <!--          <a :class="{active: isActive}" :href="href" @click="navigate">-->
      <!--            <b-icon icon="share"></b-icon>-->
      <!--            Shared-->
      <!--          </a>-->
      <!--        </router-link>-->
      <!--      </li>-->
      <li>
        <router-link :to="`/collections?types=${EmcResource.EMC_RESOURCE_TYPE.EMC_RESOURCE_TYPE_COLLECTION_GROUP}`"
                     v-slot="{ href, route, navigate, isExactActive}" tag="">
          <a :class="{active: isExactActive}" :href="href" @click="navigate">
            <b-icon icon="folder-symlink"></b-icon>
            Collection Groups
          </a>
        </router-link>
      </li>
      <!--      <li v-if="hasEmcAdminRole">-->
      <!--        <router-link :to="`/labs`"-->
      <!--                     v-slot="{ href, route, navigate, isExactActive}" tag="">-->
      <!--          <a :class="{active: isExactActive}" :href="href" @click="navigate">-->
      <!--            <b-icon icon="box-seam"></b-icon>-->
      <!--            Labs-->
      <!--          </a>-->
      <!--        </router-link>-->
      <!--      </li>-->
      <!--      <li>-->
      <!--        <router-link to="/archived" v-slot="{ href, route, navigate, isActive}" tag="">-->
      <!--          <a :class="{active: isActive}" :href="href" @click="navigate">-->
      <!--            <b-icon icon="archive"></b-icon>-->
      <!--            Archived-->
      <!--          </a>-->
      <!--        </router-link>-->
      <!--      </li>-->
      <li v-if="hasEmcAdminRole">
        <router-link to="/groups" v-slot="{ href, route, navigate, isActive, isExactActive}" tag="">
          <a :class="{active: isExactActive}" :href="href" @click="navigate">
            <b-icon icon="people"></b-icon>
            My Groups
          </a>
        </router-link>
      </li>
      <li>
        <router-link to="/storages" v-slot="{ href, route, navigate, isActive, isExactActive}" tag="">
          <a :class="{active: isExactActive}" :href="href" @click="navigate">
            <b-icon icon="gear"></b-icon>
            Storage Settings
          </a>
        </router-link>
      </li>
      <!--      <li>-->
      <!--        <router-link to="/notifications" v-slot="{ href, route, navigate, isActive}" tag="">-->
      <!--          <a :class="{active: isActive}" :href="href" @click="navigate">-->
      <!--            <b-icon icon="bell"></b-icon>-->
      <!--            Notifications-->
      <!--          </a>-->
      <!--        </router-link>-->
      <!--      </li>-->
      <!--      <li>-->
      <!--        <router-link to="/profile" v-slot="{ href, route, navigate, isActive}" tag="">-->
      <!--          <a :class="{active: isActive}" :href="href" @click="navigate">-->
      <!--            <b-icon icon="person"></b-icon>-->
      <!--            Profile-->
      <!--          </a>-->
      <!--        </router-link>-->
      <!--      </li>-->
      <li v-if="hasEmcAdminRole">
        <router-link to="/notifications" v-slot="{ href, route, navigate, isActive}" tag="">
          <a :class="{active: isActive}" :href="href" @click="navigate">
            <b-icon icon="bell"></b-icon>
            Data Scan Notifications
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

import exampleProfilePicture from "../assets/120493210_1443413932520618_6347067080170311282_n.jpg";
import svgPeople from "../assets/people.svg";
import svgDashboard from "../assets/dashboard.svg";
import svgFileRuled from "../assets/file-ruled.svg";
import svgGear from "../assets/gear.svg";
// import CollectionToastQueue from "@/components/CollectionToastQueue";
import EmcResource from '@/service/emc-service/emc-service-resource';

import {custosService} from "airavata-custos-portal/src/lib/store/util/custos.util";
import {custosStore} from "../store";
import config from "@/config";

export default {
  name: "AppLeftNav",
  // components: {CollectionToastQueue},
  store: custosStore,
  data: () => {
    return {
      EmcResource,

      svgPeople: svgPeople,
      svgDashboard: svgDashboard,
      svgFileRuled: svgFileRuled,
      svgGear: svgGear,
      exampleProfilePicture: exampleProfilePicture
    }
  },
  computed: {
    authenticated() {
      return this.$store.getters["auth/authenticated"]
    },
    hasEmcAdminRole() {
      const adminGroupUsers = this.$store.getters["user/getUsers"]({
        groupId: config.value('clientAdminGroupId'),
        clientId: this.clientId
      });

      if (adminGroupUsers) {
        for (let i = 0; i < adminGroupUsers.length; i++) {
          if (adminGroupUsers[i].username === this.currentUsername) {
            return true;
          }
        }
      }

      return false;
    },
    currentUsername() {
      return this.$store.getters["auth/currentUsername"]
    },
    user() {
      return this.$store.getters["user/getUser"]({clientId: custosService.clientId, username: this.currentUsername});
    },
    profileLink() {
      return `/tenants/${custosService.clientId}/users/${this.currentUsername}`;
    }
  },
  methods: {
    logout: () => custosStore.dispatch("auth/logout"),
    refreshData() {
      this.$store.dispatch("user/fetchUsers", {clientId: this.clientId, groupId: config.value('clientUsersGroupId')});
      this.$store.dispatch("user/fetchUsers", {clientId: this.clientId, groupId: config.value('clientAdminGroupId')});
    }
  },
  mounted() {
    this.refreshData();
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
