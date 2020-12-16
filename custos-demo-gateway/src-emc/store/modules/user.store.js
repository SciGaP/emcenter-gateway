import {custosService} from "../util/custos.util";

const getDefaultState = () => {
    return {
        userMap: {},
        userListMap: {}
    }
}

const state = getDefaultState()

const actions = {
    async fetchUsers({commit}, {username, offset, limit}) {
        const params = {username, offset, limit};
        const {data: {users}} = await custosService.users.findUsers(params);

        const usernames = users.map((
            {id, username, first_name, last_name, email, realm_roles, client_roles, attributes}
        ) => {
            commit("SET_USER", {
                id, username, first_name, last_name, email, realm_roles, client_roles, attributes
            });

            return username;
        });

        commit("SET_USER_LIST", {queryString: JSON.stringify(params), usernames})
    }
}


const mutations = {
    SET_USER(state, {id, username, first_name, last_name, email, realm_roles, client_roles, attributes}) {
        state.userMap = {
            ...state.userMap,
            [username]: {id, username, first_name, last_name, email, realm_roles, client_roles, attributes}
        }
    },
    SET_USER_LIST(state, {queryString, usernames}) {
        state.userListMap = {
            ...state.userListMap,
            [queryString]: usernames
        }
    }
}

const getters = {
    getUser: (state) => ({username}) => {
        if (state.userMap[username]) {
            return state.userMap[username];
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