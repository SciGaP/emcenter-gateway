<template>
  <div class="p-2">
    <div class="mb-3 w-100">
      <Breadcrumb :links="breadcrumbLinks"/>
      <div style="font-size: 30px;">{{ title }}</div>
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