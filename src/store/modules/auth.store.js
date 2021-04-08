import decode from "jwt-decode";
import {hasTokenExpired} from "../util/jwt.util";
import {custosService} from "../util/custos.util";

// const ACCESS_TOKEN_KEY = 'access_token';
// const ID_TOKEN_KEY = 'id_token';
// const REFRESH_TOKEN_KEY = 'refresh_token';

const state = {
    accessToken: null,
    idToken: null,
    refreshToken: null
};

const actions = {
    async init({commit}) {
        commit("SET_TOKENS", {
            accessToken: custosService.identity.accessToken,
            idToken: custosService.identity.idToken,
            refreshToken: custosService.identity.refreshToken
        });
    },
    async fetchAuthorizationEndpoint() {
        const {clientId, redirectURI} = custosService;
        const {data: {authorization_endpoint}} = await custosService.identity.getOpenIdConfig();
        window.location.href = `${authorization_endpoint}?response_type=code&client_id=${clientId}&redirect_uri=${redirectURI}&scope=openid&kc_idp_hint=oidc`;
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
        commit("CLEAR_TOKENS");
        await custosService.identity.logout();
    },
    async refreshAuthentication({commit, state}) {
        if (state.refreshToken && hasTokenExpired(state.refreshToken)) {
            await custosService.identity.getTokenUsingRefreshToken()
                .catch(() => commit("CLEAR_TOKENS"))
                .then(({data: {access_token, id_token, refresh_token}}) => {
                    commit("SET_TOKENS", {accessToken: access_token, idToken: id_token, refreshToken: refresh_token});
                });
        }
    }
}

const mutations = {
    SET_TOKENS(state, {accessToken, idToken, refreshToken}) {
        custosService.identity.accessToken = accessToken;
        custosService.identity.idToken = idToken;
        custosService.identity.refreshToken = refreshToken;

        state.accessToken = accessToken;
        state.idToken = idToken;
        state.refreshToken = refreshToken;
    },
    CLEAR_TOKENS(state) {
        custosService.identity.accessToken = null;
        custosService.identity.idToken = null;
        custosService.identity.refreshToken = null;

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
