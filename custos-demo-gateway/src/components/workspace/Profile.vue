<template>
    <div>
        <div class="navigation text-left" v-if="!this.tenantModeactivated">
            <router-link to="/tenants">

                <b-icon icon="house-door-fill"></b-icon>

            </router-link>


        </div>
        <div class="w-100 mb-5">
            <h2>User Profile</h2>
        </div>
        <b-container>
            <b-row class="text-left">
                <b-col style="max-width: 300px; min-width: 200px;" class="p-2">
                    <label class="form-input-label" for="form-input-username">Username</label>
                    <b-form-input id="form-input-username" size="sm" v-model="currentUserName" type="email"
                                  disabled></b-form-input>
                </b-col>
                <b-col style="max-width: 300px; min-width: 200px;" class="p-2">
                    <label class="form-input-label" for="form-input-status">Status</label>
                    <b-form-input id="form-input-status" size="sm" v-model="status" required
                                  disabled></b-form-input>
                </b-col>

                <b-col style="max-width: 300px; min-width: 200px;" class="p-2">
                    <label class="form-input-label" for="form-input-first-name">First Name</label>
                    <div>
                        <b-alert v-model="firstNameError" variant="danger" dismissible
                                 @dismissed="this.callDismissed">
                            Invalid name
                        </b-alert>
                    </div>
                    <b-form-input id="form-input-first-name" size="sm" v-model="first_name" required></b-form-input>
                </b-col>

                <b-col style="max-width: 300px; min-width: 200px;" class="p-2">
                    <label class="form-input-label" for="form-input-last-name">Last Name</label>
                    <div>
                        <b-alert v-model="lastnameError" variant="danger" dismissible
                                 @dismissed="this.callDismissed">
                            Invalid name
                        </b-alert>
                    </div>
                    <b-form-input id="form-input-last-name" size="sm" v-model="last_name" required></b-form-input>
                </b-col>

                <b-col style="max-width: 300px; min-width: 200px;" class="p-2">
                    <label class="form-input-label" for="form-input-email">Email</label>
                    <div>
                        <b-alert v-model="emailError" variant="danger" dismissible
                                 @dismissed="this.callDismissed">
                            Invalid email
                        </b-alert>
                    </div>
                    <b-form-input id="form-input-email" size="sm" v-model="email" required></b-form-input>
                </b-col>
            </b-row>
            <b-row class="text-left mt-5">
                <b-col style="max-width: 100%; min-width: 300px;" class="p-3">
                    <strong>My Roles</strong>
                    <div class="w-100">
                        <small v-if="roles.length === 0">There are no roles assigned.</small>
                    </div>
                    <b-table small striped hover responsive :items="roles" class="mt-3" ref="selectableTable"
                             select-mode="single">
                    </b-table>
                </b-col>
                <b-col style="max-width: 100%; min-width: 300px;" class="p-3">
                    <strong>My Attributes</strong>
                    <!--                    <b-button variant="link" v-on:click="addAttribute"> + Add Attribute</b-button>-->
                    <div class="w-100">
                        <small v-if="attributes.length === 0">There are no attributes created.</small>
                    </div>
                    <b-table small striped hover responsive :items="attributes" class="mt-3" ref="selectableTable"
                             select-mode="single">
                    </b-table>
                </b-col>
            </b-row>
            <b-row class="w-100 text-right mt-5">
                <b-col v-if="this.updatingProfile">
                    <b-spinner variant="primary" label="Text Centered"></b-spinner>
                    Saving ...
                </b-col>
                <b-col>
                    <b-button size="sm" variant="primary" v-on:click="updateProfile">Save Changes</b-button>
                </b-col>
            </b-row>
        </b-container>
        <b-modal ref="atrModel" id="user-attribute-modal" scrollable title="Add Attribute" ok-title="Add"
                 @ok="addAtrOkPressed">
            <div>
                <div class="p-2">
                    <label class="form-input-label" for="form-input-attribute-key">Key</label>
                    <b-form-input id="form-input-attribute-key" size="sm" v-model="newKey"></b-form-input>
                </div>
                <div class="p-2">
                    <label class="form-input-label" for="form-input-attribute-value">Value</label>
                    <b-form-input id="form-input-attribute-value" size="sm" v-model="newValue"></b-form-input>
                </div>
            </div>
            <template v-slot:modal-footer>
                <b-button size="sm" class="mr-2" @click="$bvModal.hide('user-attribute-modal')">
                    Cancel
                </b-button>
                <b-button :disabled="!newKey || !newValue" size="sm" variant="primary" v-on:click="addAtrOkPressed"
                          @click="$bvModal.hide('user-attribute-modal')">
                    Add
                </b-button>
            </template>
        </b-modal>
        <b-modal ref="selectModel" id="user-attribute-view-modal" scrollable title="Delete Attribute">
            <div>
                <div class="p-2">
                    <label class="form-input-label" for="form-input-attribute-key">Key</label>
                    <b-form-input id="form-input-attribute-key" size="sm" disabled
                                  v-model="selectedKey"></b-form-input>
                </div>
                <div class="p-2">
                    <label class="form-input-label" for="form-input-attribute-value">Value</label>
                    <b-form-input id="form-input-attribute-value" size="sm" disabled
                                  v-model="selectedValue"></b-form-input>
                </div>
            </div>
            <template v-slot:modal-footer>
                <b-button size="sm" class="mr-2" @click="$bvModal.hide('user-attribute-view-modal')">
                    Cancel
                </b-button>
                <b-button size="sm" variant="danger" v-on:click="removeAtrOKPressed"
                          @click="$bvModal.hide('user-attribute-view-modal')">
                    Delete
                </b-button>
            </template>
        </b-modal>
    </div>
</template>

<script>
    import config from "@/config";

    export default {
        name: "Profile",
        data: function () {
            return {
                user: null,
                currentUserName: null,
                first_name: null,
                last_name: null,
                email: null,
                attributes: [],
                roles: [],
                status: null,
                newKey: null,
                newValue: null,
                selectedKey: null,
                selectedValue: null,
                operationCompleted: true,
                updatingProfile: false,
                emailError: false,
                firstNameError: false,
                lastnameError: false
            }
        },

        methods: {

            addAttribute: function () {
                this.$refs.atrModel.show()
            },

            async addAtrOkPressed() {
                this.operationCompleted = false
                let accessToken = await this.$store.getters['identity/getAccessToken']
                let bd = {
                    user_token: accessToken, body: {
                        attributes: [{
                            key: this.newKey,
                            values: [this.newValue]
                        }],
                        users: [this.currentUserName]
                    }
                }
                let userAtr = await this.$store.dispatch('user/addUserAttributes', bd)
                if (userAtr) {
                    let atr = {key: this.newKey, value: this.newValue}
                    this.attributes.push(atr)
                }
                this.operationCompleted = true
                this.newKey = null
                this.newValue = null

            },

            async removeAtrOKPressed() {
                this.operationCompleted = false
                let accessToken = await this.$store.getters['identity/getAccessToken']
                let bd = {
                    user_token: accessToken, body: {
                        attributes: [{
                            key: this.selectedKey,
                            values: [this.selectedValue]
                        }],
                        users: [this.currentUserName]
                    }
                }
                let userAtr = await this.$store.dispatch('user/deleteUserAttributes', bd)
                if (userAtr) {
                    let newAtr = []
                    this.attributes.forEach(atr => {

                        if (atr.key != this.selectedKey) {
                            newAtr.push(atr)
                        }
                        this.attributes = newAtr
                    })
                }
                this.operationCompleted = true
                this.selectedKey = null
                this.selectedValue = null
            },

            onAtrSelected: function (items) {
                if (items != null && items.length > 0) {
                    this.selectedKey = items[0].key
                    this.selectedValue = items[0].value
                    this.$refs.selectModel.show()
                }
            },

            async updateProfile() {
                this.updatingProfile = true

                // eslint-disable-next-line no-useless-escape
                let emailRegs = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
                let regexPucn = /[~!@#$%^&*()+=;"'<>.]/

                if (this.first_name == null || this.first_name == '' || regexPucn.test(this.first_name) || this.first_name.length > 20) {
                    this.firstNameError = true
                    this.updatingProfile = false
                }

                if (this.last_name == null || this.last_name == '' || regexPucn.test(this.last_name) || this.last_name.length > 20) {
                    this.lastnameError = true
                    this.updatingProfile = false
                }


                if (this.email == null || emailRegs.test(this.email) == false) {
                    this.emailError = true
                    this.updatingProfile = false
                }

                if (!(this.firstNameError || this.lastnameError || this.emailError)) {
                    let accessToken = await this.$store.getters['identity/getAccessToken']
                    let data = {
                        usertoken:accessToken,
                        body: {
                            username: this.currentUserName,
                            first_name: this.first_name,
                            last_name: this.last_name,
                            email: this.email
                        }
                    }
                    await this.$store.dispatch('user/updateUserProfile', data)
                    this.updatingProfile = false
                }
            },
            async goToWorkspace() {
                await this.$router.push({name: 'workspace'})
            },


            async callDismissed() {
                this.emailError = false
                this.firstNameError = false
                this.lastnameError = false
            }


        },

        async mounted() {
            this.custosId = config.value('clientId')
            this.custosSec = config.value('clientSec')
            this.tenantModeactivated = await this.$store.dispatch('tenant/isTenantModeActivated')
            if (this.tenantModeactivated) {
                this.custosId = await this.$store.dispatch('tenant/getActivatedClientId')
                this.custosSec = await this.$store.dispatch('tenant/getActivatedClientSecret');
            }
            this.isAdminUser = await this.$store.dispatch('identity/isLoggedUserHasAdminAccess')
            this.currentUserName = await this.$store.dispatch('identity/getCurrentUserName')
            let accessToken = await this.$store.getters['identity/getAccessToken']
                let data = {
                    offset: 0, limit: 1, usertoken:accessToken,
                    username: this.currentUserName
                }
                let resp = await this.$store.dispatch('user/users', data)
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

                        obj.realm_roles.forEach(role => {
                            let r = {
                                name: role
                            }
                            this.roles.push(r)
                        })
                        let attribs = obj.attributes
                        attribs.forEach(r => {
                            let newAt = {
                                key: r.key,
                                value: r.values.join(",")
                            }
                            this.attributes.push(newAt)
                        })


                        this.user = obj
                        this.first_name = obj.first_name
                        this.last_name = obj.last_name
                        this.email = obj.email
                        this.status = obj.state


                    })
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
</style>