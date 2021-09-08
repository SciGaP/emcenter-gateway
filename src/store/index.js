import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';


import emcResource from "./modules/emc/emc-resource.store";
import emcStoragePreference from "./modules/emc/emc-storage-preference.store";
import emcStorage from "./modules/emc/emc-storage.store";


import {createCustosStore} from "airavata-custos-portal/src/lib/store/util";


Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';


export default new Vuex.Store({
    modules: {
        "emcResource": emcResource,
        "emcStoragePreference": emcStoragePreference,
        "emcStorage": emcStorage
    },
    strict: debug,
    plugins: debug ? [createLogger()] : [],
})


// Vue.use(Vuex);
export const custosStore = createCustosStore(Vuex, Vue);
