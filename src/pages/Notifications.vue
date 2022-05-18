<template>
  <Page title="Data Scan Notifications" :breadcrumb-links="breadcrumbLinks" :errors="errors">
    <table-overlay-info :data="notifications" :rows="5" :columns="5">
      <b-table-simple>
        <b-thead>
          <b-tr>
            <b-th>Notification ID</b-th>
            <b-th>Resource Type</b-th>
            <b-th>Occured Time</b-th>
            <b-th>Hostname</b-th>
            <b-th>Base Path</b-th>
            <b-th>Resource Path</b-th>
            <b-th>Event Type</b-th>
          </b-tr>
        </b-thead>
        <b-tbody>
          <b-tr v-for="notification in notifications" :key="notification.notificationId">
            <b-td>
              <b-link v-b-modal="`notification-statuses-modal-${notification.notificationId}`">
                {{ notification.notificationId }}
              </b-link>
              <NotificationStatusesModal :modal-id="`notification-statuses-modal-${notification.notificationId}`"
                                         :notification-id="notification.notificationId"/>
            </b-td>
            <b-td>{{ notification.resourceType }}</b-td>
            <b-td>{{ notification.occuredTime }}</b-td>
            <b-td>{{ notification.hostName }}</b-td>
            <b-td>{{ notification.basePath }}</b-td>
            <b-td>{{ notification.resourcePath }}</b-td>
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
import NotificationStatusesModal from "@/components/modals/notification-statuses-modal";

export default {
  name: "Notifications",
  components: {NotificationStatusesModal, Page, TableOverlayInfo},
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
          name: "Data Scan Notifications"
        }
      ];

      return _breadcrumbLinks;
    }
  },
  methods: {
    async refreshData() {
      this.processing = true;
      try {
        const baseUrl = config.value('datalakeDrmsUrl');
        const {data: {notifications}} = await axios.get(`${baseUrl}/v1.0/api/dataorch/notifications`);
        for (let i = 0; i < notifications.length; i++) {
          notifications[i].occuredTime = new Date(parseInt(notifications[i].occuredTime)).toLocaleString()
        }

        this.notifications = notifications;

      } catch (error) {
        this.errors.push({
          title: `Unknown error`,
          description: `Unknown error when fetching the notifications.`,
          variant: "danger",
          source: error,
        });
      }
      this.processing = false;
    }
  },
  mounted() {
    this.refreshData();
  }
}
</script>

<style scoped>

</style>