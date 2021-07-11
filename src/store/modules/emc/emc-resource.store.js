import {emcService} from "@/store/util/emc.util";
import EmcResource from "@/service/emc-service/emc-service-resource";

const state = {
    resourceMap: {},
    resourceListMap: {},
    parentResourcesListMap: {},
    resourceDownloadMap: {},
    resourceMetadataMap: {},
};

const actions = {

    async fetchResources({commit}, {parentResourceId, type, queries} = {}) {
        const queryString = JSON.stringify({parentResourceId, type, queries});

        const resources = await emcService.resources.fetchResources({parentResourceId, type, queries});

        console.log("##### fetchResources ### queryString : ", queryString);
        console.log("##### fetchResources ### : ", resources);

        const resourceIds = resources.map(({resourceId, entityId, name, description, createdAt, createdBy, lastUpdatedAt, lastUpdatedBy, status, type, note}) => {
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
                type,
                note
            });

            return resourceId;
        });

        commit("SET_RESOURCE_LIST", {queryString, resourceIds});
    },

    async fetchResource({commit}, {resourceId} = {}) {
        const resource = await emcService.resources.fetchResource({resourceId});
        const {entityId, name, description, createdAt, createdBy, lastUpdatedAt, lastUpdatedBy, status, type, note} = resource;
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
            type,
            note
        });
    },

    async fetchResourceMetadata({commit}, {resourceId, type}) {
        const metadata = await emcService.resources.fetchResourceMetadata({resourceId, type});
        commit("SET_RESOURCE_METADATA", {resourceId, metadata});
    },

    async fetchParentResources({commit}, {resourceId}) {
        const resources = await emcService.resources.fetchParentResources({resourceId});
        const parentResourceIds = resources.map(({resourceId, entityId, name, description, createdAt, createdBy, lastUpdatedAt, lastUpdatedBy, status, type, note}) => {
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
                type,
                note
            });

            return resourceId;
        });

        commit("SET_RESOURCE_PARENTS", {resourceId, parentResourceIds});
    },

    async createResource(obj, {type, name}) {
        return await emcService.resources.createResource({type, name});
    },

    async updateResource(obj, {resourceId, type, name, description, note}) {
        return await emcService.resources.updateResource({resourceId, type, name, description, note});
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
    SET_RESOURCE_PARENTS(state, {resourceId, parentResourceIds}) {
        state.parentResourcesListMap = {
            ...state.parentResourcesListMap,
            [resourceId]: parentResourceIds
        }
    },
    SET_RESOURCE_METADATA(state, {resourceId, metadata}) {
        state.resourceMetadataMap = {
            ...state.resourceMetadataMap,
            [resourceId]: metadata
        }
    },
    SET_RESOURCE(state, {resourceId, entityId, name, description, createdAt, createdBy, lastUpdatedAt, lastUpdatedBy, status, type, note}) {
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
                type,
                note
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

    getParentResources: (state, getters) => {
        return ({resourceId} = {}) => {
            const parentResourceIds = state.parentResourcesListMap[resourceId];
            if (parentResourceIds) {
                return parentResourceIds.map(resourceId => getters.getResource({resourceId}));
            } else {
                return null;
            }
        }
    },
    getResourceMetadata: (state) => {
        return ({resourceId} = {}) => {
            if (state.resourceMetadataMap[resourceId]) {
                return state.resourceMetadataMap[resourceId];
            } else {
                return null;
            }
        }
    },
    getResources: (state, getters) => {
        return ({parentResourceId, type, queries} = {}) => {
            const queryString = JSON.stringify({parentResourceId, type, queries});
            console.log("========== getResources : ", queryString);
            const resourceIds = state.resourceListMap[queryString];
            if (resourceIds) {
                return resourceIds.map(resourceId => getters.getResource({resourceId}));
            } else {
                return null;
            }
        }
    },

    getResourcePath: (state, getters) => {
        return ({resourceId}) => {
            if (state.parentResourcesListMap[resourceId]) {
                const path = [];
                for (let i = 0; i < state.parentResourcesListMap[resourceId].length; i++) {
                    const parentResourceId = state.parentResourcesListMap[resourceId][i];
                    const parentResource = getters.getResource({resourceId: parentResourceId});
                    if (parentResource.type === EmcResource.EMC_RESOURCE_TYPE.EMC_RESOURCE_TYPE_COLLECTION) {
                        path.push(parentResourceId);
                    }
                }

                return path;
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