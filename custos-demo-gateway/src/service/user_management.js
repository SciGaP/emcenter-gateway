import api from "./api.js";
import axios from "axios";


const usermgtEndpoint = "https://custos.scigap.org/apiserver/user-management/v1.0.0"
const tenantmgtEndpoint = "https://custos.scigap.org/apiserver/tenant-management/v1.0.0"

export default {

    registerUser(params) {
        let authHeader = {'Authorization': 'Bearer ' + btoa(params.client_id + ':' + params.client_sec)}
        let endpoint = usermgtEndpoint + "/user";
        let body = {
            'client_id': params.client_id,
            'username': params.username,
            'first_name': params.first_name,
            'last_name': params.last_name,
            'password': params.password,
            'temporary_password': false,
            'email': params.email
        }
        return api().post(endpoint,
            body, {headers: authHeader})
    },

    enableUser(params) {
        let authHeader = {'Authorization': 'Bearer ' + btoa(params.client_id + ':' + params.client_sec)}
        let endpoint = usermgtEndpoint + "/user/activation";
        let body = {
            username: params.username
        }
        return api().post(endpoint, body
            , {
                headers: authHeader
            })
    },

    disableUser(params) {
        let authHeader = {'Authorization': 'Bearer ' + btoa(params.client_id + ':' + params.client_sec)}
        let endpoint = usermgtEndpoint + "/user/deactivation";
        let body = {
            username: params.username
        }
        return api().post(endpoint, body
            , {
                headers: authHeader
            })
    },

    checkUsernameValidity(params) {
        let authHeader = {'Authorization': 'Bearer ' + btoa(params.client_id + ':' + params.client_sec)}
        let endpoint = usermgtEndpoint + "/user/availability";
        return api().get(endpoint,
            {
                params: {'user.username': params.username},
                headers: authHeader
            })
    },

    findUsers(params) {
        if (params.usertoken) {
            let authHeader = {'Authorization': 'Bearer ' + params.usertoken, 'user-token': params.usertoken}
            let endpoint = usermgtEndpoint + "/users";
            let id = params.username
            let param = {offset: params.offset, limit: params.limit, client_id: params.client_id, 'user.id': id}
            return api().get(endpoint,
                {
                    params: param,
                    headers: authHeader
                })
        } else {
            let authHeader = {'Authorization': 'Bearer ' + btoa(params.client_id + ':' + params.client_sec)}
            let endpoint = usermgtEndpoint + "/users";
            let id = params.username
            let param = {offset: params.offset, limit: params.limit, client_id: params.client_id, 'user.id': id}
            return api().get(endpoint,
                {
                    params: param,
                    headers: authHeader
                })
        }

    },

    addUserAttribute(params) {
        let authHeader = {'Authorization': 'Bearer ' + params.user_token}
        let endpoint = usermgtEndpoint + "/attributes";
        return api().post(endpoint, params.body
            , {
                headers: authHeader
            })
    },

    deleteUserAttribute(params) {
        let authHeader = {'Authorization': 'Bearer ' + params.user_token}
        let endpoint = usermgtEndpoint + "/attributes";
        return new Promise((resolve, reject) => {
            axios({
                method: 'delete',
                url: endpoint,
                data: params.body,
                headers: authHeader
            }).then((resp) => {
                resolve(resp)
            }).catch(errr => {
                reject(errr)
            })
        })


    },

    addRolesToUser(params) {
        let authHeader = {'Authorization': 'Bearer ' + params.user_token}
        let endpoint = usermgtEndpoint + "/users/roles";
        return api().post(endpoint, params.body
            , {
                headers: authHeader
            })

    },

    deleteRolesFromUser(params) {
        let authHeader = {'Authorization': 'Bearer ' + params.user_token}
        let endpoint = usermgtEndpoint + "/user/roles";
        return new Promise((resolve, reject) => {
            axios({
                method: 'delete',
                url: endpoint,
                data: params.body,
                headers: authHeader
            }).then((resp) => {
                resolve(resp)
            }).catch(errr => {
                reject(errr)
            })
        })
    },

    updateProfile(params) {
        if (params.usertoken) {
            let authHeader = {'Authorization': 'Bearer ' + params.usertoken, 'user-token': params.usertoken}
            let endpoint = usermgtEndpoint + "/user/profile";

            return api().put(endpoint, params.body
                , {
                    headers: authHeader
                })
        } else {
            let authHeader = {'Authorization': 'Bearer ' + btoa(params.client_id + ':' + params.client_sec)}
            let endpoint = usermgtEndpoint + "/user/profile";

            return api().put(endpoint, params.body
                , {
                    headers: authHeader
                })
        }

    },


    getTenantLevelRoles(params) {
        let authHeader = {'Authorization': 'Bearer ' + btoa(params.client_id + ':' + params.client_sec)}
        let endpoint = tenantmgtEndpoint + "/roles"
        return api().get(endpoint,
            {
                headers: authHeader
            })
    },

    getClientLevelRoles(params) {
        let authHeader = {'Authorization': 'Bearer ' + btoa(params.client_id + ':' + params.client_sec)}
        let endpoint = tenantmgtEndpoint + "/roles"
        let par = {client_level: true}
        return api().get(endpoint,
            {
                params: par,
                headers: authHeader
            })

    },

    grantAdminPrivilages(params) {
        let authHeader = {'Authorization': 'Bearer ' + params.user_token}
        let endpoint = usermgtEndpoint + "/user/admin"
        return api().post(endpoint, params.body
            , {
                headers: authHeader
            })
    },

    removeAdminPrivilages(params) {
        let authHeader = {'Authorization': 'Bearer ' + params.user_token}
        let endpoint = usermgtEndpoint + "/user/admin"
        return new Promise((resolve, reject) => {
            axios({
                method: 'delete',
                url: endpoint,
                data: params.body,
                headers: authHeader
            }).then((resp) => {
                resolve(resp)
            }).catch(errr => {
                reject(errr)
            })
        })
    }


}