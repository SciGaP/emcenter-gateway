import Vue from 'vue'
import App from './App.vue'
import router from "./router.js";
import store from './store/index.js'
import custosStore from "airavata-custos-portal/src/lib/store";
import {BootstrapVue, IconsPlugin} from 'bootstrap-vue'
import VueTypeaheadBootstrap from 'vue-typeahead-bootstrap';
import Vuelidate from 'vuelidate'

import i18n from "./i18n";

Vue.use(BootstrapVue)
Vue.use(Vuelidate)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.component('vue-typeahead-bootstrap', VueTypeaheadBootstrap)

Vue.config.productionTip = false

new Vue({
    router,
    custosStore,
    store,
    i18n,
    render: h => h(App),
}).$mount('#app')


