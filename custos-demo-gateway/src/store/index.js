import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';
import identity from './modules/identity.store';
import user from './modules/user.store'
import agent from './modules/agent.store'
import group from './modules/group.store'
import secret from './modules/secret.store'
import log from './modules/log.store'
import sharing from './modules/sharing.store'
import tenant from './modules/tenant.store'


Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
    modules: {
        identity,
        user,
        agent,
        group,
        secret,
        log,
        sharing,
        tenant
    },
    strict: debug,
    plugins: debug ? [createLogger()] : [],
})