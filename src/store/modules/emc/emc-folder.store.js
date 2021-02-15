import {emcService} from "@/store/util/emc.util";

const state = {
    folderMap: {},
    folderListMap: {}
};

function _getFoldersQueryString({offset = 0, limit = 20, path = ""}) {
    const params = {offset, limit, path};

    const queryString = Object.keys(params).map(paramKey => `${paramKey}=${params[paramKey]}`).join("&");

    return queryString;
}

const actions = {

    async fetchFolders({commit}, {offset, limit, path}) {
        const queryString = _getFoldersQueryString({offset, limit, path});

        const folders = await emcService.folders.get({path});
        const folderIds = folders.map(({folderId, path, name, createdAt, createdBy}) => {
            commit("SET_FILE", {folderId, path, name, createdAt, createdBy});

            return folderId;
        });

        commit("SET_FILE_LIST", {queryString, folderIds});
    }
}


const mutations = {
    SET_FILE(state, {folderId, path, name, createdAt, createdBy}) {
        state.folderMap = {
            ...state.folderMap,
            [folderId]: {
                ...state.folderMap[folderId],
                folderId, path, name, createdAt, createdBy
            }
        };
    },
    SET_FILE_LIST(state, {queryString, folderIds}) {
        state.folderListMap = {
            ...state.folderListMap,
            [queryString]: folderIds
        };
    }
}


const getters = {

    getFolders: (state, getters) => {
        return ({offset, limit, path}) => {
            const queryString = _getFoldersQueryString({offset, limit, path});
            const folderIds = state.folderListMap[queryString];
            if (folderIds) {
                return folderIds.map(folderId => getters.getFolder({folderId}));
            } else {
                return null;
            }
        }
    },

    getFolder: (state) => {
        return ({folderId}) => {
            if (state.folderMap[folderId]) {
                return state.folderMap[folderId];
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