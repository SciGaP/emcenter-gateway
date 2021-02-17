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

    get({parentFolderId}) {

        // TODO
        console.log(`[FETCH] /emc/files?parentFolderId=${parentFolderId}`);

        return new Promise((resolve) => {

            if (!parentFolderId) {
                resolve([]);
            }

            // {
            //     fileId: 0,
            //     name: "",
            //     createdAt: "",
            //     createdBy: "",
            //     status: "", // Transferred, Failed, Accessed, etc.
            //     mimeType: ""
            // }

            resolve([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map((i) => {
                return {
                    fileId: `file-${i}`,
                    name: `dataset-${i}`,
                    createdAt: new Date(),
                    createdBy: "Dinuka De Silva",
                    status: "", // Transferred, Failed, Accessed, etc.
                    mimeType: "text/plain"
                }
            }));
        });
    }
}
