import EmcService from "@/service/emc-service/index";
import config from "@/config";

function encodeTusdFileUrl(tusdFileUrl) {
    let tusdFileId = /\/([a-zA-Z0-9]*)$/.exec(tusdFileUrl);
    if (tusdFileId && tusdFileId.length > 1) {
        tusdFileId = tusdFileId[1];
        return `${config.value('resourceImageRegistryUrl')}/${tusdFileId}`;
    }

    return null;
}

export default class EmcResource {

    static EMC_RESOURCE_TYPE = {
        EMC_RESOURCE_TYPE_LAB: "LAB",
        EMC_RESOURCE_TYPE_COLLECTION: "COLLECTION",
        EMC_RESOURCE_TYPE_DATASET: "FILE",
        EMC_RESOURCE_TYPE_COLLECTION_GROUP: "COLLECTION_GROUP"
    };

    /**
     * @type {EmcService}
     */
    _emcService = null;

    constructor(emcService) {
        this._emcService = emcService;
    }

    get emcService() {
        return this._emcService;
    }


    async mapChildResource({parentResourceId, parentResourceType, childResourceId, childResourceType}) {

        const response = await this.emcService.axiosInstanceWithTokenAuthorization.post(
            EmcService.ENDPOINTS.RESOURCE_CHILDREN,
            {
                "parentResource": {
                    "resourceId": parentResourceId,
                    "type": parentResourceType
                },
                "childResources": [
                    {
                        "resourceId": childResourceId,
                        "type": childResourceType
                    }
                ]
            }
        );

        return response;
    }

    async unmapChildResource({parentResourceId, parentResourceType, childResourceId, childResourceType}) {

        const response = await this.emcService.axiosInstanceWithTokenAuthorization.delete(
            EmcService.ENDPOINTS.RESOURCE_CHILDREN,
            {
                data: {
                    "parentResource": {
                        "resourceId": parentResourceId,
                        "type": parentResourceType
                    },
                    "childResources": [
                        {
                            "resourceId": childResourceId,
                            "type": childResourceType
                        }
                    ]
                }
            }
        );

        return response;
    }

    async fetchParentResources({resourceId, type}) {
        const response = await this.emcService.axiosInstanceWithTokenAuthorization.get(
            EmcService.ENDPOINTS.RESOURCE_PARENT,
            {
                params: {
                    "resourceId": resourceId,
                    "type": type,
                    "depth": 10
                }
            }
        );


        const resourceMap = response.data.properties;
        const resources = [];

        for (let key in resourceMap) {
            const {
                // resourceId, resourcePath,
                properties: {
                    // entityType, tenantId, name,
                    description, createdTime, entityId, lastModifiedTime, owner
                },
                type,
                // parentResourcePath,
                resourceName,
                resourcePath
            } = resourceMap[key];

            resources.push({
                resourceId: entityId,
                entityId,
                name: resourceName,
                description: description,
                createdAt: parseInt(createdTime),
                createdBy: owner,
                lastUpdatedAt: parseInt(lastModifiedTime),
                lastUpdatedBy: "",
                status: "",
                type,
                resourcePath
            });
        }

        resources.sort((a, b) => a.resourcePath.length - b.resourcePath.length);

        return resources;
    }


    async downloadResource({resourceId}) {
        const {data: {url}} = await this.emcService.axiosInstanceWithTokenAuthorization.get(
            `${EmcService.ENDPOINTS.RESOURCE_DOWNLOAD}/${resourceId}`
        );

        return url;
    }

    async fetchResourceMetadata({resourceId, type}) {
        const {data: {metadata}} = await this.emcService.axiosInstanceWithTokenAuthorization.get(
            EmcService.ENDPOINTS.RESOURCE_METADATA,
            {
                params: {resourceId, type}
            }
        );

        if (Array.isArray(metadata)) {
            for (let i = 0; i < metadata.length; i++) {
                if (metadata[i].image) metadata[i].image = encodeTusdFileUrl(metadata[i].image);
                if (metadata[i].thumbnail) metadata[i].thumbnail = encodeTusdFileUrl(metadata[i].thumbnail);
            }
        }

        return metadata;
    }

    async fetchResource({resourceId}) {
        const response = await this.emcService.axiosInstanceWithTokenAuthorization.get(
            EmcService.ENDPOINTS.RESOURCE,
            {
                params: {resourceId}
            }
        );

        const {
            data: {
                resource: {
                    // resourceId, resourcePath,
                    properties: {
                        // entityType, tenantId, name,
                        description, createdTime, entityId, lastModifiedTime, owner, note, permission
                    },
                    type,
                    // parentResourcePath,
                    resourceName,
                    resourcePath
                }
            }
        } = response;

        return {
            resourceId: entityId,
            entityId,
            name: resourceName,
            description: description,
            resourcePath: resourcePath,
            createdAt: parseInt(createdTime),
            createdBy: owner,
            lastUpdatedAt: parseInt(lastModifiedTime),
            lastUpdatedBy: "",
            status: "",
            type,
            note,
            permission,
            canShare: permission === "OWNER" || permission === "EDITOR",
            canDelete: permission === "OWNER"
        };
    }

    async createResource({type, name /*, description*/}) {
        await this.emcService.axiosInstanceWithTokenAuthorization.post(
            EmcService.ENDPOINTS.RESOURCE,
            {
                resource: {
                    resourceId: `emc-resource-${window.performance.now()}`,
                    type,
                    resourceName: name,
                    // properties: {
                    //     // entityType, tenantId,
                    //     name, description, createdTime: new Date().getTime().toString()
                    // }
                }
            }
        );
    }

    async updateResource({resourceId, type, name, description, note}) {
        await this.emcService.axiosInstanceWithTokenAuthorization.put(
            EmcService.ENDPOINTS.RESOURCE,
            {
                resource: {
                    resourceId,
                    type,
                    resourceName: name,
                    properties: {
                        name, description, note
                    }
                }
            }
        );
    }

    async fetchResources({parentResourceId, parentResourceType, type, queries}) {
        let response = null;
        if (!parentResourceId) {
            response = await this.emcService.axiosInstanceWithTokenAuthorization.post(
                EmcService.ENDPOINTS.RESOURCE_SEARCH,
                {
                    "queries": queries,
                    "depth": 1,
                    "type": type
                }
            );
        } else {
            response = await this.emcService.axiosInstanceWithTokenAuthorization.get(
                EmcService.ENDPOINTS.CHILDREN,
                {
                    params: {
                        "resourceId": parentResourceId,
                        "type": parentResourceType,
                        "depth": 1
                    }
                }
            );
        }

        const {data: {resources}} = response;

        return resources.map((
            {
                // resourceId, resourcePath,
                properties: {
                    // entityType, tenantId, name,
                    description, createdTime, entityId, lastModifiedTime, owner, note, permission
                },
                type,
                // parentResourcePath,
                resourceName,
                resourcePath
            }
        ) => {
            return {
                resourceId: entityId,
                entityId,
                name: resourceName,
                description: description,
                createdAt: parseInt(createdTime),
                createdBy: owner,
                lastUpdatedAt: parseInt(lastModifiedTime),
                lastUpdatedBy: "",
                status: "",
                type,
                note,
                permission,
                canShare: permission === "OWNER" || permission === "EDITOR",
                canDelete: permission === "OWNER",
                resourcePath
            }
        });
    }
}
