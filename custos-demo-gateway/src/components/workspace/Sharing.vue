<template>
    <div>
        <div class="w-100">
            <h2>Sharing</h2>
        </div>
        <b-container class="text-left">
            <div v-if="isAdminUser" class="w-100">
                Do you want to evaluate if a specific user has a specific permission to a specific entity ?
                <b-button variant="link" v-on:click="checkPermissions">Evaluate Permissions</b-button>
            </div>
            <div>
                <div class="mt-5">
                    <strong>Permission Types</strong>
                    <b-button v-if="isAdminUser" variant="link" v-on:click="onNewPrTyAdd">
                        + Add Permission Type
                    </b-button>
                    <div>
                        <b-alert v-model="this.inputErrorPR" variant="danger" dismissible
                                 @dismissed="callDismissed">
                            Input validation error
                        </b-alert>
                    </div>
                    <div v-if="this.permissionTypesLoading" class="d-flex justify-content-center mb-3">
                        <b-spinner variant="primary" label="Text Centered"></b-spinner>
                    </div>
                    <b-table small striped hover responsive :items="permissionTypes" :fields="fields" selectable
                             ref="selectableTable" select-mode="single" @row-selected="onPrTySelected">
                        <template v-slot:head(id)>Permission Type ID</template>
                    </b-table>
                </div>
                <div class="mt-5">
                    <strong>Entity Types</strong>
                    <b-button v-if="isAdminUser" variant="link" v-on:click="onNewEnTyAdd">
                        + Add Entity Type
                    </b-button>
                    <div v-if="this.entityTypesLoading" class="d-flex justify-content-center mb-3">
                        <b-spinner variant="primary" label="Text Centered"></b-spinner>
                    </div>
                    <div>
                        <b-alert v-model="this.inputErrorEnTy" variant="danger" dismissible
                                 @dismissed="callDismissed">
                            Input validation error
                        </b-alert>
                    </div>
                    <b-table small striped hover responsive :items="entityTypes" :fields="fields" selectable
                             ref="selectableTable" select-mode="single" @row-selected="onEnTySelected" caption-top>
                        <template v-slot:head(id)>Entity Type ID</template>
                    </b-table>
                </div>
                <div class="mt-5">
                    <strong>Entities</strong>
                    <b-button variant="link" v-on:click="onNewEnAdd">
                        + Add Entity
                    </b-button>
                    <div v-if="this.entitiesLoading" class="d-flex justify-content-center mb-3">
                        <b-spinner variant="primary" label="Text Centered"></b-spinner>
                    </div>
                    <div>
                        <b-alert v-model="this.inputErrorEn" variant="danger" dismissible
                                 @dismissed="callDismissed">
                            Input validation error
                        </b-alert>
                    </div>
                    <b-table small striped hover responsive :items="entities" :fields="entityFields" selectable
                             ref="selectableTable" select-mode="single" @row-selected="onEntitySelected">
                        <template v-slot:head(id)>Entity ID</template>
                        <template v-slot:head(type)>Entity Type ID</template>
                    </b-table>
                </div>
                <div class="mt-5">
                    <strong>Entity Sharing</strong>
                    <b-button variant="link" v-on:click="onSharingAdd">
                        + Add Entity Sharing
                    </b-button>
                    <div v-if="this.sharingsLoading" class="d-flex justify-content-center mb-3">
                        <b-spinner variant="primary" label="Text Centered"></b-spinner>
                    </div>
                    <div>
                        <b-alert v-model="this.sharingError" variant="danger" dismissible
                                 @dismissed="callDismissed">
                            Input validation error
                        </b-alert>
                    </div>
                    <b-table small striped hover responsive :items="sharings" :fields="sharingFields" selectable
                             ref="selectableTable"
                             select-mode="single"
                             @row-selected="onSharingSelected">
                        <template v-slot:head(entity_id)>Entity ID</template>
                        <template v-slot:head(permission_type_id)>Permission Type ID</template>
                        <template v-slot:head(owner_id)>Group / User ID</template>
                        <template v-slot:head(type)>Group / User</template>
                    </b-table>
                </div>


            </div>
        </b-container>
        <b-modal ref="prtypemodel" id="add-permission-type-modal" scrollable title="Add Permission Type">
            <div>
                <div class="p-2">
                    <label class="form-input-label" for="form-input-id">ID</label>
                    <b-form-input id="form-input-id" size="sm" v-model="prId"></b-form-input>
                </div>
                <div class="p-2">
                    <label class="form-input-label" for="form-input-name">Name</label>
                    <b-form-input id="form-input-name" size="sm" v-model="prName"></b-form-input>
                </div>
                <div class="p-2">
                    <label class="form-input-label" for="form-input-description">Description</label>
                    <b-form-input id="form-input-description" size="sm" v-model="prDesc"></b-form-input>
                </div>
            </div>
            <template v-slot:modal-footer>
                <b-button size="sm" class="mr-2" @click="$bvModal.hide('add-permission-type-modal')">
                    Cancel
                </b-button>
                <b-button size="sm" variant="primary" v-on:click="addPrType"
                          :disabled="!prId || !prName"
                          @click="$bvModal.hide('add-permission-type-modal')">
                    Add
                </b-button>
            </template>
        </b-modal>
        <b-modal ref="entypemodel" id="add-entity-type-modal" scrollable title="Add Entity Type">
            <div>
                <div class="p-2">
                    <label class="form-input-label" for="form-input-id">ID</label>
                    <b-form-input id="form-input-id" size="sm" v-model="enTyId"></b-form-input>
                </div>
                <div class="p-2">
                    <label class="form-input-label" for="form-input-name">Name</label>
                    <b-form-input id="form-input-name" size="sm" v-model="enTyName"></b-form-input>
                </div>
                <div class="p-2">
                    <label class="form-input-label" for="form-input-description">Description</label>
                    <b-form-input id="form-input-description" size="sm" v-model="enTyDesc"></b-form-input>
                </div>
            </div>
            <template v-slot:modal-footer>
                <b-button size="sm" class="mr-2" @click="$bvModal.hide('add-entity-type-modal')">
                    Cancel
                </b-button>
                <b-button size="sm" variant="primary" v-on:click="addNewEnType"
                          :disabled="!enTyId || !enTyName"
                          @click="$bvModal.hide('add-entity-type-modal')">
                    Add
                </b-button>
            </template>
        </b-modal>
        <b-modal ref="enModel" id="add-entity-modal" scrollable title="Add  Entity " ok-title="Add" @ok="addNewEntity">
            <div>
                <div class="p-2">
                    <label class="form-input-label" for="form-input-name">Name</label>
                    <b-form-input id="form-input-name" size="sm" v-model="enName"></b-form-input>
                </div>
                <div class="p-2">
                    <label class="form-input-label" for="form-input-type">Type</label>
                    <b-form-select id="form-input-type" size="sm" v-model="selectedEntityType">
                        <option v-for="(selectOption, indexOpt) in entityTypes"
                                :key="indexOpt"
                                :value="selectOption"
                        >
                            {{ selectOption.id }}
                        </option>
                    </b-form-select>
                </div>
                <div class="p-2">
                    <label class="form-input-label" for="form-input-description">Description</label>
                    <b-form-input id="form-input-description" size="sm" v-model="enDesc"></b-form-input>
                </div>
            </div>
            <template v-slot:modal-footer>
                <b-button size="sm" class="mr-2" @click="$bvModal.hide('add-entity-modal')">
                    Cancel
                </b-button>
                <b-button size="sm" variant="primary" v-on:click="addNewEntity"
                          :disabled="!enName || !selectedEntityType"
                          @click="$bvModal.hide('add-entity-modal')">
                    Add
                </b-button>
            </template>
        </b-modal>
        <b-modal ref="selectedPrTyModel" id="view-permission-type-modal" scrollable title="Permission Type">
            <div>
                <div class="p-2">
                    <label class="form-input-label" for="form-input-id">ID</label>
                    <b-form-input id="form-input-id" size="sm" v-model="selectedPrTyId" disabled></b-form-input>
                </div>
                <div class="p-2">
                    <label class="form-input-label" for="form-input-name">Name</label>
                    <b-form-input id="form-input-name" size="sm" v-model="selectedPrTyName" disabled></b-form-input>
                </div>
                <div class="p-2">
                    <label class="form-input-label" for="form-input-description">Description</label>
                    <b-form-input id="form-input-description" size="sm" v-model="selectedPrTyDesc"
                                  disabled></b-form-input>
                </div>
            </div>
            <template v-slot:modal-footer>
                <b-button size="sm" class="mr-2" @click="$bvModal.hide('view-permission-type-modal')">
                    Cancel
                </b-button>
                <b-button size="sm" variant="danger" v-on:click="deletePRType"
                          @click="$bvModal.hide('view-permission-type-modal')">
                    Delete
                </b-button>
            </template>
        </b-modal>
        <b-modal ref="selectedEnTyModel" id="view-entity-type-modal" scrollable title="Entity Type " ok-title="Delete"
                 @ok="deleteEnType">
            <div>
                <div class="p-2">
                    <label class="form-input-label" for="form-input-id">ID</label>
                    <b-form-input id="form-input-id" size="sm" v-model="selectedEnTyId" disabled></b-form-input>
                </div>
                <div class="p-2">
                    <label class="form-input-label" for="form-input-name">Name</label>
                    <b-form-input id="form-input-name" size="sm" v-model="selectedEnTyName" disabled></b-form-input>
                </div>
                <div class="p-2">
                    <label class="form-input-label" for="form-input-description">Description</label>
                    <b-form-input id="form-input-description" size="sm" v-model="selectedEnTyDesc"
                                  disabled></b-form-input>
                </div>
            </div>
            <template v-slot:modal-footer>
                <b-button size="sm" class="mr-2" @click="$bvModal.hide('view-entity-type-modal')">
                    Cancel
                </b-button>
                <b-button size="sm" variant="danger" v-on:click="deleteEnType"
                          @click="$bvModal.hide('view-entity-type-modal')">
                    Delete
                </b-button>
            </template>
        </b-modal>
        <b-modal ref="selectedEnModel" id="view-entity-modal" scrollable title="Entity">
            <div>
                <div class="p-2">
                    <label class="form-input-label" for="form-input-id">ID</label>
                    <b-form-input id="form-input-id" size="sm" v-model="selectedEnId" disabled></b-form-input>
                </div>
                <div class="p-2">
                    <label class="form-input-label" for="form-input-name">Name</label>
                    <b-form-input id="form-input-name" size="sm" v-model="selectedEnName" disabled></b-form-input>
                </div>
                <div class="p-2">
                    <label class="form-input-label" for="form-input-type">Type</label>
                    <b-form-input id="form-input-type" size="sm" v-model="selectedEntityType" disabled></b-form-input>
                </div>
                <div class="p-2">
                    <label class="form-input-label" for="form-input-description">Description</label>
                    <b-form-input id="form-input-description" size="sm" v-model="selectedEnDesc"
                                  disabled></b-form-input>
                </div>
            </div>
            <template v-slot:modal-footer>
                <b-button size="sm" class="mr-2" @click="$bvModal.hide('view-entity-modal')">
                    Cancel
                </b-button>
                <b-button size="sm" variant="danger" v-on:click="deleteEntity"
                          @click="$bvModal.hide('view-entity-modal')">
                    Delete
                </b-button>
            </template>
        </b-modal>
        <b-modal ref="selectedShraingModel" id="view-entity-sharing-modal" scrollable title="Sharing " ok-title="Delete"
                 @ok="removeSharing">
            <div>
                <div class="p-2">
                    <label class="form-input-label" for="form-input-entity-id">Entity ID</label>
                    <b-form-input id="form-input-entity-id" size="sm" v-model="selectedShEnId" disabled></b-form-input>
                </div>
                <div class="p-2">
                    <label class="form-input-label" for="form-input-permission-type-id">Permission Type ID</label>
                    <b-form-input id="form-input-permission-type-id" size="sm" v-model="selectedShPrId"
                                  disabled></b-form-input>
                </div>
                <div class="p-2">
                    <label class="form-input-label" for="form-input-owner-id">Group / User ID</label>
                    <b-form-input id="form-input-owner-id" size="sm" v-model="selectedShOwId" disabled></b-form-input>
                </div>
                <div class="p-2">
                    <label class="form-input-label" for="form-input-type">Group / User</label>
                    <b-form-input id="form-input-type" size="sm" v-model="selectedShOwType" disabled></b-form-input>
                </div>
            </div>
            <template v-slot:modal-footer>
                <b-button size="sm" class="mr-2" @click="$bvModal.hide('view-entity-sharing-modal')">
                    Cancel
                </b-button>
                <b-button size="sm" variant="danger" v-on:click="removeSharing"
                          @click="$bvModal.hide('view-entity-sharing-modal')">
                    Delete
                </b-button>
            </template>
        </b-modal>
        <b-modal ref="sharingModel" id="add-entity-sharing-modal" scrollable title="Share Entities">
            <div>
                <div class="p-2">
                    <label class="form-input-label" for="form-input-entity-id">Entity ID</label>
                    <b-form-select id="form-input-entity-id" size="sm" v-model="defaultEntityId">
                        <option v-for="(selectOption, indexOpt) in entities"
                                :key="indexOpt"
                                :value="selectOption"
                        >
                            {{ selectOption.id }}
                        </option>
                    </b-form-select>
                </div>
                <div class="p-2">
                    <label class="form-input-label" for="form-input-permission-type">Permission Type</label>
                    <b-form-select id="form-input-permission-type" size="sm" v-model="defaultPermissionType">
                        <option v-for="(selectOption, indexOpt) in permissionTypes"
                                :key="indexOpt"
                                :value="selectOption"
                        >
                            {{ selectOption.id }}
                        </option>
                    </b-form-select>
                </div>
                <div class="p-2">
                    <label class="form-input-label" for="form-input-sharing-type">Sharing Type</label>
                    <b-form-select id="form-input-sharing-type" size="sm" v-model="defaultSharingType">
                        <option v-for="(selectOption, indexOpt) in sharingTypeIds"
                                :key="indexOpt"
                                :value="selectOption"
                        >
                            {{ selectOption }}
                        </option>
                    </b-form-select>
                </div>
                <div v-if="defaultSharingType == 'USERS'" class="p-2">
                    <label class="form-input-label" for="form-input-user-id">User ID</label>
                    <b-form-select id="form-input-user-id" size="sm" v-model="defaultOwner">
                        <option v-for="(selectOption, indexOpt) in users"
                                :key="indexOpt"
                                :value="selectOption"
                        >
                            {{ selectOption }}
                        </option>
                    </b-form-select>
                </div>
                <div v-if="defaultSharingType == 'GROUPS'" class="p-2">
                    <label class="form-input-label" for="form-input-group-name">Group Name</label>
                    <b-form-select id="form-input-group-name" size="sm" v-model="defaultGroupName">
                        <option v-for="(selectOption, indexOpt) in groups"
                                :key="indexOpt"
                                :value="selectOption"
                        >
                            {{ selectOption.name }}
                        </option>
                    </b-form-select>
                </div>
            </div>
            <template v-slot:modal-footer>
                <b-button size="sm" class="mr-2" @click="$bvModal.hide('add-entity-sharing-modal')">
                    Cancel
                </b-button>
                <b-button size="sm" variant="primary" v-on:click="addNewSharing"
                          @click="$bvModal.hide('add-entity-sharing-modal')">
                    Add
                </b-button>
            </template>
        </b-modal>
        <b-modal ref="permissionChecker" id="evaluate-permission-modal" scrollable title="Check Permissions">
            <div>
                <div class="p-2">
                    <label class="form-input-label" for="form-input-entity-id">Entity ID</label>
                    <b-form-select id="form-input-entity-id" size="sm" v-model="defaultEntityId">
                        <option v-for="(selectOption, indexOpt) in entities"
                                :key="indexOpt"
                                :value="selectOption"
                        >
                            {{ selectOption.id }}
                        </option>
                    </b-form-select>
                </div>
                <div class="p-2">
                    <label class="form-input-label" for="form-input-user">User</label>
                    <b-form-select id="form-input-user" size="sm" v-model="defaultOwner">
                        <option v-for="(selectOption, indexOpt) in users"
                                :key="indexOpt"
                                :value="selectOption"
                        >
                            {{ selectOption }}
                        </option>
                    </b-form-select>
                </div>
                <div class="p-2">
                    <label class="form-input-label" for="form-input-permission">Permission</label>
                    <b-form-select id="form-input-permission" size="sm" v-model="defaultPermissionType">
                        <option v-for="(selectOption, indexOpt) in permissionTypes"
                                :key="indexOpt"
                                :value="selectOption"
                        >
                            {{ selectOption.id }}
                        </option>
                    </b-form-select>
                </div>
            </div>
            <template v-slot:modal-footer>
                <b-button size="sm" class="mr-2" @click="$bvModal.hide('evaluate-permission-modal')">
                    Cancel
                </b-button>
                <b-button size="sm" variant="primary" v-on:click="evaluatePermission"
                          :disabled="!defaultEntityId || !defaultOwner || !defaultPermissionType"
                          @click="$bvModal.hide('evaluate-permission-modal')">
                    Evaluate
                </b-button>
            </template>
        </b-modal>
        <b-modal ref="evalutionResultPopup" id="evaluate-permission-results-modal">
            <div v-if="this.evaluating">
                <b-spinner small type="grow"></b-spinner>
                Evaluating...
            </div>
            <div v-if="!this.evaluating">
                <div v-if="evalutionResult" class="groupform">
                    <p>User has permission.</p>
                </div>
                <div v-if="!evalutionResult" class="groupform">
                    <p>User does not have permission.</p>
                </div>
            </div>
            <template v-slot:modal-footer>
                <b-button size="sm" class="mr-2" @click="$bvModal.hide('evaluate-permission-results-modal')">
                    Cancel
                </b-button>
                <b-button variant="primary" size="sm" class="mr-2"
                          @click="$bvModal.hide('evaluate-permission-results-modal')">
                    Ok
                </b-button>
            </template>
        </b-modal>
    </div>
</template>

<script>
    import config from "@/config";

    export default {
        name: "Sharing",
        data: function () {
            return {
                isAdminUser: false,
                fields: ['id', 'name', 'description'],
                sharingFields: ['entity_id', 'permission_type_id', 'type', 'id'],
                entityFields: ['id', 'name', 'type', 'description'],
                permissionTypes: [],
                entityTypes: [],
                entities: [],

                sharings: [],
                users: [],
                groups: [],
                sharingTypeIds: ['USERS', 'GROUPS'],
                prId: null,
                prName: null,
                prDesc: null,
                enTyId: null,
                enTyName: null,
                enTyDesc: null,
                enId: null,
                enName: null,
                enDesc: null,
                defaultEntityId: null,
                defaultPermissionType: null,
                defaultOwner: null,
                selectedPrTyId: null,
                selectedPrTyName: null,
                selectedPrTyDesc: null,
                selectedEnTyId: null,
                selectedEnTyName: null,
                selectedEnTyDesc: null,
                selectedEnId: null,
                selectedEnName: null,
                selectedEnDesc: null,
                selectedPrType: null,
                selectedEnType: null,
                selectedEn: null,
                selectedSh: null,
                selectedShEnId: null,
                selectedShPrId: null,
                selectedShOwId: null,
                currentUserName: null,
                selectedEntityType: null,
                defaultSharingType: null,
                defaultGroup: null,
                selectedShOwType: null,
                evalutionResult: false,
                permissionTypesLoading: false,
                entityTypesLoading: false,
                entitiesLoading: false,
                sharingsLoading: false,
                evaluating: false,
                defaultGroupName: null,
                inputErrorPR: false,
                inputErrorEnTy: false,
                inputErrorEn: false,
                sharingError: false,


            }
        },

        methods: {
            async addPrType() {
                this.permissionTypesLoading = true
                if (this.prId == null || this.prName == null || this.prId == '' || this.prName == '') {
                    this.inputErrorPR = true
                    this.permissionTypesLoading = false
                }
                if (!this.inputErrorPR) {
                    let data = {
                        client_id: this.custosId,
                        client_sec: this.custosSec,
                        body: {
                            client_id: this.custosId,
                            permission_type: {
                                id: this.prId,
                                name: this.prName,
                                description: this.prDesc

                            }
                        }
                    }

                    this.permissionTypes = await this.$store.dispatch('sharing/createPermissionType', data)
                    this.permissionTypesLoading = false
                }
                this.prId = null
                this.prName = null
                this.prDesc = null

            },

            async deletePRType() {
                this.permissionTypesLoading = true
                let data = {
                    client_id: this.custosId,
                    client_sec: this.custosSec,
                    body: {
                        client_id: this.custosId,
                        permission_type: {
                            id: this.selectedPrTyId,
                            name: this.selectedPrTyName,
                            description: this.selectedPrTyDesc

                        }
                    }
                }

                this.permissionTypes = await this.$store.dispatch('sharing/deletePermissionType', data)
                this.permissionTypesLoading = false
                this.prId = null
                this.prName = null
                this.prDesc = null
            },
            async addNewEnType() {
                this.entityTypesLoading = true
                if (this.enTyId == null || this.enTyName == null || this.enTyName == '' || this.enTyId == '') {
                    this.inputErrorEnTy = true
                    this.entityTypesLoading = false
                }
                if (!this.inputErrorEnTy) {
                    let data = {
                        client_id: this.custosId,
                        client_sec: this.custosSec,
                        body: {
                            client_id: this.custosId,
                            entity_type: {
                                id: this.enTyId,
                                name: this.enTyName,
                                description: this.enTyDesc
                            }
                        }
                    }

                    this.entityTypes = await this.$store.dispatch('sharing/createEntityType', data)
                    this.entityTypesLoading = false

                }
                this.enTyId = null
                this.enTyName = null
                this.enTyDesc = null

            },

            async deleteEnType() {
                this.entityTypesLoading = true
                let data = {
                    client_id: this.custosId,
                    client_sec: this.custosSec,
                    body: {
                        client_id: this.custosId,
                        entity_type: {
                            id: this.selectedEnTyId,
                            name: this.selectedEnTyName,
                            description: this.selectedEnTyDesc

                        }
                    }
                }

                this.entityTypes = await this.$store.dispatch('sharing/deleteEntityType', data)
                this.entityTypesLoading = false
                this.prId = null
                this.prName = null
                this.prDesc = null
            },


            async addNewEntity() {
                this.entitiesLoading = true
                if (this.enName == null || this.enName == '') {
                    this.inputErrorEn = true
                    this.entitiesLoading = false
                }

                if (!this.inputErrorEn) {
                    this.enId = this.enName + "_" + this.makeid(15)
                    let data = {
                        client_id: this.custosId,
                        client_sec: this.custosSec,
                        body: {
                            client_id: this.custosId,
                            entity: {
                                id: this.enId,
                                name: this.enName,
                                description: this.enDesc,
                                type: this.selectedEntityType.id,
                                owner_id: this.currentUserName
                            }
                        }
                    }

                    this.entities = await this.$store.dispatch('sharing/createEntity', data)
                    this.entitiesLoading = false
                    this.sharings = await this.loadSharings()
                }
                this.enId = null
                this.enName = null
                this.enDesc = null
                this.selectedEntityType = null

            },

            async deleteEntity() {
                this.entitiesLoading = true
                let data = {
                    client_id: this.custosId,
                    client_sec: this.custosSec,
                    body: {
                        client_id: this.custosId,
                        entity: {
                            id: this.selectedEnId,
                            name: this.selectedEnName,
                            description: this.selectedEnDesc,
                            type: this.selectedEntityType.id,
                            owner_id: this.currentUserName
                        }
                    }
                }

                this.entities = await this.$store.dispatch('sharing/deleteEntity', data)
                this.entitiesLoading = false
                this.selectedEnId = null
                this.selectedEnName = null
                this.selectedEnDesc = null
                this.selectedEntityType = null
                this.sharings = await this.loadSharings()
            },

            async addNewSharing() {
                this.sharingsLoading = true

                if (this.defaultEntityId == null || this.defaultPermissionType == null
                    || (this.defaultGroupName == null && this.defaultOwner == null)) {
                    this.sharingError = true
                    this.sharingsLoading = false

                }

                if (!this.sharingError) {
                    let data = {
                        client_id: this.custosId,
                        client_sec: this.custosSec,
                        body: {

                            client_id: this.custosId,
                            entity: {
                                id: this.defaultEntityId.id
                            },
                            permission_type: {
                                id: this.defaultPermissionType.id
                            },
                            owner_id: [this.defaultOwner],
                            cascade: true

                        }
                    }

                    if (this.defaultSharingType === 'USERS') {
                        let response = await this.$store.dispatch('sharing/shareEntityWithUsers', data)

                        if (response) {
                            this.sharings = await this.loadSharings()
                        }
                    } else {

                        data.body.owner_id = [this.defaultGroupName.id]

                        let response = await this.$store.dispatch('sharing/shareEntityWithGroups', data)
                        if (response) {
                            this.sharings = await this.loadSharings()
                        }
                    }
                }
                this.sharingsLoading = false
            },

            async removeSharing() {
                this.sharingsLoading = true
                let data = {
                    client_id: this.custosId,
                    client_sec: this.custosSec,
                    body: {

                        client_id: this.custosId,
                        entity: {
                            id: this.selectedShEnId
                        },
                        permission_type: {
                            id: this.selectedShPrId
                        },
                        owner_id: [this.selectedShOwId],
                        cascade: true

                    }
                }

                if (this.selectedShOwType === 'USER') {
                    let response = await this.$store.dispatch('sharing/revokeEntitySharingFromUsers', data)
                    if (response) {
                        this.sharings = await this.loadSharings()
                    }
                } else {
                    let response = await this.$store.dispatch('sharing/revokeEntitySharingFromGroups', data)
                    if (response) {
                        this.sharings = await this.loadSharings()
                    }
                }
                this.sharingsLoading = false
            },

            onPrTySelected: function (items) {
                if (items != null && items.length > 0) {
                    this.selectedPrType = items
                    this.selectedPrTyId = this.selectedPrType[0].id
                    this.selectedPrTyName = this.selectedPrType[0].name
                    this.selectedPrTyDesc = this.selectedPrType[0].description
                    if (this.selectedPrTyId != "OWNER") {
                        this.$refs.selectedPrTyModel.show()
                    }
                }
            },

            onEnTySelected: function (items) {
                if (items != null && items.length > 0) {
                    this.selectedEnType = items
                    this.selectedEnTyId = this.selectedEnType[0].id
                    this.selectedEnTyName = this.selectedEnType[0].name
                    this.selectedEnTyDesc = this.selectedEnType[0].description
                    this.$refs.selectedEnTyModel.show()
                }
            },

            onEntitySelected: function (items) {
                if (items != null && items.length > 0) {
                    this.selectedEn = items
                    this.selectedEnId = this.selectedEn[0].id
                    this.selectedEnName = this.selectedEn[0].name
                    this.selectedEnDesc = this.selectedEn[0].description
                    this.selectedEntityType = this.selectedEn[0].type
                    if (this.selectedEn[0].owner_id === this.currentUserName) {
                        this.$refs.selectedEnModel.show()
                    }
                }
            },

            onSharingSelected: function (items) {
                if (items != null && items.length > 0) {
                    this.selectedSh = items
                    this.selectedShEnId = this.selectedSh[0].entity_id
                    this.selectedShPrId = this.selectedSh[0].permission_type_id
                    this.selectedShOwId = this.selectedSh[0].id
                    this.selectedShOwType = this.selectedSh[0].type
                    let show = false;
                    for (const entity of this.entities) {
                        if (entity.id === this.selectedShEnId && entity.owner_id === this.currentUserName) {
                            show = true;
                            break;
                        }
                    }
                    if (show) {
                        this.$refs.selectedShraingModel.show()
                    }
                }
            },
            onNewPrTyAdd: function () {
                this.$refs.prtypemodel.show()
            },
            onNewEnTyAdd: function () {
                this.$refs.entypemodel.show()
            },
            onNewEnAdd: function () {
                this.$refs.enModel.show()
            },
            onSharingAdd: function () {
                this.$refs.sharingModel.show()
            },

            checkPermissions: function () {
                this.$refs.permissionChecker.show()
            },

            async loadUsers() {
                let data = {offset: 0, limit: 50, client_id: this.custosId, client_sec: this.custosSec}
                let response = await this.$store.dispatch('user/users', data)

                let usrs = [];
                if (Array.isArray(response) && response.length > 0) {
                    response.forEach(obj => {
                        usrs.push(obj.username)
                    })
                }
                return usrs
            },

            async loadGroups() {
                let data = {
                    client_id: this.custosId,
                    client_sec: this.custosSec,
                    username: this.currentUserName
                }
                if (this.isAdminUser) {
                    return await this.$store.dispatch('group/loadAllGroups', data)
                } else {
                    let grs = []
                    grs = await this.$store.dispatch('group/getAllGroupsOfUser', data)
                    let groups = []
                    grs.forEach(gr => {
                        gr.ownerId = gr.owner_id
                        groups.push(gr)
                    })
                    return groups
                }

            },


            async evaluatePermission() {
                this.evaluating = true
                this.$refs.evalutionResultPopup.show()
                let data = {
                    client_id: this.custosId,
                    client_sec: this.custosSec,
                    params: {
                        client_id: this.custosId,
                        'entity.id': this.defaultEntityId.id,
                        'permission_type.id': this.defaultPermissionType.id,
                        owner_id: this.defaultOwner
                    }
                }
                let response = await this.$store.dispatch('sharing/userHasAccess', data)
                this.evalutionResult = response
                this.evaluating = false

            },

            async loadSharings() {
                let shars = []
                for (const en of this.entities) {
                    for (const pr of this.permissionTypes) {
                        let pars = {
                            client_id: this.custosId,
                            client_sec: this.custosSec,
                            params: {
                                'entity.id': en.id,
                                'permission_type.id': pr.id
                            }
                        }
                        let userIds = await this.$store.dispatch('sharing/getListOfSharedUsers', pars)

                        if (userIds != null && userIds.length > 0) {
                            userIds.forEach(uId => {
                                let shItem = {
                                    entity_id: en.id,
                                    permission_type_id: pr.id,
                                    id: uId,
                                    type: 'USER'
                                }
                                shars.push(shItem)
                            })
                        }

                        let groupIds = await this.$store.dispatch('sharing/getListOfSharedGroups', pars)

                        if (groupIds != null && groupIds.length > 0) {
                            groupIds.forEach(uId => {
                                let shItem = {
                                    entity_id: en.id,
                                    permission_type_id: pr.id,
                                    id: uId,
                                    type: 'GROUP'
                                }
                                shars.push(shItem)
                            })
                        }
                    }
                }
                return shars
            },
            async goToWorkspace() {
                await this.$router.push('/workspace')
            },

            makeid(length) {
                let result = '';
                let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                let charactersLength = characters.length;
                for (var i = 0; i < length; i++) {
                    result += characters.charAt(Math.floor(Math.random() * charactersLength));
                }
                return result;
            },

            async callDismissed() {
                this.inputErrorEn = false
                this.inputErrorEnTy = false
                this.inputErrorEn = false
                this.sharingError = false
            }

        },

        async mounted() {
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

            this.isAdminUser = await this.$store.dispatch('identity/isLoggedUserHasAdminAccess')
            this.currentUserName = await this.$store.dispatch('identity/getCurrentUserName')


            let permTypesData = {
                client_id: this.custosId,
                client_sec: this.custosSec
            }

            this.users = await this.loadUsers()
            this.groups = await this.loadGroups()

            this.permissionTypes = await this.$store.dispatch('sharing/getPermissionTypes', permTypesData)

            if (this.permissionTypes.length == 0) {
                let data = {
                    client_id: this.custosId,
                    client_sec: this.custosSec,
                    body: {
                        client_id: this.custosId,
                        permission_type: {
                            id: "OWNER",
                            name: "Owner",
                            description: "This is owner permission type"
                        }
                    }
                }

                this.permissionTypes = await this.$store.dispatch('sharing/createPermissionType', data)
            }

            this.entityTypes = await this.$store.dispatch('sharing/getEntityTypes', permTypesData)

            if (this.entityTypes.length > 0)
                for (const enTy of this.entityTypes) {
                    let searchEntitiesData = {
                        client_id: this.custosId,
                        client_sec: this.custosSec,
                        body: {
                            client_id: this.custosId,
                            owner_id: this.currentUserName,
                            search_criteria: [
                                {
                                    search_field: "ENTITY_TYPE_ID",
                                    value: enTy.id,
                                    condition: "EQUAL"
                                }
                            ]
                        }
                    }


                    let enties = await this.$store.dispatch('sharing/getEntities', searchEntitiesData)

                    if (enties != null && enties.length > 0) {
                        for (const en of enties) {
                            this.entities.push(en)
                        }

                    }

                }


            this.sharings = await this.loadSharings()
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