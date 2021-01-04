<template>
    <div>
        <div class="w-100 mb-5">
            <h2>Service Accounts</h2>
        </div>
        <!--        <div class="enableComAcc">-->
        <!--            <b-form-checkbox v-model="checked" :disabled=isCheckedBtnDisabled v-on:change="enableAgents"-->
        <!--                             name="check-button" switch>-->
        <!--                Enable Community Accounts-->
        <!--            </b-form-checkbox>-->
        <!--        </div>-->
        <b-container>
            <div v-if="this.loadingAgents" class="d-flex justify-content-center mb-3">
                <b-spinner variant="primary" label="Text Centered"></b-spinner>
            </div>
            <b-table small striped hover responsive :items="communityAccounts" :fields="community_fields" selectable
                     ref="selectableTable" select-mode="single" @row-selected="onCommunityAcSelected" caption-top>
                <template v-slot:head(id)>Service Account ID</template>
                <template v-slot:cell(status)="data">
                    <b-badge v-if="data.value == 'ACTIVE'" variant="success">Active</b-badge>
                    <b-badge v-else-if="data.value == 'DEACTIVE'" variant="danger">Inactive</b-badge>
                    <b-badge v-else-if="data.value == 'PENDING'" variant="warning">Pending</b-badge>
                </template>
            </b-table>
            <div>
                <b-button variant="outline-primary" v-on:click="this.addAccount">Add Service Account</b-button>
            </div>
        </b-container>
        <b-modal ref="newAcc" id="add-account-modal" scrollable title="New Account">
            <div>
                <div class="p-2">
                    <label class="form-input-label" for="form-input-account-id">Service Account ID</label>
                    <b-form-input id="form-input-account-id" size="sm" v-model="newAccountName"></b-form-input>
                </div>
            </div>
            <template slot="modal-footer">
                <b-button size="sm" class="mr-2" @click="$bvModal.hide('add-account-modal')">
                    Cancel
                </b-button>
                <b-button size="sm" variant="primary" v-on:click="registerAgent" :disabled="!newAccountName"
                          @click="$bvModal.hide('add-account-modal')">
                    Add
                </b-button>
            </template>
        </b-modal>
        <b-modal ref="exAcc" id="view-account-modal" scrollable title="Account">
            <div>
                <div class="p-2">
                    <label class="form-input-label" for="form-input-account-id">Service Account ID</label>
                    <b-form-input id="form-input-account-id" size="sm" v-model="exAccountId" disabled></b-form-input>
                </div>
                <div class="p-2">
                    <label class="form-input-label" for="form-input-account-status">Status</label>
                    <b-form-select id="form-input-account-status" size="sm" v-model="selectedStatus"
                                   v-on:change="changeAccountStatus">
                        <option v-for="(selectOption, indexOpt) in statusOptions"
                                :key="indexOpt"
                                :value="selectOption"
                        >
                            {{ selectOption }}
                        </option>
                    </b-form-select>
                </div>
                <div>
                    <strong>Attributes</strong>
                    <b-button variant="link" v-on:click="addActAttribute"> + Add Attribute</b-button>
                    <div class="w-100">
                        <small v-if="accSelectedAttributes.length === 0">There are no attributes created.</small>
                    </div>
                    <b-table v-if="accSelectedAttributes.length > 0" small striped hover responsive
                             :items="accSelectedAttributes" selectable
                             select-mode="single"
                             @row-selected="onAccAtrSelected">
                    </b-table>
                </div>
            </div>
            <template slot="modal-footer">
                <b-button size="sm" class="mr-2" @click="$bvModal.hide('view-account-modal')">
                    Cancel
                </b-button>
                <b-button size="sm" variant="primary" @click="$bvModal.hide('view-account-modal')">
                    Save
                </b-button>
            </template>
        </b-modal>
        <b-modal ref="accAtrModel" id="add-attribute-modal" scrollable title="Add Attribute">
            <div>
                <div class="p-2">
                    <label class="form-input-label" for="form-input-attribute-key">Key</label>
                    <b-form-input id="form-input-attribute-key" size="sm" v-model="newAcAtrKey"></b-form-input>
                </div>
                <div class="p-2">
                    <label class="form-input-label" for="form-input-attribute-value">Value</label>
                    <b-form-input id="form-input-attribute-value" size="sm" v-model="newAcAtrValue"></b-form-input>
                </div>
            </div>
            <template slot="modal-footer">
                <b-button size="sm" class="mr-2" @click="$bvModal.hide('add-attribute-modal')">
                    Cancel
                </b-button>
                <b-button size="sm" variant="primary" v-on:click="addAtrOkPressed"
                          :disabled="!newAcAtrKey || !newAcAtrValue" @click="$bvModal.hide('add-attribute-modal')">
                    Add Attribute
                </b-button>
            </template>
        </b-modal>
        <b-modal ref="AccAtrModelSelected" id="view-attribute-modal" scrollable title="Attribute" ok-title="Delete"
                 @ok="deleteAtrOkPressed">
            <div class="userform">
                <div class="userformItem">
                    <label class="form-input-label" for="form-input-attribute-key">Key</label>
                    <b-form-input id="form-input-attribute-key" size="sm" v-model="exAccountAtrKey"
                                  disabled></b-form-input>
                </div>
                <div class="userformItem">
                    <label class="form-input-label" for="form-input-attribute-value">Value</label>
                    <b-form-input id="form-input-attribute-value" size="sm" v-model="exAccountAtrValue"
                                  disabled></b-form-input>
                </div>
            </div>
            <template slot="modal-footer">
                <b-button size="sm" class="mr-2" @click="$bvModal.hide('view-attribute-modal')">
                    Cancel
                </b-button>
                <b-button size="sm" variant="danger" v-on:click="deleteAtrOkPressed"
                          @click="$bvModal.hide('view-attribute-modal')">
                    Delete
                </b-button>
            </template>
        </b-modal>
        <b-modal ref="enablePopOver" id="account-credentials-view-modal" scrollable title="Agent Credentials">
            <div>
                <div class="p-2">
                    <label class="form-input-label" for="form-input-credential-id">ID</label>
                    <b-form-input id="form-input-credential-id" size="sm" v-model="agentId" disabled></b-form-input>
                </div>
                <div class="p-2">
                    <label class="form-input-label" for="form-input-credential-secret">Secret</label>
                    <b-form-input id="form-input-credential-secret" size="sm" v-model="agentSec"
                                  disabled></b-form-input>
                </div>
            </div>
            <template slot="modal-footer">
                <b-button size="sm" variant="primary" @click="$bvModal.hide('account-credentials-view-modal')">
                    Ok
                </b-button>
            </template>
        </b-modal>
    </div>
</template>

<script>
    import config from "@/config";

    export default {
        name: "Agents",
        data: function () {
            return {
                community_fields: ["id", "status"],
                communityAccounts: [],
                statusOptions: ['ACTIVE', 'DEACTIVE'],
                scopes: ['TENANT', 'CLIENT'],
                checked: true,
                newAccountName: null,
                exAccountId: null,
                exAccount: null,
                accSelectedAttributes: [],
                accSelectedRoles: [],
                exAccountAtr: null,
                exAccountRole: null,
                exAccountAtrKey: null,
                exAccountAtrValue: null,
                exAccountRoleKey: null,
                exAccountRoleValue: null,
                custosId: null,
                custosSec: null,
                isAdminUser: false,
                tenantroles: [],
                clientroles: [],
                newAcAtrKey: null,
                newAcAtrValue: null,
                agentId: null,
                agentSec: null,
                selectedStatus: null,
                loadingAgents: false


            }
        },

        methods: {
            async onCommunityAcSelected(items) {
                if (items != null && items.length > 0) {
                    this.exAccount = items
                    this.exAccountId = this.exAccount[0].id
                    let act = await this.$store.getters['identity/getAccessToken']
                    let dt = {
                        user_token: act,
                        agent_id: this.exAccountId
                    }
                    let agent = await this.$store.dispatch('agent/getAgent', dt)
                    let atrs = []
                    agent.attributes.forEach(at => {
                        atrs.push({key: at.key, value: at.values.join("")})
                    })
                    this.accSelectedAttributes = atrs
                    this.selectedStatus = this.exAccount[0].status
                    this.$refs.exAcc.show()
                }
            },
            addAccount: function () {
                this.newAccountName = null
                this.$refs.newAcc.show()
            },

            onAccAtrSelected: function (items) {
                this.exAccountAtr = items
                this.exAccountAtrKey = this.exAccountAtr[0].key
                this.exAccountAtrValue = this.exAccountAtr[0].value
                this.$refs.AccAtrModelSelected.show()
            },

            onAccRoleSelected: function (items) {
                this.exAccountRole = items
                this.exAccountRoleKey = this.exAccountRole[0].name
                this.exAccountRoleValue = this.exAccountRole[0].scope
                this.$refs.accRoleModelSelected.show()
            },

            addActAttribute: function () {
                this.$refs.accAtrModel.show()
            },
            addActRole: function () {
                this.$refs.accRoleModel.show()
            },
            async enableAgents() {
                let accessToken = await this.$store.getters['identity/getAccessToken']
                let data = {
                    user_token: accessToken,
                }
                await this.$store.dispatch('agent/enableAgents', data)
            },

            async registerAgent() {
                this.loadingAgents = true
                let accessToken = await this.$store.getters['identity/getAccessToken']
                let data = {
                    user_token: accessToken,
                    body: {
                        id: this.newAccountName
                    }
                }
                let response = await this.$store.dispatch('agent/registerAgent', data)
                this.agentId = response.id
                this.agentSec = response.secret
                this.$refs.enablePopOver.show()
                this.loadingAgents = false
                this.communityAccounts = await this.$store.dispatch('agent/get_all_agents', data)
                this.communityAccounts.forEach(com=>{
                    if (com.isEnabled){
                        com.status = 'ACTIVE'
                    } else {
                        com.status = 'DEACTIVE'
                    }
                })

            },

            async addAtrOkPressed() {
                let accessToken = await this.$store.getters['identity/getAccessToken']
                let data = {
                    user_token: accessToken,
                    body: {
                        agents: [this.exAccountId],
                        attributes: [{
                            key: this.newAcAtrKey,
                            values: [this.newAcAtrValue]
                        }]
                    }
                }
                let atr = {key: this.newAcAtrKey, value: this.newAcAtrValue}
                this.accSelectedAttributes.push(atr)
                await this.$store.dispatch('agent/addAttributeToAgent', data)
                this.newAcAtrKey = null
                this.newAcAtrValue = null
            },

            async deleteAtrOkPressed() {
                let accessToken = await this.$store.getters['identity/getAccessToken']
                let data = {
                    user_token: accessToken,
                    body: {
                        agents: [this.exAccountId],
                        attributes: [{
                            key: this.exAccountAtrKey,
                            values: [this.exAccountAtrValue]
                        }]
                    }
                }

                let acSelAtrs = []
                this.accSelectedAttributes.forEach(atr => {
                    if (atr.key != this.exAccountAtrKey) {
                        acSelAtrs.push(atr)
                    }
                })
                this.accSelectedAttributes = acSelAtrs
                await this.$store.dispatch('agent/deleteAttributeFromAgent', data)
                this.exAccountAtrKey = null
                this.exAccountAtrValue = null
            },
            async changeAccountStatus() {
                let accessToken = await this.$store.getters['identity/getAccessToken']
                let data = {
                    user_token: accessToken,
                    agent_id: this.exAccountId
                }
                if (this.selectedStatus == 'ACTIVE') {
                    await this.$store.dispatch('agent/activateAgent', data)
                } else {
                    await this.$store.dispatch('agent/deactivateAgent', data)
                }
            },

            async goToWorkspace() {
                await this.$router.push('/workspace')
            },


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

            let accessToken = await this.$store.getters['identity/getAccessToken']
            let data = {
                user_token: accessToken
            }
            this.loadingAgents = true
            await this.enableAgents()
            this.communityAccounts = await this.$store.dispatch('agent/get_all_agents', data)
            this.communityAccounts.forEach(com=>{
                if (com.isEnabled){
                    com.status = 'ACTIVE'
                } else {
                    com.status = 'DEACTIVE'
                }
            })
            this.loadingAgents = false
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