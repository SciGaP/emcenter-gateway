import EmcService from "@/service/emc-service/index";

export default class EmcFiles {
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

    fetchPath({fileId}) {

        // TODO
        console.log(`[FETCH] /emc/path?fileId=${fileId}`);

        return [
            {folderId: "", name: ""}
        ]
    }

    downloadFile({fileId}) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(`file-content-${fileId}`);
            }, 2000);
        })
    }

    async get({parentFolderId}) {

        // TODO
        console.log(`[FETCH] /emc/files?parentFolderId=${parentFolderId}`);

        const {data: {resources}} = await this.emcService.axiosInstanceWithTokenAuthorization.post(
            EmcService.ENDPOINTS.COLLECTIONS,
            {
                "queries": [{
                    "field": "type",
                    "value": "FILE"
                }],
                "depth": 0
            }
        );

        if (!parentFolderId) {
            return [];
        } else {

            return resources.filter(({type}) => type === "FILE")
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
                        fileId: entityId,
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
}
