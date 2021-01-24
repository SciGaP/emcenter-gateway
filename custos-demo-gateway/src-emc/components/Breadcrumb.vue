<template>
  <ul>
    <li v-for="(link, index) in links" :key="index">
      <span v-if="index !== 0">/</span>
      <router-link :to="link.to" v-slot="{ href, route, navigate, isActive,isExactActive }">
        <a :class="{active: isExactActive}" :href="href" @click="navigate">
          {{ link.name }}
        </a>
      </router-link>
    </li>
  </ul>
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
ul {
  list-style: none;
  padding: 0px;
  margin: 0px;
}

ul li {
  display: inline;
}

ul li a {
  color: #c64f59;
  font-size: 14px;
}

ul li span,
ul li a.active {
  color: #4e5153;
  font-size: 14px;
}

</style>