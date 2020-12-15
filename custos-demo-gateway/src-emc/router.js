import Vue from "vue";
import Router from "vue-router";
import store from './store/index'
import config from "./config";
import Home from "./pages/Home";
import Login from "./pages/Login";

Vue.use(Router)

async function _validateAuthenticationBeforeEnter(to, from, next) {
    await store.dispatch('auth/refreshAuthentication', {
        clientId: config.value('clientId'),
        clientSecret: config.value('clientSec'),
    });

    const authenticated = store.getters['auth/authenticated'];

    console.log("ROUTER authenticated ", authenticated)

    if (!authenticated) {
        next('/login');
    } else {
        next(true);
    }
}

export default new Router({
    mode: "history",
    routes: [
        {
            path: "/",
            name: "home",
            component: Home
        },
        {
            path: "/login",
            name: "login",
            component: Login
        },
        {
            path: "/dashboard",
            name: "dashboard",
            beforeEnter: _validateAuthenticationBeforeEnter,
            component: () =>
                import("./pages/Dashboard")
        },
        {
            path: "/collections",
            name: "collections",
            beforeEnter: _validateAuthenticationBeforeEnter,
            component: () =>
                import("./pages/CollectionsPage")
        },
        {
            path: "/collections/:collectionId",
            name: "collection",
            beforeEnter: _validateAuthenticationBeforeEnter,
            component: () =>
                import("./pages/CollectionPage")
        },
        {
            path: "/profile",
            name: "profile",
            beforeEnter: _validateAuthenticationBeforeEnter,
            component: () =>
                import("./pages/Profile")
        },
        {
            path: "/settings",
            name: "settings",
            beforeEnter: _validateAuthenticationBeforeEnter,
            component: () =>
                import("./pages/Settings")
        },
        {
            path: "/callback",
            name: "callback",
            component: () =>
                import("./pages/Callback")
        },

    ]
});
