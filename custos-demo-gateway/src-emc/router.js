import Vue from "vue";
import Router from "vue-router";
import store from '../src/store/index'
import config from "../src/config";
import Home from "./pages/Home";
import Login from "./pages/Login";

Vue.use(Router)

async function _validateAuthenticationBeforeEnter(to, from, next) {
    if (await store.dispatch('identity/isAuthenticated', {
        client_id: config.value('clientId'),
        client_sec: config.value('clientSec'),
    }) === true) {
        // You can use store variable here to access globalError or commit mutation
        next(true)
    } else {
        next('/login')
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
            path: "/register",
            name: "account",
            component: () =>
                import(/*webpackChunkName:"account"*/  "../src/components/registration/CreateAccount")
        },
        {
            path: "/dashboard",
            name: "dashboard",
            beforeEnter: _validateAuthenticationBeforeEnter,
            component: () =>
                import(/*webpackChunkName:"groups"*/  "./pages/Dashboard")
        },
        {
            path: "/datasets",
            name: "datasets",
            beforeEnter: _validateAuthenticationBeforeEnter,
            component: () =>
                import(/*webpackChunkName:"groups"*/  "./pages/Datasets")
        },
        {
            path: "/profile",
            name: "profile",
            beforeEnter: _validateAuthenticationBeforeEnter,
            component: () =>
                import(/*webpackChunkName:"groups"*/  "./pages/Profile")
        },
        {
            path: "/settings",
            name: "settings",
            beforeEnter: _validateAuthenticationBeforeEnter,
            component: () =>
                import(/*webpackChunkName:"groups"*/  "./pages/Settings")
        },
        {
            path: "/callback",
            name: "callback",
            component: () =>
                import(/*webpackChunkName:"users"*/  "../src/components/Callback")
        },

    ]
})



