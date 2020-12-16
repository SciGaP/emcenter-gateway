import decode from "jwt-decode";
import {hasTokenExpired} from "../util/jwt.util";
import {custosService} from "../util/custos.util";

const ACCESS_TOKEN_KEY = 'access_token';
const ID_TOKEN_KEY = 'id_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

const state = {
    accessToken: localStorage.getItem(ACCESS_TOKEN_KEY),
    idToken: localStorage.getItem(ID_TOKEN_KEY),
    refreshToken: localStorage.getItem(REFRESH_TOKEN_KEY)
};

const actions = {
    async fetchAuthorizationEndpoint() {
        const {clientId, redirectUri} = custosService;
        const {data: {authorization_endpoint}} = await custosService.identity.getOpenIdConfig();
        window.location.href = `${authorization_endpoint}?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=openid&kc_idp_hint=oidc`;
    },
    async authenticateUsingCode({commit}, {tokenEndpoint, code}) {
        const {data: {access_token, id_token, refresh_token}} = await custosService.identity.getToken({
            tokenEndpoint, code
        });
        commit("SET_TOKENS", {accessToken: access_token, idToken: id_token, refreshToken: refresh_token});
    },
    async authenticateLocally({commit}, {tokenEndpoint, username, password}) {
        const {data: {access_token, id_token, refresh_token}} = await custosService.identity.localLogin({
            tokenEndpoint, username, password
        });
        commit("SET_TOKENS", {accessToken: access_token, idToken: id_token, refreshToken: refresh_token});
    },
    async logout({commit}) {
        await custosService.identity.logout();
        commit("CLEAR_TOKENS");
    },
    async refreshAuthentication({commit, state}) {
        if (state.refreshToken && hasTokenExpired(state.refreshToken)) {
            const {
                data: {access_token, id_token, refresh_token}
            } = await custosService.identity.getTokenUsingRefreshToken().catch(() => commit("CLEAR_TOKENS"));
            commit("SET_TOKENS", {accessToken: access_token, idToken: id_token, refreshToken: refresh_token});
        }
    }
}

const mutations = {
    SET_TOKENS(state, {accessToken, idToken, refreshToken}) {
        localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
        localStorage.setItem(ID_TOKEN_KEY, idToken);
        localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);

        state.accessToken = accessToken;
        state.idToken = idToken;
        state.refreshToken = refreshToken;
    },
    CLEAR_TOKENS(state) {
        localStorage.removeItem(ACCESS_TOKEN_KEY);
        localStorage.removeItem(ID_TOKEN_KEY);
        localStorage.removeItem(REFRESH_TOKEN_KEY);

        state.accessToken = null;
        state.idToken = null;
        state.refreshToken = null;
    }
}

const getters = {
    accessToken(state) {
        return state.accessToken;
    },
    idToken(state) {
        return state.idToken;
    },
    refreshToken(state) {
        return state.refreshToken;
    },
    authenticated(state, getters) {
        if (getters.idToken && !hasTokenExpired(state.idToken)) {
            return true;
        } else {
            return false;
        }
    },
    isAdmin(state, getters) {
        let {realm_access: {roles}} = decode(getters.accessToken);
        return roles.indexOf("admin")
    },
    currentUsername(state, getters) {
        if (getters.accessToken) {
            let {preferred_username} = decode(getters.accessToken);
            return preferred_username;
        } else {
            return null
        }
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
