<template>
    <b-container>
        <b-row class="mt-5 vh-100 text-center" align-h="center">
            <b-card-group columns style="max-width: 800px;">
                <b-card class="menu-card" v-if="this.isAdmin" :img-src="require('../../assets/users.png')" img-top>
                    <b-button href="#"
                              v-on:click="loadRoute($event, 'users')">
                        Manage Users
                    </b-button>
                </b-card>
                <b-card class="menu-card" :img-src="require('../../assets/groups_web.png')" img-top>
                    <b-button href="#"
                              v-on:click="loadRoute($event, 'groups')">
                        Manage Groups
                    </b-button>
                </b-card>
                <b-card class="menu-card" :img-src="require('../../assets/credentials.png')" img-top>
                    <b-button href="#"
                              v-on:click="loadRoute($event, 'secrets')">
                        Manage Secrets
                    </b-button>
                </b-card>
                <b-card class="menu-card" :img-src="require('../../assets/sharings.png')" img-top>
                    <b-button href="#"
                              v-on:click="loadRoute($event, 'sharings')">
                        Sharing
                    </b-button>
                </b-card>
                <b-card class="menu-card" v-if="isAdmin" :img-src="require('../../assets/bots.png')" img-top>
                    <b-button href="#" :disabled="!isAdmin"
                              v-on:click="loadRoute($event, 'agents')">
                        Service Accounts
                    </b-button>
                </b-card>
                <b-card class="menu-card" v-if="isAdmin" :img-src="require('../../assets/dblogs.png')" img-top>
                    <b-button href="#" :disabled="!isAdmin"
                              v-on:click="loadRoute($event, 'logs')">
                        Logs
                    </b-button>
                </b-card>
            </b-card-group>
        </b-row>
    </b-container>
</template>

<script>
    export default {
        name: "Workspace",
        data: function () {
            return {
                custosId: null,
                custosSec: null,
                isAdmin: false,
                user: null,
                currentUserName: null,
                tenantModeactivated: false
            }
        },
        methods: {
            loadRoute: function (event, route) {
                this.$router.push({name:route, params:{tenantId:this.custosId}} )
            },
            async logout() {
                let data = {
                    client_id: this.custosId,
                    client_sec: this.custosSec
                }
                await this.$store.dispatch('identity/logout', data)
                await this.$router.push("/")
                await this.$store.dispatch('agent/reset')
                await this.$store.dispatch('group/reset')
                await this.$store.dispatch('secret/reset')
                await this.$store.dispatch('sharing/reset')
                await this.$store.dispatch('user/reset')
            }
        },
        async mounted() {
            this.isAdmin = await this.$store.dispatch('identity/isLoggedUserHasAdminAccess')
            this.tenantModeactivated = await this.$store.dispatch('tenant/isTenantModeActivated')
            if (!this.tenantModeactivated) {
                await this.$router.push('tenants')
            }
            this.custosId = await this.$store.dispatch('tenant/getActivatedClientId')
            this.custosSec = await  this.$store.dispatch('tenant/getActivatedClientSecret');

        }
    }
</script>

<style scoped>
    .menu-card {
        max-width: 250px;
        min-width: 200px;
        height: 197px;
    }

    .menu-card img {
        width: 238px;
        height: 120px;
    }

    .menu-card .card-body a.btn {
        width: 100%;
        border-radius: 11px;
        border: solid 1px #afafae;
        background-color: #203a43;
        font-family: Avenir;
        font-size: 16px;
        font-weight: 500;
        color: #ffffff;
    }
</style>