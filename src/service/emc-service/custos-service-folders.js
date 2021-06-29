import EmcService from "@/service/emc-service/index";

export default class EmcFolders {
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

    fetchPath({folderId}) {

        // TODO
        console.log(`[FETCH] /emc/path?folderId=${folderId}`);

        return new Promise((resolve) => {
            let folderPath = [];

            if (folderId) {
                folderPath = [{folderId, name: ""}];
            }

            resolve(folderPath);
        });
    }

    async get({parentFolderId, own = true}) {

        // TODO
        console.log(`[FETCH] /emc/folders?parentFolderId=${parentFolderId}${own}`);

        // const {resources} = this.emcService.axiosInstanceWithTokenAuthorizationForCollectionsGet;

        let response = null;
        if (!parentFolderId) {
            response = await this.emcService.axiosInstanceWithTokenAuthorization.post(
                EmcService.ENDPOINTS.COLLECTIONS,
                {
                    "queries": [{
                        "field": "type",
                        "value": "COLLECTION"
                    }],
                    "depth": 1
                }
            );
        } else {
            response = await this.emcService.axiosInstanceWithTokenAuthorization.get(
                EmcService.ENDPOINTS.CHILDREN,
                {
                    params: {
                        "resourceId": parentFolderId,
                        "type": "COLLECTION",
                        "depth": 1
                    }
                }
            );
        }

        const {data: {resources}} = response;


        return resources.filter(({type}) => type === "COLLECTION")
            .map((
                {
                    // resourceId, resourcePath,
                    properties: {
                        // entityType, tenantId,
                        name, description, createdTime, entityId
                    },
                    // type, parentResourcePath, resourceName
                }
            ) => {
                return {
                    folderId: entityId,
                    entityId,
                    name: name,
                    description: description,
                    createdAt: createdTime,
                    createdBy: "",
                    status: "",
                    mimeType: ""
                }
            });
    }
}
