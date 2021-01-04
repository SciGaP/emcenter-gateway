<template>
    <div>
        <div class="w-100 mb-5">
            <h2>Manage Groups</h2>
        </div>
        <b-container>
            <div>
                <b-alert v-model="groupError" variant="danger" dismissible
                         @dismissed="callDismissed">
                    Group name already exists
                </b-alert>
            </div>
            <div v-if="this.groupsLoading" class="d-flex justify-content-center mb-3">
                <b-spinner variant="primary" label="Text Centered"></b-spinner>
            </div>
            <b-table small striped hover responsive :items="groupItems" :fields="fields" selectable
                     ref="selectableTable" select-mode="single" @row-selected="onRowSelected" caption-top>
                <template v-slot:head(id)>ID</template>
                <template v-slot:head(ownerId)>Owner</template>
            </b-table>
            <div class="addGr">
                <b-button variant="outline-primary" v-on:click="addGr">Add Group</b-button>
            </div>
        </b-container>
        <b-modal ref="groupmodel" id="group-profile-modal" scrollable title="Group Profile" ok-title="Update">
            <div>
                <div class="p-2">
                    <label class="form-input-label" for="form-input-group-name">Name</label>
                    <b-form-input id="form-input-group-name" size="sm" v-model="selectedName"
                                  disabled></b-form-input>
                </div>
                <div class="p-2">
                    <label class="form-input-label" for="form-input-group-description">Description</label>
                    <b-form-input id="form-input-group-description" size="sm"
                                  v-model="selectedDescription"></b-form-input>
                </div>
                <div class="p-2">
                    <label class="form-input-label" for="form-input-group-owner-id">Owner</label>
                    <b-form-input id="form-input-group-owner-id" size="sm" v-model="selectedOwnerId"
                                  disabled></b-form-input>
                </div>
                <div v-if="!this.operationCompleted" class="d-flex justify-content-center mb-3">
                    <b-spinner variant="primary" label="Text Centered"></b-spinner>
                </div>
                <div class="w-100 mt-5">
                    <strong>Members</strong>
                    <b-button variant="link" :disabled="disableAccess" v-on:click="addMemberShip"> + Add Member
                    </b-button>
                    <div class="w-100" v-if="members.length === 0"><small>There are no members.</small></div>
                    <b-table v-if="members.length > 0" class="mt-3" small striped hover responsive :items="members"
                             selectable
                             select-mode="single"
                             @row-selected="onMemberShipSelected">
                        <template v-slot:head(user_id)>Username</template>
                        <template v-slot:head(type)>Permission Type</template>
                    </b-table>
                </div>

                <div class="w-100 mt-5">
                    <strong>Child Groups</strong>
                    <b-button variant="link" :disabled="disableAccess" v-on:click="addChildGroup">
                        + Add Child Group
                    </b-button>
                    <div class="w-100" v-if="childGroupMembers.length === 0"><small>There are no child
                        groups.</small></div>
                    <b-table v-if="childGroupMembers.length > 0" class="mt-3" small striped hover responsive
                             :items="childGroupMembers"
                             :fields="memberGroupsFields"
                             selectable select-mode="single"
                             @row-selected="onGroupMemberShipSelected">
                        <template v-slot:head(name)>Group Name</template>
                        <template v-slot:head(id)>ID</template>
                    </b-table>
                </div>

            </div>
            <template v-slot:modal-footer>
                <div class="w-100">
                    <b-button variant="primary" size="sm" class="mr-2" v-on:click="closeGroupProfile"
                              @click="$bvModal.hide('group-profile-modal')" :disabled="disableAccess">
                        Close
                    </b-button>
                    <b-button variant="danger" size="sm" class="mr-2" v-on:click="removeGroupProfile"
                              @click="$bvModal.hide('group-profile-modal')" :disabled="disableAccess">
                        Delete
                    </b-button>
                    <b-button variant="primary" size="sm" class="mr-2" v-on:click="updateGroupProfile"
                              @click="$bvModal.hide('group-profile-modal')" :disabled="disableAccess">
                        Update
                    </b-button>
                </div>
            </template>
        </b-modal>
        <b-modal ref="membershipModel" id="update-membership-modal" title="Update Membership" ok-title="Update">
            <div>
                <div class="p-2">
                    <label class="form-input-label" for="form-input-username">User</label>
                    <b-form-input id="form-input-username" size="sm" v-model="selectedMembershipUsername"
                                  disabled></b-form-input>
                </div>
                <div class="p-2">
                    <label class="form-input-label" for="form-input-permission-type">Permission Type</label>
                    <b-form-select id="form-input-permission-type" size="sm" v-model="selectedMembershipType">
                        <option v-for="(selectOption, indexOpt) in memberTypes"
                                :key="indexOpt"
                                :value="selectOption"
                        >
                            {{ selectOption }}
                        </option>
                    </b-form-select>
                </div>
            </div>
            <template v-slot:modal-footer>
                <div class="w-100">
                    <b-button size="sm" class="mr-2" v-on:click="closeMembershipModel"
                              @click="$bvModal.hide('update-membership-modal')">
                        Close
                    </b-button>
                    <b-button variant="danger" size="sm" class="mr-2" v-on:click="removeMembership"
                              @click="$bvModal.hide('update-membership-modal')">
                        Remove Membership
                    </b-button>
                    <b-button variant="primary" class="mr-2" size="sm" v-on:click="updateMembership"
                              @click="$bvModal.hide('update-membership-modal')">
                        Update
                    </b-button>
                </div>
            </template>
        </b-modal>
        <b-modal ref="addMembershipModel" id="add-membership-modal" title="Add Membership">
            <div v-if="usernames.length > 0">
                <div v-if="selectedChildType==='User'" class="p-2">
                    <label class="form-input-label" for="form-input-username">Username</label>
                    <b-form-select id="form-input-username" size="sm" v-model="selectedNewUsername">
                        <option v-for="(selectOption, indexOpt) in usernames"
                                :key="indexOpt"
                                :value="selectOption"
                        >
                            {{ selectOption }}
                        </option>
                    </b-form-select>
                </div>
                <div v-if="selectedChildType==='User'" class="p-2">
                    <label class="form-input-label" for="form-input-type">Type</label>
                    <b-form-select id="form-input-type" size="sm" v-model="selectedNewMemType">
                        <option v-for="(selectOption, indexOpt) in memberTypes"
                                :key="indexOpt"
                                :value="selectOption"
                        >
                            {{ selectOption }}
                        </option>
                    </b-form-select>
                </div>
            </div>

            <small v-if="usernames.length === 0" class="p-3 text-danger">
                There are no available members to be added.
            </small>

            <template v-slot:modal-footer>
                <b-button size="sm" @click="$bvModal.hide('add-membership-modal')">
                    Cancel
                </b-button>
                <b-button size="sm" class="mr-2" variant="primary" :disabled="usernames.length === 0"
                          v-on:click="addMembershipOKPressed" @click="$bvModal.hide('add-membership-modal')">
                    Add Membership
                </b-button>
            </template>
        </b-modal>
        <b-modal ref="addGrModel" id="add-group-modal" title="Add Group" ok-title="Add" @ok="addGroupOKPressed">
            <div>
                <div class="p-2">
                    <label class="form-input-label" for="form-input-group-name">Name</label>
                    <b-form-input id="form-input-group-name" size="sm"
                                  v-model="selectedNewGrName"></b-form-input>
                </div>
                <div class="p-2">
                    <label class="form-input-label" for="form-input-group-name">Description</label>
                    <b-form-input id="form-input-group-description" size="sm"
                                  v-model="selectedNewGrDesc"></b-form-input>
                </div>
            </div>
            <template v-slot:modal-footer>
                <b-button size="sm" class="mr-2" @click="$bvModal.hide('add-group-modal')">
                    Cancel
                </b-button>
                <b-button :disabled="!selectedNewGrName || selectedNewGrName.length === 0" size="sm"
                          variant="primary" v-on:click="addGroupOKPressed"
                          @click="$bvModal.hide('add-group-modal')">
                    Add Group
                </b-button>
            </template>
        </b-modal>
        <b-modal ref="viewGrMembership" id="view-group-membership-modal" title="Group">
            <div class="groupform">
                <div class="groupformItem">
                    <label class="form-input-label" for="form-input-group-name">Name</label>
                    <b-form-input id="form-input-group-name" size="sm" v-model="selectedGrName"
                                  disabled></b-form-input>
                </div>
                <div class="groupformItem">
                    <label class="form-input-label" for="form-input-id">ID</label>
                    <b-form-input id="form-input-id" size="sm" v-model="selectedGrId" disabled></b-form-input>
                </div>
            </div>
            <template v-slot:modal-footer>
                <b-button size="sm" class="mr-2" @click="$bvModal.hide('view-group-membership-modal')">
                    Cancel
                </b-button>
                <b-button size="sm" variant="danger" v-on:click="removeGroupMembership"
                          @click="$bvModal.hide('view-group-membership-modal')">
                    Delete Child Group
                </b-button>
            </template>
        </b-modal>
        <b-modal ref="addGrMembershipModel" id="add-group-membership-modal" title="Add Group Membership">
            <div class="p-2" v-if="feasibleGroupMembers.length > 0">
                <label class="form-input-label" for="form-input-group-name">Select Group</label>
                <b-form-select id="form-input-group-name" size="sm"
                               v-model="addingGr">
                    <option v-for="(selectOption, indexOpt) in feasibleGroupMembers"
                            :key="indexOpt"
                            :value="selectOption"
                    >
                        {{ selectOption.name }}
                    </option>
                </b-form-select>
            </div>
            <small v-if="feasibleGroupMembers.length === 0" class="p-3 text-danger">
                There are no available groups to be added as child groups.
            </small>
            <template v-slot:modal-footer>
                <b-button size="sm" class="mr-2" @click="$bvModal.hide('add-group-membership-modal')">
                    Cancel
                </b-button>
                <b-button :disabled="feasibleGroupMembers.length === 0" size="sm" variant="primary"
                          v-on:click="addChildGroupOkPressed"
                          @click="$bvModal.hide('add-group-membership-modal')">
                    Add
                </b-button>
            </template>
        </b-modal>
    </div>
</template>

<script>
    import config from "@/config";

    export default {
        name: "Groups",
        data: function () {
            return {
                fields: ['name', 'id', 'description', 'ownerId'],
                groupItems: [],
                members: [],
                childGroupMembers: [],
                feasibleGroupMembers: [],
                usernames: [],
                exGroups: [
                    '1234-edrfg-567-rfgbn', '1234-ed-5634-rfn'
                ],
                memberTypes: [
                    'ADMIN', 'MEMBER'],
                memberGroupsFields: ['name', 'id'],
                selectedId: null,
                selectedName: null,
                selectedDescription: null,
                selectedOwnerId: null,
                selectedMembershipItem: null,
                selectedMembershipUsername: null,
                selectedMembershipType: null,
                selectedNewMemType: 'Member',
                selectedNewUsername: null,
                selectedNewGrName: null,
                selectedNewGrDesc: null,
                selectedChildType: 'User',
                selectedExGr: null,
                selectedGrName: null,
                selectedGrId: null,
                selectedGr: null,
                addingGr: null,
                groupsLoading: false,
                operationCompleted: true,
                currentUser: null,
                groupError: null,
                disableAccess: false

            }
        },
        methods: {
            async onRowSelected(items) {
                if (items != null && items.length > 0) {
                    this.selectedItem = items
                    this.selectedId = this.selectedItem[0].id
                    this.selectedName = this.selectedItem[0].name
                    this.selectedDescription = this.selectedItem[0].description
                    this.selectedOwnerId = this.selectedItem[0].ownerId

                    let data = {
                        client_id: this.custosId,
                        client_sec: this.custosSec,
                        group_id: this.selectedId
                    }

                    let users = await this.$store.dispatch('group/getAllChildUsers', data)

                    this.members = []
                    users.profiles.forEach(user => {

                        let usr = {user_id: user.username, type: user.membership_type}
                        this.members.push(usr)
                    })

                    let response = await this.$store.dispatch('group/getAllChildGroups', data)

                    this.childGroupMembers = response.groups


                    if (!this.isAdminUser && this.selectedOwnerId != this.currentUser) {

                        let data = {
                            client_id: this.custosId,
                            client_sec: this.custosSec,
                            groupId: this.selectedId,
                            username: this.currentUser,
                            type: 'ADMIN'
                        }

                        let resp = await this.$store.dispatch('group/hasAccess', data)

                        if (!resp.status) {
                            this.disableAccess = true

                        }

                    } else {
                        this.disableAccess = false
                    }

                    this.$refs.groupmodel.show()
                }
            },
            onMemberShipSelected: function (items) {
                this.selectedMembershipItem = items

                this.selectedMembershipUsername = this.selectedMembershipItem[0].user_id
                this.selectedMembershipType = this.selectedMembershipItem[0].type
                if (this.selectedMembershipType !== 'OWNER') {
                    this.$refs.membershipModel.show()
                }
            },

            onGroupMemberShipSelected: function (items) {
                if (items != null && items.length > 0) {
                    this.selectedGr = items
                    this.selectedGrId = this.selectedGr[0].id
                    this.selectedGrName = this.selectedGr[0].name
                    this.$refs.viewGrMembership.show()
                }
            },

            async addChildGroup() {
                let grs = []
                let dat = {
                    client_id: this.custosId,
                    client_sec: this.custosSec,
                    groupId: this.selectedId
                }

                let parentGroups = await this.$store.dispatch('group/getAllParentGroups', dat)
                for (const gr of this.groupItems) {
                    let addToGroup = true
                    this.childGroupMembers.forEach(lx => {
                        if (gr.id === lx.id) {
                            addToGroup = false
                        }
                    })
                    if (gr.id === this.selectedId) {
                        addToGroup = false
                    }

                    if (parentGroups != null && parentGroups.length > 0) {
                        parentGroups.forEach(pGr => {
                            if (gr.id === pGr.id) {
                                addToGroup = false
                            }

                        })

                    }

                    if (addToGroup) {

                        if (gr.ownerId != this.currentUser) {
                            let data = {
                                client_id: this.custosId,
                                client_sec: this.custosSec,
                                groupId: gr.id,
                                username: this.currentUser,
                                type: 'ADMIN'
                            }

                            let resp = await this.$store.dispatch('group/hasAccess', data)

                            if (resp.status) {
                                grs.push(gr)

                            }
                        } else {
                            grs.push(gr)
                        }


                    }
                }


                this.feasibleGroupMembers = grs
                this.$refs.addGrMembershipModel.show()
            },

            async addChildGroupOkPressed() {
                this.operationCompleted = false
                let data = {
                    client_id: this.custosId,
                    client_sec: this.custosSec,
                    body: {
                        child_id: this.addingGr.id,
                        parent_id: this.selectedId
                    }
                }

                let status = await this.$store.dispatch('group/addChildGroup', data)
                if (status) {
                    this.childGroupMembers.push(this.addingGr)
                }
                this.operationCompleted = true
            },

            async addMemberShip() {
                let users = []
                this.usernames.forEach(user => {
                    if (user != this.selectedOwnerId) {
                        let add = true
                        this.members.forEach(mem => {
                            if (mem.user_id === user) {
                                add = false
                            }
                        })
                        if (add) {
                            users.push(user)
                        }
                    }
                })
                this.usernames = users
                this.$refs.addMembershipModel.show()
            },

            addGr: function () {
                this.selectedNewGrName = null
                this.selectedNewGrDesc = null
                this.$refs.addGrModel.show()
            },

            async addGroupOKPressed() {
                this.groupsLoading = true
                let username = await this.$store.dispatch('identity/getCurrentUserName')
                let data = {
                    client_id: this.custosId,
                    client_sec: this.custosSec,
                    username: this.currentUser,
                    body: {
                        group: {
                            name: this.selectedNewGrName,
                            description: this.selectedNewGrDesc,
                            ownerId: username,
                            realm_roles: [],
                            client_roles: [],
                            attributes: [],
                            sub_groups: []
                        }
                    }
                }
                let response = await this.$store.dispatch('group/createGroup', data)
                if (!response) {
                    this.groupError = true
                    this.groupsLoading = false
                } else {
                    await this.loadGroups(data)
                    this.groupsLoading = false
                    this.selectedNewGrName = null
                    this.selectedNewGrDesc = null
                }
            },

            async loadUsers() {
                let data = {offset: 0, limit: 50, client_id: this.custosId, client_sec: this.custosSec}
                await this.$store.dispatch('user/users', data)
                let resp = await this.$store.getters['user/getUsers']
                this.usernames = []
                if (Array.isArray(resp) && resp.length > 0) {
                    resp.forEach(obj => {
                        this.usernames.push(obj.username)
                    });

                }
            },

            async addMembershipOKPressed() {
                this.operationCompleted = false
                let data = {
                    client_id: this.custosId, client_sec: this.custosSec, body: {
                        group_id: this.selectedId,
                        username: this.selectedNewUsername,
                        membership_type: this.selectedNewMemType
                    }
                }
                let response = await this.$store.dispatch('group/addUserToGroup', data)

                if (response.status) {
                    let obj = {user_id: this.selectedNewUsername, type: this.selectedNewMemType}
                    this.members.push(obj)
                }
                this.operationCompleted = true
            },

            async updateMembership() {
                this.operationCompleted = false
                let data = {
                    client_id: this.custosId, client_sec: this.custosSec, body: {
                        group_id: this.selectedId,
                        username: this.selectedMembershipUsername,
                        type: this.selectedMembershipType
                    }
                }
                let response = await this.$store.dispatch('group/changeGroupMembership', data)

                if (response.status) {
                    let obj = {user_id: this.selectedMembershipUsername, type: this.selectedMembershipType}
                    let newMems = []
                    this.members.forEach(mem => {
                        if (mem.user_id !== this.selectedMembershipUsername) {
                            newMems.push(mem)
                        }
                    })

                    newMems.push(obj)
                    this.members = newMems
                }
                this.operationCompleted = true
                this.$refs.membershipModel.hide()
            },

            async removeMembership() {
                this.operationCompleted = false
                let data = {
                    client_id: this.custosId, client_sec: this.custosSec, body: {
                        group_id: this.selectedId,
                        username: this.selectedMembershipUsername
                    }
                }
                let response = await this.$store.dispatch('group/removeUserFromGroup', data)

                if (response.status) {
                    let newMems = []
                    this.members.forEach(mem => {
                        if (mem.user_id !== this.selectedMembershipUsername) {
                            newMems.push(mem)
                        }
                    })
                    this.members = newMems
                }
                this.operationCompleted = true
                this.$refs.membershipModel.hide()
            },


            async updateGroupProfile() {
                this.operationCompleted = false
                let data = {
                    client_id: this.custosId, client_sec: this.custosSec, group_id: this.selectedId, body: {
                        group: {
                            name: this.selectedName,
                            ownerId: this.selectedOwnerId,
                            description: this.selectedDescription,
                            realm_roles: [],
                            client_roles: [],
                            attributes: [],
                            sub_groups: []
                        }
                    }
                }
                await this.$store.dispatch('group/updateGroup', data)
                this.$refs.groupmodel.hide()
                let dat = {
                    client_id: this.custosId,
                    client_sec: this.custosSec,
                    username: this.currentUser
                }
                await this.loadGroups(dat)
                this.operationCompleted = true
            },


            async removeGroupProfile() {
                this.operationCompleted = false
                let data = {
                    client_id: this.custosId, client_sec: this.custosSec, group_id: this.selectedId, body: {
                        group: {
                            name: this.selectedName,
                            ownerId: this.selectedOwnerId,
                            description: this.selectedDescription,
                            realm_roles: [],
                            client_roles: [],
                            attributes: [],
                            sub_groups: []
                        }
                    }
                }
                await this.$store.dispatch('group/deleteGroup', data)
                this.$refs.groupmodel.hide()
                let dat = {
                    client_id: this.custosId,
                    client_sec: this.custosSec,
                    username: this.currentUser
                }
                await this.loadGroups(dat)
                this.operationCompleted = true
            },


            async closeGroupProfile() {
                this.$refs.groupmodel.hide()
            },

            async closeMembershipModel() {
                this.$refs.membershipModel.hide()
            },

            async removeGroupMembership() {
                this.operationCompleted = false
                let data = {
                    client_id: this.custosId,
                    client_sec: this.custosSec,
                    body: {
                        child_id: this.selectedGrId,
                        parent_id: this.selectedId
                    }
                }

                let status = await this.$store.dispatch('group/removeChildGroup', data)
                if (status) {
                    let data = {
                        client_id: this.custosId,
                        client_sec: this.custosSec,
                        group_id: this.selectedId
                    }

                    let response = await this.$store.dispatch('group/getAllChildGroups', data)
                    this.childGroupMembers = response.groups
                }
                this.operationCompleted = true
            },


            async loadGroups(data) {
                if (this.isAdminUser) {
                    this.groupItems = await this.$store.dispatch('group/loadAllGroups', data)
                } else {
                    let grs = []
                    grs = await this.$store.dispatch('group/getAllGroupsOfUser', data)
                    let groups = []
                    grs.forEach(gr => {
                        gr.ownerId = gr.owner_id
                        groups.push(gr)
                    })
                    this.groupItems = groups
                }
            },

            async goToWorkspace() {
                await this.$router.push('/workspace')
            },

            async callDismissed() {
                this.groupError = false
            },


        },
        async mounted() {
            this.groupsLoading = true
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
            this.currentUser = await this.$store.dispatch('identity/getCurrentUserName')
            let data = {
                client_id: this.custosId,
                client_sec: this.custosSec,
                username: this.currentUser
            }
            await this.loadGroups(data)
            this.groupsLoading = false
            this.loadUsers()
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