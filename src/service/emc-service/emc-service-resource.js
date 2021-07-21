import EmcService from "@/service/emc-service/index";
import axios from "axios";

export default class EmcResource {

    static EMC_RESOURCE_TYPE = {
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

        // TODO
        console.log(`[FETCH] /emc/path?resourceId=${resourceId}`);

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
                resourceName
            } = resourceMap[key];

            resources.push({
                resourceId: entityId,
                entityId,
                name: resourceName,
                description: description,
                createdAt: new Date(parseInt(createdTime)).toLocaleString(),
                createdBy: owner,
                lastUpdatedAt: new Date(parseInt(lastModifiedTime)).toLocaleString(),
                lastUpdatedBy: "",
                status: "",
                type
            });
        }

        return resources;
    }


    async downloadResource({resourceId}) {
        return await axios.create({
            baseURL: `http://149.165.157.235:8899/mftdownlaod/${resourceId}`,
            withCredentials: false,
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': "*",
                'Origin': '*'
            }
        }).get("", {});
    }

    async fetchResourceMetadata({resourceId, type}) {
        const {data: {metadata}} = await this.emcService.axiosInstanceWithTokenAuthorization.get(
            EmcService.ENDPOINTS.RESOURCE_METADATA,
            {
                params: {resourceId, type}
            }
        );

        return metadata;
    }

    async fetchResource({resourceId}) {
        const response = await this.emcService.axiosInstanceWithTokenAuthorization.get(
            EmcService.ENDPOINTS.RESOURCE,
            {
                params: {resourceId}
            }
        );


        console.log("@@@@@@@ fetchResource : ", response)
        const {
            data: {
                resource: {
                    // resourceId, resourcePath,
                    properties: {
                        // entityType, tenantId, name,
                        description, createdTime, entityId, lastModifiedTime, owner, note
                    },
                    type,
                    // parentResourcePath,
                    resourceName
                }
            }
        } = response;

        return {
            resourceId: entityId,
            entityId,
            name: resourceName,
            description: description,
            createdAt: new Date(parseInt(createdTime)).toLocaleString(),
            createdBy: owner,
            lastUpdatedAt: new Date(parseInt(lastModifiedTime)).toLocaleString(),
            lastUpdatedBy: "",
            status: "",
            type,
            note
        };
    }

    async createResource({type, name, description}) {
        await this.emcService.axiosInstanceWithTokenAuthorization.post(
            EmcService.ENDPOINTS.RESOURCE,
            {
                resource: {
                    resourceId: `emc-resource-${window.performance.now()}`,
                    type,
                    resourceName: name,
                    properties: {
                        // entityType, tenantId,
                        name, description, createdTime: new Date().getTime().toString()
                    }
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

    async fetchResources({parentResourceId, type, queries}) {

        // TODO
        console.log(`[FETCH] /emc/resources?parentResourceId=${parentResourceId}&type=${type}`);

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
                        "queries": queries,
                        "resourceId": parentResourceId,
                        "type": type,
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
                    description, createdTime, entityId, lastModifiedTime, owner, note
                },
                type,
                // parentResourcePath,
                resourceName
            }
        ) => {
            return {
                resourceId: entityId,
                entityId,
                name: resourceName,
                description: description,
                createdAt: new Date(parseInt(createdTime)).toLocaleString(),
                createdBy: owner,
                lastUpdatedAt: new Date(parseInt(lastModifiedTime)).toLocaleString(),
                lastUpdatedBy: "",
                status: "",
                type,
                note
            }
        });
    }
}
