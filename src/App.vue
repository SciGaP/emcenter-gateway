<template>
  <div id="app" class="v-100 bg-light" style="height: 100%; display: flex; flex-direction: column;">
    <AppHeader/>
    <div class="v-100">
      <router-view/>
    </div>
    <!--    <div class="h-100 p-3 page-body">-->

    <!--      <AppLeftNav/>-->

    <!--      <div class="pl-3 pr-3" style="flex: 1;">-->
    <!--        <router-view/>-->
    <!--      </div>-->

    <!--    </div>-->
    <AppFooter/>
  </div>
</template>

<script>
import exampleProfilePicture from "./assets/120493210_1443413932520618_6347067080170311282_n.jpg";
import "./styles.scss";
import AppHeader from "./components/AppHeader";
import AppFooter from "./components/AppFooter";
import {custosStore} from "./store";

export default {
  name: 'App',
  components: {AppFooter, AppHeader},
  store: custosStore,
  data: () => {
    return {exampleProfilePicture: exampleProfilePicture}
  },
  methods: {
    redirectToLoginIfNotAuthenticated() {
      if (!this.authenticated && this.$router.currentRoute.path !== "/") {
        this.$router.push('/')
      }
    }
  },
  watch: {
    authenticated() {
      this.redirectToLoginIfNotAuthenticated()
    }
  },
  computed: {
    authenticated: () => custosStore.getters["auth/authenticated"],
    currentUsername: () => custosStore.getters["auth/currentUsername"]
  },
  mounted() {
    this.redirectToLoginIfNotAuthenticated();
  }
}
</script>

<style>
.page-body {
  display: flex;
  flex-direction: row;
  background: #f6f6f6;
}
</style>
