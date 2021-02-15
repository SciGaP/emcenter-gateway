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

    get({path}) {

        // TODO
        console.log(`[FETCH] /emc/files?path=${path}`);

        return new Promise((resolve) => {

            // {
            //     fileId: 0,
            //     path: "",
            //     name: "",
            //     createdAt: "",
            //     createdBy: "",
            //     status: "", // Transferred, Failed, Accessed, etc.
            //     mimeType: ""
            // }

            resolve([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map((i) => {
                return {
                    fileId: `file-${i}`,
                    path: path,
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
