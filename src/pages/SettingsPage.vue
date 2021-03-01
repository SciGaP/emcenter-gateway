<template>
  <Page title="Settings" :breadcrumb-links="[]" class="bg-primary text-white vh-100">
    <div class="settings-card">
      <b-icon icon="person-lines-fill" aria-hidden="true"></b-icon>
      <router-link to="/users">Users</router-link>
    </div>
    <div class="settings-card">
      <b-icon icon="people-fill" aria-hidden="true"></b-icon>
      <router-link to="/groups">Groups</router-link>
    </div>
  </Page>
</template>

<script>
import Page from "@/components/Page";

export default {
  name: "SettingsPage",
  components: {Page}
}
</script>

<style scoped>
.settings-card {
  display: inline-block;
  width: 200px;
  font-size: 43px;
  color: white;
  text-align: center;
}

.settings-card a {
  font-size: 25px;
  color: white;
  width: 100%;
  display: block;
}
</style>
