<template>
    <div>
        <div class="row">
            <div class="col">
                <h1 class="h4 mb-4 heading"> Tenant Wizard</h1>
            </div>
        </div>
        <b-form @submit="onSubmit">
            <div class="h-tabs card" align="left">
                <div class="h-tab">
                    <!--                    <div align="center" v-on:click="onClickHandler(1)" v-bind:class="[tabIndex===1 ? 'tab-content-active' : 'tab-content' ]">Requester Info</div>-->
                    <div align="center" v-on:click="onClickHandler(1)"
                         v-bind:class="[tabIndex===1 ? 'tab-content-active' : 'tab-content' ]">Gateway Admin details
                    </div>
                    <div align="center" v-on:click="onClickHandler(2)"
                         v-bind:class="[tabIndex===2 ? 'tab-content-active' : 'tab-content' ]">Gateway details
                    </div>
                    <div align="center" v-on:click="onClickHandler(3)"
                         v-bind:class="[tabIndex===3 ? 'tab-content-active' : 'tab-content' ]">Tenant Credentials
                    </div>
                </div>

                <div v-if="tabIndex === 1" class="content">
                    <b-form-group
                            :invalid-feedback="invalidFeedback"
                            :valid-feedback="validFeedback"
                            description=""
                            id="fieldset-1"
                            label="Admin Username"
                            label-for="admin-username"
                            class="inputLabels"
                    >
                        <b-form-input
                                :state="!$v.form.tab1.admin_username.$invalid"
                                id="admin-username"
                                name="admin-username"
                                trim
                                v-model="form.tab1.admin_username"
                                readonly>
                        </b-form-input>
                    </b-form-group>
                    <b-form-row>
                        <b-col>
                            <b-form-group
                                    :invalid-feedback="invalidFeedback"
                                    :valid-feedback="validFeedback"
                                    description=""
                                    id="fieldset-4"
                                    label="Admin First Name"
                                    label-for="admin-first-name"
                                    class="inputLabels"
                            >
                                <b-form-input
                                        :state="!$v.form.tab1.admin_first_name.$invalid"
                                        id="admin-first-name"
                                        name="admin-first-name"
                                        trim
                                        v-model="form.tab1.admin_first_name">
                                </b-form-input>
                            </b-form-group>
                        </b-col>
                        <b-col>
                            <b-form-group
                                    :invalid-feedback="invalidFeedback"
                                    :valid-feedback="validFeedback"
                                    description=""
                                    id="fieldset-5"
                                    label="Admin Last Name"
                                    label-for="admin-last-name"
                                    class="inputLabels"
                            >
                                <b-form-input
                                        :state="!$v.form.tab1.admin_last_name.$invalid"
                                        id="admin-last-name"
                                        name="admin-last-name"
                                        trim
                                        v-model="form.tab1.admin_last_name">
                                </b-form-input>
                            </b-form-group>
                        </b-col>
                    </b-form-row>

                    <b-form-group
                            :invalid-feedback="invalidFeedback"
                            :valid-feedback="validFeedback"
                            description=""
                            id="fieldset-6"
                            label="Admin Email"
                            label-for="admin-email"
                            class="inputLabels"
                    >
                        <b-form-input
                                :state="!$v.form.tab1.admin_email.$invalid"
                                id="admin-email"
                                name="admin-email"
                                trim
                                type="email"
                                v-model="form.tab1.admin_email"
                                readonly
                        >
                        </b-form-input>
                    </b-form-group>

                    <b-form-group
                            :invalid-feedback="invalidFeedback"
                            :valid-feedback="validFeedback"
                            description=""
                            id="fieldset-7"
                            label="Admin Password"
                            label-for="admin-password"
                            class="inputLabels"
                    >
                        <b-input :state="!$v.form.tab1.admin_password.$invalid"
                                 aria-describedby="password-help-block"
                                 id="admin-password"
                                 name="admin-password"
                                 trim
                                 type="password"
                                 v-model="form.tab1.admin_password"></b-input>
                        <b-form-text id="password-help-block">
                            Your password must be at least 8 characters long, and must contain letters and
                            numbers, and must at least one special character.
                        </b-form-text>
                    </b-form-group>
                    <b-form-group
                            :invalid-feedback="invalidFeedback"
                            :valid-feedback="validFeedback"
                            description=""
                            id="fieldset-8"
                            label="Confirm Admin Password"
                            label-for="confirm-admin-password"
                            class="inputLabels"
                    >
                        <b-input :state="!$v.form.tab1.confirm_admin_password.$invalid"
                                 aria-describedby="password-help-block"
                                 id="confirm-admin-password"
                                 name="confirm-admin-password"
                                 trim
                                 type="password"
                                 v-model="form.tab1.confirm_admin_password"></b-input>
                    </b-form-group>
                </div>
                <div v-if="tabIndex === 2" class="content">
                    <b-form-group
                            :invalid-feedback="invalidFeedback"
                            :valid-feedback="validFeedback"
                            id="fieldset-9"
                            description="The Client Name is displayed to end-users on the Identity Provider selection page."
                            label="Tenant Name"
                            label-for="client-name"
                            class="inputLabels"
                    >
                        <b-form-input
                                :state="!$v.form.tab2.client_name.$invalid"
                                id="client-name"
                                name="client-name"
                                trim
                                placeholder="Name of your OAuth 2.0 client"
                                v-model="form.tab2.client_name">
                        </b-form-input>
                    </b-form-group>
                    <div v-for="(redirect_uri, index) in form.tab2.redirect_uris" :key=index>
                        <b-form-row class="align-items-center">
                            <b-col>
                                <b-form-group
                                        :invalid-feedback="invalidFeedback"
                                        :valid-feedback="validFeedback"
                                        id="fieldset-10"
                                        description="Enter your callback URL. The redirect_uri parameter must exactly match a URL in this list"
                                        label="Redirect URI"
                                        label-for="redirect-uri"
                                        class="inputLabels"
                                >
                                    <b-input-group>
                                        <b-form-input
                                                :state="!$v.form.tab2.redirect_uris.$each[index].$invalid"
                                                id="redirect-uri"
                                                name='redirect-uri'
                                                trim
                                                type="url"
                                                v-model="form.tab2.redirect_uris[index]">
                                        </b-form-input>
                                        <b-input-group-append>
                                            <b-button v-if="index > 0" @click="deleteRedirectUri(index)">Delete URI
                                            </b-button>
                                            <b-button @click="addRedirectUri(index)">Add another URI</b-button>

                                        </b-input-group-append>
                                    </b-input-group>
                                </b-form-group>
                            </b-col>
                        </b-form-row>
                    </div>
                    <b-form-group label="Scope:" class="inputLabels">
                        <b-form-checkbox-group
                                :options="scopeOptions"
                                id="scope"
                                name="scope"
                                v-model="form.tab2.scope"
                        >
                            <b-link href="https://www.cilogon.org/oidc#h.p_PEQXL8QUjsQm">Information on scopes</b-link>
                        </b-form-checkbox-group>
                    </b-form-group>
                    <b-form-group
                            :invalid-feedback="invalidFeedback"
                            :valid-feedback="validFeedback"
                            description=""
                            id="fieldset-11"
                            label="Domain"
                            label-for="domain"
                            class="inputLabels"
                    >
                        <b-form-input
                                :state="!$v.form.tab2.domain.$invalid"
                                id="domain"
                                placeholder="idp.htrc.indiana.edu"
                                trim
                                v-model="form.tab2.domain">
                        </b-form-input>
                    </b-form-group>
                    <b-form-group
                            :invalid-feedback="invalidFeedback"
                            :valid-feedback="validFeedback"
                            description=""
                            id="fieldset-1"
                            label="Client URI"
                            label-for="client-uri"
                            class="inputLabels"
                    >
                        <b-form-input
                                :state="!$v.form.tab2.client_uri.$invalid"
                                id="client-uri"
                                trim
                                v-model="form.tab2.client_uri">
                        </b-form-input>
                    </b-form-group>
                    <b-form-group
                            :invalid-feedback="invalidFeedback"
                            :valid-feedback="validFeedback"
                            description=""
                            id="fieldset-12"
                            label="Logo URI"
                            label-for="logo-uri"
                            class="inputLabels"
                    >
                        <b-form-input
                                :state="!$v.form.tab2.logo_uri.$invalid"
                                id="logo-uri"
                                trim
                                type="url"
                                v-model="form.tab2.logo_uri">
                        </b-form-input>
                    </b-form-group>
                    <b-form-group
                            :invalid-feedback="invalidFeedback"
                            :valid-feedback="validFeedback"
                            description=""
                            id="fieldset-8"
                            label="Parent Tenant ID"
                            label-for="client-id"
                            class="inputLabels"
                            :disabled="!form.tab2.parentID"
                    >
                        <b-form-input
                                :state="!$v.form.tab2.parentID.$invalid"
                                id="parent-id"
                                name="parent-id"
                                trim
                                v-model="form.tab2.parentID"
                                :disabled="!form.tab2.parentID"
                                readonly
                        >
                        </b-form-input>
                    </b-form-group>
                    <b-form-group
                            :invalid-feedback="invalidFeedback"
                            :valid-feedback="validFeedback"
                            description=""
                            id="fieldset-8"
                            label="Parent Tenant Secret"
                            label-for="parent-secret"
                            class="inputLabels"
                    >
                        <b-form-input
                                :state="!$v.form.tab2.parentSecret.$invalid"
                                id="parent-secret"
                                name="parent-secret"
                                trim
                                v-model="form.tab2.parentSecret"
                                :disabled="!form.tab2.parentID"
                        >
                        </b-form-input>
                    </b-form-group>


                    <b-form-group
                            :invalid-feedback="invalidFeedback"
                            :valid-feedback="validFeedback"
                            id="fieldset-13"
                            label="Comment"
                            label-for="comment"
                            class="inputLabels"
                    >
                        <b-form-textarea
                                :state="!$v.form.tab2.comment.$invalid"
                                id="comment"
                                rows="3" textarea trim
                                placeholder="Provide description of the new tenant and any other comments here (at least 15 characters long) "
                                v-model="form.tab2.comment">
                        </b-form-textarea>
                    </b-form-group>
                    <b-form-group label="Application Type">
                        <b-form-radio-group
                                :options="application_typeOptions"
                                id="application-type"
                                name="application-type"
                                v-model="form.tab2.application_type"
                        ></b-form-radio-group>
                    </b-form-group>

                </div>
                <div v-if="tabIndex === 3" class="content">
                    <div v-if="(this.clientID === ''&& !this.requestingTenant)">
                        <div class="row">
                            <div class="col">
                                <h1 class="h4 mb-4">Please create a new tenant to view ClientID and Client Secret</h1>
                            </div>
                        </div>
                    </div>
                    <div v-if="(this.requestingTenant)">

                        <div v-if="this.requestingTenant" class="text-center">
                            <b-spinner variant="primary" style="width: 3rem; height: 3rem;"
                                       label="Large Spinner"></b-spinner>
                        </div>
                    </div>
                    <div v-if="(this.clientID !== ''&& !this.requestingTenant)">
                        <div class="row">
                            <div class="col">
                                <div class="card border-default">
                                    <div class="card-body">
                                        <table class="table">
                                            <tbody>
                                            <tr>
                                                <th scope="row">Tenant ID</th>
                                                <td>
                                                    <div> {{this.clientID}}</div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Tenant Secret</th>
                                                <td>
                                                    <div> {{this.clientSecret}}</div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Tenant Status</th>
                                                <td>
                                                    <div> {{this.status}}</div>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="text-center">
                    <b-button-group class="mt-2">
                        <b-button v-if="tabIndex > 1 && tabIndex <= 2" @click="tabIndex--" class="btnCustom">Previous
                        </b-button>
                        <b-button v-if="tabIndex == 1" @click="tabIndex++" class="btnCustom"
                                  :disabled="enableNextButton(this.tabIndex)">Next
                        </b-button>
                        <b-button v-if="tabIndex == 2" class="btnCustom"
                                  :disabled="enableNextButton(this.tabIndex)" type="submit">Create Tenant
                        </b-button>
                    </b-button-group>
                </div>
            </div>
        </b-form>
    </div>
</template>

<script>
    import {email, required, minLength} from "vuelidate/lib/validators";
    import config from "@/config";

    export default {
        props: {
            requesterEmail: String,
            tenantId: String
        },
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
        },
        data() {
            return {
                tabIndex: 1,
                isSubmitted: false,
                custosId: "",
                custosSec: "",
                currentUserName: "",
                user: "",
                requestingTenant: false,
                form: {
                    tab1: {
                        requester_email: "",
                        admin_username: "",
                        admin_first_name: "",
                        admin_last_name: "",
                        admin_email: "",
                        admin_password: "",
                        confirm_admin_password: "",
                    },
                    tab2: {
                        client_name: "",
                        redirect_uris: [""],
                        scope: "openid email profile org.cilogon.userinfo".split(" "),
                        domain: "",
                        client_uri: "",
                        logo_uri: "",
                        application_type: "web",
                        comment: "",
                        parentID: "",
                        parentSecret: "",
                    },
                    primary_contact: "",
                    secondary_contact: "",


                },
                scopeOptions: [
                    {text: "openId", value: "openid", disabled: "true"},
                    {text: "email", value: "email", disabled: "true"},
                    {text: "profile", value: "profile", disabled: "true"},
                    {text: "org.cilogon.userinfo", value: "org.cilogon.userinfo", disabled: "true"},
                ],
                application_typeOptions: [
                    {text: "web", value: "web"},
                ],
                clientID: 'testing-client',
                clientSecret: 'testing-secret',
                status:'REQUESTED'
            }
        },
        validations: {
            form: {
                tab1: {
                    requester_email: {email},
                    admin_username: {required},
                    admin_first_name: {required},
                    admin_last_name: {required},
                    admin_email: {required},
                    admin_password: {
                        required,
                        strongPassword(admin_password) {
                            return (
                                /[a-z]/.test(admin_password) && // checks for a-z
                                /[0-9]/.test(admin_password) && // checks for 0-9
                                /\W|_/.test(admin_password) && // checks for special char
                                admin_password.length >= 8
                            );
                        }
                    },
                    confirm_admin_password: {
                        required,
                        strongPassword(confirm_admin_password) {
                            return (
                                // /[a-z]/.test(admin_password) && // checks for a-z
                                // /[0-9]/.test(admin_password) && // checks for 0-9
                                // /\W|_/.test(admin_password) && // checks for special char
                                // admin_password.length >= 8
                                confirm_admin_password == this.form.tab1.admin_password
                            );
                        }
                    },
                },

                tab2: {
                    client_name: {required},
                    scope: {required},
                    domain: {
                        required,
                        validDomain(domain) {
                            return (
                                /^((?!-))(xn--)?[a-z0-9][a-z0-9-_]{0,61}[a-z0-9]{0,}\.?((xn--)?([a-z0-9\-.]{1,61}|[a-z0-9-]{1,30})\.?[a-z]{2,})$/.test(domain)
                            )
                        }
                    },
                    client_uri: {
                        required,
                        validURL(client_uri) {
                            return (
                                /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[\w]*))?)/.test(client_uri)
                            )
                        }

                    },
                    logo_uri: {
                        required,
                        validURL(logo_uri) {
                            return (
                                /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[\w]*))?)/.test(logo_uri)
                            )
                        }
                    },
                    application_type: {required},
                    redirect_uris: {
                        $each: {
                            required,
                            validURL(url) {
                                return (
                                    /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[\w]*))?)/.test(url)
                                )
                            }
                        }
                    },
                    comment: {required, minLength: minLength(15)},
                    parentID: {},
                    parentSecret: {
                        validate(parentSecret) {
                            if (this.form.tab2.parentID) {
                                return (
                                    parentSecret
                                )
                            } else {
                                return (
                                    true
                                )
                            }
                        }
                    }

                },
                primary_contact: {required},
                secondary_contact: {},


            }
        },
        methods: {
            isSubmitDisabled() {
                if (!this.isSubmitted)
                    return this.$v.form.$invalid;
                return this.isSubmitted;
            },
            linkClass(idx) {
                if (this.tabIndex === idx) {
                    return ['bg-primary', 'text-light']
                } else {
                    return ['bg-light', 'text-info']
                }
            },
            onClickHandler(step) {
                this.tabIndex = step;
            },
            async onSubmit(event) {
                event.preventDefault();
                this.isSubmitted = true;
                this.requestingTenant = true
                this.tabIndex++;

                if (!this.$v.form.tab1.$invalid && !this.$v.form.tab2.$invalid) {
                    let requester_email = this.$v.form.tab1.admin_email.$model;
                    let admin_username = this.$v.form.tab1.admin_username.$model;
                    let admin_first_name = this.$v.form.tab1.admin_first_name.$model;
                    let admin_last_name = this.$v.form.tab1.admin_last_name.$model;
                    let admin_email = this.$v.form.tab1.admin_email.$model;
                    let admin_password = this.$v.form.tab1.admin_password.$model;
                    let client_name = this.$v.form.tab2.client_name.$model;
                    let redirect_uris = this.$v.form.tab2.redirect_uris.$model;
                    let scope = this.$v.form.tab2.scope.$model;
                    let domain = this.$v.form.tab2.domain.$model;
                    let client_uri = this.$v.form.tab2.client_uri.$model;
                    let logo_uri = this.$v.form.tab2.logo_uri.$model;
                    let comment = this.$v.form.tab2.comment.$model;
                    let application_type = this.$v.form.tab2.application_type.$model;
                    console.log(application_type);
                    let scopeString = '';
                    for (var i = 0; i < scope.length; i++) {
                        scopeString += scope[i] + " "
                    }
                    scopeString = scopeString.trim()
                    let contacts = [];
                    contacts.push(requester_email);

                    let body = {
                        "client_name": client_name,
                        "requester_email": requester_email,
                        "admin_username": admin_username,
                        "admin_first_name": admin_first_name,
                        "admin_last_name": admin_last_name,
                        "admin_email": admin_email,
                        "contacts": contacts,
                        "redirect_uris": redirect_uris,
                        "scope": scopeString,
                        "domain": domain,
                        "admin_password": admin_password,
                        "client_uri": client_uri,
                        "logo_uri": logo_uri,
                        "application_type": application_type,
                        "comment": comment
                    }


                    if (this.$v.form.tab2.parentID.$model && this.$v.form.tab2.parentSecret.$model) {
                        let data = {
                            client_id: this.$v.form.tab2.parentID.$model,
                            client_sec: this.$v.form.tab2.parentSecret.$model,
                            body: body
                        }

                        let response = await this.$store.dispatch('tenant/createChildTenant', data)
                        this.clientID = response.client_id
                        this.clientSecret = response.client_secret
                        if (response.is_activated) {
                            this.status ="ACTIVE"
                        }


                    } else {
                        let data = {
                            body: body
                        }
                        let response = await this.$store.dispatch('tenant/createAdminTenant', data)
                        this.clientID = response.client_id
                        this.clientSecret = response.client_secret
                        if (response.is_activated) {
                            this.status ="ACTIVE"
                        }

                    }


                    this.requestingTenant = false
                }
            },
            addRedirectUri: function () {
                this.form.tab2.redirect_uris.push("");
            },
            deleteRedirectUri: function (index) {
                if (index > 0) {
                    this.form.tab2.redirect_uris.splice(index, 1);
                }
            },

            // eslint-disable-next-line no-unused-vars
            enableNextButton(taboption) {
                if (taboption == 1) {
                    return !!this.$v.form.tab1.$invalid
                }
                if (taboption == 2) {
                    return !!this.$v.form.tab2.$invalid
                }
            },

            async sleep(ms) {
                return new Promise(resolve => setTimeout(resolve, ms));
            }


        },

        async mounted() {
            this.custosId = config.value('clientId')
            this.custosSec = config.value('clientSec')
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
                        email: obj.email,
                        status: obj.state,
                        attributes: [],
                        roles: []
                    }
                    this.user = obj
                    this.form.tab1.admin_username = obj.username
                    this.form.tab1.admin_first_name = obj.first_name
                    this.form.tab1.admin_last_name = obj.last_name
                    this.form.tab1.admin_email = obj.email


                })
            }
            this.form.tab2.parentID = this.$props.tenantId
        }
    }
</script>

<style scoped>
    .btn:hover {
        color: white;
        background-color: #944203;
        padding: 10px 25px;
        border: 1px solid #944203;
        border-radius: 8px;
    }

    .btn:focus {
        color: white;
        background-color: #944203;
        padding: 10px 25px;
        border: 1px solid #944203;
        border-radius: 8px;
    }

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

    .content {
        margin-top: 20px;
        width: 1000px;
        margin-left: 35px;
    }

    .heading {
        font-size: 30px;
        color: black;
        font-weight: bold;
    }

    .card {
        padding: 25px;
    }

    .btnCustom {
        color: white;
        background-color: #ff6600;
        padding: 10px 25px;
        border: 1px solid #ff6600;
        border-radius: 8px;
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

    .inputLabels {
        color: black;
        font-weight: bold;
    }
</style>