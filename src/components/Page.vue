<template>
  <div class="pl-2 pr-2">
    <div class="mb-3 w-100">
      <Breadcrumb v-if="breadcrumbLinks && breadcrumbLinks.length > 0" class="mb-2" :links="breadcrumbLinks"/>
      <h1 v-if="title">{{ title }}</h1>
    </div>
    <div class=" pr-2 w-100">
      <slot></slot>
    </div>
  </div>
</template>


<script>
import Breadcrumb from "./Breadcrumb";

export default {
  name: "Page",
  components: {Breadcrumb},
  props: {
    title: {
      type: [String],
      required: true
    },
    breadcrumbLinks: {
      type: [Array],
      required: false
    }
  }
}
</script>

<style>

</style>