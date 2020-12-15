import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';
import collection from "./modules/collection.store"
import dataset from "./modules/dataset.store"
import user from "./modules/user.store"
import auth from "./modules/auth.store"


Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
    modules: {
        collection,
        dataset,
        user,
        auth
    },
    strict: debug,
    plugins: debug ? [createLogger()] : [],
})