<template>
    <div v-if="!this.view_tenant">
        <div class="row">
            <div class="col">
                <h1 class="h4 mb-4 heading">Manage Tenants</h1>
            </div>
        </div>
        <div class="card">
            <div class="searchBoxDiv">
                <b-row>
                    <b-col cols="1">
                        <b-form-input v-model="searchID" class="searchBox" placeholder="Enter TenantId"></b-form-input>
                    </b-col>
                    <b-button variant="primary" @click="searchHandler" class="btnCustom"><span>
                        <i class="fas fa-search"></i>
                        </span> Search
                    </b-button>
                </b-row>
            </div>
            <div v-if="this.searchInd === true" class="table" align="center">

                <b-table v-if="this.searchList[0].tenant_status ==='ACTIVE'" style="width: 70%" striped hover responsive
                         :items="searchList" :fields="fields" selectable
                         small
                         ref="selectableTable"
                         select-mode="single"
                         @row-selected="onRowSelected">
                    <template #cell(actions)="row">
                        <b-button pill size="sm" @click="loginToTenant(row.item, row.index, $event.target)"
                                  class="tenantLogin">
                            Tenant Explorer
                        </b-button>

                        <b-dropdown :disabled="row.item.parent_tenant_id>0" right class="ml-2" text="..." no-caret toggle-class="list-button">
                            <template v-slot:button-content>
                                <b-icon icon="three-dots-vertical"></b-icon>
                            </template>
                            <template v-slot:default>
                                <b-dropdown-item href="#"
                                                 v-on:click="createChildTenant(row.item, row.index, $event.target)">
                                    Create Child Tenant
                                </b-dropdown-item>
                            </template>
                        </b-dropdown>
                    </template>
                </b-table>
                <b-table v-else style="width: 70%" striped hover responsive :items="searchList"
                         :fields="nonActionFields" selectable
                         small
                         ref="selectableTable"
                         select-mode="single"
                         @row-selected="onRowSelected">
                </b-table>
            </div>
            <div class="h-tabs" v-if="this.searchInd === false">
                <div class="h-tab">
                    <div align="center" v-on:click="onClickHandler(1)"
                         v-bind:class="[value===1 ? 'tab-content-active' : 'tab-content' ]">Active
                    </div>
                    <div align="center" v-on:click="onClickHandler(2)"
                         v-bind:class="[value===2 ? 'tab-content-active' : 'tab-content' ]">Requested
                    </div>
                    <div align="center" v-on:click="onClickHandler(3)"
                         v-bind:class="[value===3 ? 'tab-content-active' : 'tab-content' ]">Deactivated
                    </div>
                </div>
                <div v-if="value === 1" class="content card-body">
                    <b-table striped hover responsive :items="active_display" :fields="fields" selectable small
                             ref="selectableTable"
                             select-mode="single"
                             :per-page="perPage"
                             :current-page="currentActivePage"
                             @row-selected="onRowSelected">
                        <template #cell(actions)="row">
                            <b-button pill size="sm" @click="loginToTenant(row.item, row.index, $event.target)"
                                      class="tenantLogin">
                                Tenant Explorer
                            </b-button>

                            <b-dropdown :disabled="row.item.parent_tenant_id>0" right class="ml-2" text="..." no-caret toggle-class="list-button">
                                <template v-slot:button-content>
                                    <b-icon icon="three-dots-vertical"></b-icon>
                                </template>
                                <template v-slot:default >
                                    <b-dropdown-item href="#"
                                                     v-on:click="createChildTenant(row.item, row.index, $event.target)">
                                        Create Child Tenant
                                    </b-dropdown-item>
                                </template>
                            </b-dropdown>
                        </template>

                    </b-table>
                    <div>
                        <b-pagination
                                size="sm"
                                class="float-right"
                                v-model="currentActivePage"
                                :total-rows="activeRows"
                                :per-page="perPage"
                                aria-controls="my-table"
                        ></b-pagination>
                    </div>
                </div>
                <div v-if="value === 2" class="content card-body">
                    <b-table striped hover responsive :items="requested_display" :fields="nonActionFields" selectable
                             small
                             ref="selectableTable"
                             select-mode="single"
                             :per-page="perPage"
                             :current-page="currentRequestedPage"
                             @row-selected="onRowSelected">
                    </b-table>
                    <div>
                        <b-pagination
                                size="sm"
                                class="float-right"
                                v-model="currentRequestedPage"
                                :total-rows="requestedRows"
                                :per-page="perPage"
                                aria-controls="my-table"
                        ></b-pagination>
                    </div>
                </div>
                <div v-if="value === 3" class="content card-body">
                    <b-table striped hover responsive :items="deactivated_display" :fields="nonActionFields" selectable
                             small
                             ref="selectableTable"
                             select-mode="single"
                             :per-page="perPage"
                             :current-page="currentDeactivatedPage"
                             @row-selected="onRowSelected">
                    </b-table>
                    <div>
                        <b-pagination
                                size="sm"
                                class="float-right"
                                v-model="currentDeactivatedPage"
                                :total-rows="requestedRows"
                                :per-page="perPage"
                                aria-controls="my-table"
                        ></b-pagination>
                    </div>
                </div>
            </div>
        </div>

    </div>
    <div v-else>
        <Tenant :tenantRequest="selectedTenant" @reloadParent="reloadMe"></Tenant>
    </div>
</template>

<script>

    import Tenant from "@/components/admin-portal/Tenant";
    import config from "@/config";

    export default {
        components: {Tenant},
        props: {
            tokenData: {
                type: String
            }
        },
        data() {
            return {
                requested: [],
                active: [],
                deactivated: [],
                value: 1,
                searchID: '',
                searchList: [],
                searchInd: false,
                perPage: 5,
                currentActivePage: 0,
                currentRequestedPage: 0,
                currentDeactivatedPage: 0,
                active_page: 1,
                active_pages: [],
                selectedTenant: '',
                view_tenant: false,
                custosId: null,
                custosSec: null,
                isAdminUser: false,
                user: null,
                fields: [{key: 'client_id', label: 'Tenant Id'}, {key: 'client_name', label: 'Tenant Name'}, {
                    key: 'domain',
                    label: 'Domain'
                }, {key: 'Actions', label: 'Actions'}],
                nonActionFields: [{key: 'client_id', label: 'Tenant Id'}, {key: 'client_name', label: 'Tenant Name'}, {
                    key: 'domain',
                    label: 'Domain'
                }],
                active_display: [],
                requested_page: 1,
                requested_pages: [],
                requested_display: [],
                deactivated_page: 1,
                deactivated_pages: [],
                deactivated_display: [],
                req_offset: 0,
                active_offset: 0,
                deactivated_offset: 0,
                req_limit: 0,
                active_limit: 0,
                deactive_limit: 0
            }
        },
        computed: {
            activeRows() {
                return this.active_display.length;
            },
            requestedRows() {
                return this.requested_display.length;
            },
            deactivatedRows() {
                return this.deactivated_display.length;
            }
        },
        async beforeMount() {
            this.custosId = config.value('clientId')
            this.custosSec = config.value('clientSec')
            this.isAdminUser = await this.$store.dispatch('identity/isLoggedUserHasAdminAccess')
            this.currentUserName = await this.$store.dispatch('identity/getCurrentUserName')
            let data = {
                offset: 0, limit: 1, client_id: this.custosId, client_sec: this.custosSec,
                username: this.currentUserName
            }
            let resp = await this.$store.dispatch('user/users', data)
            if (Array.isArray(resp) && resp.length > 0) {
                resp.forEach(obj => {
                    this.user = {
                        username: obj.username,
                        first_name: obj.first_name,
                        last_name: obj.last_name,
                        email: obj.email
                    }

                    this.user = obj
                    this.first_name = obj.first_name
                    this.last_name = obj.last_name
                    this.email = obj.email
                })
            }
            await this.loadTenants(this.active_display, this.requested_display, this.deactivated_display)

        },
        methods: {
            onClickHandler(step) {
                this.value = step;
            },
            async searchHandler() {

                if (!this.searchID) {
                    this.searchInd = false;
                    return
                }
                this.searchInd = true;
                let accessToken = await this.$store.getters['identity/getAccessToken']
                let data = {
                    usertoken:accessToken,
                    requesting_client_id: this.searchID
                }

                let response = await this.$store.dispatch('tenant/getTenantByClientId', data)
                if (response) {
                    this.searchList.length = 0
                    this.searchList.push(response)
                }
            },

            onRowSelected: function (items) {
                if (items != null && items.length > 0) {
                    console.log(items[0].client_name)
                    this.view_tenant = true
                    this.selectedTenant = items[0];
                }

            },

            async reloadMe() {
                this.view_tenant = false
                this.active_display =[]
                this.requested_display =[]
                this.deactivated_display =[]
                await this.loadTenants(this.active_display, this.requested_display, this.deactivated_display)

            },

            // eslint-disable-next-line no-unused-vars
            async loginToTenant(item, index, target) {
                await this.$emit('loginToTenant', {tenantId: item.client_id, tenantName: item.client_name})
            },

            // eslint-disable-next-line no-unused-vars
            async createChildTenant(item, index, target) {
                await this.$emit('createChildTenant', {tenantId: item.client_id})
            },

            // eslint-disable-next-line no-unused-vars
            async getTenantsRecursively(offset, status, container) {
                if (container == null || container == undefined) {
                    container = []
                }
                let limit = 50
                let accessToken = await this.$store.getters['identity/getAccessToken']
                let data = {
                    usertoken:accessToken,
                    status: status,
                    limit: 50,
                    offset: offset
                }
                let response = await this.$store.dispatch('tenant/getTenants', data);
                let tenants = response.tenant
                if (tenants.length > 0) {
                    tenants.forEach(tent => {
                        if (tent.client_id != null && tent.client_id != "") {
                            container.push(tent)
                        }
                    })
                }

                if (tenants.length >= limit) {
                    offset = offset + tenants.length
                    await this.getTenantsRecursively(offset, status, container)
                }

                return container
            },

            async getAllTenants(status, requester_email) {
                let container = [];
                let accessToken = await this.$store.getters['identity/getAccessToken']
                let data = {
                    usertoken:accessToken,
                    status: status,
                    requester_email: requester_email
                }
                let response = await this.$store.dispatch('tenant/getTenants', data);
                let tenants = response.tenant
                if (tenants.length > 0) {
                    tenants.forEach(tent => {
                        if (tent.client_id != null && tent.client_id != "") {
                            container.push(tent)
                        }
                    })
                }
                return container
            },
            async loadTenants(active_display,requested_display, deactivated_display) {
                if (this.isAdminUser) {
                    this.active_display = await this.getTenantsRecursively(0, 'ACTIVE',active_display)
                    this.requested_display = await this.getTenantsRecursively(0, 'REQUESTED',requested_display)
                    this.deactivated_display = await this.getTenantsRecursively(0, 'DEACTIVATED',deactivated_display)

                } else {
                    this.active_display = await this.getAllTenants('ACTIVE', this.user.email)
                    this.requested_display = await this.getAllTenants('REQUESTED', this.user.email)
                    this.deactivated_display = await this.getAllTenants('DEACTIVATED', this.user.email)
                }
            },

        },

        async mounted() {
            this.searchInd = false
        }
    };
</script>

<style scoped>
    .link {
        color: #ff6600;
    }

    .h-tab {
        display: flex;
        max-height: 500px;
        margin-top: 20px;
        padding: 20px;
    }

    .h-tabs {
        flex: 8;
    }

    .list-button {
        border-radius: 30px;
        width: 35px;
        height: 35px;
        padding: 0px;
        line-height: 0px;
        font-size: 15px;
        background-color: #ff6600;
    }

    .tab-content {
        flex: 1;
        border-bottom: 3px solid black;
        padding: 8px;
        color: black;
        font-weight: bold;
        cursor: pointer;
        font-size: 20px;
    }

    .tab-content-active {
        flex: 1;
        border-bottom: 3px solid #ff6600;;
        padding: 8px;
        color: #ff6600;
        font-weight: bold;
        cursor: pointer;
        font-size: 20px;
    }

    .table-head {
        background-color: lightgray;
    }

    .content {
        margin-top: 20px;
        width: 1100px;
        margin-left: 20px;
    }

    .heading {
        font-size: 30px;
        color: black;
        font-weight: bold;
    }

    .searchBoxDiv {
        margin-top: 20px;
        margin-left: 50px;
    }

    .searchBox {
        width: 350px;
        height: 45px;
    }

    .table {
        padding: 20px;
    }

    .btnCustom {
        color: white;
        background-color: #ff6600;
        padding: 10px 25px;
        border: 1px solid #ff6600;
        border-radius: 8px;
        margin-left: 20%;
    }

    .btnCustom:hover {
        color: white;
        background-color: #944203;
        padding: 10px 25px;
        border: 1px solid #944203;
        border-radius: 8px;
    }

    .btnCustom:focus {
        color: white;
        background-color: #944203;
        padding: 10px 25px;
        border: 1px solid #944203;
        border-radius: 8px;
    }

    .btnPagination {
        color: #ff6600;
        background-color: white;
        padding: 10px 25px;
        border: 1px solid #ff6600;
        border-radius: 8px;
        font-weight: bold;
    }

    .btnPagination:hover {
        color: white;
        background-color: #944203;
        padding: 10px 25px;
        border: 1px solid #944203;
        border-radius: 8px;
    }

    .btnPaginationActive {
        color: white;
        background-color: #944203;
        padding: 10px 25px;
        border: 1px solid #944203;
        border-radius: 8px;
    }

    .tenantLogin {
        background-color: darkolivegreen;
    }

    .createChildTenant {
        background-color: #ff6600;
        margin-left: 2%;
    }
</style>