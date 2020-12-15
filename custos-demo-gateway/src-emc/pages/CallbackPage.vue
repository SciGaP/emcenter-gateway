<template>
  <p>Redirecting ...</p>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "CallbackPage",
  methods: {
    ...mapActions({
      authenticateLocally: "auth/authenticateLocally",
      fetchAuthorizationEndpoint: "auth/fetchAuthorizationEndpoint",
      authenticateUsingCode: "auth/authenticateUsingCode"
    }),
    async authenticate() {
      await this.authenticateUsingCode({
        tokenEndpoint: "https://custos.scigap.org/apiserver/identity-management/v1.0.0/token",
        code: this.code
      })
    }
  },

  computed: {
    ...mapGetters({
      authenticated: 'auth/authenticated'
    }),
    code() {
      return this.$route.query.code;
    }
  },
  async mounted() {
    await this.authenticate()
    await this.$router.push('workspace')
  }
}
</script>

<style scoped>

</style>