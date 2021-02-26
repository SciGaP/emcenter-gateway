<template>
  <b-breadcrumb>
    <router-link v-for="(link, index) in links" :key="index" :to="link.to"
                 v-slot="{ href, route, navigate, isActive,isExactActive }" tag="">
      <b-breadcrumb-item :href="href" :active="isExactActive">{{ link.name }}</b-breadcrumb-item>
    </router-link>
  </b-breadcrumb>
</template>

<script>
export default {
  name: "Breadcrumb",
  props: {
    links: {
      type: [Array],
      required: true
    }
  }
}
</script>

<style scoped>
</style>