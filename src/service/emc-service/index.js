import axios from "axios";
import http from "http";
import https from "https";
import EmcFiles from "./custos-service-files";
import EmcFolders from "./custos-service-folders";
import EmcResources from "./emc-service-resource";
import {custosService} from "airavata-custos-portal/src/lib/store/util/custos.util";
import config from "../../config";
import EmcStoragePreference from "@/service/emc-service/emc-service-storage-preference";

const httpAgent = new http.Agent({keepAlive: true});
const httpsAgent = new https.Agent({keepAlive: true});

export default class EmcService {

    static baseURL = config.value('datalakeDrmsUrl');

    static ENDPOINTS = {
        RESOURCE: "/v1.0/api/drms/resource",
        RESOURCE_SEARCH: "/v1.0/api/drms/resource/searchResource",
        RESOURCE_CHILDREN: "/v1.0/api/drms/resource/child",
        RESOURCE_PARENT: "/v1.0/api/drms/resource/parent",
        RESOURCE_METADATA: "/v1.0/api/drms/resource/metadata",
        RESOURCE_DOWNLOAD: "/dataorch/mftdownlaod",

        COLLECTIONS: "/v1.0/api/drms/resource/searchResource",
        CHILDREN: "/v1.0/api/drms/resource/child",
        DATASETS: "/v1.0/api/drms/resource/searchPreference",
        COLLECTION_GROUPS: "/v1.0/api/drms/resource/searchResource",

        STORAGE: "/v1.0/api/drms/storage",
        STORAGE_PREFERENCE: "/v1.0/api/drms/storagePreference"
    };

    constructor() {
        this._files = new EmcFiles(this);
        this._folders = new EmcFolders(this);
        this._resources = new EmcResources(this);
        this._storagePreference = new EmcStoragePreference(this);
    }

    get files() {
        return this._files;
    }

    get folders() {
        return this._folders;
    }

    get resources() {
        return this._resources;
    }

    get storagePreference() {
        return this._storagePreference;
    }

    //
    // get axiosInstance() {
    //     return axios.create({
    //         httpAgent,
    //         httpsAgent,
    //         baseURL: this.baseURL,
    //         withCredentials: false,
    //         headers: {
    //             'Accept': '*/*',
    //             'Content-Type': 'application/json'
    //         }
    //     });
    // }
    //
    // get axiosInstanceWithClientAuthorization() {
    //     return axios.create({
    //         httpAgent,
    //         httpsAgent,
    //         baseURL: this.baseURL,
    //         withCredentials: false,
    //         headers: {
    //             'Accept': '*/*',
    //             'Content-Type': 'application/json',
    //             'Authorization': `Bearer ${btoa(`${this.clientId}:${this.clientSecret}`)}`
    //         }
    //     });
    // }
    //
    get axiosInstanceWithTokenAuthorization() {
        return axios.create({
            httpAgent,
            httpsAgent,
            baseURL: EmcService.baseURL,
            withCredentials: false,
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': "*",
                'Origin': '*',
                'Authorization': `Bearer ${custosService.identity.accessToken}`
            }
        })
    }
}
