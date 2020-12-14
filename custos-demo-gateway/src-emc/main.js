import Vue from 'vue'
import App from './App.vue'
import router from "./router.js";
import store from '../src/store/index.js'
import {BootstrapVue, IconsPlugin} from 'bootstrap-vue'
import Vuelidate from 'vuelidate'

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import i18n from "./i18n";

Vue.use(BootstrapVue)
Vue.use(Vuelidate)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.config.productionTip = false

new Vue({
    router,
    store,
  i18n,
    render: h => h(App),
}).$mount('#app')


