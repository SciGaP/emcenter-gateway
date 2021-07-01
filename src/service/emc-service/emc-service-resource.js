import EmcService from "@/service/emc-service/index";

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

    fetchResourcePath({resourceId}) {

        // TODO
        console.log(`[FETCH] /emc/path?resourceId=${resourceId}`);

        return [{resourceId: "", name: ""}]
    }

    downloadResource({resourceId}) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(`resource-content-${resourceId}`);
            }, 2000);
        })
    }

    async fetchResource({resourceId, type}) {
        await this.emcService.axiosInstanceWithTokenAuthorization.get(
            EmcService.ENDPOINTS.RESOURCE,
            {
                params: {resourceId, type}
            }
        );
    }

    async createResource({type, name}) {
        await this.emcService.axiosInstanceWithTokenAuthorization.post(
            EmcService.ENDPOINTS.RESOURCE,
            {resourceId: `emc-resource-${window.performance.now()}`, type, name}
        );
    }

    async fetchResources({parentResourceId, type}) {

        // TODO
        console.log(`[FETCH] /emc/resources?parentResourceId=${parentResourceId}&type=${type}`);

        let response = null;
        if (!parentResourceId) {
            response = await this.emcService.axiosInstanceWithTokenAuthorization.post(
                EmcService.ENDPOINTS.RESOURCE_SEARCH,
                {
                    "queries": [{
                        "field": "type",
                        "value": type
                    }],
                    "depth": 1
                }
            );
        } else {
            response = await this.emcService.axiosInstanceWithTokenAuthorization.get(
                EmcService.ENDPOINTS.CHILDREN,
                {
                    params: {
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
                    // entityType, tenantId,
                    name, description, createdTime, entityId
                },
                type,
                // parentResourcePath, resourceName
            }
        ) => {
            return {
                resourceId: entityId,
                entityId,
                name: name,
                description: description,
                createdAt: new Date(parseInt(createdTime)).toLocaleString(),
                createdBy: "",
                lastUpdatedAt: new Date(parseInt(createdTime)).toLocaleString(),
                lastUpdatedBy: "",
                status: "",
                type
            }
        });
    }
}
