<template>

  <div>
    <nav class="navbar fixed-top navbar-expand-lg navbar-dark navbar-lg iu-crimson-bg">
      <div class="container">
        <a class="navbar-brand" href="#"><img src="../assets/images/trident-large.png" height="30"
                                              class="d-inline-block align-top" alt=""> Electron Microscopy Center </a>
      </div>
    </nav>

    <div class="main pt-5">
      <div class="jumbotron iu-light-bg">
        <div class="container">
          <div class="row">
            <div class="col-lg-8 p-3" style="display: flex; flex-direction: row;">
              <div class="w-100 pr-4" style="border-right: 1px solid #056198;">
                <div class="p-2">
                  <h3 class="mb-2">
                    Register or Login with your Institution Identity
                  </h3>
                  <div class="p-2">
                    <b-button variant="primary"
                              v-on:click="this.loadAuthURL">
                      Institution Identity
                    </b-button>
                  </div>
                </div>
              </div>
              <div class="w-100 pl-4">
                <form v-on:submit.prevent="this.login" class="p-2">
                  <h3 class="mb-3">Login with a Custos Account</h3>
                  <div class="p-2">
                    <label class="form-input-label" for="form-input-username">Username</label>
                    <b-form-input id="form-input-username" v-model="username"
                                  placeholder="Username"></b-form-input>
                  </div>
                  <div class="p-2">
                    <label class="form-input-label" for="form-input-password">Password</label>
                    <b-form-input id="form-input-password" type="password" v-model="password"
                                  placeholder="Password"></b-form-input>
                  </div>
                  <div class="p-2">
                    <b-button type="submit" variant="primary"
                              v-on:click="this.login" :disabled="this.loginDisabled">
                      Login
                      <b-spinner small v-if="this.loginDisabled"></b-spinner>
                    </b-button>
                    <div v-if="this.loginError" class="text-danger w-100 mt-4 text-left form-error-message">
                      Invalid Username or Password
                    </div>
                    <!--                    <p class="mt-3 w-100 additional-links text-center">-->
                    <!--                      Don't have an account?-->
                    <!--                      <router-link to="/register">Create an account</router-link>-->
                    <!--                    </p>-->
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
  <!--  <b-container>-->
  <!--    <b-row align-v="start" align-h="center">-->
  <!--      <b-col style="min-width: 300px; max-width: 100%" class="text-center">-->
  <!--        <h2>Welcome to Custos</h2>-->
  <!--        <p class="h2-sub">Sign up and start authenticating</p>-->
  <!--        <div class="main-links">-->
  <!--          <b-link href="http://airavata.apache.org/custos/" target="_blank">Custos Website</b-link>-->
  <!--          <b-link class="ml-5"-->
  <!--                  href="https://cwiki.apache.org/confluence/display/CUSTOS/Gateways+2020%3ACustos+Tutorial"-->
  <!--                  target="_blank">-->
  <!--            Tutorial Instructions-->
  <!--          </b-link>-->
  <!--        </div>-->
  <!--        <img class="w-100" src="./../assets/custos_home.png">-->
  <!--      </b-col>-->
  <!--      <b-col style="max-width: 600px;min-width: 300px;" align-h="center">-->
  <!--        -->
  <!--      </b-col>-->
  <!--    </b-row>-->
  <!--  </b-container>-->
</template>

<script>
import {mapGetters, mapActions} from "vuex";
import {custosStore} from "../store";

export default {
  name: 'LoginPage',
  store: custosStore,
  props: {
    msg: String,
    seen: Boolean,
    todos: Array,
    successRedirect: String
  },
  data: function () {
    return {
      username: "",
      password: "",
      loginDisabled: false,
      loginError: false
    }
  },
  computed: {
    ...mapGetters({
      authenticated: 'auth/authenticated'
    })
  },
  methods: {
    ...mapActions({
      authenticateLocally: "auth/authenticateLocally",
      fetchAuthorizationEndpoint: "auth/fetchAuthorizationEndpoint"
    }),
    async login() {
      this.loginDisabled = true
      if (this.username != null && this.username != '' && this.password != null && this.password != '') {
        await this.authenticateLocally({
          username: this.username,
          password: this.password
        });
      } else {
        this.loginError = true
      }
      this.loginDisabled = false
    },
    async callDismissed() {
      this.loginError = false
    },
    async loadAuthURL() {
      await this.fetchAuthorizationEndpoint();
    },
    redirectIfAuthenticated() {
      if (this.authenticated === true) {
        if (this.successRedirect) {
          this.$router.push(this.successRedirect);
        } else {
          this.$router.push('collections');
        }
      }
    }
  },
  watch: {
    authenticated() {
      this.redirectIfAuthenticated();
    }
  },
  mounted() {
    this.redirectIfAuthenticated();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/*h2 {*/
/*  font-family: Avenir;*/
/*  font-size: 35px;*/
/*  font-weight: 900;*/
/*  color: #203a43;*/
/*}*/

/*.h2-sub {*/
/*  font-family: Avenir-Roman;*/
/*  font-size: 22px;*/
/*  color: #203a43;*/
/*}*/

/*h3 {*/
/*  font-family: Avenir;*/
/*  font-size: 15px;*/
/*  font-weight: 600;*/
/*  text-align: center;*/
/*  color: #203a43;*/
/*}*/

/*.h3-sub {*/
/*  font-family: Avenir-Roman;*/
/*  font-size: 20px;*/
/*  text-align: left;*/
/*  color: #203a43;*/
/*}*/

/*.form-input-label {*/
/*  font-family: Avenir;*/
/*  font-weight: 900;*/
/*  text-align: left;*/
/*  float: left;*/
/*  color: #203a43;*/
/*}*/

/*.primary-btn {*/
/*  background-color: #ea6a0a;*/

/*  font-family: Avenir;*/
/*  font-size: 14px;*/
/*  font-weight: 900;*/
/*  text-align: left;*/
/*  color: #ffffff;*/
/*}*/

/*.primary-btn:hover {*/
/*  background-color: #da640b;*/
/*}*/

/*.form-error-message {*/
/*  font-family: Avenir;*/
/*  font-size: 14px;*/
/*  font-weight: 900;*/
/*  text-align: left;*/
/*}*/

/*.login-card {*/
/*  box-shadow: -1px 1px 6px 2px #ebebeb;*/
/*  border-radius: 10px;*/
/*  border: none;*/
/*}*/

/*.login-card .form-input-label {*/
/*  font-weight: 500;*/
/*  font-size: 15px;*/
/*}*/

/*.main-links a {*/
/*  font-family: Avenir;*/
/*  font-size: 20px;*/
/*  font-weight: 600;*/
/*  color: #ea6a0a;*/
/*}*/

/*.additional-links {*/
/*  font-size: 13px;*/
/*}*/

/*.additional-links a {*/
/*  color: #ea6a0a;*/
/*}*/


body {
  margin: 0;
  font-family: 'BentonSansRegular', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', sans-serif !important;
  font-size: 18px;
  line-height: 1.75;
  font-style: normal;
  font-weight: 400;
  color: #191919 !important;
  background-color: #EDEBEB !important;
  padding: 0;
}

.main a:not(.btn) {
  color: #990000 !important;
}

.main {
}

h1, h2, h3 {
  font-family: 'BentonSansBold', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', sans-serif !important;
}

.page-header {
  /*font-size: 1.71429em;*/
  font-size: 3rem;
  font-family: 'BentonSansBold', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', sans-serif !important;
  font-style: inherit;
  color: #191919;
  letter-spacing: -0.01em;
  font-weight: 700;
  line-height: 1.1;
}

.page-sub-header {
  font-weight: 400;
  font-size: 1.5rem;
  margin-bottom: 0;
  color: #191919 !important;
}

.iu-light-bg {
  background: #ffffff !important;
}

.iu-crimson-bg {
  background: #990000 !important;
}

.btn-iu-crimson {
  background: #990000 !important;
  color: #ffffff;
}

.btn-link-iu-crimson {
  color: #990000 !important;
  font-family: 'BentonSansBold', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', sans-serif !important;

}

.btn-link-iu-crimson:hover {
  text-decoration: underline;
}

.btn-iu-crimson:hover {
  background: #a70000 !important;
  color: #ffffff;
}

.iu-mahogany-bg {
  background: #4A3C31 !important;
}

.iu-text-container {
  width: 50%;
}

.iu-footer-nav {
  border-top: 6px solid #7A1705;
  border-radius: 0;
}

.course-cards .card .card-title {
  margin-bottom: 0;
}

.lecture-cards .card .card-header {
  color: #fff;
}

.lecture-cards .card .card-subtitle {
  color: #c9c9c9 !important;
}

.mapouter {
  position: relative;
  text-align: right;
  height: 500px;
  width: 600px;
}

.gmap_canvas {
  overflow: hidden;
  background: none !important;
  height: 500px;
  width: 600px;
}

.mapouter {
  position: relative;
  text-align: right;
  height: 500px;
  width: 600px;
}

.gmap_canvas {
  overflow: hidden;
  background: none !important;
  height: 500px;
  width: 600px;
}
</style>
