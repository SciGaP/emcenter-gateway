<template>
  <div>
    <b-pagination v-model="currentPage" :total-rows="rows" size="sm"></b-pagination>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  data() {
    return {
      rows: 100,
      currentPage: 1
    }
  }
}
</script>

<style scoped>

</style>