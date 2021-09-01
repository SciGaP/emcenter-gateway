<template>
  <p></p>
</template>

<script>

import store from "airavata-custos-portal/src/lib/store";
import config from "@/config";
// import {custosService} from "airavata-custos-portal/src/lib/store/util/custos.util";

export default {
  name: "Callback",
  store: store,
  methods: {
    async authenticate() {
      let code = this.$route.query.code
      let params = {code: code};
      await this.$store.dispatch('auth/authenticateUsingCode', params)
      // await this.$store.dispatch("user/addRolesToUser", {
      //   clientId: custosService.clientId,
      //   username: this.$store.getters["auth/currentUsername"],
      //   realmRoles: ["tenant-requester"],
      //   clientLevel: false
      // });

      const currentUsername = this.$store.getters["auth/currentUsername"];
      this.$store.dispatch("group/addUserToGroup", {
        clientId: config.value('clientId'),
        groupId: config.value('clientUsersGroupId'),
        username: currentUsername,
        membershipType: "MEMBER"
      }).catch(error => {
        this.errors.push({
          title: `Unknown error when adding the user '${currentUsername}' to users group`,
          source: error, variant: "danger"
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