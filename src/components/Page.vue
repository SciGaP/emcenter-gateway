<template>
  <div class="pl-2 pr-2">
    <div class="mb-3 w-100">
      <Breadcrumb class="mb-2" :links="breadcrumbLinks"/>
      <h1 class="rvt-ts-36">{{ title }}</h1>
    </div>
    <div class="m-1 w-100" style="background-color: white; padding: 35px; border-radius: 10px;">
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