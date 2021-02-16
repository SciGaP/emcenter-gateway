import {emcService} from "@/store/util/emc.util";

const state = {
    folderMap: {},
    folderListMap: {}
};

function _getFoldersQueryString({offset = 0, limit = 20, parentFolderId = ""}) {
    const params = {offset, limit, parentFolderId};

    const queryString = Object.keys(params).map(paramKey => `${paramKey}=${params[paramKey]}`).join("&");

    return queryString;
}

const actions = {

    async fetchFolders({commit}, {offset = 0, limit = 20, parentFolderId = null} = {}) {
        const queryString = _getFoldersQueryString({offset, limit, parentFolderId});

        const folders = await emcService.folders.get({parentFolderId});
        const folderIds = folders.map(({folderId, name, createdAt, createdBy, own}) => {
            commit("SET_FOLDER", {folderId, name, createdAt, createdBy, own});

            return folderId;
        });

        commit("SET_FOLDER_LIST", {queryString, folderIds});
    }
}


const mutations = {
    SET_FOLDER(state, {folderId, name, createdAt, createdBy, own}) {
        state.folderMap = {
            ...state.folderMap,
            [folderId]: {
                ...state.folderMap[folderId],
                folderId, name, createdAt, createdBy, own
            }
        };
    },
    SET_FOLDER_LIST(state, {queryString, folderIds}) {
        state.folderListMap = {
            ...state.folderListMap,
            [queryString]: folderIds
        };
    }
}


const getters = {

    getFolders: (state, getters) => {
        return ({offset = 0, limit = 20, parentFolderId} = {}) => {
            const queryString = _getFoldersQueryString({offset, limit, parentFolderId});
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
                const {name, createdAt, createdBy, own} = state.folderMap[folderId];

                return {folderId, name, createdAt, createdBy, own};
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