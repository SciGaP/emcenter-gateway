import CustosService from "../service";
import {clientId, clientSecret, baseURL} from "../util/config.util";

const getDefaultState = () => {
    return {
        groupMap: {},
        groupListMap: {}
    }
};

const state = getDefaultState();

const custosService = new CustosService({clientId, clientSecret, baseURL});

const actions = {
    async createGroup({commit}, {name, description, ownerId, realm_roles, client_roles, attributes, sub_groups}) {
        const {groupId} = await custosService.groups.createGroup({
            name, description, ownerId, realm_roles, client_roles, attributes, sub_groups
        });
        commit('SET_GROUP', {groupId, name, description, ownerId, realm_roles, client_roles, attributes, sub_groups});
    },
    async fetchGroups({commit}) {

        // TODO enable api filtering, pagination, etc.
        let queryString = "";

        let {data: {groups}} = await custosService.groups.getAllGroups();
        const groupIds = groups.map((
            {groupId, name, description, ownerId, realm_roles, client_roles, attributes, sub_groups}
        ) => {
            commit('SET_GROUP', {
                groupId, name, description, ownerId, realm_roles, client_roles, attributes, sub_groups
            });
        });
        commit('SET_GROUP_LIST', {queryString, groupIds});
    },


    async updateGroup({commit}, {
        groupId, name, description, ownerId, realm_roles, client_roles, attributes, sub_groups
    }) {
        await custosService.groups.updateGroup({
            groupId, name, description, ownerId, realm_roles, client_roles, attributes, sub_groups
        });
        commit('SET_GROUP', {groupId, name, description, ownerId, realm_roles, client_roles, attributes, sub_groups});
    },

    async deleteGroup({commit}, {groupId}) {
        await custosService.groups.deleteGroup({groupId});
        commit('SET_GROUP_DELETED', {groupId});
    },

    async fetchGroup({commit}, {groupId}) {
        const {
            name, description, ownerId, realm_roles, client_roles, attributes, sub_groups
        } = await custosService.groups.findGroup({groupId});
        commit('SET_GROUP', {groupId, name, description, ownerId, realm_roles, client_roles, attributes, sub_groups});
    }
}


const mutations = {
    SET_GROUP(state, {groupId, name, description, ownerId, realm_roles, client_roles, attributes, sub_groups}) {
        state.groupMap = {
            ...state.groupMap,
            [groupId]: {groupId, name, description, ownerId, realm_roles, client_roles, attributes, sub_groups}
        };
    },
    SET_GROUP_DELETED(state, {groupId}) {
        state.groupMap = {
            ...state.groupMap,
            [groupId]: null
        };
    },
    SET_GROUP_LIST(state, {queryString, groupIds}) {
        state.groupListMap = {
            [queryString]: groupIds
        }
    }
}

const getters = {
    getGroups(state) {
        const queryString = "";
        if (state.groupListMap[queryString]) {
            return state.groupListMap[queryString];
        } else {
            return null;
        }
    },
    getGroup(state, {groupId}) {
        if (state.groupMap[groupId]) {
            return state.groupMap[groupId];
        } else {
            return null;
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
