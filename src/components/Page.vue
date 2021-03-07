<template>
  <div class="pl-2 pr-2 v-100">
    <div class="mb-3 w-100">
      <div class="w-100" style="min-height: 25px;">
        <Breadcrumb v-if="breadcrumbLinks && breadcrumbLinks.length > 0" class="mb-2 mt-2" :links="breadcrumbLinks"/>
      </div>
      <h1 v-if="title" style="font-size: 2rem;font-weight: 200;color: #373A3C;">{{ title }}</h1>
    </div>
    <div class="w-100" style="background-color: white; border-radius: 10px;padding: 30px;">
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