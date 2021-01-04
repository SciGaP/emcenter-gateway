<template>
    <b-container>
        <b-row align-v="start" align-h="center">
            <b-col style="min-width: 300px; max-width: 100%" class="text-center">
                <h2>Welcome to {{this.$props.tenantName}}</h2>
                <p class="h2-sub">Tenant Explorer</p>
                <div class="main-links">
                </div>
                <img class="w-100" src="./../../assets/custos_home.png">
            </b-col>
            <b-col style="max-width: 600px;min-width: 300px;" align-h="center">
                <b-card class="w-100 mt-3 login-card">
                    <form v-on:submit.prevent="this.login" class="p-2">
                        <h3 class="mb-3">Login with Tenant Admin Account</h3>
                        <div class="p-2">
                            <label class="form-input-label" for="form-input-username">Tenant Id</label>
                            <b-form-input id="form-input-username" v-model="this.$props.tenantId"
                                          disabled></b-form-input>
                        </div>
                        <div class="p-2">
                            <label class="form-input-label" for="form-input-password">Tenant Secret</label>
                            <b-form-input id="form-input-password" type="password" v-model="tenantSecret"
                                          placeholder="Tenant Secret"></b-form-input>
                        </div>
                        <div class="p-2">
                            <label class="form-input-label" for="form-input-username">Username</label>
                            <b-form-input id="form-input-username" v-model="username"
                                          placeholder="Admin Username"></b-form-input>
                        </div>
                        <div class="p-2">
                            <label class="form-input-label" for="form-input-password">Password</label>
                            <b-form-input id="form-input-password" type="password" v-model="password"
                                          placeholder="Admin Password"></b-form-input>
                        </div>
                        <b-button class="primary-btn w-100 text-center mt-3" type="submit" variant="warning"
                                  v-on:click="this.login" :disabled="this.loginDisabled">
                            Login
                            <b-spinner small v-if="this.loginDisabled"></b-spinner>
                        </b-button>
                        <div v-if="this.loginError" class="text-danger w-100 mt-4 text-left form-error-message">
                            Invalid TenantSecret, Username or Password
                        </div>

                    </form>
                </b-card>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>

    import config from "@/config";
    // import store from "@/store";

    export default {
        name: 'Landing',
        props: {
            msg: String,
            seen: Boolean,
            todos: Array,
            tenantName: String,
            tenantId: String
        },
        data: function () {
            return {
                username: "",
                password: "",
                loginDisabled: false,
                redirectURI: null,
                loginError: false,
                tenantSecret: null
            }
        },
        methods: {
            async login() {
                this.loginDisabled = true
                if (this.username != null && this.username != '' && this.tenantSecret != null &&
                    this.tenantSecret != '' && this.password != null && this.password != '') {
                    let accessToken = await this.$store.getters['identity/getAccessToken']
                    let validationData = {
                        usertoken:accessToken,
                        body: {
                            clientId: this.$props.tenantId,
                            clientSec: this.tenantSecret
                        }
                    }
                    let resp = await this.$store.dispatch('tenant/validateTenant', validationData)
                    if (resp) {
                        let params = {
                            client_id: this.$props.tenantId, client_sec: this.tenantSecret, username: this.username,
                            password: this.password, token_endpoint: this.tokenEndpoint
                        };
                        let data = {
                            client_id: this.$props.tenantId,
                            client_sec: this.tenantSecret
                        }
                       let tokenResp =  await this.$store.dispatch('identity/authenticateTenantAdmin', params)
                        if (tokenResp) {
                            let resp = await this.$store.dispatch('identity/isAuthenticated', data)
                            console.log(resp)
                            if (resp) {

                                let data = {
                                    offset: 0, limit: 1, client_id: this.$props.tenantId, client_sec: this.tenantSecret,
                                    username: this.username
                                }
                                let resp = await this.$store.dispatch('user/users', data)
                                if (Array.isArray(resp) && resp.length > 0) {
                                    resp.forEach(user => {
                                        let data = {
                                            client_id: this.$props.tenantId,
                                            client_sec: this.tenantSecret,
                                            body: {
                                                username: user.username,
                                                first_name: user.first_name,
                                                last_name: user.last_name,
                                                email: user.email,
                                            }
                                        }
                                        this.$store.dispatch('user/updateUserProfile', data)

                                    })
                                }

                                let str = '/tenant/' + this.$props.tenantId + '/workspace'

                                await this.$router.push(str)

                            } else {
                                this.loginError = true
                            }
                        }else {
                            this.loginError = true
                        }

                    } else {
                        this.loginError = true
                    }

                } else {
                    this.loginError = true
                }
                this.loginDisabled = false
            },
            async callDismissed() {
                this.loginError = false
            }
        },
        async mounted() {
            this.redirectURI = config.value('redirectURI')
            this.tokenEndpoint = "https://custos.scigap.org/apiserver/identity-management/v1.0.0/token"
        }
    }
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h2 {
        font-family: Avenir;
        font-size: 35px;
        font-weight: 900;
        color: #203a43;
    }

    .h2-sub {
        font-family: Avenir-Roman;
        font-size: 22px;
        color: #203a43;
    }

    h3 {
        font-family: Avenir;
        font-size: 15px;
        font-weight: 600;
        text-align: center;
        color: #203a43;
    }

    .h3-sub {
        font-family: Avenir-Roman;
        font-size: 20px;
        text-align: left;
        color: #203a43;
    }

    .form-input-label {
        font-family: Avenir;
        font-weight: 900;
        text-align: left;
        float: left;
        color: #203a43;
    }

    .primary-btn {
        background-color: #ea6a0a;

        font-family: Avenir;
        font-size: 14px;
        font-weight: 900;
        text-align: left;
        color: #ffffff;
    }

    .primary-btn:hover {
        background-color: #da640b;
    }

    .form-error-message {
        font-family: Avenir;
        font-size: 14px;
        font-weight: 900;
        text-align: left;
    }

    .login-card {
        box-shadow: -1px 1px 6px 2px #ebebeb;
        border-radius: 10px;
        border: none;
    }

    .login-card .form-input-label {
        font-weight: 500;
        font-size: 15px;
    }

    .main-links a {
        font-family: Avenir;
        font-size: 20px;
        font-weight: 600;
        color: #ea6a0a;
    }

    .additional-links {
        font-size: 13px;
    }

    .additional-links a {
        color: #ea6a0a;
    }
</style>
