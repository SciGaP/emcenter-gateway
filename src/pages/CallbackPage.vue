<template>
  <p>Redirecting...</p>
</template>

<script>

import store from "../store";

export default {
  name: "Callback",
  store: store,
  methods: {
    async authenticate() {
      let code = this.$route.query.code
      let params = {code: code};
      await this.$store.dispatch('auth/authenticateUsingCode', params)

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