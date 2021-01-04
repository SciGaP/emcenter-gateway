<template>
    <div>
        <div class="w-100">
            <h2>Manage Users</h2>
        </div>
        <b-container class="w-100">
            <form class="userSearchBar mb-5" v-on:submit.prevent="searchResult">
                <b-input-group>
                    <b-form-input size="sm" v-model="searchUsername" placeholder="Search"></b-form-input>
                    <b-input-group-append>
                        <b-button size="sm" type="submit">
                            <b-icon icon="search"></b-icon>
                        </b-button>
                    </b-input-group-append>
                </b-input-group>
            </form>
            <div v-if="this.userloading" class="d-flex justify-content-center w-100">
                <b-spinner variant="primary" label="Text Centered"></b-spinner>
            </div>
            <b-table striped hover responsive :items="items" :fields="fields" selectable small
                     ref="selectableTable"
                     select-mode="single"
                     :per-page="perPage"
                     :current-page="currentPage"
                     @row-selected="onRowSelected">
                <template v-slot:cell(status)="data">
                    <b-badge v-if="data.value == 'ACTIVE'" variant="success">Active</b-badge>
                    <b-badge v-else-if="data.value == 'DEACTIVE'" variant="danger">Inactive</b-badge>
                    <b-badge v-else-if="data.value == 'PENDING'" variant="warning">Pending</b-badge>
                </template>
            </b-table>
            <div>
                <b-pagination
                        size="sm"
                        class="float-right"
                        v-model="currentPage"
                        :total-rows="rows"
                        :per-page="perPage"
                        aria-controls="my-table"
                ></b-pagination>
            </div>
        </b-container>
        <b-modal ref="usermodel" id="user-modal" scrollable title="User Profile">
            <div class="user-profile">
                <div class="p-2">
                    <label class="form-input-label" for="form-input-username">Username</label>
                    <b-form-input id="form-input-username" size="sm" v-model="selectedUsername"
                                  disabled></b-form-input>
                </div>
                <div class="p-2">
                    <label class="form-input-label" for="form-input-first-name">First Name</label>
                    <b-form-input id="form-input-first-name" size="sm" v-model="selectedFirstName"></b-form-input>
                </div>
                <div class="p-2">
                    <label class="form-input-label" for="form-input-last-name">Last Name</label>
                    <b-form-input id="form-input-last-name" size="sm" v-model="selectedLastName"></b-form-input>
                </div>
                <div class="p-2">
                    <label class="form-input-label" for="form-input-email">Email</label>
                    <b-form-input id="form-input-email" size="sm" v-model="selectedEmail"></b-form-input>
                </div>
                <div class="p-2">
                    <label class="form-input-label" for="form-input-email">Status</label>
                    <b-form-select id="form-input-status" size="sm" v-model="selectedStatus">
                        <option v-for="(selectOption, indexOpt) in statusOptions"
                                :key="indexOpt"
                                :value="selectOption"
                        >
                            {{ selectOption }}
                        </option>
                    </b-form-select>
                </div>

                <div v-if="!this.operationCompleted" class="d-flex justify-content-center mb-3">
                    <b-spinner variant="primary" label="Text Centered"></b-spinner>
                </div>

                <div class="w-100 mt-5">
                    <strong>Attributes</strong>
                    <b-button variant="link" v-on:click="addAttribute">+ Add Attributes</b-button>
                    <div class="w-100">
                        <small v-if="selectedAttributes.length === 0">There are no attributes created. </small>
                    </div>
                    <b-table small striped hover responsive :items="selectedAttributes" class="mt-2" selectable
                             select-mode="single"
                             @row-selected="onAtrSelected">
                    </b-table>
                </div>

                <div class="w-100 mt-5">
                    <strong>Roles</strong>
                    <b-button variant="link" v-on:click="addRole" :disabled="this.isAdminUser==false">+ Add Role
                    </b-button>
                    <div class="w-100">
                        <small v-if="selectedRoles.length === 0">There are no roles assigned. </small>
                    </div>
                    <b-table small striped hover responsive :items="selectedRoles" class="mt-2" selectable
                             select-mode="single"
                             @row-selected="onRoleSelected">
                        <template v-slot:head(name)>Role</template>
                    </b-table>
                </div>
            </div>
            <template v-slot:modal-footer>
                <b-button size="sm" class="mr-2" @click="$bvModal.hide('user-modal')">
                    Cancel
                </b-button>
                <b-button size="sm" variant="primary" v-on:click="updateUserProfile"
                          @click="$bvModal.hide('user-modal')">
                    Save
                </b-button>
            </template>
        </b-modal>
        <b-modal ref="atrModel" id="user-attribute-modal" scrollable title="Add Attribute">
            <div class="userform">
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
        <b-modal ref="atrModelSelected" id="user-attribute-view-modal" scrollable title="Attribute">
            <div class="userform">
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
                <b-button size="sm" variant="danger" v-on:click="addAtrDeletePressed"
                          @click="$bvModal.hide('user-attribute-view-modal')">
                    Delete
                </b-button>
            </template>
        </b-modal>
        <b-modal ref="roleModel" id="user-role-modal" scrollable title="Add Role">
            <div class="userform">
                <div class="p-2">
                    <label class="form-input-label" for="form-input-role-scope">Scope</label>
                    <b-form-select id="form-input-role-scope" size="sm" v-model="selectedScope">
                        <option v-for="(selectOption, indexOpt) in scopes"
                                :key="indexOpt"
                                :value="selectOption"
                        >
                            {{ selectOption }}
                        </option>
                    </b-form-select>
                </div>
                <div class="p-2">
                    <label class="form-input-label" for="form-input-role">Role</label>
                    <b-form-select v-if="selectedScope==='TENANT'" id="form-input-role" size="sm"
                                   v-model="selectedRole">
                        <option v-for="(selectOption, indexOpt) in tenantroles"
                                :key="indexOpt"
                                :value="selectOption"
                        >
                            {{ selectOption }}
                        </option>
                    </b-form-select>
                    <b-form-select v-if="selectedScope==='CLIENT'" id="form-input-role" size="sm"
                                   v-model="selectedRole">
                        <option v-for="(selectOption, indexOpt) in clientroles"
                                :key="indexOpt"
                                :value="selectOption"
                        >
                            {{ selectOption }}
                        </option>
                    </b-form-select>
                </div>
            </div>
            <template v-slot:modal-footer>
                <b-button size="sm" class="mr-2" @click="$bvModal.hide('user-role-modal')">
                    Cancel
                </b-button>
                <b-button :disabled="!selectedScope || !selectedRole" size="sm" variant="primary"
                          v-on:click="addRoleOkPressed" @click="$bvModal.hide('user-role-modal')">
                    Add
                </b-button>
            </template>
        </b-modal>
        <b-modal ref="roleModelSelected" id="user-role-view-modal" scrollable title="Role">
            <div class="userform">
                <div class="p-2">
                    <label class="form-input-label" for="form-input-role">Role</label>
                    <b-form-input id="form-input-role" size="sm" disabled v-model="rowSelectedRole"></b-form-input>
                </div>
                <div class="p-2">
                    <label class="form-input-label" for="form-input-role-scope">Scope</label>
                    <b-form-input id="form-input-role-scope" size="sm" disabled
                                  v-model="rowSelectedScope"></b-form-input>
                </div>
            </div>
            <template v-slot:modal-footer>
                <b-button size="sm" class="mr-2" @click="$bvModal.hide('user-role-view-modal')">
                    Cancel
                </b-button>
                <b-button size="sm" variant="danger" v-on:click="deleteRoleOkPressed"
                          @click="$bvModal.hide('user-role-view-modal')">
                    Delete
                </b-button>
            </template>
        </b-modal>
    </div>
</template>

<script>
    import config from "@/config";

    export default {
        name: "Users",
        data: function () {
            return {
                fields: ['username', 'first_name', 'last_name', 'email', 'status'],
                community_fields: ['id'],
                items: [],
                communityAccounts: [{
                    id: 'asdfcvrfg',
                    attributes: [{key: "work", vaule: 8123456789}, {key: "phone", vaule: 8123456789}],
                    roles: [{name: 'agentAdmin', scope: 'TENANT'}]
                },
                    {
                        id: 'zxsdcfvtghy',
                        attributes: [{key: "work", vaule: 8123456789}, {key: "phone", vaule: 8123456789}],
                        roles: [{name: 'user', scope: 'TENANT'}]
                    }

                ],
                statusOptions: ['ACTIVE', 'DEACTIVE'],
                scopes: ['TENANT', 'CLIENT'],
                tenantroles: [],
                clientroles: [],
                selectedItem: null,
                searchUsername: null,
                selectedUsername: null,
                selectedFirstName: null,
                selectedLastName: null,
                selectedEmail: null,
                selectedStatus: null,
                selectedAttributes: [],
                selectedRoles: [],
                selectedKey: null,
                selectedValue: null,
                newKey: null,
                newValue: null,
                selectedAtr: null,
                selectedRoleItem: null,
                selectedRole: null,
                selectedScope: null,
                rowSelectedRole: null,
                rowSelectedScope: null,
                newScope: null,
                newRole: null,
                checked: false,
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
                perPage: 5,
                currentPage: 0,
                userloading: true,
                operationCompleted: true,
                searchUsers: true,
                currentUserName: null

            }
        },
        methods: {
            onRowSelected: function (items) {
                if (items != null && items.length > 0) {
                    this.selectedItem = items
                    this.selectedUsername = this.selectedItem[0].username
                    this.selectedFirstName = this.selectedItem[0].first_name
                    this.selectedLastName = this.selectedItem[0].last_name
                    this.selectedEmail = this.selectedItem[0].email
                    this.selectedStatus = this.selectedItem[0].status
                    this.selectedAttributes = this.selectedItem[0].attributes
                    this.selectedRoles = this.selectedItem[0].roles
                    if ((this.selectedUsername === this.currentUserName || this.isAdminUser) && this.selectedUsername != 'admin') {
                        this.$refs.usermodel.show()
                    }
                }

            },
            clearSelected: function () {
                this.$refs.selectableTable.clearSelected()
            },
            async searchResult() {
                this.searchUsers = false
                if (this.searchUsername == null || this.searchUsername == "") {
                    await this.loadUsers()
                } else {
                    let data = {
                        offset: 0, limit: 15, client_id: this.custosId, client_sec: this.custosSec,
                        username: this.searchUsername
                    }
                    await this.$store.dispatch('user/users', data)
                    let resp = await this.$store.getters['user/getUsers']
                    this.items = []
                    if (Array.isArray(resp) && resp.length > 0) {
                        resp.forEach(obj => {
                            let user = {
                                username: obj.username,
                                first_name: obj.first_name,
                                last_name: obj.last_name,
                                email: obj.email,
                                status: obj.state,
                                attributes: [],
                                roles: []
                            }
                            let rr = obj.realm_roles
                            let cr = obj.client_roles

                            let attribs = obj.attributes

                            attribs.forEach(r => {
                                let newAt = {
                                    key: r.key,
                                    value: r.values.join(",")
                                }
                                user.attributes.push(newAt)
                            })


                            rr.forEach(r => {
                                let rel_role = {
                                    name: r,
                                    scope: 'TENANT'
                                }
                                user.roles.push(rel_role)
                            })

                            cr.forEach(r => {
                                let cl_role = {
                                    name: r,
                                    scope: 'CLIENT'
                                }
                                user.roles.push(cl_role)
                            })

                            this.items.push(user)

                        });
                    }
                }
                this.searchUsers = true
            },
            async addAttribute() {
                this.$refs.atrModel.show()
            },
            onAtrSelected: function (items) {
                if (items != null && items.length > 0) {
                    this.selectedAtr = items
                    this.selectedKey = this.selectedAtr[0].key
                    this.selectedValue = this.selectedAtr[0].value
                    this.$refs.atrModelSelected.show()
                }
            },
            addRole: function () {
                this.$refs.roleModel.show()
            },
            onRoleSelected: function (items) {
                if (items != null && items.length > 0) {
                    this.selectedRoleItem = items
                    if (this.isAdminUser) {
                        this.rowSelectedScope = this.selectedRoleItem[0].scope
                        this.rowSelectedRole = this.selectedRoleItem[0].name
                        if (this.rowSelectedRole !== 'offline_access' && this.rowSelectedRole !== 'uma_authorization') {
                            this.$refs.roleModelSelected.show()
                        }
                    }
                }
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
                        users: [this.selectedUsername]
                    }
                }
                let userAtr = await this.$store.dispatch('user/addUserAttributes', bd)
                if (userAtr) {
                    let atr = {key: this.newKey, value: this.newValue}
                    this.selectedAttributes.push(atr)
                }
                this.operationCompleted = true
                this.newKey = null
                this.newValue = null
                this.loadUsers()
            },
            async deleteAttribute(key, value) {
                this.operationCompleted = false
                let accessToken = await this.$store.getters['identity/getAccessToken']
                let bd = {
                    user_token: accessToken, body: {
                        attributes: [{
                            key: key,
                            values: [value]
                        }],
                        users: [this.selectedUsername]
                    }
                }
                let userAtr = await this.$store.dispatch('user/deleteUserAttributes', bd)
                if (userAtr) {
                    let newAtr = []
                    this.selectedAttributes.forEach(atr => {

                        if (atr.key != this.selectedKey) {
                            newAtr.push(atr)
                        }
                        this.selectedAttributes = newAtr
                    })
                }
                this.operationCompleted = true
                this.selectedKey = null
                this.selectedValue = null
                this.loadUsers()
            },
            async addAtrDeletePressed() {
                this.operationCompleted = false
                let accessToken = await this.$store.getters['identity/getAccessToken']
                let bd = {
                    user_token: accessToken, body: {
                        attributes: [{
                            key: this.selectedKey,
                            values: [this.selectedValue]
                        }],
                        users: [this.selectedUsername]
                    }
                }
                let userAtr = await this.$store.dispatch('user/deleteUserAttributes', bd)
                if (userAtr) {
                    let newAtr = []
                    this.selectedAttributes.forEach(atr => {

                        if (atr.key != this.selectedKey) {
                            newAtr.push(atr)
                        }
                        this.selectedAttributes = newAtr
                    })
                }
                this.operationCompleted = true
                this.selectedKey = null
                this.selectedValue = null
                this.loadUsers()
            },
            async addRoleOkPressed() {
                this.operationCompleted = false
                let accessToken = await this.$store.getters['identity/getAccessToken']

                if (this.selectedScope === 'TENANT' && this.selectedRole === 'admin'){
                    let bd = {
                        user_token: accessToken,
                        body: {
                            username: this.selectedUsername,
                        }
                    }

                    await this.$store.dispatch('user/grantAdminPrivilages', bd)
                    let role = {name: this.selectedRole, scope: "TENANT"}
                    this.selectedRoles.push(role)
                } else {
                    let bd = {
                        user_token: accessToken,
                        body: {
                            roles: [this.selectedRole],
                            usernames: [this.selectedUsername],
                            client_level: (this.selectedScope === 'CLIENT')
                        }
                    }
                    let userAtr = await this.$store.dispatch('user/addRoleToUser', bd)
                    if (userAtr) {
                        if (this.selectedScope === 'CLIENT') {
                            let role = {name: this.selectedRole, scope: "CLIENT"}
                            this.selectedRoles.push(role)
                        } else {
                            let role = {name: this.selectedRole, scope: "TENANT"}
                            this.selectedRoles.push(role)
                        }

                    }
                }
                this.operationCompleted = true
                this.selectedRole = null
                this.selectedScope = null
                this.loadUsers()
            },
            async deleteRoleOkPressed() {
                this.operationCompleted = false
                let accessToken = await this.$store.getters['identity/getAccessToken']
                let bd = {};
                let deleted = false
                if (this.rowSelectedScope === 'TENANT' && this.rowSelectedRole === 'admin'){
                    let bd = {
                        user_token: accessToken,
                        body: {
                            username: this.selectedUsername,
                        }
                    }

                    deleted = await this.$store.dispatch('user/removeAdminPrivilages', bd)
                } else {

                    if (this.rowSelectedScope === 'TENANT') {
                        bd = {
                            user_token: accessToken,
                            body: {
                                roles: [this.rowSelectedRole],
                                username: this.selectedUsername
                            }
                        }
                    } else {
                        bd = {
                            user_token: accessToken,
                            body: {
                                client_roles: [this.rowSelectedRole],
                                username: this.selectedUsername
                            }
                        }
                    }

                    deleted = await this.$store.dispatch('user/deleteRoleFromUser', bd)
                }
                if (deleted) {

                    let newRoles = []
                    this.selectedRoles.forEach(atr => {

                        if (atr.name != this.rowSelectedRole) {
                            newRoles.push(atr)
                        }

                    })
                    this.selectedRoles = newRoles
                }
                this.operationCompleted = true
                this.loadUsers()


            },

            async loadUsers() {
                let data = {offset: 0, limit: 5, client_id: this.custosId, client_sec: this.custosSec}
                let resp = await this.$store.dispatch('user/users', data)
                this.userloading = false
                this.items = []
                let newUsersCount = this.parseUsers(this.items, resp)
                if (newUsersCount == 5) {
                    let offset = 5
                    while (newUsersCount >= 5) {
                        newUsersCount = await this.loadUsersR(offset, this.items)
                        offset = offset + 5
                    }
                }
            },

            async loadUsersR(offset, items) {
                let data = {offset: offset, limit: 5, client_id: this.custosId, client_sec: this.custosSec}
                let resp = await this.$store.dispatch('user/users', data)
                return this.parseUsers(items, resp)
            },

            async goToWorkspace() {
                await this.$router.push('/workspace')
            },

            parseUsers(items, resp) {
                if (Array.isArray(resp) && resp.length > 0) {
                    resp.forEach(obj => {
                        let user = {
                            username: obj.username,
                            first_name: obj.first_name,
                            last_name: obj.last_name,
                            email: obj.email,
                            status: (obj.state == 'ACTIVE') ? obj.state : 'DEACTIVE',
                            attributes: [],
                            roles: []
                        }
                        let rr = obj.realm_roles
                        let cr = obj.client_roles

                        let attribs = obj.attributes

                        attribs.forEach(r => {
                            let newAt = {
                                key: r.key,
                                value: r.values.join(",")
                            }
                            user.attributes.push(newAt)
                        })

                        rr.forEach(r => {
                            let rel_role = {
                                name: r,
                                scope: 'TENANT'
                            }
                            user.roles.push(rel_role)
                        })

                        cr.forEach(r => {
                            let cl_role = {
                                name: r,
                                scope: 'CLIENT'
                            }
                            user.roles.push(cl_role)
                        })

                        items.push(user)

                    });

                }
                return resp.length
            },

            async updateUserProfile() {
                this.operationCompleted = false
                let params = {client_id: this.custosId, client_sec: this.custosSec, username: this.selectedUsername}
                if (this.selectedStatus === 'ACTIVE') {
                    await this.$store.dispatch('user/enableUser', params)

                } else {
                    await this.$store.dispatch('user/disableUser', params)
                }

                let data = {
                    client_id: this.custosId,
                    client_sec: this.custosSec,
                    body: {
                        username: this.selectedUsername,
                        first_name: this.selectedFirstName,
                        last_name: this.selectedLastName,
                        email: this.selectedEmail
                    }
                }
                await this.$store.dispatch('user/updateUserProfile', data)
                this.operationCompleted = true
                this.loadUsers()

            },
        }
        ,

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
            this.currentUserName = await this.$store.dispatch('identity/getCurrentUserName')
            await this.loadUsers()

            let params = {client_id: this.custosId, client_sec: this.custosSec}
            this.tenantroles = await this.$store.dispatch('user/getTenantLevelRoles', params)
            this.clientroles = await this.$store.dispatch('user/getClientLevelRoles', params)

        }
        ,
        computed: {
            rows() {
                return this.items.length
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

    .userSearchBar {
        border-radius: 5px;
        border: solid 1px #afafae;
        width: 300px;
        float: right;
    }

    .userSearchBar .form-control {
        border: none;
    }

    .userSearchBar input.form-control:focus {
        outline: none;
        box-shadow: none;
    }

    .userSearchBar button {
        background: none;
        color: black;
        border: none;
    }
</style>