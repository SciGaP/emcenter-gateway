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

    get({parentFolderId, own = true, shared = true}) {

        // TODO
        console.log(`[FETCH] /emc/folders?parentFolderId=${parentFolderId}`);

        return new Promise((resolve) => {

            if (parentFolderId) {
                resolve([]);
            }

            // {
            //     folderId: 0,
            //     name: "",
            //     createdAt: "",
            //     createdBy: "",
            //     own: false
            // }

            const ownFolders = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map((i) => {
                return {
                    folderId: `folder-${i}`,
                    name: `session-${i}`,
                    createdAt: new Date(),
                    createdBy: "Dinuka De Silva",
                    own: true
                }
            });

            const sharedFolders = [0, 1, 2, 3].map((i) => {
                return {
                    folderId: `shared-folder-${i}`,
                    name: `session-${i}`,
                    createdAt: new Date(),
                    createdBy: "Dinuka De Silva",
                    own: false
                }
            });

            let folders = [];

            if (own) folders = folders.concat(ownFolders);
            if (shared) folders = folders.concat(sharedFolders);

            resolve(folders);
        });
    }
}
