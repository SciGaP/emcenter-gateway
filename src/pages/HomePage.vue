<template>
  <div>
    <nav class="navbar fixed-top navbar-expand-lg navbar-dark navbar-lg iu-crimson-bg">
      <div class="container">
        <a class="navbar-brand" href="#"><img src="../assets/images/trident-large.png" height="30"
                                              class="d-inline-block align-top" alt=""> Electron Microscopy Center </a>
        <!--        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"-->
        <!--                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">-->
        <!--          <span class="navbar-toggler-icon"></span>-->
        <!--        </button>-->
        <!--        <div class="collapse navbar-collapse" id="navbarSupportedContent">-->
        <!--          <ul class="navbar-nav mr-auto">-->
        <!--          </ul>-->
        <!--          <form class="form-inline my-2 my-lg-0">-->
        <!--            <ul class="navbar-nav mr-2">-->
        <!--              <li class="nav-item">-->
        <!--                <a class="nav-link" href="#">How it Works</a>-->
        <!--              </li>-->
        <!--              <li class="nav-item">-->
        <!--                <a class="nav-link" href="#">Equipments</a>-->
        <!--              </li>-->
        <!--              <li class="nav-item">-->
        <!--                <a class="nav-link" href="#">Resources</a>-->
        <!--              </li>-->
        <!--              <li class="nav-item">-->
        <!--                <a class="nav-link" href="#">Contact</a>-->
        <!--              </li>-->
        <!--            </ul>-->
        <!--          </form>-->
        <!--        </div>-->
      </div>
    </nav>

    <div class="main pt-5">
      <div class="jumbotron iu-light-bg">
        <div class="container">
          <div class="row">
            <div class="col-lg-8 p-3">
              <div class="page-sub-header mb-2">Welcome to EMC</div>
              <div class="page-header mb-4">We provide user-friendly access to state-of-the-art equipment, service and
                expertise in electron microscopy.
              </div>
              <p>Our goal is to promote the development of researchers that are knowledgeable, confident and comfortable
                in the use of electron microscopes.</p>
              <router-link to="/login" v-slot="{ href, route, navigate}" tag="">
                <button class="btn btn-lg btn-iu-crimson" @click="navigate">Get Started</button>
              </router-link>

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
            <p>On July 1, 2013, the Electron Microscopy Center (EMC) officially opened for business. We gave away coffee
              and donuts all morning while answering questions about the new core facility and giving tours of the
              equipment.</p>
          </div>
        </div>
        <div class="row course-cards">
          <div class="col-xl-3 col-lg-6 col-md-8 col-sm-12 p-3">
            <div class="card">
              <div class="card-body text-center">
                <img src="../assets/images/1.svg" class="p-3 img-fluid d-inline-block align-top" alt="">
                <p class="card-text">Consultation on experimental design for the best use of electron microscopes.</p>
              </div>
            </div>
          </div>
          <div class="col-xl-3 col-lg-6 col-md-8 col-sm-12 p-3">
            <div class="card">
              <div class="card-body text-center">
                <img src="../assets/images/2.svg" class="p-3 img-fluid d-inline-block align-top" alt="">
                <p class="card-text">Fee-for-service work in all aspects of electron microscopy.</p>
              </div>
            </div>
          </div>
          <div class="col-xl-3 col-lg-6 col-md-8 col-sm-12 p-3">
            <div class="card">
              <div class="card-body text-center">
                <img src="../assets/images/3.svg" class="p-3 img-fluid d-inline-block align-top" alt="">
                <p class="card-text">Training of new-users in sample preparation, microscope operation, and data
                  analysis.</p>
              </div>
            </div>
          </div>
          <div class="col-xl-3 col-lg-6 col-md-8 col-sm-12 p-3">
            <div class="card">
              <div class="card-body text-center">
                <img src="../assets/images/4.svg" class="p-3 img-fluid d-inline-block align-top" alt="">
                <p class="card-text">Annual graduate course on biological electron microscopy.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container-fluid py-5" style="background-color: #4a3c31">
        <div class="container text-light">
          <div class="row">
            <div class="col-lg-10 mb-5">
              <div class="h1 font-weight-bold text-light">How it works</div>
              <p>On July 1, 2013, the Electron Microscopy Center (EMC) officially opened for business. We gave away
                coffee
                and donuts all morning while answering questions about the new core facility and giving tours of the
                equipment.</p>
            </div>
          </div>
          <div class="row py-5">
            <div class="col-6">
              <div class="display-4 mb-3">Step 1</div>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce porttitor mi in lorem finibus, fermentum
                faucibus purus semper. Curabitur feugiat interdum nulla, ut semper urna vulputate malesuada. Maecenas
                sit
                amet ipsum magna. Mauris ullamcorper fermentum interdum. Aenean tempus, dui non feugiat congue, lectus
                tellus bibendum erat, vel pellentesque ipsum tellus eget arcu. Pellentesque eget vulputate enim.
                Maecenas
                placerat turpis eget enim lobortis, id pellentesque sem pulvinar. </p>
            </div>
            <div class="col-6">
              <img src="../assets/images/ss1.png" class="img-fluid rounded" alt="">
            </div>
          </div>
          <div class="row py-5">
            <div class="col-6">
              <img src="../assets/images/ss2.png" class="img-fluid rounded" alt="">
            </div>
            <div class="col-6">
              <div class="display-4 mb-3">Step 2</div>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce porttitor mi in lorem finibus, fermentum
                faucibus purus semper. Curabitur feugiat interdum nulla, ut semper urna vulputate malesuada.
                Pellentesque
                eget vulputate enim. Maecenas placerat turpis eget enim lobortis, id pellentesque sem pulvinar. </p>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
// import Login from "./LoginPage";

export default {
  name: "HomePage"
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