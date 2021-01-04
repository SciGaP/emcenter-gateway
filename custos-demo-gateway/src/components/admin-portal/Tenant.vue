<template>
    <div>
        <div class="row">
            <div class="col">
                <h1 class="h4 mb-4 heading">{{this.$props.tenantRequest.client_name}} Details</h1>
            </div>
        </div>
        <div align="left">
            <b-form @submit="onSubmit" class="card" align="left">
                <b-form-group
                        id="fieldset-1"
                        description=""
                        label="Client Name"
                        label-for="input-1"
                        :invalid-feedback="invalidFeedback"
                        :valid-feedback="validFeedback"
                        class="inputLabels"

                >
                    <b-form-input
                            id="input-1"
                            v-model="form.client_name"
                            :state="!$v.form.client_name.$invalid"
                            disabled
                            trim>
                    </b-form-input>
                </b-form-group>
                <b-form-group
                        id="fieldset-1"
                        description=""
                        label="Requester Email"
                        label-for="input-1"
                        :invalid-feedback="invalidFeedback"
                        :valid-feedback="validFeedback"
                        class="inputLabels"
                >
                    <b-form-input
                            id="input-1"
                            v-model="form.requester_email"
                            :state="!$v.form.requester_email.$invalid"
                            disabled
                            trim>
                    </b-form-input>
                </b-form-group>

                <b-form-group
                        id="fieldset-1"
                        description=""
                        label="Admin Username"
                        label-for="input-1"
                        :invalid-feedback="invalidFeedback"
                        :valid-feedback="validFeedback"
                        class="inputLabels"
                >
                    <b-form-input
                            id="input-1"
                            v-model="form.admin_username"
                            :state="!$v.form.admin_username.$invalid"
                            disabled
                            trim>
                    </b-form-input>
                </b-form-group>
                <b-form-row>
                    <b-col>
                        <b-form-group
                                id="fieldset-1"
                                description=""
                                label="Admin First Name"
                                label-for="input-1"
                                :invalid-feedback="invalidFeedback"
                                :valid-feedback="validFeedback"
                                class="inputLabels"
                        >
                            <b-form-input
                                    id="input-1"
                                    v-model="form.admin_first_name"
                                    :state="!$v.form.admin_first_name.$invalid"
                                    disabled
                                    trim>
                            </b-form-input>
                        </b-form-group>
                    </b-col>
                    <b-col>
                        <b-form-group
                                id="fieldset-1"
                                description=""
                                label="Admin Last Name"
                                label-for="input-1"
                                :invalid-feedback="invalidFeedback"
                                :valid-feedback="validFeedback"
                                class="inputLabels"
                        >
                            <b-form-input
                                    id="input-1"
                                    v-model="form.admin_last_name"
                                    :state="!$v.form.admin_last_name.$invalid"
                                    disabled
                                    trim>
                            </b-form-input>
                        </b-form-group>
                    </b-col>
                </b-form-row>

                <b-form-group
                        id="fieldset-1"
                        description=""
                        label="Admin Email"
                        label-for="input-1"
                        :invalid-feedback="invalidFeedback"
                        :valid-feedback="validFeedback"
                        class="inputLabels"
                >
                    <b-form-input
                            id="input-1"
                            v-model="form.admin_email"
                            :state="!$v.form.admin_email.$invalid"
                            disabled
                            trim>
                    </b-form-input>
                </b-form-group>
                <div v-for="(redirect_uri, index) in this.tenantRequest.redirect_uris" :key="index">
                    <b-form-row class="align-items-center">
                        <b-col>
                            <b-form-group
                                    id="fieldset-1"
                                    description=""
                                    label="Redirect URI"
                                    label-for="input-1"
                                    :invalid-feedback="invalidFeedback"
                                    :valid-feedback="validFeedback"
                                    class="inputLabels"
                            >
                                <b-input-group>
                                    <b-form-input
                                            id="input-1"
                                            v-model="form.redirect_uris[index]"
                                            :state="!$v.form.redirect_uris.$each[index].$invalid"
                                            trim>
                                    </b-form-input>
                                    <b-input-group-append>
                                        <b-button @click="deleteRedirectUri(index)">Delete URI</b-button>
                                        <b-button @click="addRedirectUri(index)">Add another URI</b-button>

                                    </b-input-group-append>
                                </b-input-group>
                            </b-form-group>
                        </b-col>
                    </b-form-row>
                </div>
                <b-form-group label="Scope:" class="inputLabels">
                    <b-form-checkbox-group
                            id="checkbox-group-1"
                            v-model="form.scope"
                            :options="scopeOptions"
                            name="flavour-1"
                            disabled
                    ></b-form-checkbox-group>
                </b-form-group>
                <b-form-group
                        id="fieldset-1"
                        description=""
                        label="Domain"
                        label-for="input-1"
                        :invalid-feedback="invalidFeedback"
                        :valid-feedback="validFeedback"
                        class="inputLabels"
                >
                    <b-form-input
                            id="input-1"
                            v-model="form.domain"
                            :state="!$v.form.domain.$invalid"
                            trim>
                    </b-form-input>
                </b-form-group>
                <b-form-group
                        id="fieldset-1"
                        description=""
                        label="Client URI"
                        label-for="input-1"
                        :invalid-feedback="invalidFeedback"
                        :valid-feedback="validFeedback"
                        class="inputLabels"
                >
                    <b-form-input
                            id="input-1"
                            v-model="form.client_uri"
                            :state="!$v.form.client_uri.$invalid"
                            trim>
                    </b-form-input>
                </b-form-group>
                <b-form-group
                        id="fieldset-1"
                        description=""
                        label="Logo URI"
                        label-for="input-1"
                        :invalid-feedback="invalidFeedback"
                        :valid-feedback="validFeedback"
                        class="inputLabels"
                >
                    <b-form-input
                            id="input-1"
                            v-model="form.logo_uri"
                            :state="!$v.form.logo_uri.$invalid"
                            trim>
                    </b-form-input>
                </b-form-group>
                <b-form-group
                        id="fieldset-1"
                        description="(At least 15 characters long) Provide description of the new tenant and any other comments here."
                        label="Comment"
                        label-for="input-1"
                        :invalid-feedback="invalidFeedback"
                        :valid-feedback="validFeedback"
                        class="inputLabels"
                >
                    <b-form-textarea
                            rows="3"
                            textarea
                            id="input-1"
                            v-model="form.comment"
                            :state="!$v.form.comment.$invalid"
                            trim>
                    </b-form-textarea>
                </b-form-group>
                <b-form-group label="Application Type" class="inputLabels">
                    <b-form-radio-group
                            id="radio-group-1"
                            v-model="form.application_type"
                            :options="application_typeOptions"
                            name="radio-options"
                            disabled
                    ></b-form-radio-group>
                </b-form-group>
                <div>
                    <div class="text-center" v-if="operating">
                        <b-spinner variant="primary" label="Text Centered"></b-spinner>
                    </div>
                    <b-button
                            v-b-modal.modal-1
                            v-on:click="handleClose"
                            variant="primary"
                            class="btnClose">
                        Close
                    </b-button>
                    <b-button v-if="isUpdateDisable"
                              v-b-modal.modal-1
                              type="submit"
                              variant="primary"
                              class="btnUpdate">
                        Update
                    </b-button>
                    <b-button v-if="isActivatable"
                              v-b-modal.modal-1
                              v-on:click="activate"
                              variant="primary"
                              class="btnActivate">
                        Activate
                    </b-button>
                    <b-button v-if="isDeActivatable"
                              v-b-modal.modal-1
                              v-on:click="deactivate"
                              variant="primary"
                              class="btnDeActivate">
                        DeActivate
                    </b-button>
                </div>
            </b-form>
        </div>
    </div>
</template>

<script>
    import {email, required, minLength} from "vuelidate/lib/validators";
    import config from "@/config";
    // import urls from "./utils/urls";
    // import axios from 'axios';
    // // import {CLIENT_ID, CLIENT_SECRET} from '../config/config';
    //
    // let CLIENT_ID, CLIENT_SECRET
    export default {
        computed: {
            state() {
                return this.name.length >= 4 ? true : false
            },
            invalidFeedback() {
                return ''
            },
            validFeedback() {
                return ''
            },
            isUpdateDisable() {
                if (!this.isUpdateClicked)
                    return !this.$v.form.$invalid
                return this.isUpdateClicked;
            },

        },
        props: {
            tenantRequest: Object

        },
        data() {
            return {
                isUpdateClicked: false,
                isActivatable: false,
                isDeActivatable: false,
                operating: false,
                custosId: null,
                custosSec: null,
                form: {
                    admin_email: '',
                    admin_first_name: '',
                    admin_last_name: '',
                    admin_username: '',
                    application_type: '',
                    client_id: '',
                    client_name: '',
                    client_uri: '',
                    comment: '',
                    domain: '',
                    logo_uri: '',
                    redirect_uris: '',
                    requester_email: '',
                    scope: '',
                    tenant_id: '',
                    tenant_status: ''
                },
                scopeOptions: [
                    {text: "openId", value: "openid"},
                    {text: "email", value: "email"},
                    {text: "profile", value: "profile"},
                    {text: "org.cilogon.userinfo", value: "org.cilogon.userinfo"},
                ],
                application_typeOptions: [
                    {text: "web", value: "web"}
                ]
            }
        },
        validations: {
            form: {
                client_name: {required},
                requester_email: {required, email},
                admin_username: {required},
                admin_first_name: {required},
                admin_last_name: {required},
                admin_email: {required},
                scope: {required},
                domain: {
                    required,
                    validDomain(domain) {
                        return (
                            /^((?!-))(xn--)?[a-z0-9][a-z0-9-_]{0,61}[a-z0-9]{0,}\.?((xn--)?([a-z0-9\-.]{1,61}|[a-z0-9-]{1,30})\.?[a-z]{2,})$/.test(domain)
                        )
                    }
                },
                client_uri: {required},
                logo_uri: {},
                application_type: {required},
                redirect_uris: {
                    $each: {
                        required
                    }
                },
                comment: {required, minLength: minLength(15)}
            }
        },
        methods: {
            async onSubmit(event) {
                this.operating = true;
                event.preventDefault();
                this.isUpdateClicked = true;

                let contacts = [];

                contacts.push(this.$v.form.$model.admin_email)

                let body = {
                    "admin_email": this.$v.form.$model.admin_email,
                    "admin_first_name": this.$v.form.$model.admin_first_name,
                    "admin_last_name": this.$v.form.$model.admin_last_name,
                    "admin_username": this.$v.form.$model.admin_username,
                    "application_type": this.$v.form.$model.application_type,
                    "client_id": this.$v.form.$model.client_id,
                    "client_name": this.$v.form.$model.client_name,
                    "client_uri": this.$v.form.$model.client_uri,
                    "comment": this.$v.form.$model.comment,
                    "contacts": contacts,
                    "domain": this.$v.form.$model.domain,
                    "logo_uri": this.$v.form.$model.logo_uri,
                    "redirect_uris": [...this.$v.form.$model.redirect_uris],
                    "requester_email": this.$v.form.$model.requester_email,
                    "tenant_status":this.$props.tenantRequest.tenant_status,
                    "scope": this.$v.form.$model.scope.join(' ')
                }

                let accessToken = await this.$store.getters['identity/getAccessToken']
                let data = {
                    usertoken:accessToken,
                    body: body
                }

                await this.$store.dispatch('tenant/updateTenant', data)

                this.$emit('reloadParent')
            },
            addRedirectUri: function () {
                this.form.redirect_uris.push("");
            },
            deleteRedirectUri: function (index) {
                this.form.redirect_uris.splice(index, 1);
            },
            async handleClose() {
                this.$emit('reloadParent')
            },
            async sleep(ms) {
                return new Promise(resolve => setTimeout(resolve, ms));
            },

            async activate() {
                this.operating = true;
                let accessToken = await this.$store.getters['identity/getAccessToken']
                let data = {
                    updating_status: "ACTIVE",
                    updating_client_id: this.$props.tenantRequest.client_id,
                    user_token: accessToken
                }

                await this.$store.dispatch('tenant/updateTenantStatus', data)
                this.operating = false;
                this.$emit('reloadParent')

            },

            async deactivate() {
                this.operating = true;
                let accessToken = await this.$store.getters['identity/getAccessToken']
                let data = {
                    updating_status: "DEACTIVATED",
                    updating_client_id: this.$props.tenantRequest.client_id,
                    user_token: accessToken
                }

                await this.$store.dispatch('tenant/updateTenantStatus', data)
                this.operating = false;
                this.$emit('reloadParent')
            }

        },
        created() {
            setTimeout(() => {
                this.tenantRequest.scope = this.tenantRequest.scope.split(" ")
                if (this.isAdminUser) {
                    if (this.tenantRequest.tenant_status === 'ACTIVE') {
                        this.isDeActivatable = true
                    } else if (this.tenantRequest.tenant_status === 'REQUESTED') {
                        this.isDeActivatable = true
                        this.isActivatable = true
                    }else if (this.tenantRequest.tenant_status === 'DEACTIVATED') {
                        this.isActivatable = true
                    }
                }
                this.form = Object.assign(this.form, {...this.tenantRequest});
            }, 1000);
        },

        async beforeMount() {
            this.custosId = config.value('clientId')
            this.custosSec = config.value('clientSec')
            this.isAdminUser = await this.$store.dispatch('identity/isLoggedUserHasAdminAccess')
        }

    }
</script>
<style scoped>
    .btnUpdate {
        color: white;
        background-color: #ff6600;
        padding: 10px 25px;
        border: 1px solid #ff6600;
        border-radius: 8px;
        margin-left: 1%;
    }

    .btnClose {
        color: white;
        background-color: #afafae;
        padding: 10px 25px;
        border: 1px solid #afafae;
        border-radius: 8px;
    }

    .btnActivate {
        color: white;
        background-color: blue;
        padding: 10px 25px;
        border: 1px solid blue;
        border-radius: 8px;
        margin-left: 1%;
    }

    .btnDeActivate {
        color: white;
        background-color: red;
        padding: 10px 25px;
        border: 1px solid red;
        border-radius: 8px;
        margin-left: 1%;
    }

    .btnUpdate:hover {
        color: white;
        background-color: #944203;
        padding: 10px 25px;
        border: 1px solid #944203;
        border-radius: 8px;
    }

    .btnUpdate:focus {
        color: white;
        background-color: #944203;
        padding: 10px 25px;
        border: 1px solid #944203;
        border-radius: 8px;
    }

    .inputLabels {
        color: black;
        font-weight: bold;
    }

    .inputText {
        width: 300px;
        border: 1px solid black;
        margin-bottom: 15px;
    }

    .heading {
        font-size: 30px;
        color: black;
        font-weight: bold;
    }

    .card {
        padding: 25px;
        width: 70%;
    }

    .content {
        margin-top: 20px;
        width: 1000px;
        margin-left: 35px;
    }
</style>