<template>
  <Errors :errors="errors"/>
</template>

<script>

import store from "airavata-custos-portal/src/lib/store";
import config from "@/config";
import Errors from "@/components/Errors";
// import {custosService} from "airavata-custos-portal/src/lib/store/util/custos.util";

export default {
  name: "Callback",
  components: {Errors},
  store: store,
  data() {
    return {
      errors: []
    }
  },
  methods: {
    async authenticate() {
      this.errors = [];

      let code = this.$route.query.code
      let params = {code: code};

      try {
        await this.$store.dispatch('auth/authenticateUsingCode', params)
      } catch (e) {
        this.errors.push({
          variant: "danger",
          title: "Authentication Error",
          description: "Please contact the system administrator",
          source: e
        });
      }

      const currentUsername = this.$store.getters["auth/currentUsername"];
      this.$store.dispatch("group/addUserToGroup", {
        clientId: config.value('clientId'),
        groupId: config.value('clientUsersGroupId'),
        username: currentUsername,
        membershipType: "MEMBER"
      }).catch(error => {
        this.errors.push({
          title: "Unknown Error",
          description: `Unknown error when adding the user '${currentUsername}' to users group`,
          variant: "danger",
          source: error
        });
      });
    }
  },
  async mounted() {
    await this.authenticate();
    await this.$router.push('/collections');
  }
}
</script>

<style scoped>

</style>