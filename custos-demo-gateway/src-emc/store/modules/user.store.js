import {custosApiAxios, userMgtEndpoint} from "../util/custos.util";


const getDefaultState = () => {
    return {
        userMap: {},
        userListMap: {}
    }
}

const state = getDefaultState()

const actions = {
    async fetchUsers({commit}, {clientId, clientSecret, username, offset, limit}) {
        const params = {offset, limit: limit, client_id: clientId, 'user.id': username};
        const resp = await custosApiAxios.get(
            `${userMgtEndpoint}/users`,
            {
                params: params,
                headers: {'Authorization': 'Bearer ' + btoa(`${clientId}:${clientSecret}`)}
            }
        );
        const {data: {users}} = resp;

        const userIds = users.map((
            {id, username, first_name, last_name, email, realm_roles, client_roles, attributes}
        ) => {
            commit("SET_USER", {
                id, username, first_name, last_name, email, realm_roles, client_roles, attributes
            })
        });

        commit("SET_USER_LIST", {queryString: JSON.stringify(params), userIds})
    }
}


const mutations = {
    SET_USER(state, {id, username, first_name, last_name, email, realm_roles, client_roles, attributes}) {
        state.userMap = {
            ...state.userMap,
            [username]: {id, username, first_name, last_name, email, realm_roles, client_roles, attributes}
        }
    },
    SET_USER_LIST(state, {queryString, datasetIds}) {
        state.userListMap = {
            ...state.userListMap,
            [queryString]: datasetIds
        }
    }
}

const getters = {
    getUser: (state) => ({username}) => {
        return state.userMap[username];
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}