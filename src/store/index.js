import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';
// import user from "./modules/user.store";
// import group from "./modules/group.store";
// import tenant from "./modules/tenant.store";
// import sharing from "./modules/sharing.store";
// import entity from "./modules/entity.store";
// import auth from "./modules/auth.store";
// import ciLogon from "./modules/ci-logon.store";

import emcFile from "./modules/emc/emc-file.store";
import emcFolder from "./modules/emc/emc-folder.store";
import emcCollectionGroup from "./modules/emc/emc-collection-group.store";
import emcStorageSettings from "./modules/emc/emc-storage-settings.store";


import {createCustosStore} from "custos-demo-gateway/src/lib/store/util";


Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';


export default new Vuex.Store({
    modules: {
        // auth,
        // user,
        // group,
        // tenant,
        // sharing,
        // entity,
        // ciLogon,
        "emcFile": emcFile,
        "emcFolder": emcFolder,
        "emcCollectionGroup": emcCollectionGroup,
        "emcStorageSettings": emcStorageSettings
    },
    strict: debug,
    plugins: debug ? [createLogger()] : [],
})


// Vue.use(Vuex);
export const custosStore = createCustosStore(Vuex, Vue);
