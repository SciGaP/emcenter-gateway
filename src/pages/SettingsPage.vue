<template>
  <Page title="Settings" :breadcrumb-links="[]">
    <!--    <div class="settings-card">-->
    <!--      <b-icon icon="person-lines-fill" aria-hidden="true"></b-icon>-->
    <!--      <router-link to="/users">Users</router-link>-->
    <!--    </div>-->
    <!--    <div class="settings-card">-->
    <!--      <b-icon icon="people-fill" aria-hidden="true"></b-icon>-->
    <!--      <router-link to="/groups">Groups</router-link>-->
    <!--    </div>-->

    <div v-for="storageOption in storageOptions" :key="storageOption.id">
      <div style="display: flex;" v-on:click="selectedStorage = storageOption.id">
        <b-radio name="storage-selection" :id="`storage-selection-${storageOption.id}`"
                 :value="storageOption.id === selectedStorage"
        />
        <label :for="`storage-selection-${storageOption.id}`" style="flex: 1;">{{ storageOption.name }}</label>
      </div>
      <b-collapse :id="`collapse-${storageOption.id}`" :visible="storageOption.id === selectedStorage">
        <!--        <b-card>-->

        <!--        </b-card>-->
        <div style="padding-left: 50px;">
          <div>
            <label>Client ID</label>
            <b-form-input id="client-id" type="text"></b-form-input>
          </div>
          <div>
            <label>Secret</label>
            <b-form-input id="client-secret" type="text"></b-form-input>
          </div>
        </div>
      </b-collapse>
    </div>

    <!--    <div>-->
    <!--      <div>-->
    <!--        <b-radio name="storage-selection" id="storage-selection-sda"/>-->
    <!--        <label for="storage-selection-sda">SDA</label>-->
    <!--      </div>-->
    <!--      <b-collapse visible id="collapse-3">-->
    <!--        <b-card>I should start open!</b-card>-->
    <!--      </b-collapse>-->
    <!--    </div>-->

  </Page>
</template>

<script>
import Page from "@/components/Page";

export default {
  name: "SettingsPage",
  components: {Page},
  data() {
    return {
      selectedStorage: "google-drive",
      storageOptions: [
        {
          id: "google-drive",
          name: "Google Drive"
        },
        {
          id: "one-drive",
          name: "One Drive"
        },
        {
          id: "dropbox",
          name: "Dropbox"
        },
        {
          id: "slate",
          name: "Slate"
        },
        {
          id: "sda",
          name: "SDA"
        }
      ]
    };
  }
}
</script>

<style scoped>
.settings-card {
  display: inline-block;
  width: 200px;
  font-size: 43px;
  /*color: white;*/
  text-align: center;
}

.settings-card a {
  font-size: 25px;
  /*color: white;*/
  width: 100%;
  display: block;
}
</style>
