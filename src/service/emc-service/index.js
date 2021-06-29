import axios from "axios";
import http from "http";
import https from "https";
import EmcFiles from "./custos-service-files";
import EmcFolders from "./custos-service-folders";
import {custosService} from "custos-demo-gateway/src/lib/store/util/custos.util";

const httpAgent = new http.Agent({keepAlive: true});
const httpsAgent = new https.Agent({keepAlive: true});

export default class EmcService {

    static baseURL = "http://149.165.157.235:10000/v1.0/api";

    static ENDPOINTS = {
        COLLECTIONS: "/drms/resource/searchResource",
        DATASETS: "/drms/resource/searchPreference"
    };

    constructor() {
        this._files = new EmcFiles(this);
        this._folders = new EmcFolders(this);
    }

    get files() {
        return this._files;
    }

    get folders() {
        return this._folders;
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
