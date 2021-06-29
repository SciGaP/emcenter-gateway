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

    get({parentFolderId}) {

        // TODO
        console.log(`[FETCH] /emc/files?parentFolderId=${parentFolderId}`);

        // const {resources} = this.emcService.axiosInstanceWithTokenAuthorizationForCollectionsGet;

        const resources = [1, 2, 3, 4, 5, 6].map(id => {
            return {
                "id": id,
                "entityId": "custos-hiedldxlq7wygqaihmly-10002614_250805.20000004768",
                "ownerId": "abelota",
                "createdBy": "abelota",
                "createdAt": "2021-05-11T04:57:40.645Z",
                "lastUpdatedBy": "abelota",
                "lastUpdatedAt": "2021-05-11T04:57:40.645Z",
                "name": `Dataset ${id}`,
                "size": "2MB",
                "type": "Dataset"
            }
        });

        if (!parentFolderId) {
            return [];
        } else {
            return resources.filter(({type}) => type === "Dataset")
                .map(({createdAt, createdBy, name, id, entityId}) => {
                    return {
                        fileId: id,
                        entityId,
                        name: name,
                        createdAt: createdAt,
                        createdBy: createdBy,
                        status: "",
                        mimeType: "text/plain"
                    }
                });
        }
    }
}
