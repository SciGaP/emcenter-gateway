import {emcService} from "@/store/util/emc.util";

const state = {
    folderMap: {},
    folderPathMap: {},
    folderListMap: {}
};

function _getFoldersQueryString({offset = 0, limit = 20, groupId = null, parentFolderId = null}) {
    const params = {offset, limit, groupId, parentFolderId};

    const queryString = Object.keys(params).map(paramKey => {
        if (params[paramKey] !== null) {
            return `${paramKey}=${params[paramKey]}`;
        } else {
            return "";
        }
    }).join("&");

    return queryString;
}

const actions = {

    async fetchFolders({commit}, {offset = 0, limit = 20, groupId = null, parentFolderId = null} = {}) {
        const queryString = _getFoldersQueryString({offset, limit, groupId, parentFolderId});

        const folders = await emcService.folders.get({parentFolderId});
        const folderIds = folders.map(({folderId, name, createdAt, createdBy, own}) => {
            commit("SET_FOLDER", {folderId, name, createdAt, createdBy, own});

            return folderId;
        });

        commit("SET_FOLDER_LIST", {queryString, folderIds});
    },
    async downloadFolder({dispatch, rootGetters}, {folderId}) {
        await dispatch('emcFile/fetchFiles', {parentFolderId: folderId}, {root: true});
        const files = rootGetters["emcFile/getFiles"]({parentFolderId: folderId});
        for (let i = 0; i < files.length; i++) {
            dispatch('emcFile/downloadFile', {fileId: files[i].fileId}, {root: true});
        }
    },
    async fetchFolderPath({commit}, {folderId}) {
        const folderPath = await emcService.folders.fetchPath({folderId});
        const folderIds = folderPath.map(({folderId}) => {
            return folderId
        });

        commit("SET_FOLDER_PATH", {folderId, folderIds});
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
    SET_FOLDER_PATH(state, {folderId, folderIds}) {
        state.folderPathMap = {
            ...state.folderPathMap,
            [folderId]: folderIds
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
        return ({offset = 0, limit = 20, groupId = null, parentFolderId = null} = {}) => {
            const queryString = _getFoldersQueryString({offset, limit, groupId, parentFolderId});
            const folderIds = state.folderListMap[queryString];
            if (folderIds) {
                return folderIds.map(folderId => getters.getFolder({folderId}));
            } else {
                return null;
            }
        }
    },
    getFolderPath: (state, getters) => {
        return ({folderId}) => {
            const folderIds = state.folderPathMap[folderId];
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