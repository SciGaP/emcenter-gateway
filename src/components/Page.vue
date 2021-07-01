<template>
  <div class="v-100" style="background-color: white;padding-left: 50px;padding-bottom: 20px;">
    <div class="w-100" style="min-height: 25px;">
      <Breadcrumb v-if="breadcrumbLinks && breadcrumbLinks.length > 0" class="mb-2 mt-2" :links="breadcrumbLinks"/>
    </div>
    <div class="mb-1 w-100" style="display: flex; flex-direction: row;">
      <div style="flex: 1;">
        <h1 v-if="title" style="font-size: 2rem;font-weight: 300;color: black;">{{ title }}</h1>
      </div>
      <div class="pr-4">
        <slot name="header-right"/>
      </div>
    </div>
    <div class="w-100" style="">
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
    },
    errors: {
      default() {
        return [];
      }
    }
  }
}
</script>

<style>

</style>