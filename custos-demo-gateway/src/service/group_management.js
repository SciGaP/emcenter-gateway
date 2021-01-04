import api from "./api.js";
import axios from "axios";

const groupMgtEndpoint = "https://custos.scigap.org/apiserver/group-management/v1.0.0"

export default {

    createGroup(params) {

        let authHeader = {'Authorization': 'Bearer ' + btoa(params.client_id + ':' + params.client_sec)}
        let endpoint = groupMgtEndpoint + "/group"
        return api().post(endpoint, params.body, {
            headers: authHeader
        })
    },

    updateGroup(params) {
        let authHeader = {'Authorization': 'Bearer ' + btoa(params.client_id + ':' + params.client_sec)}
        let endpoint = groupMgtEndpoint + "/group/" + params.group_id
        return api().put(endpoint, params.body, {
            headers: authHeader
        })
    },

    deleteGroup(params) {
        let authHeader = {'Authorization': 'Bearer ' + btoa(params.client_id + ':' + params.client_sec)}
        let endpoint = groupMgtEndpoint + "/group/" + params.group_id
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


    findGroup(params) {
        let authHeader = {'Authorization': 'Bearer ' + btoa(params.client_id + ':' + params.client_sec)}
        let endpoint = groupMgtEndpoint + "/group"
        let par = {
            group: {
                id: params.group_id
            }
        }
        return api().get(endpoint, {
            params: par,
            headers: authHeader
        })
    },

    getAllGroups(params) {
        let authHeader = {'Authorization': 'Bearer ' + btoa(params.client_id + ':' + params.client_sec)}
        let endpoint = groupMgtEndpoint + "/groups"

        return api().get(endpoint, {
            headers: authHeader
        })
    },

    addUserToGroup(params) {
        let authHeader = {'Authorization': 'Bearer ' + btoa(params.client_id + ':' + params.client_sec)}
        let endpoint = groupMgtEndpoint + "/user/group/membership"

        return api().post(endpoint, params.body, {
            headers: authHeader
        })

    },

    removeUserFromGroup(params) {
        let authHeader = {'Authorization': 'Bearer ' + btoa(params.client_id + ':' + params.client_sec)}
        let endpoint = groupMgtEndpoint + "/user/group/membership"

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

    changeGroupMembership(params) {
        let authHeader = {'Authorization': 'Bearer ' + btoa(params.client_id + ':' + params.client_sec)}
        let endpoint = groupMgtEndpoint + "/user/group/membership"

        return api().put(endpoint, params.body, {
            headers: authHeader
        })

    },

    addChildGroup(params) {
        let authHeader = {'Authorization': 'Bearer ' + btoa(params.client_id + ':' + params.client_sec)}
        let endpoint = groupMgtEndpoint + "/group/membership"

        return api().post(endpoint, params.body, {
            headers: authHeader
        })

    },

    removeChildGroup(params) {
        let authHeader = {'Authorization': 'Bearer ' + btoa(params.client_id + ':' + params.client_sec)}
        let endpoint = groupMgtEndpoint + "/group/membership"

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

    getAllChildUsers(params) {

        let authHeader = {'Authorization': 'Bearer ' + btoa(params.client_id + ':' + params.client_sec)}
        let endpoint = groupMgtEndpoint + "/user/group/memberships/child"
        let parm = {
            'group.id': params.group_id
        }


        return api().get(endpoint, {params: parm, headers: authHeader})

    },

    getAllChildGroups(params) {
        let authHeader = {'Authorization': 'Bearer ' + btoa(params.client_id + ':' + params.client_sec)}
        let endpoint = groupMgtEndpoint + "/groups/memberships/child"
        let parm = {
            'group.id': params.group_id
        }
        return api().get(endpoint, {params: parm, headers: authHeader})

    },


    getAllGroupsOfUser(params) {
        let authHeader = {'Authorization': 'Bearer ' + btoa(params.client_id + ':' + params.client_sec)}
        let endpoint = groupMgtEndpoint + "/user/group/memberships"
        let parm = {
            'profile.username': params.username
        }
        return api().get(endpoint, {params: parm, headers: authHeader})

    },


    getAllParentGroupsOfGroup(params) {
        let authHeader = {'Authorization': 'Bearer ' + btoa(params.client_id + ':' + params.client_sec)}
        let endpoint = groupMgtEndpoint + "/groups/memberships"
        let parm = {
            'group.id': params.groupId
        }
        return api().get(endpoint, {params: parm, headers: authHeader})

    },

    hasAccess(params) {
        let authHeader = {'Authorization': 'Bearer ' + btoa(params.client_id + ':' + params.client_sec)}
        let endpoint = groupMgtEndpoint + "/user/group/access"
        let parm = {
            'group_id': params.groupId,
            'username':params.username,
            'type': params.type
        }
        return api().get(endpoint, {params: parm, headers: authHeader})
    }


}

