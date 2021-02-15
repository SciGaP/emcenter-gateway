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

    get({path}) {
        return new Promise((resolve) => {

            // {
            //     folderId: 0,
            //     path: "",
            //     name: "",
            //     createdAt: "",
            //     createdBy: ""
            // }

            resolve([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map((i) => {
                return {
                    folderId: `folder-${i}`,
                    path: path,
                    name: `session-${i}`,
                    createdAt: new Date(),
                    createdBy: "Dinuka De Silva"
                }
            }));
        });
    }
}
