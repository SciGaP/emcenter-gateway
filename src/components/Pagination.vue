<template>
  <b-pagination v-model="currentPage" :total-rows="rows" size="sm"
                style="margin: 0px;display: inline-flex;"></b-pagination>
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