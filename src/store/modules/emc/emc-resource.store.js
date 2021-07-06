import {emcService} from "@/store/util/emc.util";

const state = {
    resourceMap: {},
    resourceListMap: {},
    resourceDownloadMap: {}
};

const actions = {

    async fetchResources({commit}, {parentResourceId, type} = {}) {
        const queryString = JSON.stringify({parentResourceId, type});

        const resources = await emcService.resources.fetchResources({parentResourceId, type});

        console.log("##### fetchResources ### queryString : ", queryString);
        console.log("##### fetchResources ### : ", resources);

        const resourceIds = resources.map(({resourceId, entityId, name, description, createdAt, createdBy, lastUpdatedAt, lastUpdatedBy, status, type}) => {
            commit("SET_RESOURCE", {
                resourceId,
                entityId,
                name,
                description,
                createdAt,
                createdBy,
                lastUpdatedAt,
                lastUpdatedBy,
                status,
                type
            });

            return resourceId;
        });

        commit("SET_RESOURCE_LIST", {queryString, resourceIds});
    },

    async fetchResourcePath(obj, {resourceId, type}) {
        return await emcService.resources.fetchResourcePath({resourceId, type});
    },

    async createResource(obj, {type, name}) {
        return await emcService.resources.createResource({type, name});
    },

    async mapChildResource(obj, {parentResourceId, parentResourceType, childResourceId, childResourceType}) {
        await emcService.resources.mapChildResource({
            parentResourceId, parentResourceType, childResourceId, childResourceType
        });
    },

    async unmapChildResource(obj, {parentResourceId, parentResourceType, childResourceId, childResourceType}) {
        await emcService.resources.unmapChildResource({
            parentResourceId, parentResourceType, childResourceId, childResourceType
        });
    },

    async downloadFile({commit, state}, {resourceId}) {
        if (!state.resourceDownloadMap[resourceId] || !state.resourceDownloadMap[resourceId].processing) {
            const resourceDownload = {content: null, processing: true, errors: null, progress: 20};
            commit("SET_RESOURCE_DOWNLOAD", {resourceId, ...resourceDownload});

            await new Promise((resolve => setTimeout(resolve, 1000)));
            resourceDownload.progress = 30;
            commit("SET_RESOURCE_DOWNLOAD", {resourceId, ...resourceDownload});


            await new Promise((resolve => setTimeout(resolve, 1000)));
            resourceDownload.progress = 70;
            commit("SET_RESOURCE_DOWNLOAD", {resourceId, ...resourceDownload});


            await new Promise((resolve => setTimeout(resolve, 1000)));
            resourceDownload.progress = 99;
            commit("SET_RESOURCE_DOWNLOAD", {resourceId, ...resourceDownload});

            resourceDownload.content = await emcService.resources.downloadResource({resourceId});
            resourceDownload.processing = false;
            resourceDownload.progress = 100;
            commit("SET_RESOURCE_DOWNLOAD", {resourceId, ...resourceDownload});
        }
    }
}


const mutations = {
    SET_RESOURCE(state, {resourceId, entityId, name, description, createdAt, createdBy, lastUpdatedAt, lastUpdatedBy, status, type}) {
        state.resourceMap = {
            ...state.resourceMap,
            [resourceId]: {
                ...state.resourceMap[resourceId],
                resourceId,
                entityId,
                name,
                description,
                createdAt,
                createdBy,
                lastUpdatedAt,
                lastUpdatedBy,
                status,
                type
            }
        };
    },
    SET_FILE_DOWNLOAD(state, {resourceId, content, processing, progress}) {
        state.resourceDownloadMap = {
            ...state.resourceDownloadMap,
            [resourceId]: {
                ...state.resourceDownloadMap[resourceId],
                resourceId, content, processing, progress
            }
        };
    },
    SET_RESOURCE_LIST(state, {queryString, resourceIds}) {
        state.resourceListMap = {
            ...state.resourceListMap,
            [queryString]: resourceIds
        };
    }
}


const getters = {

    getResources: (state, getters) => {
        return ({parentResourceId, type} = {}) => {
            const queryString = JSON.stringify({parentResourceId, type});
            console.log("========== getResources : ", queryString);
            const resourceIds = state.resourceListMap[queryString];
            if (resourceIds) {
                return resourceIds.map(resourceId => getters.getResource({resourceId}));
            } else {
                return null;
            }
        }
    },

    getResource: (state) => {
        return ({resourceId}) => {
            if (state.resourceMap[resourceId]) {
                const resource = state.resourceMap[resourceId];
                let download = null;

                if (state.resourceDownloadMap[resourceId]) {
                    download = state.resourceDownloadMap[resourceId];
                }

                return {...resource, download};
            } else {
                return null;
            }
        }
    },

    getFileDownload: (state) => {
        return ({resourceId}) => {
            if (state.resourceDownloadMap[resourceId]) {
                return state.resourceDownloadMap[resourceId];
            } else {
                return null;
            }
        }
    },

    getDownloadProcessingFiles: (state, getters) => {
        return () => {
            const processingFiles = [];
            for (let resourceId in state.resourceDownloadMap) {
                if (state.resourceDownloadMap[resourceId].processing) {
                    processingFiles.push(getters.getFile({resourceId}))
                }
            }

            return processingFiles
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