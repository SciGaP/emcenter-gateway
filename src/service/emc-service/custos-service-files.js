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

        const {resources} = {
            "resources": [
                {
                    "resourceId": "",
                    "resourcePath": "",
                    "properties": {
                        "owner": "testuser",
                        "createdAt": "2021-05-11T04:57:36.968Z",
                        "lastUpdatedBy": "testuser",
                        "lastUpdatedAt": "2021-05-11T04:57:36.968Z",
                        "createdBy": "testuser",
                        "name": "file-6.png",
                        "datasetId": "6"
                    },
                    "type": "Dataset"
                },
                {
                    "resourceId": "",
                    "resourcePath": "",
                    "properties": {
                        "owner": "abelota",
                        "createdAt": "2021-05-11T04:57:40.645Z",
                        "lastUpdatedBy": "abelota",
                        "lastUpdatedAt": "2021-05-11T04:57:40.645Z",
                        "createdBy": "abelota",
                        "name": "xxhhhhdhdhd-5.png",
                        "datasetId": "17"
                    },
                    "type": "Dataset"
                },
                {
                    "resourceId": "",
                    "resourcePath": "",
                    "properties": {
                        "owner": "abelota",
                        "createdAt": "2021-05-11T04:57:40.645Z",
                        "lastUpdatedBy": "abelota",
                        "lastUpdatedAt": "2021-05-11T04:57:40.645Z",
                        "createdBy": "abelota",
                        "name": "xxhhhhdhdhd-2.png",
                        "datasetId": "14"
                    },
                    "type": "Dataset"
                },
                {
                    "resourceId": "",
                    "resourcePath": "",
                    "properties": {
                        "owner": "abelota",
                        "createdAt": "2021-05-11T04:57:39.754Z",
                        "lastUpdatedBy": "abelota",
                        "lastUpdatedAt": "2021-05-11T04:57:39.754Z",
                        "createdBy": "abelota",
                        "name": "file-4.png",
                        "datasetId": "10"
                    },
                    "type": "Dataset"
                },
                {
                    "resourceId": "",
                    "resourcePath": "",
                    "properties": {
                        "owner": "abelota",
                        "createdAt": "2021-05-11T04:57:39.754Z",
                        "lastUpdatedBy": "abelota",
                        "lastUpdatedAt": "2021-05-11T04:57:39.754Z",
                        "createdBy": "abelota",
                        "name": "abelota-05-10-2021-22-19",
                        "collectionId": "2"
                    },
                    "type": "Collection"
                },
                {
                    "resourceId": "",
                    "resourcePath": "",
                    "properties": {
                        "owner": "abelota",
                        "createdAt": "2021-05-11T04:57:40.645Z",
                        "lastUpdatedBy": "abelota",
                        "lastUpdatedAt": "2021-05-11T04:57:40.645Z",
                        "createdBy": "abelota",
                        "name": "xxhhhhdhdhd-10.png",
                        "datasetId": "22"
                    },
                    "type": "Dataset"
                },
                {
                    "resourceId": "",
                    "resourcePath": "",
                    "properties": {
                        "owner": "abelota",
                        "createdAt": "2021-05-11T04:57:40.645Z",
                        "lastUpdatedBy": "abelota",
                        "lastUpdatedAt": "2021-05-11T04:57:40.645Z",
                        "createdBy": "abelota",
                        "name": "xxhhhhdhdhd-11.png",
                        "datasetId": "23"
                    },
                    "type": "Dataset"
                },
                {
                    "resourceId": "",
                    "resourcePath": "",
                    "properties": {
                        "owner": "abelota",
                        "createdAt": "2021-05-11T04:57:40.645Z",
                        "lastUpdatedBy": "abelota",
                        "lastUpdatedAt": "2021-05-11T04:57:40.645Z",
                        "createdBy": "abelota",
                        "name": "xxhhhhdhdhd-3.png",
                        "datasetId": "15"
                    },
                    "type": "Dataset"
                },
                {
                    "resourceId": "",
                    "resourcePath": "",
                    "properties": {
                        "owner": "abelota",
                        "createdAt": "2021-05-11T04:57:39.754Z",
                        "lastUpdatedBy": "abelota",
                        "lastUpdatedAt": "2021-05-11T04:57:39.754Z",
                        "createdBy": "abelota",
                        "name": "file-1.png",
                        "datasetId": "7"
                    },
                    "type": "Dataset"
                },
                {
                    "resourceId": "",
                    "resourcePath": "",
                    "properties": {
                        "owner": "abelota",
                        "createdAt": "2021-05-11T04:57:39.754Z",
                        "lastUpdatedBy": "abelota",
                        "lastUpdatedAt": "2021-05-11T04:57:39.754Z",
                        "createdBy": "abelota",
                        "name": "file-2.png",
                        "datasetId": "8"
                    },
                    "type": "Dataset"
                },
                {
                    "resourceId": "",
                    "resourcePath": "",
                    "properties": {
                        "owner": "abelota",
                        "createdAt": "2021-05-11T04:57:42.642Z",
                        "lastUpdatedBy": "abelota",
                        "lastUpdatedAt": "2021-05-11T04:57:42.642Z",
                        "createdBy": "abelota",
                        "name": "abelota-05-10-2021-24-13",
                        "collectionId": "4"
                    },
                    "type": "Collection"
                },
                {
                    "resourceId": "",
                    "resourcePath": "",
                    "properties": {
                        "owner": "abelota",
                        "createdAt": "2021-05-11T04:57:40.645Z",
                        "lastUpdatedBy": "abelota",
                        "lastUpdatedAt": "2021-05-11T04:57:40.645Z",
                        "createdBy": "abelota",
                        "name": "xxhhhhdhdhd-14.png",
                        "datasetId": "26"
                    },
                    "type": "Dataset"
                },
                {
                    "resourceId": "",
                    "resourcePath": "",
                    "properties": {
                        "owner": "abelota",
                        "createdAt": "2021-05-11T04:57:40.645Z",
                        "lastUpdatedBy": "abelota",
                        "lastUpdatedAt": "2021-05-11T04:57:40.645Z",
                        "createdBy": "abelota",
                        "name": "xxhhhhdhdhd-4.png",
                        "datasetId": "16"
                    },
                    "type": "Dataset"
                },
                {
                    "resourceId": "",
                    "resourcePath": "",
                    "properties": {
                        "owner": "testuser",
                        "createdAt": "2021-05-11T04:57:36.968Z",
                        "lastUpdatedBy": "testuser",
                        "lastUpdatedAt": "2021-05-11T04:57:36.968Z",
                        "createdBy": "testuser",
                        "name": "file-5.png",
                        "datasetId": "5"
                    },
                    "type": "Dataset"
                },
                {
                    "resourceId": "",
                    "resourcePath": "",
                    "properties": {
                        "owner": "abelota",
                        "createdAt": "2021-05-11T04:57:40.645Z",
                        "lastUpdatedBy": "abelota",
                        "lastUpdatedAt": "2021-05-11T04:57:40.645Z",
                        "createdBy": "abelota",
                        "name": "xxhhhhdhdhd-13.png",
                        "datasetId": "25"
                    },
                    "type": "Dataset"
                },
                {
                    "resourceId": "",
                    "resourcePath": "",
                    "properties": {
                        "owner": "testuser",
                        "createdAt": "2021-05-11T04:57:36.968Z",
                        "lastUpdatedBy": "testuser",
                        "lastUpdatedAt": "2021-05-11T04:57:36.968Z",
                        "createdBy": "testuser",
                        "name": "testuser-05-10-2021-22-19",
                        "collectionId": "1"
                    },
                    "type": "Collection"
                },
                {
                    "resourceId": "",
                    "resourcePath": "",
                    "properties": {
                        "owner": "testuser",
                        "createdAt": "2021-05-11T04:57:36.968Z",
                        "lastUpdatedBy": "testuser",
                        "lastUpdatedAt": "2021-05-11T04:57:36.968Z",
                        "createdBy": "testuser",
                        "name": "file-2.png",
                        "datasetId": "2"
                    },
                    "type": "Dataset"
                },
                {
                    "resourceId": "",
                    "resourcePath": "",
                    "properties": {
                        "owner": "abelota",
                        "createdAt": "2021-05-11T04:57:40.645Z",
                        "lastUpdatedBy": "abelota",
                        "lastUpdatedAt": "2021-05-11T04:57:40.645Z",
                        "createdBy": "abelota",
                        "name": "xxhhhhdhdhd-9.png",
                        "datasetId": "21"
                    },
                    "type": "Dataset"
                },
                {
                    "resourceId": "",
                    "resourcePath": "",
                    "properties": {
                        "owner": "abelota",
                        "createdAt": "2021-05-11T04:57:39.754Z",
                        "lastUpdatedBy": "abelota",
                        "lastUpdatedAt": "2021-05-11T04:57:39.754Z",
                        "createdBy": "abelota",
                        "name": "file-5.png",
                        "datasetId": "11"
                    },
                    "type": "Dataset"
                },
                {
                    "resourceId": "",
                    "resourcePath": "",
                    "properties": {
                        "owner": "abelota",
                        "createdAt": "2021-05-11T04:57:40.645Z",
                        "lastUpdatedBy": "abelota",
                        "lastUpdatedAt": "2021-05-11T04:57:40.645Z",
                        "createdBy": "abelota",
                        "name": "xxhhhhdhdhd-12.png",
                        "datasetId": "24"
                    },
                    "type": "Dataset"
                },
                {
                    "resourceId": "",
                    "resourcePath": "",
                    "properties": {
                        "owner": "testuser",
                        "createdAt": "2021-05-11T04:57:36.968Z",
                        "lastUpdatedBy": "testuser",
                        "lastUpdatedAt": "2021-05-11T04:57:36.968Z",
                        "createdBy": "testuser",
                        "name": "file-3.png",
                        "datasetId": "3"
                    },
                    "type": "Dataset"
                },
                {
                    "resourceId": "",
                    "resourcePath": "",
                    "properties": {
                        "owner": "abelota",
                        "createdAt": "2021-05-11T04:57:40.645Z",
                        "lastUpdatedBy": "abelota",
                        "lastUpdatedAt": "2021-05-11T04:57:40.645Z",
                        "createdBy": "abelota",
                        "name": "xxhhhhdhdhd-6.png",
                        "datasetId": "18"
                    },
                    "type": "Dataset"
                },
                {
                    "resourceId": "",
                    "resourcePath": "",
                    "properties": {
                        "owner": "abelota",
                        "createdAt": "2021-05-11T04:57:40.645Z",
                        "lastUpdatedBy": "abelota",
                        "lastUpdatedAt": "2021-05-11T04:57:40.645Z",
                        "createdBy": "abelota",
                        "name": "xxhhhhdhdhd-1.png",
                        "datasetId": "13"
                    },
                    "type": "Dataset"
                },
                {
                    "resourceId": "",
                    "resourcePath": "",
                    "properties": {
                        "owner": "abelota",
                        "createdAt": "2021-05-11T04:57:39.754Z",
                        "lastUpdatedBy": "abelota",
                        "lastUpdatedAt": "2021-05-11T04:57:39.754Z",
                        "createdBy": "abelota",
                        "name": "file-3.png",
                        "datasetId": "9"
                    },
                    "type": "Dataset"
                },
                {
                    "resourceId": "",
                    "resourcePath": "",
                    "properties": {
                        "owner": "abelota",
                        "createdAt": "2021-05-11T04:57:40.645Z",
                        "lastUpdatedBy": "abelota",
                        "lastUpdatedAt": "2021-05-11T04:57:40.645Z",
                        "createdBy": "abelota",
                        "name": "xxhhhhdhdhd-7.png",
                        "datasetId": "19"
                    },
                    "type": "Dataset"
                },
                {
                    "resourceId": "",
                    "resourcePath": "",
                    "properties": {
                        "owner": "testuser",
                        "createdAt": "2021-05-11T04:57:36.968Z",
                        "lastUpdatedBy": "testuser",
                        "lastUpdatedAt": "2021-05-11T04:57:36.968Z",
                        "createdBy": "testuser",
                        "name": "file-4.png",
                        "datasetId": "4"
                    },
                    "type": "Dataset"
                },
                {
                    "resourceId": "",
                    "resourcePath": "",
                    "properties": {
                        "owner": "abelota",
                        "createdAt": "2021-05-11T04:57:40.645Z",
                        "lastUpdatedBy": "abelota",
                        "lastUpdatedAt": "2021-05-11T04:57:40.645Z",
                        "createdBy": "abelota",
                        "name": "abelota-05-10-2021-22-57",
                        "collectionId": "3"
                    },
                    "type": "Collection"
                },
                {
                    "resourceId": "",
                    "resourcePath": "",
                    "properties": {
                        "owner": "testuser",
                        "createdAt": "2021-05-11T04:57:36.968Z",
                        "lastUpdatedBy": "testuser",
                        "lastUpdatedAt": "2021-05-11T04:57:36.968Z",
                        "createdBy": "testuser",
                        "name": "file-1.png",
                        "datasetId": "1"
                    },
                    "type": "Dataset"
                },
                {
                    "resourceId": "",
                    "resourcePath": "",
                    "properties": {
                        "owner": "abelota",
                        "createdAt": "2021-05-11T04:57:40.645Z",
                        "lastUpdatedBy": "abelota",
                        "lastUpdatedAt": "2021-05-11T04:57:40.645Z",
                        "createdBy": "abelota",
                        "name": "xxhhhhdhdhd-8.png",
                        "datasetId": "20"
                    },
                    "type": "Dataset"
                },
                {
                    "resourceId": "",
                    "resourcePath": "",
                    "properties": {
                        "owner": "abelota",
                        "createdAt": "2021-05-11T04:57:39.754Z",
                        "lastUpdatedBy": "abelota",
                        "lastUpdatedAt": "2021-05-11T04:57:39.754Z",
                        "createdBy": "abelota",
                        "name": "file-6.png",
                        "datasetId": "12"
                    },
                    "type": "Dataset"
                }
            ]
        };

        if (!parentFolderId) {
            return [];
        } else {
            return resources.filter(({type}) => type === "Dataset")
                .map(({properties: {createdAt, createdBy, name, datasetId}}) => {
                    return {
                        fileId: datasetId,
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
