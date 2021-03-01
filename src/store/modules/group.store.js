import {custosService} from "../util/custos.util";

const getDefaultState = () => {
    return {
        groupMap: {},
        groupListMap: {},
        groupUserListMap: {}
    }
};

const state = getDefaultState();

const actions = {
    async createGroup({commit}, {name, description, ownerId, realm_roles, client_roles, attributes, sub_groups}) {
        const {id} = await custosService.groups.createGroup({
            name, description, ownerId, realm_roles, client_roles, attributes, sub_groups
        });

        commit('SET_GROUP', {
            groupId: id,
            name,
            description,
            ownerId,
            realm_roles,
            client_roles,
            attributes,
            sub_groups
        });
    },
    async fetchGroups({commit}) {

        // TODO enable api filtering, pagination, etc.
        let queryString = "";

        let {data: {groups}} = await custosService.groups.getAllGroups();
        const groupIds = groups.map((
            {id, name, description, owner_id, realm_roles, client_roles, attributes, sub_groups}
        ) => {
            const groupId = id
            commit('SET_GROUP', {
                groupId, name, description, ownerId: owner_id, realm_roles, client_roles, attributes, sub_groups
            });

            return groupId;
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
    },

    async addUserToGroup(obj, {groupId, username, membershipType}) {
        await custosService.groups.addUserToGroup({groupId, username, membershipType});
    },

    async removeUserFromGroup(obj, data) {
        let response = await custosService.groups.removeUserFromGroup(data)
        return response.data
    },

    // async addChildGroup(obj, data) {
    //     let response = await custosService.groups.addChildGroup(data)
    //     return response.data
    // },
    //
    // async removeChildGroup(obj, data) {
    //     let response = await custosService.groups.removeChildGroup(data)
    //     return response.data
    // },
    //
    // async changeGroupMembership(obj, data) {
    //     let response = await custosService.groups.changeGroupMembership(data)
    //     return response.data
    // },
    //
    // async getAllChildUsers(obj, {groupId}) {
    //     let response = await custosService.groups.getAllChildUsers({groupId})
    //     return response.data
    // },

    // async getAllChildGroups(obj, data) {
    //     let response = await custosService.groups.getAllChildGroups(data)
    //     return response.data
    // },

    // async getAllGroupsOfUser(obj, data) {
    //     let response = await custosService.groups.getAllGroupsOfUser(data)
    //     return response.data.groups
    // },
    //
    // async getAllParentGroups(obj, data) {
    //     let response = await custosService.groups.getAllParentGroupsOfGroup(data)
    //     return response.data.groups
    // },

    async hasAccess(obj, data) {
        let response = await custosService.groups.hasAccess(data)
        return response.data
    }
}

const mutations = {
    SET_GROUP(state, {groupId, name, description, ownerId, realm_roles, client_roles, attributes, sub_groups}) {

        //TODO remove
        if (["89dc135b-9ee0-4d5f-8ef1-dc8277f86721", "a3e2d7a0-3f33-41c6-ab92-f37e16a6bd26"].indexOf(groupId) >= 0) {
            return;
        } else {
            const mockNamesMap = {
                "abcd1_0d65f49e-ee2b-41da-91db-a99926434025": "Thomas Lab",
                "abcd1_e7cedaaf-b540-49da-ad62-0faa315a79b9": "Donald's Lab",
                "abcd2_17d4370f-8f31-4527-a7ce-d03b64ae1ef1": "Sanjiva Lab",
                "abcd3_e2a24715-ec77-48eb-8d7d-cdaac4d3cbe2": "Sherazad Lab",
                "abcd4_3320aa06-fc47-444a-aad9-f4387560373e": "Geoffry Lab",
                "abcd4_53426d3c-fe05-45e5-a3e4-ef5c91f089d7": "Rex Lab",
                "abcd5_3e5e087e-5e8f-4d34-835a-26b9d6815716": "Maxx Lab",
                "abcd6_6312b2eb-b936-4b8b-9996-8a406c1475a6": "Judy Lab",
                "abcd_0bc7aa2e-5320-4b55-a224-62a0c08f6716": "Lara Lab",
                "abcd_7_5829d11a-d925-4556-afd3-b15b2a35f099": "Fredric Lab",
                "c9f6ca4c-f62a-435e-af4e-aacc13d17e87": "Bach Lab"
            }
            if (mockNamesMap[groupId]) {
                name = mockNamesMap[groupId]
            }
        }

        state.groupMap = {
            ...state.groupMap,
            [groupId]: {groupId, name, description, ownerId, realm_roles, client_roles, attributes, sub_groups}
        };
    },
    SET_GROUP_DELETED(state, {groupId}) {
        for (let queryString in state.groupListMap) {
            state.groupListMap = {
                ...state.groupListMap,
                [queryString]: state.groupListMap[queryString].filter(_groupId => _groupId !== groupId)
            }
        }

        state.groupMap = {
            ...state.groupMap,
            [groupId]: null
        };
    },
    SET_GROUP_LIST(state, {queryString, groupIds}) {
        // TODO remove
        groupIds = groupIds.filter(groupId => {
            return ["89dc135b-9ee0-4d5f-8ef1-dc8277f86721", "a3e2d7a0-3f33-41c6-ab92-f37e16a6bd26"].indexOf(groupId) < 0;
        })

        state.groupListMap = {
            [queryString]: groupIds
        }
    }
}

const getters = {
    getGroups(state, getters) {
        return () => {
            const queryString = "";
            if (state.groupListMap[queryString]) {
                return state.groupListMap[queryString].map(groupId => getters.getGroup({groupId}));
            } else {
                return null;
            }
        }
    },
    getGroup(state) {
        return ({groupId}) => {
            if (state.groupMap[groupId]) {
                return state.groupMap[groupId];
            } else {
                return null;
            }
        }
    },
    getGroupUsers(state) {
        return ({groupId}) => {
            if (state.groupUserListMap[groupId]) {
                return state.groupUserListMap[groupId];
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
