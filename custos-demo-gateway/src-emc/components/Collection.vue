<template>
  <b-container class="p-2">
    <b-row class="mb-3">
      <b-col>
        <h2>Datasets</h2>
        <div v-if="collection">{{ collection.collectionName }}</div>
      </b-col>
    </b-row>
    <b-row class="pt-4">
      <b-col v-for="dataset in datasets" :key="dataset.datasetId" class="m-1"
             style="background-color: white; padding: 10px; border-radius: 10px; min-width: 200px; max-width: 200px;">
        <div class="w-100" style="display: flex; flex-direction: row">
          <div style="flex: 1;">
            <button type="button" class="btn btn-link p-1">{{ dataset.datasetName }}</button>
          </div>
          <div>
            <button type="button" class="btn btn-link btn-sm p-1">
              <b-icon icon="share-fill"></b-icon>
            </button>
            <button type="button" class="btn btn-link btn-sm p-1">
              <b-icon icon="pencil"></b-icon>
            </button>
            <button type="button" class="btn btn-link btn-sm p-1">
              <b-icon icon="download"></b-icon>
            </button>
          </div>
        </div>
        <div class="w-100 text-center"
             style="font-size: 10px;height: 180px;overflow: hidden; display: flex; flex-direction: column;">
          <div style="flex: 1;"></div>
          <img v-if="dataset.thumbnailDataUrl" width="100%" :src="dataset.thumbnailDataUrl"/>
          <b-icon v-else icon="image"></b-icon>
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
  name: "Collection",
  props: {
    collectionId: {
      type: [Number, String],
      required: true
    }
  },
  data() {
    return {
      filter: {
        fromDate: "",
        toDate: ""
      }
    }
  },
  store: store,
  computed: {
    ...mapGetters({
      getDatasetIds: "dataset/getDatasetIds",
      getDataset: "dataset/getDataset",
      getDatasets: "dataset/getDatasets",
      getCollection: "collection/getCollection"
    }),
    collection() {
      return this.getCollection({collectionId: this.collectionId});
    },
    datasetsFilter() {
      return {
        fromDate: this.filter.fromDate,
        toDate: this.filter.toDate,
        collectionId: this.collectionId
      };
    },
    datasets() {
      const {fromDate, toDate, collectionId} = this.datasetsFilter;
      return this.getDatasets({fromDate, toDate, collectionId});
    },
    datasetIds() {
      const {fromDate, toDate, collectionId} = this.datasetsFilter;
      return this.getDatasetIds({fromDate, toDate, collectionId});
    }
  },
  methods: {
    ...mapActions({
      fetchDatasets: "dataset/fetchDatasets",
      fetchDatasetThumbnail: "dataset/fetchDatasetThumbnail",
      fetchCollection: "collection/fetchCollection"
    })
  },
  watch: {
    datasetIds() {
      for (let i = 0; i < this.datasetIds.length; i++) {
        const datasetId = this.datasetIds[i];
        this.fetchDatasetThumbnail({datasetId});
      }
    }
  },
  mounted() {
    const {fromDate, toDate, collectionId} = this.datasetsFilter;
    this.fetchCollection({collectionId});
    this.fetchDatasets({fromDate, toDate, collectionId});
  }
}
</script>

<style scoped>

</style>