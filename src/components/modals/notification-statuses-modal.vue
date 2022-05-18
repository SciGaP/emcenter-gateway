<template>
  <b-modal :id="modalId" :title="notificationId" size="lg" v-on:show="refreshData">
    <PageErrors :errors="errors"/>
    <div>
      <table-overlay-info :data="statuses" :rows="5" :columns="5">
        <b-table-simple>
          <b-thead>
            <b-tr>
              <b-th>Status ID</b-th>
              <b-th>status</b-th>
              <b-th>Published Time</b-th>
              <b-th>Description</b-th>
            </b-tr>
          </b-thead>
          <b-tbody>
            <b-tr v-for="status in statuses" :key="status.statusId">
              <b-td>{{ status.statusId }}</b-td>
              <b-td>{{ status.status }}</b-td>
              <b-td>{{ status.publishedTime }}</b-td>
              <b-td>{{ status.description }}</b-td>
            </b-tr>
          </b-tbody>
        </b-table-simple>
      </table-overlay-info>
    </div>
    <template #modal-footer="{close}">
      <b-button size="sm" variant="outline-primary" v-on:click="close()">
        Close
      </b-button>
    </template>
  </b-modal>
</template>

<script>
import store from "../../store";

import TableOverlayInfo from "airavata-custos-portal/src/lib/components/overlay/table-overlay-info";
import config from "@/config";
import axios from "axios";
import PageErrors from "@/components/PageErrors";


export default {
  name: "notification-statuses-modal",
  store: store,
  components: {
    PageErrors,
    TableOverlayInfo
  },
  props: {
    modalId: {default: ""},
    notificationId: {default: ""}
  },
  data() {
    return {
      processing: false,
      errors: [],

      statuses: []
    }
  },
  computed: {},
  methods: {
    async refreshData() {
      this.processing = true;
      try {
        const baseUrl = config.value('datalakeDrmsUrl');
        const {data: {statuses}} = await axios.get(`${baseUrl}/v1.0/api/dataorch/notification/status/${this.notificationId}`);

        this.statuses = statuses.filter(status => status.notificationId === this.notificationId).sort((f, s) => f.publishedTime - s.publishedTime);

        for (let i = 0; i < statuses.length; i++) {
          statuses[i].publishedTime = new Date(parseInt(statuses[i].publishedTime)).toLocaleString();
        }
      } catch (error) {
        this.errors.push({
          title: `Unknown error when fetching the statuses.`,
          source: error, variant: "danger"
        });
      }
      this.processing = false;
    }
  }
}
</script>

<style scoped>

</style>