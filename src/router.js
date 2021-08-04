import Vue from "vue";
import Router from "vue-router";
import Home from "./pages/HomePage";
import Login from "./pages/LoginPage";

import {custosService} from "airavata-custos-portal/src/lib/store/util/custos.util";
import {custosStore} from "./store";

Vue.use(Router)


// async function _validateAuthenticationBeforeEnter(to, from, next) {
//     const authenticated = store.getters['auth/authenticated'];
//
//     if (!authenticated) {
//         next('/login');
//     } else {
//         next(true);
//     }
// }

async function _validateAuthenticationBeforeEnter(to, from, next) {
    await custosStore.dispatch('auth/refreshAuthentication');
    const authenticated = custosStore.getters['auth/authenticated'];


    console.log("store ", custosStore)
    if (!authenticated) {
        console.log("NOT authenticated");
        // next(true);
        next('/');
    } else {
        const username = custosStore.getters["auth/currentUsername"];

        if (!custosStore.getters["user/getUser"]({username, clientId: custosService.clientId})) {
            await custosStore.dispatch('user/fetchUsers', {username, clientId: custosService.clientId});
        }

        // if (!custosStore.getters["tenant/getTenant"]({clientId: custosService.clientId})) {
        //     await custosStore.dispatch("tenant/fetchTenant", {clientId: custosService.clientId});
        // }

        console.log("YES authenticated " + custosStore.getters["user/getUser"]({username}));
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
            path: "/profile",
            name: "profile",
            beforeEnter: _validateAuthenticationBeforeEnter,
            component: () =>
                import("./pages/ProfilePage")
        },
        {
            path: "/storage-preferences/new",
            name: "storage-preferences-new",
            beforeEnter: _validateAuthenticationBeforeEnter,
            component: () =>
                import("./pages/storage/storage-preference-new")
        },
        {
            path: "/storages/new",
            name: "storage-new",
            beforeEnter: _validateAuthenticationBeforeEnter,
            component: () =>
                import("./pages/storage/storage-new")
        },
        {
            path: "/storages",
            name: "storages-list",
            beforeEnter: _validateAuthenticationBeforeEnter,
            component: () =>
                import("./pages/storage/storage-list")
        },
        {
            path: "/collections",
            name: "data",
            beforeEnter: _validateAuthenticationBeforeEnter,
            component: () =>
                import("./pages/resource/resource-list")
        },
        {
            path: "/labs",
            name: "data",
            beforeEnter: _validateAuthenticationBeforeEnter,
            component: () =>
                import("./pages/resource/lab/lab-list")
        },
        {
            path: "/labs/:resourceId",
            name: "data",
            beforeEnter: _validateAuthenticationBeforeEnter,
            component: () =>
                import("./pages/resource/lab/lab-page")
        },
        {
            path: "/collections/new",
            name: "data",
            beforeEnter: _validateAuthenticationBeforeEnter,
            component: () =>
                import("./pages/resource/resource-new")
        },
        {
            path: "/groups",
            name: "groups",
            beforeEnter: _validateAuthenticationBeforeEnter,
            component: () =>
                import("./pages/group/group-list-page")
        },
        {
            path: "/groups/new",
            name: "groups",
            beforeEnter: _validateAuthenticationBeforeEnter,
            component: () =>
                import("./pages/group/group-new-page")
        },
        {
            path: "/groups/:groupId",
            name: "settings",
            beforeEnter: _validateAuthenticationBeforeEnter,
            component: () =>
                import("./pages/group/group-page")
        },
        {
            path: "/callback",
            name: "callback",
            component: () =>
                import("./pages/CallbackPage")
        },

    ]
});
