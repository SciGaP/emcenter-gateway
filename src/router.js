import Vue from "vue";
import Router from "vue-router";
import store from './store/index';
import Home from "./pages/HomePage";
import Login from "./pages/LoginPage";

Vue.use(Router)

async function _validateAuthenticationBeforeEnter(to, from, next) {
    await store.dispatch('auth/refreshAuthentication');
    const authenticated = store.getters['auth/authenticated'];

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
                import("./pages/DashboardPage")
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
                import("./pages/ProfilePage")
        },
        {
            path: "/settings",
            name: "settings",
            beforeEnter: _validateAuthenticationBeforeEnter,
            component: () =>
                import("./pages/SettingsPage")
        },
        {
            path: "/data",
            name: "data",
            beforeEnter: _validateAuthenticationBeforeEnter,
            component: () =>
                import("./pages/GroupDataPage")
        },
        {
            path: "/groups",
            name: "groups",
            beforeEnter: _validateAuthenticationBeforeEnter,
            component: () =>
                import("./pages/GroupsPage")
        },
        {
            path: "/groups/:groupId",
            name: "settings",
            beforeEnter: _validateAuthenticationBeforeEnter,
            component: () =>
                import("./pages/GroupPage")
        },
        {
            path: "/callback",
            name: "callback",
            component: () =>
                import("./pages/CallbackPage")
        },

    ]
});
