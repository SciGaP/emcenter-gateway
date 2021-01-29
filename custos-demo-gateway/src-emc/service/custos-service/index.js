import axios from "axios";
import http from "http";
import https from "https";
import CustosGroups from "./custos-service-groups";
import CustosUsers from "./custos-service-users";
import CustosIdentity from "./custos-service-identity";

const httpAgent = new http.Agent({keepAlive: true});
const httpsAgent = new https.Agent({keepAlive: true});

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
            httpAgent,
            httpsAgent,
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
            httpAgent,
            httpsAgent,
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
            httpAgent,
            httpsAgent,
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