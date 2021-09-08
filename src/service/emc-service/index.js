import axios from "axios";
import http from "http";
import https from "https";
import EmcResources from "./emc-service-resource";
import {custosService} from "airavata-custos-portal/src/lib/store/util/custos.util";
import config from "../../config";
import EmcStoragePreference from "@/service/emc-service/emc-service-storage-preference";
import EmcStorage from "@/service/emc-service/emc-service-storage";

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
        RESOURCE_DOWNLOAD: "/dataorch/mftdownload",

        COLLECTIONS: "/v1.0/api/drms/resource/searchResource",
        CHILDREN: "/v1.0/api/drms/resource/child",
        DATASETS: "/v1.0/api/drms/resource/searchPreference",
        COLLECTION_GROUPS: "/v1.0/api/drms/resource/searchResource",

        STORAGE: "/v1.0/api/drms/storage",
        STORAGE_PREFERENCE: "/v1.0/api/drms/storagePreference"
    };

    constructor() {
        this._resources = new EmcResources(this);
        this._storagePreference = new EmcStoragePreference(this);
        this._storage = new EmcStorage(this);
    }

    get resources() {
        return this._resources;
    }

    get storagePreference() {
        return this._storagePreference;
    }

    get storage() {
        return this._storage;
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
        const instance = axios.create({
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

        instance.interceptors.response.use(response => {
            return response;
        }, async error => {
            const {config, response: {status}} = error;
            const originalRequest = config;

            if (status >= 400) {
                await custosService.identity.getTokenUsingRefreshToken();
                originalRequest.headers['Authorization'] = `Bearer ${custosService.identity.accessToken}`;
                return axios(originalRequest);
            } else {
                return Promise.reject(error);
            }
        });

        return instance;
    }

}