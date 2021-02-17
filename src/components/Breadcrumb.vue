<template>
  <nav role="navigation" aria-label="Breadcrumbs">
    <ol class="rvt-breadcrumbs">
      <router-link v-for="(link, index) in links" :key="index"
                   :to="link.to" v-slot="{ href, route, navigate, isActive,isExactActive }">
        <li v-if="isExactActive" aria-current="page">
          {{ link.name }}
        </li>
        <li v-else>
          <a :class="{active: isExactActive}" :href="href" @click="navigate">
            {{ link.name }}
          </a>
        </li>
      </router-link>
      <!--      <li><a href="#"> Files </a></li>-->
      <!--      <li aria-current="page">my-file.txt</li>-->
    </ol>
  </nav>
  <!--  <ul>-->
  <!--    <li v-for="(link, index) in links" :key="index">-->
  <!--      <span v-if="index !== 0">/</span>-->
  <!--  <router-link :to="link.to" v-slot="{ href, route, navigate, isActive,isExactActive }">-->
  <!--    <a :class="{active: isExactActive}" :href="href" @click="navigate">-->
  <!--      {{ link.name }}-->
  <!--    </a>-->
  <!--  </router-link>-->
  <!--    </li>-->
  <!--  </ul>-->
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
/*ul {*/
/*  list-style: none;*/
/*  padding: 0px;*/
/*  margin: 0px;*/
/*}*/

/*ul li {*/
/*  display: inline;*/
/*}*/

/*ul li a {*/
/*  color: #c64f59;*/
/*  font-size: 14px;*/
/*}*/

/*ul li span,*/
/*ul li a.active {*/
/*  color: #4e5153;*/
/*  font-size: 14px;*/
/*}*/

</style>