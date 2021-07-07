import axios from "axios";
import http from "http";
import https from "https";
import EmcFiles from "./custos-service-files";
import EmcFolders from "./custos-service-folders";
import EmcResources from "./emc-service-resource";
import {custosService} from "airavata-custos-portal/src/lib/store/util/custos.util";
import config from "../../config";

const httpAgent = new http.Agent({keepAlive: true});
const httpsAgent = new https.Agent({keepAlive: true});

export default class EmcService {

    static baseURL = config.value('datalakeDrmsUrl');

    static ENDPOINTS = {
        RESOURCE: "/drms/resource",
        RESOURCE_SEARCH: "/drms/resource/searchResource",
        RESOURCE_CHILDREN: "/drms/resource/child",
        RESOURCE_PARENT: "/drms/resource/parent",
        RESOURCE_METADATA: "/drms/resource/metadata",

        COLLECTIONS: "/drms/resource/searchResource",
        CHILDREN: "/drms/resource/child",
        DATASETS: "/drms/resource/searchPreference",
        COLLECTION_GROUPS: "/drms/resource/searchResource",
    };

    constructor() {
        this._files = new EmcFiles(this);
        this._folders = new EmcFolders(this);
        this._resources = new EmcResources(this);
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
