<template>
    <div>
        <div class="w-100">
            <h2>Secrets</h2>
        </div>
        <b-container class="w-100 mt-5">
            <div v-if="this.secretsLoading" class="d-flex justify-content-center mb-3">
                <b-spinner variant="primary" label="Text Centered"></b-spinner>
            </div>
            <b-table small striped hover responsive :items="secItems" :fields="fields" selectable
                     select-mode="single" @row-selected="onRowSelected" caption-top>
                <template v-slot:head(owner_id)>Owner</template>
            </b-table>
            <div class="w-100">
                <b-button variant="outline-primary" v-on:click="addSec">Add Secret</b-button>
            </div>
        </b-container>
        <b-modal ref="addSecmodel" id="add-secret-modal" scrollable title="Add Secret">
            <div>
                <div class="p-2">
                    <label class="form-input-label" for="form-input-secret-type">Type</label>
                    <b-form-select id="form-input-secret-type" size="sm" v-model="defaultMemType">
                        <option v-for="(selectOption, indexOpt) in secretTypes"
                                :key="indexOpt"
                                :value="selectOption"
                        >
                            {{ selectOption }}
                        </option>
                    </b-form-select>
                </div>
                <div class="p-2">
                    <label class="form-input-label" for="form-input-secret-description">Description</label>
                    <b-form-input id="form-input-secret-description" size="sm"
                                  v-model="selectedDescription"></b-form-input>
                </div>
                <div v-if="defaultMemType==='Password'" class="p-2">
                    <label class="form-input-label" for="form-input-secret-password">Password</label>
                    <Password id="form-input-secret-password" size="sm" v-model="selectedPassword">
                    </Password>
                </div>
            </div>
            <template slot="modal-footer">
                <b-button size="sm" class="mr-2" @click="$bvModal.hide('add-secret-modal')">
                    Cancel
                </b-button>
                <b-button size="sm" variant="primary" v-on:click="addSecOKButtonPressed"
                          :disabled="defaultMemType === 'Password' && !selectedPassword"
                          @click="$bvModal.hide('add-secret-modal')">
                    Add Secret
                </b-button>
            </template>
        </b-modal>
        <b-modal ref="updateSecmodel" id="view-secret-modal" scrollable title="View Secret">
            <div>
                <div class="secformItem">
                    <label class="form-input-label" for="form-input-secret-token">Token</label>
                    <b-form-input id="form-input-secret-token" size="sm" v-model="selectedExId"
                                  disabled></b-form-input>
                </div>
                <div class="secFormItem">
                    <label class="form-input-label" for="form-input-secret-type">Type</label>
                    <b-form-input id="form-input-secret-type" size="sm" v-model="selectedExType"
                                  disabled></b-form-input>
                </div>
                <div class="secformItem">
                    <label class="form-input-label" for="form-input-secret-description">Description</label>
                    <b-form-input id="form-input-secret-description" size="sm" v-model="selectedExDescription"
                                  disabled></b-form-input>
                </div>
                <div class="secformItem">
                    <label class="form-input-label" for="form-input-secret-owner">Owner</label>
                    <b-form-input id="form-input-secret-owner" size="sm" v-model="selectedExOwnerId"
                                  disabled></b-form-input>
                </div>
                <div v-if="selectedExType ==='PASSWORD'" class="secformItem">
                    <label class="form-input-label" for="form-input-secret-password">Password</label>
                    <Password id="form-input-secret-password" size="sm" v-model="selectedExPassword" disabled>
                    </Password>
                </div>
                <div v-if="selectedExType ==='SSH'" class="secformItem">
                    <label class="form-input-label" for="form-input-secret-public-key">Public Key</label>
                    <b-textarea id="form-input-secret-public-key" size="sm" v-model="selectedExPubKey"
                                disabled></b-textarea>
                </div>
                <div v-if="selectedExType ==='SSH'" class="secformItem">
                    <label class="form-input-label" for="form-input-secret-private-key">Private Key</label>
                    <b-textarea id="form-input-secret-private-key" size="sm" v-model="selectedExPrivKey"
                                disabled></b-textarea>
                </div>
            </div>
            <template slot="modal-footer">
                <b-button size="sm" class="mr-2" @click="$bvModal.hide('view-secret-modal')">
                    Cancel
                </b-button>
                <b-button size="sm" variant="danger" v-on:click="secDeleteButtonPressed"
                          @click="$bvModal.hide('view-secret-modal')">
                    Delete
                </b-button>
            </template>
        </b-modal>
    </div>
</template>

<script>
    import config from "@/config";
    import Password from "../Password";

    export default {
        name: "Secrets",
        components: {Password},
        data: function () {
            return {
                fields: ['token', 'description', 'type', 'owner_id'],
                secItems: [],
                selectedSecret: null,
                secretTypes: ['SSH', 'Password'],
                defaultMemType: 'SSH',
                selectedDescription: null,
                selectedPassword: null,
                selectedExType: null,
                selectedExId: null,
                selectedExDescription: null,
                selectedExPassword: null,
                selectedExPubKey: null,
                selectedExPrivKey: null,
                selectedExOwnerId: null,
                currentUserName: null,
                secretsLoading: false,
                passwordEmptyError: false

            }
        },
        methods: {
            async onRowSelected(items) {
                if (items != null && items.length > 0) {
                    this.selectedSecret = items

                    this.selectedExDescription = this.selectedSecret[0].description
                    this.selectedExType = this.selectedSecret[0].type
                    this.selectedExId = this.selectedSecret[0].token
                    this.selectedExOwnerId = this.selectedSecret[0].owner_id

                    if (this.selectedExType === "SSH") {
                        let data = {
                            client_id: this.custosId,
                            client_sec: this.custosSec,
                            token: this.selectedExId
                        }
                        let response = await this.$store.dispatch('secret/getSSHCredential', data)
                        this.selectedExPubKey = response.public_key
                        this.selectedExPrivKey = response.private_key
                    } else {
                        let data = {
                            client_id: this.custosId,
                            client_sec: this.custosSec,
                            token: this.selectedExId
                        }
                        let response = await this.$store.dispatch('secret/getPasswordCredential', data)
                        this.selectedExPassword = response.password
                    }
                    this.$refs.updateSecmodel.show()
                }
            },

            addSec: function () {
                this.selectedDescription = null
                this.selectedPassword = null
                this.defaultMemType = 'SSH'
                this.$refs.addSecmodel.show()
            },

            async addSecOKButtonPressed() {
                this.secretsLoading = true
                if (this.defaultMemType === 'SSH') {
                    let data = {
                        client_id: this.custosId,
                        client_sec: this.custosSec,
                        body: {
                            metadata: {
                                client_id: this.custosId,
                                description: this.selectedDescription,
                                owner_id: this.currentUserName
                            }
                        }
                    }
                    let response = await this.$store.dispatch('secret/addSSHCredential', data)
                    let dataEn = {
                        client_id: this.custosId,
                        client_sec: this.custosSec,
                        body: {
                            client_id: this.custosId,
                            entity: {
                                id: response.token,
                                name: 'SSH token',
                                description: this.selectedDescription,
                                type: 'SECRET',
                                owner_id: this.currentUserName
                            }
                        }
                    }

                    await this.$store.dispatch('sharing/createEntity', dataEn)

                } else {

                    if (this.selectedPassword == null || this.selectedPassword == '') {
                        this.passwordEmptyError = true

                    } else {

                        let data = {
                            client_id: this.custosId,
                            client_sec: this.custosSec,
                            body: {
                                metadata: {
                                    client_id: this.custosId,
                                    description: this.selectedDescription,
                                    owner_id: this.currentUserName
                                },
                                password: this.selectedPassword
                            }
                        }
                        let response = await this.$store.dispatch('secret/addPasswordCredential', data)
                        let dataEN = {
                            client_id: this.custosId,
                            client_sec: this.custosSec,
                            body: {
                                client_id: this.custosId,
                                entity: {
                                    id: response.token,
                                    name: 'Password token',
                                    description: this.selectedDescription,
                                    type: 'SECRET',
                                    owner_id: this.currentUserName
                                }
                            }
                        }
                        await this.$store.dispatch('sharing/createEntity', dataEN)
                    }
                }
                this.secItems = await this.getAllCredentials()
                this.secretsLoading = false

            },

            async secDeleteButtonPressed() {
                this.secretsLoading = true
                if (this.defaultMemType === 'SSH') {
                    let data = {
                        client_id: this.custosId,
                        client_sec: this.custosSec,
                        token: this.selectedExId
                    }
                    let response = await this.$store.dispatch('secret/deleteSSHCredential', data)
                    if (response) {
                        let data = {
                            client_id: this.custosId,
                            client_sec: this.custosSec,
                            body: {
                                client_id: this.custosId,
                                entity: {
                                    id: this.selectedExId,
                                    owner_id: this.currentUserName
                                }
                            }
                        }
                        await this.$store.dispatch('sharing/deleteEntity', data)
                    }

                } else {
                    let data = {
                        client_id: this.custosId,
                        client_sec: this.custosSec,
                        token: this.selectedExId
                    }
                    let response = await this.$store.dispatch('secret/deletePassswordCredential', data)
                    if (response) {
                        let data = {
                            client_id: this.custosId,
                            client_sec: this.custosSec,
                            body: {
                                client_id: this.custosId,
                                entity: {
                                    id: this.selectedExId,
                                    owner_id: this.currentUserName
                                }
                            }
                        }
                        await this.$store.dispatch('sharing/deleteEntity', data)
                    }

                }
                this.secItems = await this.getAllCredentials()
                this.secretsLoading = false
                this.secretsLoading = false
            },


            async getAllCredentials() {
                let searchEntitiesData = {
                    client_id: this.custosId,
                    client_sec: this.custosSec,
                    body: {
                        client_id: this.custosId,
                        owner_id: this.currentUserName,
                        search_criteria: [
                            {
                                search_field: "ENTITY_TYPE_ID",
                                value: 'SECRET',
                                condition: "EQUAL"
                            }
                        ]
                    }
                }

                let response = await this.$store.dispatch('sharing/getEntities', searchEntitiesData)
                let accessible_token = []
                if (response != null && response.length > 0) {
                    response.forEach(a => {
                        accessible_token.push(a.id)
                    })

                }
                let data = {
                    client_id: this.custosId,
                    client_sec: this.custosSec,
                    accessible_tokens: accessible_token
                }
                return await this.$store.dispatch('secret/getAllCredentials', data)
            },
            async goToWorkspace() {
                await this.$router.push('/workspace')
            },

        },


        async mounted() {
            this.secretsLoading = true
            this.custosId = config.value('clientId')
            this.custosSec = config.value('clientSec')
            this.tenantModeactivated = await this.$store.dispatch('tenant/isTenantModeActivated')
            this.tenantModeactivated = await this.$store.dispatch('tenant/isTenantModeActivated')
            if (this.tenantModeactivated) {
                this.custosId = await this.$store.dispatch('tenant/getActivatedClientId')
                this.custosSec = await  this.$store.dispatch('tenant/getActivatedClientSecret');
            } else {
                await this.$router.push({name:'tenants'})
            }

            this.currentUserName = await this.$store.dispatch('identity/getCurrentUserName')

            this.secItems = await this.getAllCredentials()
            this.secretsLoading = false

            let permTypesData = {
                client_id: this.custosId,
                client_sec: this.custosSec
            }

            let entityTypes = await this.$store.dispatch('sharing/getEntityTypes', permTypesData)

            let created = false

            entityTypes.forEach(ent => {
                if (ent.id === 'SECRET') {
                    created = true
                }
            })

            if (!created) {
                let dat = {
                    client_id: this.custosId,
                    client_sec: this.custosSec,
                    body: {
                        client_id: this.custosId,
                        entity_type: {
                            id: 'SECRET',
                            name: 'SECRET',
                            description: 'This is secret entity type of demo gateway'
                        }
                    }
                }
                this.entityTypes = await this.$store.dispatch('sharing/createEntityType', dat)
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