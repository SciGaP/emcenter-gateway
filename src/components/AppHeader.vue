<template>
  <b-navbar toggleable="lg" type="light" variant="light" class="bg-white" v-if="authenticated"
            style="box-shadow: 0px 0px 4px 0px #adb5bd;">
    <b-navbar-brand href="#" style="font-size: 1.6rem;color: #9a0002;padding-left: 20px;">
      {{ $t('app.top-header.title') }}
    </b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <!--        <router-link to="/settings" v-slot="{ href, route, navigate, isActive, isExactActive}">-->
        <!--          <b-nav-item :active="isExactActive" :href="href" @click="navigate">Settings</b-nav-item>-->
        <!--        </router-link>-->

        <!--        <b-nav-item href="#" disabled>Data</b-nav-item>-->
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <!--        <b-nav-form>-->
        <!--          <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>-->
        <!--          <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>-->
        <!--        </b-nav-form>-->

        <!--        <b-nav-item-dropdown text="Lang" right>-->
        <!--          <b-dropdown-item href="#">EN</b-dropdown-item>-->
        <!--          <b-dropdown-item href="#">ES</b-dropdown-item>-->
        <!--          <b-dropdown-item href="#">RU</b-dropdown-item>-->
        <!--          <b-dropdown-item href="#">FA</b-dropdown-item>-->
        <!--        </b-nav-item-dropdown>-->

        <b-nav-item href="#" v-on:click="downloadCurlScript">
          <div class="text-center text-dark">
            <div><small>Download curl script</small></div>
          </div>
        </b-nav-item>
        <b-nav-item-dropdown right no-caret>
          <!-- Using 'button-content' slot -->
          <template #button-content>
            <div class="text-center text-dark">
              <div>
                <b-icon icon="person-circle"></b-icon>
              </div>
              <div><small>{{ currentUsername }}</small></div>
            </div>
          </template>
          <router-link to="/profile" v-slot="{href, navigate}" tag="">
            <b-dropdown-item :href="href" @click="navigate">Profile</b-dropdown-item>
          </router-link>
          <b-dropdown-item href="#" v-on:click="logout">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>

import {custosService} from "airavata-custos-portal/src/lib/store/util/custos.util";
import {custosStore} from "../store";
import config from "@/config";
import axios from "axios";

export default {
  name: "AppHeader.vue",
  store: custosStore,
  computed: {
    authenticated() {
      return this.$store.getters["auth/authenticated"]
    },
    isAdmin() {
      return this.$store.getters["auth/isAdmin"]
    },
    currentUsername() {
      return this.$store.getters["auth/currentUsername"]
    },
    user() {
      return this.$store.getters["user/getUser"]({clientId: custosService.clientId, username: this.currentUsername});
    },
    profileLink() {
      return `/tenants/${custosService.clientId}/users/${this.currentUsername}`;
    }
  },
  methods: {
    logout: () => custosStore.dispatch("auth/logout"),
    async downloadCurlScript() {
      // resourceDownload.processing = true;
      //       resourceDownload.progress = 0;
      //       commit("SET_RESOURCE_DOWNLOAD", {resourceId, ...resourceDownload});

      // try {

      // let url = await emcService.resources.downloadResource({resourceId});
      let filename = `${window.performance.now()}`;
      // let filename = 'emc-curl-script.sh';

      // resourceDownload.processing = false;
      // resourceDownload.progress = 100;
      // commit("SET_RESOURCE_DOWNLOAD", {resourceId, ...resourceDownload});

      try {
        // alert("sdfsdf" + config.value('emcApiUrl'))
        let url = `${config.value('emcApiUrl')}/curl-script`
        url = await axios.get(url, {
          // responseType: 'arraybuffer',
          headers: {
            'Connection': 'keep-alive',
            'Keep-Alive': 'timeout=1500, max=100',
            // 'Accept': '*/*',
            // 'Content-Type': 'application/json',
            // 'Access-Control-Allow-Origin': "*",
            // 'Origin': '*',
            'Authorization': `Bearer ${custosService.identity.accessToken}`
          }
        },).then((resp, resp2, resp3) => {
          console.log("arguments : ", [resp, resp2, resp3])
          console.log("resp : ", resp)
          console.log("resp.headers : ", resp.headers)
          // resourceDownload.content = resp;

          if (resp.headers["content-disposition"]) {
            filename = resp.headers["content-disposition"].match(/.*filename="(.*)".*/)[1];
          }

          return resp;
          // return resp.data;
        }).then(response => {
          // console.log("blob : ", blob)

          const dataUrl = window.URL.createObjectURL(new Blob([response.data]));
          // const dataUrl = window.URL.createObjectURL(blob);
          console.log("blob url : ", dataUrl)
          return dataUrl;
        })

        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        // a.onclick = "return false;";
        // a.target = "_blank";

        // // the filename you want
        a.download = filename;
        document.body.appendChild(a);
        a.click();
      } catch (error) {
        // resourceDownload.errors.push({
        //     title: "Unknown error when downloading.",
        //     source: error, variant: "danger"
        // });

        console.log("blob error : ", error)

        throw error;
      }
    }
  }
}
</script>

<style>
.header {
  display: flex;
}

.header .custos-logo {
  flex: 1;
  display: flex;
}

.header .user-details .username {
  font-size: 15px;
  font-weight: 900;
  text-align: right;
  color: #afafae;
}

.header .user-details .email {
  font-size: 13px;
  font-weight: 500;
  line-height: 1.07;
  text-align: right;
  color: #203a43;
}

.header .user-avatar-button {
  border-radius: 30px;
  width: 35px;
  height: 35px;
  padding: 0px;
  line-height: 0px;
  font-size: 15px;
  background-color: #4a4a4a;
}
</style>
