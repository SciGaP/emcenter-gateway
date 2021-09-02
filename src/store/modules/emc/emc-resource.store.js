import {emcService} from "@/store/util/emc.util";
import EmcResource from "@/service/emc-service/emc-service-resource";
// import axios from "axios";

const state = {
    resourceMap: {},
    resourceListMap: {},
    parentResourcesListMap: {},
    resourceDownloadMap: {},
    resourceMetadataMap: {},
    resourceImageDataUrlMap: {}
};

const RESOURCE_IMAGE_SIZE = {
    PREVIEW: {width: 1280, height: 720},
    THUMBNAIL: {width: 48, height: 48}
};

const actions = {

    async fetchResources({commit}, {parentResourceId, parentResourceType, type, queries} = {}) {
        const queryString = JSON.stringify({parentResourceId, type, queries});

        const resources = await emcService.resources.fetchResources({
            parentResourceId,
            parentResourceType,
            type,
            queries
        });

        console.log("##### fetchResources ### queryString : ", queryString);
        console.log("##### fetchResources ### : ", resources);

        const resourceIds = resources.map(({resourceId, entityId, name, description, createdAt, createdBy, lastUpdatedAt, lastUpdatedBy, status, type, note, permission, canShare, canDelete}) => {
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
                permission, canShare, canDelete
            });

            return resourceId;
        });

        commit("SET_RESOURCE_LIST", {queryString, resourceIds});
    },

    async fetchResource({commit}, {resourceId} = {}) {
        const resource = await emcService.resources.fetchResource({resourceId});
        const {entityId, name, description, createdAt, createdBy, lastUpdatedAt, lastUpdatedBy, status, type, note, permission, canShare, canDelete} = resource;
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
            permission, canShare, canDelete
        });
    },

    async fetchResourceMetadata({commit}, {resourceId, type}) {
        const metadata = await emcService.resources.fetchResourceMetadata({resourceId, type});
        commit("SET_RESOURCE_METADATA", {resourceId, metadata});
    },

    async fetchResourcePreviewDataUrl({commit}, {resourceId}) {
        const params = {resourceId, ...RESOURCE_IMAGE_SIZE.PREVIEW};
        const queryString = JSON.stringify(params);
        const dataUrl = await emcService.resources.fetchResourceImageBase64(params);
        commit("SET_RESOURCE_IMAGE_DATA_URL", {queryString, dataUrl});
    },

    async fetchResourceThumbnailDataUrl({commit}, {resourceId}) {
        const params = {resourceId, ...RESOURCE_IMAGE_SIZE.THUMBNAIL};
        const queryString = JSON.stringify(params);
        const dataUrl = await emcService.resources.fetchResourceImageBase64(params);
        commit("SET_RESOURCE_IMAGE_DATA_URL", {queryString, dataUrl});
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

    async downloadResource({commit, state}, {resourceId}) {
        if (!state.resourceDownloadMap[resourceId] || !state.resourceDownloadMap[resourceId].processing) {
            const resourceDownload = {content: null, processing: true, errors: [], progress: 20};
            commit("SET_RESOURCE_DOWNLOAD", {resourceId, ...resourceDownload});

            resourceDownload.processing = true;
            resourceDownload.progress = 0;
            commit("SET_RESOURCE_DOWNLOAD", {resourceId, ...resourceDownload});

            // try {

            let url = await emcService.resources.downloadResource({resourceId});
            let filename = `${window.performance.now()}`;

            resourceDownload.processing = false;
            resourceDownload.progress = 100;
            commit("SET_RESOURCE_DOWNLOAD", {resourceId, ...resourceDownload});

            try {
                // url = await axios.get(url, {responseType: 'blob'}).then(resp => {
                //     console.log("resp : ", resp)
                //     console.log("resp.headers : ", resp.headers)
                //     resourceDownload.content = resp;
                //
                //     if (resp.headers["content-disposition"]) {
                //         filename = resp.headers["content-disposition"].match(/.*filename="(.*)".*/)[1];
                //     }
                //
                //     return resp.data;
                // }).then(blob => {
                //     console.log("blob : ", blob)
                //     const dataUrl = window.URL.createObjectURL(blob);
                //     console.log("blob url : ", dataUrl)
                //     return dataUrl;
                // })

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
                    title: "Unknown error when downloading.",
                    source: error, variant: "danger"
                });

                console.log("blob error : ", error)

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
    SET_RESOURCE_IMAGE_DATA_URL(state, {queryString, dataUrl}) {
        state.resourceImageDataUrlMap = {
            ...state.resourceImageDataUrlMap,
            [queryString]: dataUrl
        }
    },
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
    SET_RESOURCE(state, {resourceId, entityId, name, description, createdAt, createdBy, lastUpdatedAt, lastUpdatedBy, status, type, note, permission = null, canShare = false, canDelete = false}) {
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
                note,
                permission, canShare, canDelete
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
    getResourcePreviewDataUrl: (state) => {
        return ({resourceId} = {}) => {
            const params = {resourceId, ...RESOURCE_IMAGE_SIZE.PREVIEW};
            const queryString = JSON.stringify(params);
            const dataUrl = state.resourceImageDataUrlMap[queryString];
            if (dataUrl) {
                return dataUrl;
            } else {
                return null;
            }
        }
    },
    getResourceThumbnailDataUrl: (state) => {
        return ({resourceId} = {}) => {
            const params = {resourceId, ...RESOURCE_IMAGE_SIZE.THUMBNAIL};
            const queryString = JSON.stringify(params);
            const dataUrl = state.resourceImageDataUrlMap[queryString];
            if (dataUrl) {
                return dataUrl;
            } else {
                return null;
            }
        }
    },
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