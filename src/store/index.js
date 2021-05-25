import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';
import collection from "./modules/collection.store";
import dataset from "./modules/dataset.store";
import user from "./modules/user.store";
import group from "./modules/group.store";
import tenant from "./modules/tenant.store";
import auth from "./modules/auth.store";

import emcFile from "./modules/emc/emc-file.store";
import emcFolder from "./modules/emc/emc-folder.store";
import emcCollectionGroup from "./modules/emc/emc-collection-group.store";
import emcStorageSettings from "./modules/emc/emc-storage-settings.store";
import {custosService} from "@/store/util/custos.util";


Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

const custosSessionPlugin = store => {
    store.dispatch('auth/init')
    custosService.identity.onChange(() => store.dispatch('auth/init'))
}

export default new Vuex.Store({
    modules: {
        collection,
        dataset,
        auth,
        user,
        group,
        tenant,
        "emcFile": emcFile,
        "emcFolder": emcFolder,
        "emcCollectionGroup": emcCollectionGroup,
        "emcStorageSettings": emcStorageSettings
    },
    strict: debug,
    plugins: debug ? [createLogger(), custosSessionPlugin] : [custosSessionPlugin],
})