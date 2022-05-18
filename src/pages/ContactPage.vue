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


    <div class="main py-5">
      <div class="jumbotron iu-light-bg">
        <div class="container">
          <div class="page-sub-header">Contact</div>
          <div class="page-header">Reach to Us</div>
          <div class="row">
            <div class="col-12">
              <div>For EMC portal queries please contact <a href="mailto:circ@iu.edu">circ@iu.edu</a>
              </div>
              <div>EM Center queries please contact <a href="https://iubemcenter.indiana.edu/contact/index.html">https://iubemcenter.indiana.edu/contact/index.html</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "ContactPage"
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