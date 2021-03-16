import CustosService from "./index";

const ACCESS_TOKEN_KEY = 'access_token';
const ID_TOKEN_KEY = 'id_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

export default class CustosIdentity {
    /**
     * @type {CustosService}
     */
    _custosService = null;
    changeListeners = [];

    constructor(custosService) {
        this._custosService = custosService;

        window.addEventListener('storage', (e) => {
            for (let i = 0; i < this.changeListeners.length; i++) {
                this.changeListeners[i] && typeof this.changeListeners[i] === "function" && this.changeListeners[i](e);
            }
        });
    }

    get accessToken() {
        return sessionStorage.getItem(ACCESS_TOKEN_KEY);
    }

    set accessToken(accessToken) {
        if (accessToken == null) {
            sessionStorage.removeItem(ACCESS_TOKEN_KEY);
        } else {
            sessionStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
        }
    }

    get refreshToken() {
        return sessionStorage.getItem(REFRESH_TOKEN_KEY);
    }

    set refreshToken(refreshToken) {
        if (refreshToken == null) {
            sessionStorage.removeItem(REFRESH_TOKEN_KEY);
        } else {
            sessionStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
        }
    }

    get idToken() {
        return sessionStorage.getItem(ID_TOKEN_KEY);
    }

    set idToken(idToken) {
        if (idToken == null) {
            sessionStorage.removeItem(ID_TOKEN_KEY);
        } else {
            sessionStorage.setItem(ID_TOKEN_KEY, idToken);
        }
    }

    get custosService() {
        return this._custosService;
    }

    onChange(changeListener) {
        this.changeListeners.push(changeListener);
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

        this.accessToken = access_token;
        this.idToken = id_token;
        this.refreshToken = refresh_token;

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
