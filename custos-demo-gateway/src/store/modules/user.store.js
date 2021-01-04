import user_management from "@/service/user_management";


const getDefaultState = () => {
    return {
        users: [],
        tenantLevelRoles: [],
        clientLevelRoles: []
    }
}

const state = getDefaultState()

const actions = {
    // eslint-disable-next-line no-unused-vars
    async registerUser({commit}, data) {
        let resp = await user_management.registerUser(data)
        if (resp.data.is_registered) {
            let secData = {
                'username': data.username, 'client_id': data.client_id,
                'client_sec': data.client_sec,
            }
            await user_management.enableUser(secData)
            return true
        }
    },

    // eslint-disable-next-line no-unused-vars
    async checkUsernameIsValid({commit}, data) {

        let rep = await user_management.checkUsernameValidity(data)
        return rep.data.status
    },

    async users({commit}, data) {
        let response = await user_management.findUsers(data)
        commit('SET_USERS', response.data.users)
        return  response.data.users
    },

    // eslint-disable-next-line no-unused-vars
    async addUserAttributes({commit}, data) {
        let response = await user_management.addUserAttribute(data)
        return response.data.status
    },

    // eslint-disable-next-line no-unused-vars
    async deleteUserAttributes({commit}, data) {
        let response = await user_management.deleteUserAttribute(data)
        return response.data.status
    },

    async getTenantLevelRoles({commit}, data) {
        let roles = await user_management.getTenantLevelRoles(data)
        let tRoles = []
        roles.data.roles.forEach(r => {
            tRoles.push(r.name)
        })
        commit('SET_TENANT_LEVEL_ROLES', tRoles)
        return tRoles

    },

    async getClientLevelRoles({commit}, data) {
        let roles = await user_management.getClientLevelRoles(data)
        let tRoles = []
        roles.data.roles.forEach(r => {
            tRoles.push(r.name)
        })
        commit('SET_CLIENT_LEVEL_ROLES', tRoles)
        return tRoles

    },

    // eslint-disable-next-line no-unused-vars
    async addRoleToUser({commit}, data) {
        let response = await user_management.addRolesToUser(data)
        return response.data.status
    },

    // eslint-disable-next-line no-unused-vars
    async deleteRoleFromUser({commit}, data) {
        let response = await user_management.deleteRolesFromUser(data)
        return response.data.status
    },

    // eslint-disable-next-line no-unused-vars
    async enableUser ({commit}, data) {
       let response =  await  user_management.enableUser(data)
        return response.data.state
    },

    // eslint-disable-next-line no-unused-vars
    async disableUser({commit}, data) {
      let response =  await  user_management.disableUser(data)
        return response.data.state
    },

    // eslint-disable-next-line no-unused-vars
    async updateUserProfile({commit}, data) {
        return  await  user_management.updateProfile(data)
    },


    // eslint-disable-next-line no-unused-vars
    async grantAdminPrivilages({commit}, data) {
        return  await  user_management.grantAdminPrivilages(data)
    },

    // eslint-disable-next-line no-unused-vars
    async removeAdminPrivilages({commit}, data) {
        return  await  user_management.removeAdminPrivilages(data)
    },

    // eslint-disable-next-line no-unused-vars
    async reset({commit}, data){
        commit('RESET')
        return true
    }

}


const mutations = {


    SET_USERS(state, data) {
        state.users = data
    },


    SET_TENANT_LEVEL_ROLES(state, data) {
        state.tenantLevelRoles = data
    },

    SET_CLIENT_LEVEL_ROLES(state, data) {
        state.clientLevelRoles = data
    },

    RESET(state) {
        Object.assign(state, getDefaultState())
    }

}

const getters = {

    getUsers(state) {
        return state.users
    },

}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}