import {emcService} from "@/store/util/emc.util";

const state = {
    storagePreferenceListMap: {},
    storagePreferenceMap: {}
};

const actions = {

    async fetchStoragePreferences({commit}) {
        const queryString = "";

        const resources = await emcService.storagePreference.fetchStoragePreferences();

        const storagePreferenceIds = resources.map(({storagePreferenceId, authType, username, credentialToken, storageId, hostName, port}) => {
            commit("SET_STORAGE_PREFERENCE", {
                storagePreferenceId, authType, username, credentialToken, storageId, hostName, port
            });

            return storagePreferenceId;
        });

        commit("SET_STORAGE_PREFERENCE_LIST", {queryString, storagePreferenceIds});
    },

    async createSSHStoragePreference(obj, {storagePreferenceId, authType, username, credentialToken, storageId, hostName, port}) {
        return await emcService.storagePreference.createSSHStoragePreference({
            storagePreferenceId,
            authType,
            username,
            credentialToken,
            storageId,
            hostName,
            port
        });
    },

    async deleteStoragePreference(obj, {storagePreferenceId}) {
        return await emcService.storagePreference.deleteStoragePreference({
            storagePreferenceId
        });
    }
}


const mutations = {
    SET_STORAGE_PREFERENCE_LIST(state, {queryString, storagePreferenceIds}) {
        state.storagePreferenceListMap = {
            ...state.storagePreferenceListMap,
            [queryString]: storagePreferenceIds
        }
    },
    SET_STORAGE_PREFERENCE(state, {storagePreferenceId, authType, username, credentialToken, storageId, hostName, port}) {
        state.storagePreferenceMap = {
            ...state.storagePreferenceMap,
            [storagePreferenceId]: {storagePreferenceId, authType, username, credentialToken, storageId, hostName, port}
        }
    }
}


const getters = {
    getStoragePreferences: (state, getters) => {
        return () => {
            const queryString = "";
            const storagePreferenceIds = state.storagePreferenceListMap[queryString];
            if (storagePreferenceIds) {
                return storagePreferenceIds.map(storagePreferenceId => getters.getStoragePreference({storagePreferenceId}));
            } else {
                return null;
            }
        }
    },
    getStoragePreference: (state) => {
        return ({storagePreferenceId}) => {
            if (state.storagePreferenceMap[storagePreferenceId]) {
                return state.storagePreferenceMap[storagePreferenceId];
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