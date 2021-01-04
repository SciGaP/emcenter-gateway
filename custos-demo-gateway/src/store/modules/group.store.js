/*Group.store.js*/

import group_management from "@/service/group_management";


const getDefaultState = () => {
    return {
        groups: [],
    }
}

const state = getDefaultState()


const actions = {

    async createGroup({commit}, data) {
        try {
            let resp = await group_management.createGroup(data)
            if (resp.data != null) {
                let group = resp.data;
                commit('SET_GROUP', group)
                return group
            }
        } catch (exception) {
            return false
        }
    },

    async loadAllGroups({commit}, data) {
        let rep = await group_management.getAllGroups(data)
        let groups = rep.data.groups
        commit('SET_GROUPS', groups)
        return groups
    },


    async updateGroup({commit}, data) {
        let response = await group_management.updateGroup(data)
        commit('SET_GROUP', response.data)
        return response.data
    },

    async deleteGroup({commit}, data) {
        let response = await group_management.deleteGroup(data)
        if (response.data.status) {
            commit('SET_DELETED_GROUP', data.group_id)
            return response.data
        }
    },

    // eslint-disable-next-line no-unused-vars
    async getGroup({commit}, data) {
        let response = await group_management.findGroup(data)
        return response.data
    },


    // eslint-disable-next-line no-unused-vars
    async addUserToGroup({commit}, data) {
        let response = await group_management.addUserToGroup(data)
        return response.data
    },

    // eslint-disable-next-line no-unused-vars
    async removeUserFromGroup({commit}, data) {
        let response = await group_management.removeUserFromGroup(data)
        return response.data
    },

    // eslint-disable-next-line no-unused-vars
    async addChildGroup({commit}, data) {
        let response = await group_management.addChildGroup(data)
        return response.data
    },

    // eslint-disable-next-line no-unused-vars
    async removeChildGroup({commit}, data) {
        let response = await group_management.removeChildGroup(data)
        return response.data
    },

    // eslint-disable-next-line no-unused-vars
    async changeGroupMembership({commit}, data) {
        let response = await group_management.changeGroupMembership(data)
        return response.data
    },

    // eslint-disable-next-line no-unused-vars
    async getAllChildUsers({commit}, data) {
        let response = await group_management.getAllChildUsers(data)
        return response.data
    },

    // eslint-disable-next-line no-unused-vars
    async getAllChildGroups({commit}, data) {
        let response = await group_management.getAllChildGroups(data)
        return response.data
    },

    // eslint-disable-next-line no-unused-vars
    async getAllGroupsOfUser({commit}, data) {
        let response = await group_management.getAllGroupsOfUser(data)
        return response.data.groups
    },


    // eslint-disable-next-line no-unused-vars
    async getAllParentGroups({commit}, data) {
        let response = await group_management.getAllParentGroupsOfGroup(data)
        return response.data.groups
    },

    // eslint-disable-next-line no-unused-vars
    async reset({commit}, data) {
        commit('RESET')
        return true
    },

    // eslint-disable-next-line no-unused-vars
    async hasAccess({commit}, data) {
        let response = await group_management.hasAccess(data)
        return response.data
    }

}


const mutations = {


    SET_GROUP(state, data) {
        let grs = []
        state.groups.forEach((gr) => {
            if (gr.id !== data.id) {
                grs.push(gr)
            }
        })
        grs.push(data)
        state.groups = grs
    },

    SET_DELETED_GROUP(state, data) {
        let grs = []
        state.groups.forEach((gr) => {
            if (gr.id !== data) {
                grs.push(gr)
            }
        })
        state.groups = grs
    },

    SET_GROUPS(state, data) {
        state.groups = data
    },


    RESET(state) {
        Object.assign(state, getDefaultState())
    }

}

const getters = {

    getGroups(state) {
        return state.groups
    }

}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
