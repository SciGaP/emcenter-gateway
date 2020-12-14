<template>
  <Collection :collectionId="collectionId"/>
</template>

<script>
import store from "../store";
import Collection from "../components/Collection";

export default {
  name: "CollectionPage",
  components: {Collection},
  store: store,
  computed: {
    collectionId() {
      return this.$route.params.collectionId;
    }
  }
}
</script>

<style scoped>

</style>