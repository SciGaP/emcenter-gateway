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
             style="background-color: white; padding: 10px; border-radius: 10px; min-width: 250px; max-width: 250px;">
        <div class="w-100" style="display: flex; flex-direction: row">
          <div style="flex: 1;">{{ dataset.datasetName }}</div>
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
          <img v-if="dataset.thumbnailDataUrl" :src="dataset.thumbnailDataUrl"/>
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
  name: "CollectionPage",
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
      getCollection: "collection/getCollection"
    }),
    collectionId() {
      return this.$route.params.collectionId;
    },
    collection() {
      if (this.collectionId) {
        return this.getCollection({collectionId: this.collectionId});
      } else {
        return null;
      }
    },
    datasets() {
      if (this.datasetIds) {
        return this.datasetIds.map(datasetId => {
          return this.getDataset({datasetId});
        });
      } else {
        return null;
      }
    },
    datasetIds() {
      const collectionId = this.$route.params.collectionId;
      const params = {
        fromDate: this.filter.fromDate,
        toDate: this.filter.toDate,
        collectionId
      };
      const datasetIds = this.getDatasetIds(params);

      if (datasetIds) {
        return datasetIds;
      } else {
        return null;
      }
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
  async mounted() {
    const params = {
      fromDate: this.filter.fromDate,
      toDate: this.filter.toDate,
      collectionId: this.collectionId
    };
    this.fetchCollection({collectionId: this.collectionId});
    this.fetchDatasets(params);
  }
}
</script>

<style scoped>

</style>