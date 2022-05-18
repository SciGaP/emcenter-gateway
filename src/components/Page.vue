<template>
  <div class="v-100" style="flex:1;display: flex;" v-if="hasEmcUserRole || hasEmcAdminRole">
    <AppLeftNav style="width: 250px; background-color: #F7F7F7"/>
    <div class="v-100" style="flex: 1;background-color: white;padding-left: 50px;padding-bottom: 20px;">
      <div class="w-100" style="min-height: 25px;">
        <Breadcrumb v-if="breadcrumbLinks && breadcrumbLinks.length > 0" class="mb-2 mt-2" :links="breadcrumbLinks"/>
      </div>
      <div class="mb-1 w-100" style="display: flex; flex-direction: row;">
        <div style="flex: 1;">
          <h1 v-if="title" style="font-size: 2rem;font-weight: 300;color: black;">{{ title }}</h1>
        </div>
        <div class="pr-4">
          <slot name="header-right"/>
        </div>
      </div>
      <PageErrors :errors="errors"/>
      <div class="w-100" style="">
        <slot></slot>
      </div>
    </div>
  </div>
  <div v-else>
    <div class="text-center p-4">
      <div style="font-size: 40px;">
        <b-icon icon="info-circle-fill"></b-icon>
      </div>
      <strong>Unauthorized.</strong> Please contact the administrator.
    </div>
  </div>
</template>


<script>
import Breadcrumb from "./Breadcrumb";
import AppLeftNav from "@/components/AppLeftNav";
import {custosService} from "airavata-custos-portal/src/lib/store/util/custos.util";
import {custosStore} from "@/store";
import config from "@/config";
import PageErrors from "@/components/PageErrors";

export default {
  name: "Page",
  components: {PageErrors, AppLeftNav, Breadcrumb},
  store: custosStore,
  props: {
    title: {
      type: [String],
      required: true
    },
    breadcrumbLinks: {
      type: [Array],
      required: false
    },
    errors: {
      default() {
        return [];
      }
    }
  },
  computed: {
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
    hasEmcUserRole() {
      const adminGroupUsers = this.$store.getters["user/getUsers"]({
        groupId: config.value('clientUsersGroupId'),
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
  },
  methods: {
    async refreshData() {
      try {
        await Promise.all([
          this.$store.dispatch("user/fetchUsers", {
            clientId: this.clientId,
            groupId: config.value('clientUsersGroupId')
          }),
          this.$store.dispatch("user/fetchUsers", {
            clientId: this.clientId,
            groupId: config.value('clientAdminGroupId')
          })
        ]);
      } catch (e) {
        this.errors.push({
          variant: "danger",
          title: "Network Error",
          description: "Please contact the system administrator.",
          source: e
        });
      }
    }
  },
  mounted() {
    this.refreshData();
  }
}
</script>

<style>

</style>