import {emcService} from "@/store/util/emc.util";
import EmcResource from "@/service/emc-service/emc-service-resource";
// import axios from "axios";

const state = {
    resourceMap: {},
    resourceListMap: {},
    parentResourcesListMap: {},
    resourceDownloadMap: {},
    resourceMetadataMap: {}
};

const actions = {

    async fetchResources({commit}, {parentResourceId, parentResourceType, type, queries} = {}) {
        const queryString = JSON.stringify({parentResourceId, type, queries});

        const resources = await emcService.resources.fetchResources({
            parentResourceId, parentResourceType, type, queries
        });

        const resourceIds = resources.map(({resourceId, entityId, name, description, createdAt, createdBy, lastUpdatedAt, lastUpdatedBy, status, type, note, permission, canShare, canDelete, resourcePath, image, thumbnail}) => {
            commit("SET_RESOURCE", {
                resourceId, entityId, name, description, createdAt, createdBy, lastUpdatedAt,
                lastUpdatedBy, status, type, note, permission, canShare, canDelete, resourcePath,
                image, thumbnail
            });

            return resourceId;
        });

        commit("SET_RESOURCE_LIST", {queryString, resourceIds});
    },

    async fetchResource({commit}, {resourceId} = {}) {
        const resource = await emcService.resources.fetchResource({resourceId});
        const {response, entityId, name, description, createdAt, createdBy, lastUpdatedAt, lastUpdatedBy, status, type, note, permission, canShare, canDelete, resourcePath, image, thumbnail} = resource;
        commit("SET_RESOURCE", {
            response,
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
            note,
            permission, canShare, canDelete, resourcePath,
            image, thumbnail
        });
    },

    async fetchResourceMetadata({commit}, {resourceId, type}) {
        const metadata = await emcService.resources.fetchResourceMetadata({resourceId, type});
        commit("SET_RESOURCE_METADATA", {resourceId, metadata});
    },

    async fetchParentResources({commit}, {resourceId}) {
        const resources = await emcService.resources.fetchParentResources({resourceId});
        const parentResourceIds = resources.map(({resourceId, entityId, name, description, createdAt, createdBy, lastUpdatedAt, lastUpdatedBy, status, type, note, image, thumbnail}) => {
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
                note,
                image, thumbnail
            });

            return resourceId;
        });

        commit("SET_RESOURCE_PARENTS", {resourceId, parentResourceIds});
    },

    async createResource(obj, {type, name}) {
        return await emcService.resources.createResource({type, name});
    },

    async updateResource({getters}, {resourceId, type, name, description, note}) {
        const resource = getters.getResource({resourceId})
        return await emcService.resources.updateResource({
            response: resource.response, /* For the PUT request.
                                            Relates to https://github.com/SciGaP/emcenter-gateway/issues/139 */
            resourceId, type, name, description, note
        });
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

    async downloadResource({commit, state}, {resourceId}) {
        if (!state.resourceDownloadMap[resourceId] || !state.resourceDownloadMap[resourceId].processing) {
            const resourceDownload = {content: null, processing: true, errors: [], progress: 20};
            commit("SET_RESOURCE_DOWNLOAD", {resourceId, ...resourceDownload});

            resourceDownload.processing = true;
            resourceDownload.progress = 0;
            commit("SET_RESOURCE_DOWNLOAD", {resourceId, ...resourceDownload});

            try {
                let url = await emcService.resources.downloadResource({resourceId});
                let filename = `${window.performance.now()}`;

                resourceDownload.processing = false;
                resourceDownload.progress = 100;
                commit("SET_RESOURCE_DOWNLOAD", {resourceId, ...resourceDownload});

                const a = document.createElement('a');
                a.style.display = 'none';
                a.href = url;
                // a.onclick = "return false;";
                // a.target = "_blank";

                // // the filename you want
                a.download = filename;
                document.body.appendChild(a);
                a.click();
            } catch (error) {
                resourceDownload.errors.push({
                    title: "Unknown Error",
                    description: "Unknown error when downloading.",
                    source: error, variant: "danger"
                });

                resourceDownload.processing = false;
                commit("SET_RESOURCE_DOWNLOAD", {resourceId, ...resourceDownload});

                throw error;
            }


            // window.URL.revokeObjectURL(url);
            // } catch (error) {
            //     resourceDownload.errors.push({
            //         title: "Unknown error when downloading.",
            //         source: error, variant: "danger"
            //     });
            // }


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
    SET_RESOURCE(state, {response, resourceId, entityId, name, description, createdAt, createdBy, lastUpdatedAt, lastUpdatedBy, status, type, note, permission = null, canShare = false, canDelete = false, resourcePath, image, thumbnail}) {
        state.resourceMap = {
            ...state.resourceMap,
            [resourceId]: {
                ...state.resourceMap[resourceId],
                response, // Is available only through fetchResource. It's used for PUT requests.
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
                note,
                permission, canShare, canDelete, resourcePath,
                image, thumbnail
            }
        };
    },
    SET_RESOURCE_DOWNLOAD(state, {resourceId, content, processing, progress, errors}) {
        state.resourceDownloadMap = {
            ...state.resourceDownloadMap,
            [resourceId]: {
                ...state.resourceDownloadMap[resourceId],
                resourceId, content, processing, progress, errors
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

    getDownloadProcessingResources: (state, getters) => {
        return () => {
            const processingResources = [];
            for (let resourceId in state.resourceDownloadMap) {
                if (state.resourceDownloadMap[resourceId].processing) {
                    processingResources.push(getters.getResource({resourceId}))
                }
            }

            return processingResources;
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