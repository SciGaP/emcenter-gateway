<template>
    <div v-if="showHeader()">
        <div class="header p-3">
            <div class="custos-logo">
                <img src="../assets/custos-logo_custos-logo-color-v1.png" style="width: 140px;">
            </div>
            <div class="user-details" v-if="user">
                <div class="username">{{user.first_name + " "+ user.last_name}}</div>
                <div class="email">{{user.email}}</div>
            </div>

            <b-dropdown right class="ml-2" text="" no-caret toggle-class="user-avatar-button">
                <template v-slot:button-content v-if="user">
                    <b-icon icon="person-fill"></b-icon>
                </template>
                <template v-slot:button-content v-else>
                    <b-spinner small label="Spinning"></b-spinner>
                </template>

                <template v-slot:default v-if="user">
                    <b-dropdown-item href="#" v-on:click="loadProfilePage">Profile</b-dropdown-item>
                    <b-dropdown-item v-on:click="logout">Logout</b-dropdown-item>
                </template>
            </b-dropdown>

        </div>
        <div class="navigation text-left" v-if="tenantModeactivated">
            <div class="row">
                <div class="column">
                    <router-link v-bind:to="{name: 'workspace', params:{tenantId:this.activatedClientId}}">
                        <b-icon icon="house-door-fill"></b-icon>

                    </router-link>
                    <router-link v-bind:to="{name: 'users', params:{tenantId:this.activatedClientId}}"
                                 v-if="this.isAdmin">Users
                    </router-link>
                    <router-link v-bind:to="{name: 'groups', params:{tenantId:this.activatedClientId}}">Groups
                    </router-link>
                    <router-link v-bind:to="{name: 'agents', params:{tenantId:this.activatedClientId}}"
                                 v-if="this.isAdmin">Service Accounts
                    </router-link>
                    <router-link v-bind:to="{name: 'secrets', params:{tenantId:this.activatedClientId}}">Secrets
                    </router-link>
                    <router-link v-bind:to="{name: 'sharings', params:{tenantId:this.activatedClientId}}">Sharing
                    </router-link>
                    <router-link v-bind:to="{name: 'logs', params:{tenantId:this.activatedClientId}}"
                                 v-if="this.isAdmin">Logs
                    </router-link>
                </div>
                <div class="column">
                    <b-button pill variant="success" size="sm" v-on:click="exitTenantExplorer" class="tenant-manager">
                        Tenant
                        Manager
                    </b-button>
                </div>
            </div>

        </div>


    </div>
</template>

<script>
    import config from "@/config";
    import auth from "@/service/auth";

    export default {
        name: "Header",
        data: function () {
            return {
                isAdmin: false,
                user: null,
                authenticated: false,
                tenantModeactivated: false,
                activatedClientId: ''

            }
        },
        methods: {
            showHeader() {
                return this.authenticated
            },
            async logout() {
                this.tenantModeactivated = await this.$store.dispatch('tenant/isTenantModeActivated')
                if (!this.tenantModeactivated) {
                    await this.$store.dispatch('identity/logout', {
                        client_id: config.value('clientId'),
                        client_sec: config.value('clientSec'),
                    })
                } else {
                    await this.$store.dispatch('identity/logoutTenantAdmin', {})
                }

                await this.$router.push("/")
                await this.$store.dispatch('agent/reset')
                await this.$store.dispatch('group/reset')
                await this.$store.dispatch('secret/reset')
                await this.$store.dispatch('sharing/reset')
                await this.$store.dispatch('user/reset')
            },
            async validateAuthentication() {
                this.tenantModeactivated = await this.$store.dispatch('tenant/isTenantModeActivated')
                if (!this.tenantModeactivated) {
                    this.authenticated = await this.$store.dispatch('identity/isAuthenticated', {
                        client_id: config.value('clientId'),
                        client_sec: config.value('clientSec')
                    }) === true
                } else {
                    this.authenticated = await this.$store.dispatch('identity/isAuthenticated', {
                        client_id: auth.getClientId(),
                        client_sec: auth.getClientSec()
                    }) === true
                }

                return this.authenticated
            },
            async fetchAuthenticatedUser() {
                this.isAdmin = await this.$store.dispatch('identity/isLoggedUserHasAdminAccess')
                let currentUserName = await this.$store.dispatch('identity/getCurrentUserName')
                this.tenantModeactivated = await this.$store.dispatch('tenant/isTenantModeActivated')

                if (await this.validateAuthentication() && (!this.user || this.user.username !== currentUserName)) {
                    let accessToken = await this.$store.getters['identity/getAccessToken']
                    let resp = await this.$store.dispatch('user/users', {
                        offset: 0,
                        limit: 1,
                        usertoken:accessToken,
                        username: currentUserName
                    })
                    if (Array.isArray(resp) && resp.length > 0) {
                        resp.forEach(obj => {
                            this.user = {
                                username: obj.username,
                                first_name: obj.first_name,
                                last_name: obj.last_name,
                                email: obj.email,
                                status: obj.state,
                                attributes: [],
                                roles: []
                            }
                        })
                    }
                }
            },

            async setOperationalMode() {
                this.tenantModeactivated = await this.$store.dispatch('tenant/isTenantModeActivated')
                if (this.tenantModeactivated) {
                    this.activatedClientId = await this.$store.dispatch('tenant/getActivatedClientId')
                }
            },
            async exitTenantExplorer() {
                await this.$store.dispatch('identity/logoutTenantAdmin')
                await this.$router.push({name: 'tenants'})
                this.tenantModeactivated = await this.$store.dispatch('tenant/isTenantModeActivated')
            },

            async loadProfilePage() {
                if (this.tenantModeactivated) {
                    await this.$router.push({name: 'tenantUserProfile', params: {tenantId: this.activatedClientId}})
                } else {
                    await this.$router.push({name: 'profile'})
                }

            }
        },
        watch: {
            $route() {
                this.authenticated = false
                this.fetchAuthenticatedUser()
                this.setOperationalMode()
            }
        },
        async beforeMount() {
            this.fetchAuthenticatedUser()
            this.setOperationalMode()
        }
    }
</script>

<style>
    .header {
        display: flex;
    }

    .header .custos-logo {
        flex: 1;
        display: flex;
    }

    .header .custos-logo-icon {
        width: 25px;
        height: 25px;
        border-radius: 8px;
        border: solid 5px #203a43;
        background-color: #ffffff;
        transform: rotate(45deg);
    }

    .header .custos-logo-text {
        font-family: Avenir;
        font-size: 18px;
        font-weight: 900;
        text-align: left;
        color: #203a43;

    }

    .header .user-details .username {
        font-family: Avenir;
        font-size: 15px;
        font-weight: 900;
        text-align: right;
        color: #afafae;
    }

    .header .user-details .email {
        font-family: Avenir;
        font-size: 13px;
        font-weight: 500;
        line-height: 1.07;
        text-align: right;
        color: #203a43;
    }

    .header .user-avatar-button {
        border-radius: 30px;
        width: 35px;
        height: 35px;
        padding: 0px;
        line-height: 0px;
        font-size: 15px;
        background-color: #4a4a4a;
    }

    .navigation {
        background: #fe8c00;
        background: -webkit-linear-gradient(to right, #f83600, #fe8c00);
        background: linear-gradient(to right, #f83600, #fe8c00);
    }

    .navigation a {
        font-family: Avenir;
        font-size: 15px;
        font-weight: 600;
        text-align: left;
        color: white;
        padding: 5px 15px;
        display: inline-block;
        transition: all 0.1s;
    }

    .navigation a:hover {
        color: white;
    }

    .navigation a:focus {
        color: white;
    }

    .navigation a.router-link-exact-active {
        background-color: #00000047;
    }

    .tenant-manager {
        position: fixed;
        margin-left: 30%;
        background-color: #f83600;
        border-color: #ebebeb;
        font-size: medium;
        margin-bottom: 0.25%;
        margin-top: 0.08%;
    }

    .column {
        float: left;
        width: 50%;
    }


    .left-column {
        float: left;
        width: 3%;
        padding: 0px;
        height: 100vh;
        background: #fe8c00;
        background: -webkit-linear-gradient(to bottom, #afafae, #afafae);
        background: linear-gradient(to bottom, #afafae, #afafae);
    }

    /*.right-column {*/
    /*    float: left;*/
    /*    width: 97%;*/
    /*    padding: 0px;*/
    /*    height: 100vh;*/
    /*}*/

    .upper-row {
        float: left;
        width: 100%;
        padding: 0px;
        background: #fe8c00;
        background: -webkit-linear-gradient(to right, #f83600, #fe8c00);
        background: linear-gradient(to right, #f83600, #fe8c00);
        height: 3.5%;
    }


</style>