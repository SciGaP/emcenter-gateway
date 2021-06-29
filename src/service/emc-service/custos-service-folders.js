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

    get({parentFolderId, own = true}) {

        // TODO
        console.log(`[FETCH] /emc/folders?parentFolderId=${parentFolderId}`);

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
                "name": `Collection ${id}`,
                "size": "2MB",
                "type": "Collection"
            }
        });

        if (parentFolderId) {
            return [];
        } else {
            return resources.filter(({type}) => type === "Collection")
                .map(({createdAt, createdBy, name, id, entityId}) => {
                    return {
                        folderId: id,
                        entityId,
                        name: name,
                        createdAt: createdAt,
                        createdBy: createdBy,
                        own: own
                    }
                });
        }
    }
}
