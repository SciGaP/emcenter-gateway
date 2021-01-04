import tenant_management from "@/service/tenant_management";
import auth from "@/service/auth";


const getDefaultState = () => {
    return {
        tenants: [],
        activeClientId: '',
        activeClientSec: ''
    }
}

const state = getDefaultState()

const actions = {


    // eslint-disable-next-line no-unused-vars
    async validateTenant({commit}, data) {
        let response = await tenant_management.isVaildTenant(data)
        if (response) {
            return response.data.status
        } else {
            return false
        }
    },

    async isTenantModeActivated() {
        return auth.isTenantModeActivated()
    },

    async getActivatedClientId() {
        //return auth.getClientId()
        return auth.getClientId();
    },

    async getActivatedClientSecret() {
        //return auth.getClientId()
        return auth.getClientSec()
    },

    // eslint-disable-next-line no-unused-vars
    async getTenants({commit}, data) {

        let resp = await tenant_management.getTenants(data)
        return resp.data
    },


    // eslint-disable-next-line no-unused-vars
    async getTenantByClientId({commit}, data) {
        let resp = await tenant_management.getTenantByClientId(data)
        return resp.data
    },

    // eslint-disable-next-line no-unused-vars
    async updateTenantStatus({commit}, data) {
        let resp = await tenant_management.updateTenantStatus(data)
        return resp.data
    },

    // eslint-disable-next-line no-unused-vars
    async updateTenant({commit}, data) {
        let resp = await tenant_management.updateTenant(data)
        return resp.data
    },

    // eslint-disable-next-line no-unused-vars
    async createAdminTenant({commit}, data) {
        let resp = await tenant_management.createAdminTenant(data)
        return resp.data
    },

    // eslint-disable-next-line no-unused-vars
    async createChildTenant({commit}, data) {
        let resp = await tenant_management.createChildTenant(data)
        return resp.data
    }

}

const mutations = {}

const getters = {}


export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}