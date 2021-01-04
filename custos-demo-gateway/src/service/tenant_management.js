import api from "./api.js";

const tenantMgtEndpoint = "/tenant-management/v1.0.0"

export default {

    isVaildTenant(params) {
        try {
            let authHeader = {'Authorization': 'Bearer ' + params.usertoken}
            let endpoint = tenantMgtEndpoint + "/tenant/credentials/status"
            return api().post(endpoint, params.body, {
                headers: authHeader
            })
        } catch (e) {
            return false
        }
    },


    getTenants(data) {
        let authHeader = {'Authorization': 'Bearer ' + data.usertoken}
        let endpoint = tenantMgtEndpoint + "/tenants"
        let params = {
            limit: data.limit,
            offset: data.offset,
            status: data.status,
            requester_email: data.requester_email
        }
        return api().get(endpoint, {params: params, headers: authHeader})
    },

    getTenantByClientId(data) {
        let authHeader = {'Authorization': 'Bearer ' + data.usertoken}
        let endpoint = tenantMgtEndpoint + "/oauth2/tenant"
        let params = {
            client_id: data.requesting_client_id
        }
        return api().get(endpoint, {params: params, headers: authHeader})
    },

    updateTenantStatus(data) {
        let authHeader = {'Authorization': 'Bearer ' + data.user_token}
        let endpoint = tenantMgtEndpoint + "/status"
        let body = {
            client_id: data.updating_client_id,
            status: data.updating_status
        }
        return api().post(endpoint, body, {headers: authHeader})
    },

    updateTenant(data) {
        let authHeader = {'Authorization': 'Bearer ' + data.usertoken}
        let endpoint = tenantMgtEndpoint + "/oauth2/tenant"
        return api().put(endpoint, data.body, {headers: authHeader})
    },

    createAdminTenant(data) {
        let endpoint = tenantMgtEndpoint + "/oauth2/tenant"
        return api().post(endpoint, data.body)
    },

    createChildTenant(data) {
        let authHeader = {'Authorization': 'Bearer ' + btoa(data.client_id + ':' + data.client_sec)}
        let endpoint = tenantMgtEndpoint + "/oauth2/tenant"
        return api().post(endpoint, data.body, {headers: authHeader})
    }


}