<template>
  <div>
    <nav class="navbar fixed-top navbar-expand-lg navbar-dark navbar-lg iu-crimson-bg">
      <div class="container">
        <router-link class="navbar-brand" to="/"><img src="../assets/images/trident-large.png"
                                                      height="30" class="d-inline-block align-top" alt="">
          Electron Microscopy Center
        </router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
          </ul>
          <form class="form-inline my-2 my-lg-0">
            <ul class="navbar-nav mr-2">
              <li class="nav-item">
                <router-link to="/contact" v-slot="{href, navigate}" tag="">
                  <a class="nav-link" :href="href" @click="navigate">Contact</a>
                </router-link>
              </li>
            </ul>
          </form>
        </div>
      </div>
    </nav>

    <div class="main pt-5">
      <div class="jumbotron iu-light-bg">
        <div class="container">
          <div class="row">
            <div class="col-lg-8 p-3">
              <div class="page-sub-header mb-2">Welcome to EMC</div>
              <div class="page-header mb-4">We provide user-friendly access to state-of-the-art equipment, service
                and expertise in electron microscopy.
              </div>
              <p>Our goal is to promote the development of researchers that are knowledgeable, confident and
                comfortable in the use of electron microscopes.</p>
              <PageErrors :errors="errors"/>
              <button class="btn btn-lg btn-iu-crimson" v-on:click="loadAuthURL">Get Started</button>
              <a href="#howitworks" class="ml-3 btn btn-lg btn-outline-dark">How it works</a>
            </div>
            <div class="col-lg-4">
              <img src="../assets/images/0.svg" class="img-fluid pt-5 mt-5" alt="">
            </div>
          </div>
        </div>
      </div>
      <div class="container py-5">
        <div class="row">
          <div class="col-lg-10">
            <div class="h1 font-weight-bold">Our Services</div>
            <p>On July 1, 2013, the Electron Microscopy Center (EMC) officially opened for business.</p>
          </div>
        </div>
        <div class="row course-cards">
          <div class="col-xl-3 col-lg-6 col-md-8 col-sm-12 p-3">
            <div class="card">
              <div class="card-body text-center">
                <img src="../assets/images/1.svg" class="p-3 img-fluid d-inline-block align-top"
                     alt="">
                <p class="card-text">Consultation on experimental design for the best use of electron
                  microscopes.</p>
              </div>
            </div>
          </div>
          <div class="col-xl-3 col-lg-6 col-md-8 col-sm-12 p-3">
            <div class="card">
              <div class="card-body text-center">
                <img src="../assets/images/2.svg" class="p-3 img-fluid d-inline-block align-top"
                     alt="">
                <p class="card-text">Fee-for-service work in all aspects of electron microscopy.</p>
              </div>
            </div>
          </div>
          <div class="col-xl-3 col-lg-6 col-md-8 col-sm-12 p-3">
            <div class="card">
              <div class="card-body text-center">
                <img src="../assets/images/3.svg" class="p-3 img-fluid d-inline-block align-top"
                     alt="">
                <p class="card-text">Training of new-users in sample preparation, microscope operation, and data
                  analysis.</p>
              </div>
            </div>
          </div>
          <div class="col-xl-3 col-lg-6 col-md-8 col-sm-12 p-3">
            <div class="card">
              <div class="card-body text-center">
                <img src="../assets/images/4.svg" class="p-3 img-fluid d-inline-block align-top"
                     alt="">
                <p class="card-text">Annual graduate course on biological electron microscopy.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="howitworks" class="container-fluid py-5" style="background-color: #4a3c31">
        <div class="container pt-5 text-light">
          <div class="row">
            <div class="col-lg-10 mb-5">
              <div class="display-4 text-light">How it works</div>
            </div>
          </div>
          <div class="row py-5">
            <div class="col-6">
              <div class="h1 font-weight-bold text-light mb-3">1. Create your login in the portal</div>
              <ul>
                <li>“Get Started” button takes you to the login page
                </li>
                <li>In login page use the “Register or Login with your Institution Identity” section and in the
                  next page select your institute.
                </li>
                <li>
                  Once logged in, you would be in the landing page of the portal “Collections”
                </li>
                <li>Once you have your EM files, those would be available here for you to view, download.
                </li>
              </ul>
            </div>
            <div class="col-6">
              <img src="../assets/images/image2.png" class="img-fluid rounded" alt="">
            </div>
            <div class="row py-5">
              <div class="col-6">
                <img src="../assets/images/image9.png" class="img-fluid rounded" alt="">
              </div>
              <div class="col-6">
                <ul>
                  <li>In login page use the “Register or Login with your Institution Identity” section and in
                    the
                    next page select your institute.
                  </li>
                </ul>
              </div>
            </div>
            <div class="row py-5">
              <div class="col-6">
                <ul>
                  <li>
                    Once logged in, you would be in the landing page of the portal “Collections”
                  </li>
                  <li>Once you have your EM files, those would be available here for you to view, download.
                  </li>
                </ul>
              </div>
              <div class="col-6">
                <img src="../assets/images/image13.png" class="img-fluid rounded" alt="">
              </div>
            </div>
            <div class="row py-5">
              <div class="col-6">
                <img src="../assets/images/image4.png" class="img-fluid rounded" alt="">
              </div>
              <div class="col-6">
                <div class="h1 font-weight-bold text-light mb-3">2. Use your EM from the center and copy
                  images
                </div>
                <ul>
                  <li>
                    When you login the data you got transferred from the EM should be visible within your
                    directory.
                  </li>
                  <li>When creating directories in the emc1.slate, the directory should be named as &#x3c;iu email&#x3e;_&#x3c;current
                    date&#x3e;
                  </li>
                  <li> Date format mmddyyyy</li>
                  <li>E.g. eabeysin@iu.edu_11302021
                  </li>

                </ul>
              </div>
            </div>
            <div class="row py-5">

              <div class="col-6">
                <ul>
                  <li>
                    An individual directory for each collection you have.
                  </li>
                  <li> Within the directory you can view the files in your collection

                  </li>
                  <li>
                    Each file
                    <ol>
                      <li>You can Download <img width="30" src="../assets/images/image12.png"
                                                class="img-fluid rounded" alt=""></li>
                      <li>You can add them to your own collection group <img width="30"
                                                                             src="../assets/images/image14.png"
                                                                             class="img-fluid rounded" alt=""></li>
                      <li>You can add notes to each file, collection for your reference <img width="30"
                                                                                             src="../assets/images/image8.png"
                                                                                             class="img-fluid rounded"
                                                                                             alt=""></li>
                      <li>You can view available metadata for each file, directory <img width="30"
                                                                                        src="../assets/images/image7.png"
                                                                                        class="img-fluid rounded"
                                                                                        alt=""></li>
                    </ol>
                  </li>

                </ul>
              </div>
              <div class="col-6">
                <img src="../assets/images/image10.png" class="img-fluid rounded" alt="">
              </div>
            </div>
            <div class="row py-5">
              <div class="col-6">
                <img src="../assets/images/image5.png" class="img-fluid rounded" alt="">
              </div>
              <div class="col-6">
                <div class="h1 font-weight-bold text-light mb-3">3. Use the portal to access the images, meta
                  data and share
                </div>
                <p>Do you want to share your collection? Your files?</p>
                <ol>
                  <li>

                    If you have permission to share, you would have the button enabled.
                  </li>
                  <li>
                    If you don't have permission to share, please contact your PI or Editor of the lab.
                  </li>
                  <li>
                    When you share, you can share with Editor permissions or View permissions.
                  </li>
                  <li>
                    Editor permission will enable you to share with others, view, download.
                  </li>
                  <li>
                    View permissions will allow you to view and download. No sharing.

                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import Login from "./LoginPage";

import custosStore from "airavata-custos-portal/src/lib/store";
import PageErrors from "@/components/PageErrors";

export default {
  name: "HomePage",
  components: {PageErrors},
  store: custosStore,
  data() {
    return {
      errors: []
    }
  },
  methods: {
    async loadAuthURL() {
      try {
        await this.$store.dispatch("auth/fetchAuthorizationEndpoint");
      } catch (e) {
        this.errors.push({
          variant: "danger",
          title: "Network Error",
          description: "Please contact the system administrator",
          source: e
        });
      }
    },
  }
}
</script>

<style scoped>
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