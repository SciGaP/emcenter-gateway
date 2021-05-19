// import {emcService} from "@/store/util/emc.util";

const state = {
    collectionGroupMap: {},
    collectionGroupFileMap: {},
    collectionGroupFolderMap: {},
    collectionGroupList: []
};


const actions = {
    async createCollectionGroup({commit, state, rootGetters}, {name}) {
        const collectionGroupId = state.collectionGroupList.length;
        const createdBy = rootGetters["auth/currentUsername"];
        const createdAt = new Date().toISOString();
        const lastUpdatedBy = createdBy;
        const lastUpdatedAt = createdAt;
        commit("SET_COLLECTION_GROUP", {collectionGroupId, name, createdBy, createdAt, lastUpdatedBy, lastUpdatedAt});
    },
    async mapFileToCollectionGroup({commit}, {collectionGroupId, fileId}) {
        commit("SET_COLLECTION_GROUP_FILE", {collectionGroupId, fileId});
    },
    async mapFolderToCollectionGroup({commit}, {collectionGroupId, folderId}) {
        commit("SET_COLLECTION_GROUP_FOLDER", {collectionGroupId, folderId});
    },
    async downloadCollectionGroup({dispatch, state}, {collectionGroupId}) {
        const files = state.collectionGroupFolderMap[collectionGroupId];
        const folders = state.collectionGroupFileMap[collectionGroupId];
        for (let i = 0; i < files.length; i++) {
            dispatch('emcFile/downloadFile', {fileId: files[i]}, {root: true});
        }
        for (let i = 0; i < folders.length; i++) {
            dispatch('emcFolder/downloadFolder', {folderId: folders[i]}, {root: true});
        }
    }
}

const mutations = {
    SET_COLLECTION_GROUP(state, {collectionGroupId, name, createdBy, createdAt, lastUpdatedBy, lastUpdatedAt}) {
        state.collectionGroupMap = {
            ...state.collectionGroupMap,
            [collectionGroupId]: {
                ...state.collectionGroupMap[collectionGroupId],
                collectionGroupId, name, createdBy, createdAt, lastUpdatedBy, lastUpdatedAt
            }
        };
        state.collectionGroupList = [
            ...state.collectionGroupList,
            collectionGroupId
        ];
    },
    SET_COLLECTION_GROUP_FILE(state, {collectionGroupId, fileId}) {
        state.collectionGroupFileMap = {
            ...state.collectionGroupFileMap,
            [collectionGroupId]: [
                ...state.collectionGroupFileMap[collectionGroupId],
                fileId
            ]
        };
    },
    SET_COLLECTION_GROUP_FOLDER(state, {collectionGroupId, folderId}) {
        state.collectionGroupFolderMap = {
            ...state.collectionGroupFolderMap,
            [collectionGroupId]: [
                ...state.collectionGroupFolderMap[collectionGroupId],
                folderId
            ]
        };
    }
}


const getters = {
    getCollectionGroups: (state) => {
        return () => {
            return state.collectionGroupList.map((collectionGroupId) => {
                return state.collectionGroupMap[collectionGroupId];
            });
        }
    },
    getCollectionGroup: (state) => {
        return ({collectionGroupId}) => {
            return state.collectionGroupMap[collectionGroupId];
        }
    },
    getCollectionGroupFiles: (state, rootGetters) => {
        return ({collectionGroupId}) => {
            if (state.collectionGroupFileMap[collectionGroupId]) {
                return state.collectionGroupFileMap[collectionGroupId].map((fileId) => {
                    return rootGetters["emcFile/getFile"]({fileId});
                });
            } else {
                return [];
            }
        }
    },
    getCollectionGroupFolders: (state, rootGetters) => {
        return ({collectionGroupId}) => {
            if (state.collectionGroupFolderMap[collectionGroupId]) {
                return state.collectionGroupFolderMap[collectionGroupId].map((folderId) => {
                    return rootGetters["emcFolder/getFolder"]({folderId});
                });
            } else {
                return [];
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