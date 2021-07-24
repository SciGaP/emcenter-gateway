import {emcService} from "@/store/util/emc.util";

const state = {
    storageListMap: {},
    storageMap: {}
};

const actions = {

    async fetchStorages({commit}) {
        const queryString = "";

        const resources = await emcService.storage.fetchStorages();

        const storageIds = resources.map(({storageId, hostName, port}) => {
            commit("SET_STORAGE", {
                storageId, hostName, port
            });

            return storageId;
        });

        commit("SET_STORAGE_LIST", {queryString, storageIds});
    },

    async createSSHStorage(obj, {storageId, hostName, port}) {
        return await emcService.storage.createSSHStorage({
            storageId,
            hostName,
            port
        });
    }
}


const mutations = {
    SET_STORAGE_LIST(state, {queryString, storageIds}) {
        state.storageListMap = {
            ...state.storageListMap,
            [queryString]: storageIds
        }
    },
    SET_STORAGE(state, {storageId, hostName, port}) {
        state.storageMap = {
            ...state.storageMap,
            [storageId]: {storageId, hostName, port}
        }
    }
}


const getters = {
    getStorages: (state, getters) => {
        // console.log("two");
        return () => {
            const queryString = "";
            const storageIds = state.storageListMap[queryString];
            if (storageIds) {
                return storageIds.map(storageId => getters.getStorage({storageId}));
            } else {
                return null;
            }
        }
    },
    getStorage: (state) => {
        // console.log("one");
        return ({storageId}) => {
            if (state.storageMap[storageId]) {
                return state.storageMap[storageId];
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