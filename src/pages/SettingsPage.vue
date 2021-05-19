<template>
  <Page title="Storage Settings" :breadcrumb-links="[]">


    <ul style="max-width: 600px;">
      <li>
        <section>
          <div><img :src="googleDriveIcon"/></div>
          <div>Google Drive</div>
          <b-button variant="link">Add</b-button>
        </section>

        <ul>
          <li>
            <div><img :src="googleDriveIcon"/></div>
            <div>adam@em.com</div>
            <b-button variant="link">
              <b-icon icon="trash"></b-icon>
            </b-button>
            <div>
              <input type="radio" :checked="true" name="default-storage-selection" id="default-storage-selection-1"/>
              <label for="default-storage-selection-1">Default</label>
            </div>
          </li>

          <li>
            <div><img :src="googleDriveIcon"/></div>
            <div>adam@gmail.com</div>
            <b-button variant="link">
              <b-icon icon="trash"></b-icon>
            </b-button>
            <div>
              <input type="radio" name="default-storage-selection" id="default-storage-selection-2"/>
              <label for="default-storage-selection-2">Default</label>
            </div>
          </li>
        </ul>
      </li>
    </ul>


    <ul style="max-width: 600px;">
      <li>
        <section>
          <div><img :src="dropboxIcon"/></div>
          <div>Dropbox</div>
          <b-button variant="link">Add</b-button>
        </section>

        <ul>
          <li>
            <div><img :src="dropboxIcon"/></div>
            <div>adam@em.com</div>
            <b-button variant="link">
              <b-icon icon="trash"></b-icon>
            </b-button>
            <div>
              <input type="radio" :checked="true" name="default-storage-selection" id="default-storage-selection-3"/>
              <label for="default-storage-selection-3">Default</label>
            </div>
          </li>
        </ul>
      </li>
    </ul>


    <ul style="max-width: 600px;">
      <li>
        <section>
          <div><img :src="oneDriveIcon"/></div>
          <div>One Drive</div>
          <b-button variant="link">Add</b-button>
        </section>

        <ul>
          <li>
            <div><img :src="oneDriveIcon"/></div>
            <div>adam@em.com</div>
            <b-button variant="link">
              <b-icon icon="trash"></b-icon>
            </b-button>
            <div>
              <input type="radio" :checked="true" name="default-storage-selection" id="default-storage-selection-4"/>
              <label for="default-storage-selection-4">Default</label>
            </div>
          </li>
        </ul>
      </li>
    </ul>

    <!--    <div class="settings-card">-->
    <!--      <b-icon icon="person-lines-fill" aria-hidden="true"></b-icon>-->
    <!--      <router-link to="/users">Users</router-link>-->
    <!--    </div>-->
    <!--    <div class="settings-card">-->
    <!--      <b-icon icon="people-fill" aria-hidden="true"></b-icon>-->
    <!--      <router-link to="/groups">Groups</router-link>-->
    <!--    </div>-->

    <!--    <div v-for="storageOption in storageOptions" :key="storageOption.id">-->
    <!--      <div style="display: flex;" v-on:click="selectedStorage = storageOption.id">-->
    <!--        <b-radio name="storage-selection" :id="`storage-selection-${storageOption.id}`"-->
    <!--                 :value="storageOption.id === selectedStorage"-->
    <!--        />-->
    <!--        <label :for="`storage-selection-${storageOption.id}`" style="flex: 1;">{{ storageOption.name }}</label>-->
    <!--      </div>-->
    <!--      <b-collapse :id="`collapse-${storageOption.id}`" :visible="storageOption.id === selectedStorage">-->
    <!--        &lt;!&ndash;        <b-card>&ndash;&gt;-->

    <!--        &lt;!&ndash;        </b-card>&ndash;&gt;-->
    <!--        <div style="padding-left: 50px;">-->
    <!--          <div>-->
    <!--            <label>Client ID</label>-->
    <!--            <b-form-input id="client-id" type="text"></b-form-input>-->
    <!--          </div>-->
    <!--          <div>-->
    <!--            <label>Secret</label>-->
    <!--            <b-form-input id="client-secret" type="text"></b-form-input>-->
    <!--          </div>-->
    <!--        </div>-->
    <!--      </b-collapse>-->
    <!--    </div>-->

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
import googleDriveIcon from "../assets/external-storage-icons/google-drive-96dp.png";
import oneDriveIcon from "../assets/external-storage-icons/onedrive.png";
import dropboxIcon from "../assets/external-storage-icons/1101px-Dropbox_Icon.svg.png";

export default {
  name: "SettingsPage",
  components: {Page},
  data() {
    return {
      googleDriveIcon,
      oneDriveIcon,
      dropboxIcon,
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
img {
  width: 38px;
  padding: 8px;
}

ul {
  list-style: none;
  margin: 0px;
  padding: 0px;
}

ul li > section {
  display: flex;
  flex-direction: row;
  padding-top: 40px;
}

ul li > section div:nth-child(2) {
  font-weight: 800;
  line-height: 38px;
}

ul li ul li {
  display: flex;
  flex-direction: row;
}

ul li ul li div:nth-child(2) {
  flex: 1;
  line-height: 38px;
}

ul li ul li div:nth-child(4) {
  flex: 1;
  padding: 3px;
  text-align: right;
}

ul li ul li div:nth-child(4) label {
  padding-left: 10px;
}
</style>
