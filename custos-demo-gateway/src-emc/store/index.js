import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';
import collection from "./modules/collection.store"


Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
    modules: {
        collection
    },
    strict: debug,
    plugins: debug ? [createLogger()] : [],
})