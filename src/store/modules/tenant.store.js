import {custosService} from "../util/custos.util";

const getDefaultState = () => {
    return {
        tenantRolesMap: {},
        tenantRolesListMap: {}
    }
};

const state = getDefaultState();

const actions = {
    async createTenantRole({commit}, {name, description, composite = false}) {
        const {id} = await custosService.tenants.createTenantRole({name, description, composite});

        commit('SET_TENANT_ROLE', {
            tenantRoleId: id,
            name,
            description,
            composite
        });
    },
    async fetchTenantRoles({commit}) {
        const DEFAULT_CUSTOS_ROLES = ["admin-read-only", "admin", "gateway-provider", "gateway-user", "offline_access",
            "uma_authorization", "user-pending"];

        let queryString = "";

        let {data: {roles}} = await custosService.tenants.fetchTenantRoles();
        const tenantRoleIds = roles.filter(({name}) => {
            return DEFAULT_CUSTOS_ROLES.indexOf(name) < 0
        }).map(({id, name, description, composite}) => {
            const tenantRoleId = id
            commit('SET_TENANT_ROLE', {tenantRoleId, name, description, composite});

            return tenantRoleId;
        });
        commit('SET_TENANT_ROLES_LIST', {queryString, tenantRoleIds});
    }
}

const mutations = {
    SET_TENANT_ROLE(state, {tenantRoleId, name, description, composite}) {
        state.tenantRolesMap = {
            ...state.tenantRolesMap,
            [tenantRoleId]: {tenantRoleId, name, description, composite}
        };
    },
    SET_TENANT_ROLES_LIST(state, {queryString, tenantRoleIds}) {
        state.tenantRolesListMap = {
            [queryString]: tenantRoleIds
        }
    }
}

const getters = {
    getTenantRoles(state, getters) {
        return () => {
            const queryString = "";
            if (state.tenantRolesListMap[queryString]) {
                return state.tenantRolesListMap[queryString].map(tenantRoleId => getters.getTenantRole({tenantRoleId}));
            } else {
                return null;
            }
        }
    },
    getTenantRole(state) {
        return ({tenantRoleId}) => {
            if (state.tenantRolesMap[tenantRoleId]) {
                return state.tenantRolesMap[tenantRoleId];
            } else {
                return null;
            }
        }
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
