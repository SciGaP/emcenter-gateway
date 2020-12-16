import CustosService from "./index";

const ACCESS_TOKEN_KEY = 'access_token';
const ID_TOKEN_KEY = 'id_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

export default class CustosIdentity {
    /**
     * @type {CustosService}
     */
    _custosService = null;

    _accessToken = null;

    _refreshToken = null;

    _idToken = null;

    constructor(custosService) {
        this._custosService = custosService;

        this._accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
        this._idToken = localStorage.getItem(ID_TOKEN_KEY);
        this._refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
    }

    get accessToken() {
        return this._accessToken;
    }

    get refreshToken() {
        return this._refreshToken;
    }

    get idToken() {
        return this._idToken;
    }

    get custosService() {
        return this._custosService;
    }

    getOpenIdConfig() {
        return this.custosService.axiosInstanceWithClientAuthorization.get(
            `${CustosService.ENDPOINTS.IDENTITY}/.well-known/openid-configuration`,
            {
                params: {'client_id': this.custosService.clientId}
            }
        );
    }

    _saveTokenResponse(response) {
        const {data: {access_token, id_token, refresh_token}} = response;

        this._accessToken = access_token;
        this._refreshToken = refresh_token;
        this._idToken = id_token;

        localStorage.setItem(ACCESS_TOKEN_KEY, this.accessToken);
        localStorage.setItem(ID_TOKEN_KEY, this.idToken);
        localStorage.setItem(REFRESH_TOKEN_KEY, this.refreshToken);

        return response;
    }

    getToken({tokenEndpoint, code}) {
        return this.custosService.axiosInstanceWithClientAuthorization.post(
            tokenEndpoint,
            {'code': code, 'redirect_uri': this.custosService.redirectURI, 'grant_type': 'authorization_code'}
        ).then(this._saveTokenResponse.bind(this));
    }

    localLogin({tokenEndpoint, username, password}) {
        return this.custosService.axiosInstanceWithClientAuthorization.post(
            tokenEndpoint,
            {'grant_type': 'password', 'username': username, 'password': password}
        ).then(this._saveTokenResponse.bind(this));
    }

    logout() {
        return this.custosService.axiosInstanceWithClientAuthorization.post(
            `${CustosService.ENDPOINTS.IDENTITY}/user/logout`,
            {refresh_token: this.refreshToken}
        );
    }

    getTokenUsingRefreshToken() {
        return this.custosService.axiosInstanceWithClientAuthorization.post(
            `${CustosService.ENDPOINTS.IDENTITY}/token`,
            {'refresh_token': this.custosService.refreshToken, 'grant_type': 'refresh_token'}
        ).then(this._saveTokenResponse.bind(this));
    }
}
