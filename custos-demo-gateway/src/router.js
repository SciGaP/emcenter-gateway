import Vue from "vue";
import Router from "vue-router";
import Landing from "./components/landing/Landing.vue";
import store from './store/index'
import auth from "@/service/auth";

Vue.use(Router)

export default new Router({
    mode: "history",
    routes: [
        {
            path: "/",
            name: "home",
            component: Landing
        },
        {
            path: "/register",
            name: "account",
            component: () =>
                import(/*webpackChunkName:"account"*/  "./components/registration/CreateAccount")
        },
        {
            path: "/tenant/:tenantId/workspace",
            name: "workspace",
            beforeEnter: async (to, from, next) => {
                await validate(next)
            },
            component: () =>
                import(/*webpackChunkName:"workspace"*/  "./components/workspace/Workspace")
        },
        {
            path: "/tenant/:tenantId/workspace/groups",
            name: "groups",
            beforeEnter: async (to, from, next) => {
                await validate(next)
            },
            component: () =>
                import(/*webpackChunkName:"groups"*/  "./components/workspace/Groups")
        },
        {
            path: "/workspace/profile",
            name: "profile",
            beforeEnter: async (to, from, next) => {
                await validate(next)
            },
            component: () =>
                import(/*webpackChunkName:"groups"*/  "./components/workspace/Profile")
        },
        {
            path: "/tenant/:tenantId/workspace/profile",
            name: "tenantUserProfile",
            beforeEnter: async (to, from, next) => {
                await validate(next)
            },
            component: () =>
                import(/*webpackChunkName:"groups"*/  "./components/workspace/Profile")
        },
        {
            path: "/tenant/:tenantId/workspace/logs",
            name: "logs",
            beforeEnter: async (to, from, next) => {
                await validate(next)
            },
            component: () =>
                import(/*webpackChunkName:"logs"*/  "./components/workspace/Logs")
        },
        {
            path: "/tenant/:tenantId/workspace/secrets",
            name: "secrets",
            beforeEnter: async (to, from, next) => {
                await validate(next)
            },
            component: () =>
                import(/*webpackChunkName:"secrets"*/  "./components/workspace/Secrets")
        },
        {
            path: "/tenant/:tenantId/workspace/sharings",
            name: "sharings",
            beforeEnter: async (to, from, next) => {
                await validate(next)
            },
            component: () =>
                import(/*webpackChunkName:"sharings"*/  "./components/workspace/Sharing")
        },
        {
            path: "/tenant/:tenantId/workspace/users",
            name: "users",
            beforeEnter: async (to, from, next) => {
                await validate(next)
            },
            component: () =>
                import(/*webpackChunkName:"users"*/  "./components/workspace/Users")
        },
        {
            path: "/tenant/:tenantId/workspace/agents",
            name: "agents",
            beforeEnter: async (to, from, next) => {
                await validate(next)
            },
            component: () =>
                import(/*webpackChunkName:"account"*/  "./components/workspace/Agents")
        },
        {
            path: "/tenants",
            name: "tenants",
            beforeEnter: async (to, from, next) => {
                await validate(next)
            },
            component: () =>
                import(/*webpackChunkName:"account"*/  "./components/admin-portal/Tenants")
        },
        {
            path: "/callback",
            name: "callback",
            component: () =>
                import(/*webpackChunkName:"users"*/  "./components/Callback")
        },
        {
            path: "*",
            name: "notFound",
            component:()=>
                import(/*webpackChunkName:"users"*/  "./components/404")
        },
        {
            path: "/tenant/:tenantId/login",
            name: "tenantLogin",
            props: true,
            component: () =>
                import(/*webpackChunkName:"users"*/  "./components/landing/TenantLogin")
        },

    ]


})

async function validate(next) {
    let data = {
        client_id: process.env.VUE_APP_CLIENT_ID,
        client_sec: process.env.VUE_APP_CLIENT_SEC
    }
    if (auth.isTenantModeActivated()) {
        data = {
            client_id: auth.getClientId(),
            client_sec: auth.getClientSec()
        }
        console.log(data)
    }
    if (await store.dispatch('identity/isAuthenticated', data) == true) {
        // You can use store variable here to access globalError or commit mutation
        console.log("Authenticationed")
        next(true)
    } else {
        next('/')
    }
}
