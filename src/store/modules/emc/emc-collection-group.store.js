const state = {
    collectionGroupMap: {
        0: {
            collectionGroupId: 0,
            name: "Brain Tumor Analysis",
            createdBy: "admin",
            createdAt: new Date().toISOString(),
            lastUpdatedBy: "admin",
            lastUpdatedAt: new Date().toISOString()
        },
        1: {
            collectionGroupId: 1,
            name: "Bio Tech Paper",
            createdBy: "admin",
            createdAt: new Date().toISOString(),
            lastUpdatedBy: "admin",
            lastUpdatedAt: new Date().toISOString()
        }
    },
    collectionGroupFileMap: {},
    collectionGroupFolderMap: {},
    collectionGroupList: [0, 1]
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
        console.log("state.collectionGroupFileMap : ", state.collectionGroupFileMap);
        state.collectionGroupFileMap = {
            ...state.collectionGroupFileMap,
            [collectionGroupId]: {
                ...state.collectionGroupFileMap[collectionGroupId],
                [fileId]: true
            }
        };
    },
    SET_COLLECTION_GROUP_FOLDER(state, {collectionGroupId, folderId}) {
        state.collectionGroupFolderMap = {
            ...state.collectionGroupFolderMap,
            [collectionGroupId]: {
                ...state.collectionGroupFolderMap[collectionGroupId],
                [folderId]: true
            }
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
    getCollectionGroupFiles: (state, getters, rootState, rootGetters) => {
        return ({collectionGroupId}) => {
            const files = [];
            if (state.collectionGroupFileMap[collectionGroupId]) {
                for (let fileId in state.collectionGroupFileMap[collectionGroupId]) {
                    if (state.collectionGroupFileMap[collectionGroupId][fileId]) {
                        files.push(rootGetters["emcFile/getFile"]({fileId}));
                    }
                }
            }

            return files;
        }
    },
    getCollectionGroupFolders: (state, getters, rootState, rootGetters) => {
        return ({collectionGroupId}) => {
            const folders = [];
            if (state.collectionGroupFolderMap[collectionGroupId]) {
                for (let folderId in state.collectionGroupFolderMap[collectionGroupId]) {
                    if (state.collectionGroupFolderMap[collectionGroupId][folderId]) {
                        folders.push(rootGetters["emcFolder/getFolder"]({folderId}));
                    }
                }
            }

            return folders;
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