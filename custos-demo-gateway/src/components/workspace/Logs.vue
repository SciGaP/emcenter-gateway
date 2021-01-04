<template>
    <div>
        <div class="w-100 mb-5">
            <h2>Access Logs</h2>
        </div>
        <div v-if="activateLogEnabling">
            <b-form-checkbox v-model="checked" :disabled=isCheckedBtnDisabled v-on:change="enableLogging"
                             name="check-button" switch>
                Enable Logging
            </b-form-checkbox>
        </div>
        <div v-if="isLoggingEnabled">
            <div>
                <b-input-group>
                    <template v-slot:prepend>
                        <b-form-input size="sm" disabled v-model="defaultSearchText">Search By</b-form-input>
                        <b-dropdown size="sm" :text="selectedService" v-model="selectedService">
                            <b-dropdown-item v-for="option in options"
                                             :key="option.value"
                                             :value="option.value"
                                             @click=searchLogsWithFilter(option)>
                                {{option.text}}
                            </b-dropdown-item>

                        </b-dropdown>

                    </template>
                </b-input-group>
            </div>
            <div class="mt-3">
                <b-table small striped hover responsive :items="logItems" :fields="fields" selectable
                         ref="selectableTable"
                         select-mode="single"
                         :per-page="perPage"
                         :current-page="currentPage"
                         caption-top>
                </b-table>
                <div class="pgClass">
                    <b-pagination size="sm" v-model="currentPage" :total-rows="rows" :per-page="perPage"
                                  aria-controls="my-table" class="float-right">

                    </b-pagination>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import config from "@/config";

    export default {
        name: "Logs",
        data: function () {
            return {
                defaultSearchText: 'Search By',
                fields: ['service_name', 'event_type', 'accessed_time'],
                logItems: [],
                options: [
                    {
                        value: 0,
                        text: "UserManagementService",
                        service_name: "org.apache.custos.user.management.service.UserManagementService"
                    },
                    {
                        value: 1,
                        text: "TenantManagementService",
                        service_name: "org.apache.custos.tenant.management.service.TenantManagementService"
                    },
                    {
                        value: 2,
                        text: "SharingManagementService",
                        service_name: "org.apache.custos.sharing.management.service.SharingManagementService"
                    },
                    {
                        value: 3,
                        text: "ResourceSecretManagementService",
                        service_name: "org.apache.custos.resource.secret.management.service.ResourceSecretManagementService"
                    },
                    {
                        value: 4,
                        text: "IdentityManagementService",
                        service_name: "org.apache.custos.identity.management.service.IdentityManagementService"
                    },
                    {
                        value: 5,
                        text: "GroupManagementService",
                        service_name: "org.apache.custos.group.management.service.GroupManagementService"
                    },
                    {
                        value: 6,
                        text: "AgentManagementService",
                        service_name: "org.apache.custos.agent.management.service.AgentManagementService"
                    },
                    {
                        value: 7,
                        text: "All"
                    }
                ],
                perPage: 10,
                currentPage: 0,
                selectedService: null,
                custosSec: null,
                custosId: null,
                isLoggingEnabled: false,
                activateLogEnabling: false,
                checked: false,
                isCheckedBtnDisabled: false
            }
        },

        methods: {
            async searchLogsWithFilter(data) {
                this.selectedService = data.text
                let dat = {}
                if (data.text === "All") {
                    dat = {
                        client_id: this.custosId,
                        client_sec: this.custosSec,
                        params: {
                            offset: 0,
                            limit: 200,
                        }
                    }
                } else {
                    dat = {
                        client_id: this.custosId,
                        client_sec: this.custosSec,
                        params: {
                            offset: 0,
                            limit: 200,
                            service_name: data.service_name
                        }
                    }
                }
                let response = await this.$store.dispatch('log/getLogEvents', dat)

                response.forEach(res => {
                    let date = new Date(0)
                    date.setUTCSeconds(res.created_time/1000)
                    res.accessed_time = date.toUTCString()
                })
                this.logItems = response


            },


            async enableLogging() {
                let accessToken = await this.$store.getters['identity/getAccessToken']
                let data = {
                    user_token: accessToken
                }

                let response = await this.$store.dispatch('log/enableLogging', data)
                if (response) {
                    this.checked = true
                    this.isCheckedBtnDisabled = true
                    this.isLoggingEnabled = true
                }
            },

            async goToWorkspace() {
                await this.$router.push('/workspace')
            },

        },
        computed: {
            rows() {
                return this.logItems.length
            }
        },

        async mounted() {
            this.custosId = config.value('clientId')
            this.custosSec = config.value('clientSec')
            this.tenantModeactivated = await this.$store.dispatch('tenant/isTenantModeActivated')
            if (this.tenantModeactivated) {
                this.custosId = await this.$store.dispatch('tenant/getActivatedClientId')
                this.custosSec = await  this.$store.dispatch('tenant/getActivatedClientSecret');
            } else {
                await this.$router.push({name:'tenants'})
            }

            this.isAdminUser = await this.$store.dispatch('identity/isLoggedUserHasAdminAccess')
            let data = {
                client_id: this.custosId,
                client_sec: this.custosSec
            }


            this.isLoggingEnabled = await this.$store.dispatch('log/isLoggingEnabled', data)
            this.activateLogEnabling = this.isAdminUser && !this.isLoggingEnabled
            this.isCheckedBtnDisabled = this.isLoggingEnabled
            this.checked = this.isLoggingEnabled

            if (this.isLoggingEnabled) {
                let data = {
                    client_id: this.custosId,
                    client_sec: this.custosSec,
                    params: {
                        offset: 0,
                        limit: 200
                    }
                }
                let response = await this.$store.dispatch('log/getLogEvents', data)

                response.forEach(res => {
                    let date = new Date(0)
                    date.setUTCSeconds(res.created_time/1000)
                    res.accessed_time = date.toUTCString()
                })
                this.logItems = response

            }

        }
    }
</script>

<style scoped>
    h2 {
        font-family: Avenir;
        font-size: 20px;
        font-weight: 600;
        text-align: left;
        color: #203a43;
    }
</style>