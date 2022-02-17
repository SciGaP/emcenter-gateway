<template>
  <div>
    <span :id="tooltipRef" variant="primary">
<!--      <slot>{{ username }}</slot>-->
      <span v-if="user">{{ user.email }}</span>
      <span v-else>Loading ...</span>
    </span>
    <b-tooltip ref="tooltip" :target="tooltipRef" v-on:show="refreshData">
      {{ title }}
    </b-tooltip>
  </div>
</template>

<script>
import Vue from 'vue'
import custosStore from "airavata-custos-portal/src/lib/store";
import {custosService} from "airavata-custos-portal/src/lib/store/util/custos.util";

Vue.prototype.userFetchStatus = {};

export default {
  name: "block-tooltip-user",
  store: custosStore,
  props: {
    username: {}
  },
  data() {
    return {
      tooltipRef: ""
    }
  },
  computed: {
    user() {
      return this.$store.getters["user/getUser"]({clientId: custosService.clientId, username: this.username});
    },
    title() {
      if (this.user) {
        return `${this.user.firstName}, ${this.user.lastName}`
      } else {
        return "Loading ..."
      }
    },
    profileLink() {
      return `/tenants/${custosService.clientId}/users/${this.username}`;
    }
  },
  methods: {
    async refreshData() {
      if (!this.user && !this.userFetchStatus[this.username]) {
        this.userFetchStatus[this.username] = "FETCHING";
        await this.$store.dispatch("user/fetchUsers", {clientId: custosService.clientId, username: this.username});
        this.userFetchStatus[this.username] = "COMPLETED";
      }
    }
  },
  mounted() {
    this.tooltipRef = `ref-block-tooltip-user-${window.performance.now()}`;

    this.refreshData();
  }
}
</script>

<style scoped>

</style>