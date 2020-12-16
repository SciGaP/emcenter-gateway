import axios from "axios";
import CustosGroups from "./group_management";
import CustosUsers from "./user_management";
import CustosIdentity from "./identity_management";

export const identityMgtEndpoint = "/identity-management/v1.0.0";
export const userMgtEndpoint = "user-management/v1.0.0";
export const groupMgtEndpoint = "group-management/v1.0.0";


export const custosApiAxios = axios.create({
    baseURL: 'https://custos.scigap.org/apiserver/',
    withCredentials: false,
    headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json'
    }
});

export function getCustosApiAuthorizationHeader({clientId, clientSecret}) {
    return {
        'Authorization': `Bearer ${btoa(`${clientId}:${clientSecret}`)}`
    };
}

// export class CustosApiBase {
//     _clientId = null;
//     _clientSecret = null;
//     _baseURL = null;
//
//     constructor({clientId, clientSecret, baseURL}) {
//         this._clientId = clientId;
//         this._clientId = clientSecret;
//         this._baseURL = baseURL;
//     }
//
//     get clientId() {
//         return this._clientId;
//     }
//
//     get clientSecret() {
//         return this._clientSecret;
//     }
//
//     get baseURL() {
//         return this._baseURL;
//     }
// }

export default class CustosService {
    static ENDPOINTS = {
        IDENTITY: "/identity-management/v1.0.0",
        USERS: "user-management/v1.0.0",
        GROUPS: "group-management/v1.0.0"
    };

    /**
     * Api Client ID
     * @type {strong}
     * @private
     */
    _clientId = null;

    /**
     * Api Client Secret
     * @type {strong}
     * @private
     */
    _clientSecret = null;

    /**
     * Api Redirect URI
     * @type {strong}
     * @private
     */
    _redirectURI = null;

    /**
     * Api Base URL
     * @type {strong}
     * @private
     */
    _baseURL = null;


    /**
     * @type {CustosGroups}
     */
    _groups = null;

    /**
     * @type {CustosUsers}
     */
    _users = null;

    /**
     * @type {CustosIdentity}
     */
    _identity = null;

    constructor({clientId, clientSecret, redirectURI, baseURL}) {
        this._clientId = clientId;
        this._clientSecret = clientSecret;
        this._redirectURI = redirectURI;
        this._baseURL = baseURL;
        this._groups = new CustosGroups(this);
        this._users = new CustosUsers(this);
        this._identity = new CustosIdentity(this);
    }

    get clientId() {
        return this._clientId;
    }

    get clientSecret() {
        return this._clientSecret;
    }

    get redirectURI() {
        return this._redirectURI;
    }

    get baseURL() {
        return this._baseURL;
    }

    get groups() {
        return this._groups;
    }

    get users() {
        return this._users;
    }

    get identity() {
        return this._identity;
    }

    get axiosInstance() {
        return axios.create({
            baseURL: this.baseURL,
            withCredentials: false,
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json'
            }
        });
    }

    get axiosInstanceWithClientAuthorization() {
        return axios.create({
            baseURL: this.baseURL,
            withCredentials: false,
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${btoa(`${this.clientId}:${this.clientSecret}`)}`
            }
        });
    }

    get axiosInstanceWithTokenAuthorization() {
        return axios.create({
            baseURL: this.baseURL,
            withCredentials: false,
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.identity.accessToken}`
            }
        });
    }
}