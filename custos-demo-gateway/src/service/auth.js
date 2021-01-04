import decode from 'jwt-decode';


const ID_TOKEN_KEY = 'id_token';
const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

const ACTIVE_CLIENT_ID = 'active_client_id';
const ACTIVE_CLEINT_SEC = 'active_client_sec';


const TENANT_ADMIN_CUSTOS_ID_TOKEN = 'tenant_admin_id_token';
const TENANT_ADMIN_CUSTOS_ACCESS_TOKEN = 'tenant_admin_access_token';
const TENANT_ADMIN_CUSTOS_REFRESH_TOKEN = 'tenant_admin_refresh_token';


export default {

    isLoggedIn() {
        const idToken = this.getIdToken();
        return !!idToken && !this.isTokenExpired(idToken);
    },

    isTokenExpired(token) {
        const expirationDate = this.getTokenExpirationDate(token);
        return expirationDate < new Date();
    },


    getTokenExpirationDate(encodedToken) {
        const token = decode(encodedToken);
        if (!token.exp) {
            return null;
        }

        const date = new Date(0);
        date.setUTCSeconds(token.exp);
        return date;
    },

    logout() {
        this.clearIdToken();
        this.clearAccessToken();
        window.location.href = "/"
    },

    setAccessToken(token) {
        this.clearAccessToken()
        localStorage.setItem(ACCESS_TOKEN_KEY, token)
    },
    setIdToken(token) {
        this.clearIdToken();
        localStorage.setItem(ID_TOKEN_KEY, token)
    },


    setRefreshToken(token) {
        this.clearRefreshToken()
        localStorage.setItem(REFRESH_TOKEN_KEY, token)
    },


    setClientId(client_id) {
        this.clearActiveClientID()
        localStorage.setItem(ACTIVE_CLIENT_ID, client_id);
    },

    setClientSec(client_sec) {
        this.clearActiveClientSec()
        localStorage.setItem(ACTIVE_CLEINT_SEC, client_sec);
    },


    getClientId() {
       return  localStorage.getItem(ACTIVE_CLIENT_ID);
    },

    getClientSec() {
       return  localStorage.getItem(ACTIVE_CLEINT_SEC);
    },

    getIdToken() {
        return localStorage.getItem(ID_TOKEN_KEY);
    },

    getAccessToken() {
        return localStorage.getItem(ACCESS_TOKEN_KEY);
    },

    getRefreshToken() {
        return localStorage.getItem(REFRESH_TOKEN_KEY)
    },

    clearIdToken() {
        localStorage.removeItem(ID_TOKEN_KEY);
    },

    clearAccessToken() {
        localStorage.removeItem(ACCESS_TOKEN_KEY);
    },

    clearRefreshToken() {
        localStorage.removeItem(REFRESH_TOKEN_KEY)
    },

    clearActiveClientID() {
        localStorage.removeItem(ACTIVE_CLIENT_ID);
    },

    clearActiveClientSec() {
        localStorage.removeItem(ACTIVE_CLEINT_SEC)
    },

    clearTenantAdminCachedIdToken() {
        localStorage.removeItem(TENANT_ADMIN_CUSTOS_ID_TOKEN);
    },

    clearTenantAdminCachedAccessToken() {
        localStorage.removeItem(TENANT_ADMIN_CUSTOS_ACCESS_TOKEN);
    },

    clearTenantAdminCachedRefreshToken() {
        localStorage.removeItem(TENANT_ADMIN_CUSTOS_REFRESH_TOKEN)
    },

    getTenantAdminCachedIdToken() {
        return localStorage.getItem(TENANT_ADMIN_CUSTOS_ID_TOKEN);
    },

    getTenantAdminCachedAccessToken() {
        return localStorage.getItem(TENANT_ADMIN_CUSTOS_ACCESS_TOKEN);
    },

    getTenantAdminCachedRefreshToken() {
        return localStorage.getItem(TENANT_ADMIN_CUSTOS_REFRESH_TOKEN)
    },

    setTenantAdminCachedIdToken(token) {
        this.clearTenantAdminCachedIdToken()
        localStorage.setItem(TENANT_ADMIN_CUSTOS_ID_TOKEN, token);
    },

    setTenantAdminCachedAccessToken(token) {
        this.clearTenantAdminCachedAccessToken()
        localStorage.setItem(TENANT_ADMIN_CUSTOS_ACCESS_TOKEN, token);
    },

    setTenantAdminCachedRefreshToken(token) {
        this.clearTenantAdminCachedRefreshToken()
        localStorage.setItem(TENANT_ADMIN_CUSTOS_REFRESH_TOKEN, token)
    },

    isUserHasAdminAccess() {
        let token = localStorage.getItem(ACCESS_TOKEN_KEY)
        let decodedToken = decode(token)
        let roles = decodedToken.realm_access.roles;
        let condition = false
        roles.forEach(role => {
            if (role === 'admin') {

                condition = true

            }
        })
        return condition
    },

    getLoggedUsername() {
        let token = localStorage.getItem(ACCESS_TOKEN_KEY)
        let decodedToken = decode(token)
        return decodedToken.preferred_username
    },

    isTenantModeActivated() {
        const clientId = localStorage.getItem(ACTIVE_CLIENT_ID)
        const clientSec = localStorage.getItem(ACTIVE_CLEINT_SEC)
        return !!clientId && !!clientSec;
    },

}