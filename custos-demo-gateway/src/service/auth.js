import decode from 'jwt-decode';

const ID_TOKEN_KEY = 'id_token';
const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

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

    getIdToken() {
        return localStorage.getItem(ID_TOKEN_KEY);
    },

    getAccessToken() {
        return localStorage.getItem(ACCESS_TOKEN_KEY);
    },

    getRefreshToken(){
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
        if (token) {
            let decodedToken = decode(token)
            return decodedToken.preferred_username
        } else {
            return null
        }
    }

}