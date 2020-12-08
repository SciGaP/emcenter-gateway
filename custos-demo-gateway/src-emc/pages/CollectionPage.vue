<template>
  <b-container class="p-2">
    <b-row class="mb-3">
      <b-col>
        <h2>Datasets</h2>
        <div v-if="collection">{{ collection.collectionName }}</div>
      </b-col>
    </b-row>
    <b-row class="pt-4">
      <b-col v-for="datasets in datasetss" :key="datasets.datasetId" class="m-1"
             style="background-color: white; padding: 10px; border-radius: 10px; min-width: 250px; max-width: 250px;">
        <div class="w-100" style="display: flex; flex-direction: row">
          <div style="flex: 1;">{{ datasets.datasetName }}</div>
          <div>
            <a href="#" class="ml-2">
              <b-icon icon="share-fill"></b-icon>
            </a>
            <a href="#" class="ml-2">
              <b-icon icon="pencil"></b-icon>
            </a>
            <a href="#" class="ml-2">
              <b-icon icon="download"></b-icon>
            </a>
          </div>
        </div>
        <div class="w-100 text-center" style="font-size: 150px">
          <b-icon icon="image"></b-icon>
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-pagination :total-rows="100" size="sm"></b-pagination>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        Are you missing images or data collected? &nbsp; &nbsp; &nbsp;<a href="#">Email EMC Staff</a>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import store from "../store";
import {mapGetters, mapActions} from "vuex";

export default {
  name: "CollectionPage",
  data() {
    return {
      filter: {
        fromDate: "",
        toDate: ""
      },
      datasetss: null,
      collection: null
    }
  },
  store: store,
  computed: {
    ...mapGetters({
      getDatasets: "dataset/getDatasets",
      getCollection: "collection/getCollection"
    })
  },
  methods: {
    ...mapActions({
      fetchDatasets: "dataset/fetchDatasets",
      fetchCollection: "collection/fetchCollection"
    })
  },
  async mounted() {
    const collectionId = this.$route.params.collectionId;
    const params = {
      fromDate: this.filter.fromDate,
      toDate: this.filter.toDate,
      collectionId
    };
    await this.fetchCollection({collectionId});
    await this.fetchDatasets(params);
    this.collection = this.getCollection({collectionId});
    this.datasetss = this.getDatasets(params);
  }
}
</script>

<style scoped>

</style>