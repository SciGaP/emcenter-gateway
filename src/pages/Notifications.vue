<template>
  <Page title="Notifications" :breadcrumb-links="breadcrumbLinks" :errors="errors">
    <table-overlay-info :data="notifications" :rows="5" :columns="5">
      <b-table-simple>
        <b-thead>
          <b-tr>
            <b-th>notificationId</b-th>
            <b-th>resourceType</b-th>
            <b-th>occuredTime</b-th>
            <b-th>hostName</b-th>
            <b-th>basePath</b-th>
            <b-th>eventType</b-th>
          </b-tr>
        </b-thead>
        <b-tbody>
          <b-tr v-for="notification in notifications" :key="notification.notificationId">
            <b-td>{{ notification.notificationId }}</b-td>
            <b-td>{{ notification.resourceType }}</b-td>
            <b-td>{{ notification.occuredTime }}</b-td>
            <b-td>{{ notification.hostName }}</b-td>
            <b-td>{{ notification.basePath }}</b-td>
            <b-td>{{ notification.eventType }}</b-td>
          </b-tr>
        </b-tbody>
      </b-table-simple>
    </table-overlay-info>
  </Page>
</template>

<script>
import axios from "axios";
import Page from "@/components/Page";
import TableOverlayInfo from "airavata-custos-portal/src/lib/components/overlay/table-overlay-info";
import config from "@/config";

export default {
  name: "Notifications",
  components: {Page, TableOverlayInfo},
  data() {
    return {
      processing: false,
      errors: [],

      notifications: []
    }
  },
  computed: {
    breadcrumbLinks() {
      const _breadcrumbLinks = [
        {
          to: `/notifications`,
          name: "Notifications"
        }
      ];

      return _breadcrumbLinks;
    }
  },
  methods: {
    async refreshData() {
      const baseUrl = config.value('datalakeDrmsUrl');
      const {data: {notifications}} = await axios.get(`${baseUrl}/v1.0/api/dataorch/notifications`);
      this.notifications = notifications;
    }
  },
  mounted() {
    this.refreshData();
  }
}
</script>

<style scoped>

</style>