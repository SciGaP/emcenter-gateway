// import {emcService} from "@/store/util/emc.util";
// import axios from "axios";

const state = {
    storagePreferencesMap: {
        0: {
            storagePreferenceId: 0,
            storageType: "google-drive",
            storageEmail: "circ@emc.org"
        },
        1: {
            storagePreferenceId: 1,
            storageType: "google-drive",
            storageEmail: "circ-student@emc.org"
        },
        2: {
            storagePreferenceId: 2,
            storageType: "onedrive",
            storageEmail: "circ@outlook.com"
        },
        3: {
            storagePreferenceId: 3,
            storageType: "onedrive",
            storageEmail: "emc1234@gmail.com"
        },
        4: {
            storagePreferenceId: 4,
            storageType: "dropbox",
            storageEmail: "circ@emc.org"
        }
    },
    storagePreferenceList: [0, 1, 2, 3, 4],
    defaultStoragePreference: 1
};


const actions = {
    async setDefaultStoragePreference({commit}, {defaultStoragePreference}) {
        commit("SET_DEFAULT_STORAGE_PREFERENCE", {defaultStoragePreference});
    },
    async fetchStoragePreferences({commit}) {
        commit("SET_DEFAULT_STORAGE_PREFERENCE_LIST", []);
    }
}


const mutations = {
    SET_DEFAULT_STORAGE_PREFERENCE(state, {defaultStoragePreference}) {
        state.defaultStoragePreference = defaultStoragePreference;
    },
    SET_STORAGE_PREFERENCE(state, {storagePreferenceId, storageType, storageEmail}) {
        state.storagePreferencesMap = {
            ...state.storagePreferencesMap,
            [storagePreferenceId]: {storagePreferenceId, storageType, storageEmail}
        };
    },
    SET_STORAGE_PREFERENCE_LIST(state, {storagePreferenceIds}) {
        state.storagePreferenceList = storagePreferenceIds;
    }
}

const getters = {
    getStoragePreferences: (state, getters) => {
        return () => {
            return state.storagePreferenceList.map(storagePreferenceId =>
                getters.getStoragePreference({storagePreferenceId}));
        }
    },

    getStoragePreference: (state) => {
        return ({storagePreferenceId}) => {
            if (state.storagePreferencesMap[storagePreferenceId]) {
                return state.storagePreferencesMap[storagePreferenceId]
            } else {
                return null;
            }
        }
    },
    getDefaultStoragePreference: (state) => {
        return () => {
            return state.defaultStoragePreference
        }
    },

}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}