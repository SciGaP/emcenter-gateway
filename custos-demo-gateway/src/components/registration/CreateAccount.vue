<template>
    <b-container>
        <b-row align-v="start" align-h="center">
            <b-col style="min-width: 300px; max-width: 100%" class="text-center">
                <h2>Welcome to Custos</h2>
                <p class="h2-sub">Sign up and start authenticating</p>
                <div class="main-links">
                    <b-link href="http://airavata.apache.org/custos/" target="_blank">Custos Website</b-link>
<!--                    <b-link class="ml-5"-->
<!--                            href="https://cwiki.apache.org/confluence/display/CUSTOS/Gateways+2020%3ACustos+Tutorial" target="_blank">-->
<!--                        Tutorial Instructions-->
<!--                    </b-link>-->
                </div>
                <img class="w-100" src="./../../assets/custos_home.png">
            </b-col>
            <b-col style="max-width: 600px;min-width: 300px;" align-h="center">
                <b-card class="w-100 login-card">
                    <form v-on:submit.prevent="registerUser" class="p-2 text-left">
                        <h3 class="mb-3">Create Account</h3>
                        <div class="p-2">
                            <label class="form-input-label" for="form-input-username">Username</label>
                            <b-form-input size="sm" id="form-input-username" v-model="username"
                                          :state="usernameValid && usernameIsAvailable"
                                          placeholder="Username"></b-form-input>
                            <b-form-invalid-feedback v-if="!usernameValid">
                                Username should only have lowercase letters and numbers.
                            </b-form-invalid-feedback>
                            <b-form-invalid-feedback v-else-if="!usernameIsAvailable">
                                Username is not available.
                            </b-form-invalid-feedback>
                        </div>
                        <div class="p-2">
                            <label class="form-input-label" for="form-input-password">Password</label>
                            <b-form-input size="sm" id="form-input-password" type="password" v-model="password"
                                          :state="passwordValid" placeholder="Password"></b-form-input>
                            <b-form-invalid-feedback>
                                Password should contain at least one upper case,
                                lower case, one number, and 4 - 10 characters.
                            </b-form-invalid-feedback>
                        </div>
                        <div class="p-2">
                            <label class="form-input-label" for="form-input-confirm-password">Confirm Password</label>
                            <b-form-input size="sm" id="form-input-confirm-password" type="password"
                                          v-model="confirmedPassword" :state="confirmedPasswordValid"
                                          placeholder="Confirm Password"></b-form-input>
                            <b-form-invalid-feedback>
                                Password doesn't match.
                            </b-form-invalid-feedback>
                        </div>
                        <div class="p-2">
                            <label class="form-input-label" for="form-input-email">Email</label>
                            <b-form-input size="sm" id="form-input-email" v-model="email" :state="emailValid"
                                          placeholder="Email"></b-form-input>
                            <b-form-invalid-feedback>Invalid email.</b-form-invalid-feedback>
                        </div>

                        <div class="p-2">
                            <label class="form-input-label" for="form-input-first-name">First Name</label>
                            <b-form-input size="sm" id="form-input-first-name" v-model="firstName"
                                          :state="firstNameValid"
                                          placeholder="First Name"></b-form-input>
                            <b-form-invalid-feedback>Invalid name.</b-form-invalid-feedback>
                        </div>

                        <div class="p-2">
                            <label class="form-input-label" for="form-input-last-name">Last Name</label>
                            <b-form-input size="sm" id="form-input-last-name" v-model="lastName" :state="lastnameValid"
                                          placeholder="Last Name"></b-form-input>
                            <b-form-invalid-feedback>Invalid name.</b-form-invalid-feedback>
                        </div>

                        <b-button class="primary-btn w-100 text-center mt-3" type="submit" variant="warning"
                                  v-on:click="registerUser" :disabled="isButtonDisabled">
                            Sign Up
                            <b-spinner small v-if="isButtonDisabled"></b-spinner>
                        </b-button>
                        <p class="mt-3 w-100 additional-links text-center">
                            Already have an account ?
                            <router-link to="/">Login</router-link>
                        </p>
                    </form>
                </b-card>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
    import config from "@/config";
    import store from "@/store";

    export default {
        name: "CreateAccount",
        data: function () {
            return {
                username: "",
                password: "",
                confirmedPassword: "",
                email: "",
                firstName: "",
                lastName: "",
                custosId: null,
                custosSec: null,
                isButtonDisabled: false,
                usernameIsAvailable: null,
                usernameValid: null,
                passwordValid: null,
                confirmedPasswordValid: null,
                emailValid: null,
                firstNameValid: null,
                lastnameValid: null
            }
        },


        methods: {

            async registerUser() {
                this.isButtonDisabled = true
                let regex = /[a-z0-9].*$/;
                let regexPucn = /[~!" "@#$%^&*()+=;"'<>,.]/
                let passwordRegex = /^.*(?=.{4,10})(?=.*\d)(?=.*[a-zA-Z]).*$/
                let uppercase = /[A-Z].*$/
                // eslint-disable-next-line no-useless-escape
                let emailRegs = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i


                let par = {
                    'client_id': this.custosId,
                    'client_sec': this.custosSec,
                    'username': this.username,
                }

                if (this.username == null || regex.test(this.username) == false || regexPucn.test(this.username) ||
                    uppercase.test(this.username)) {
                    this.usernameValid = false
                } else {
                    this.usernameValid = true
                    try {
                        let usernameIsAvailable = await this.$store.dispatch('user/checkUsernameIsValid', par)
                        if (!usernameIsAvailable) {
                            this.usernameIsAvailable = false
                        } else {
                            this.usernameIsAvailable = true
                        }
                    } catch (e) {
                        this.usernameIsAvailable = false
                    }
                }


                if (this.password == null || !passwordRegex.test(this.password)) {
                    this.passwordValid = false
                } else {
                    this.passwordValid = true
                }


                if (this.password !== this.confirmedPassword) {
                    this.confirmedPasswordValid = false
                } else {
                    this.confirmedPasswordValid = true
                }

                if (this.email == null || !emailRegs.test(this.email)) {
                    this.emailValid = false
                } else {
                    this.emailValid = true
                }

                if (this.firstName == null || this.firstName == '' || this.firstName.length > 20) {
                    this.firstNameValid = false
                } else {
                    this.firstNameValid = true
                }

                if (this.lastName == null || this.lastName == '' || this.lastName.length > 20) {
                    this.lastnameValid = false
                } else {
                    this.lastnameValid = true
                }


                let body = {
                    'client_id': this.custosId,
                    'client_sec': this.custosSec,
                    'username': this.username,
                    'first_name': this.firstName,
                    'last_name': this.lastName,
                    'password': this.password,
                    'temporary_password': false,
                    'email': this.email
                }

                if (this.usernameIsAvailable && this.usernameValid && this.passwordValid && this.confirmedPasswordValid && this.lastnameValid && this.firstNameValid && this.emailValid) {
                    let status = await this.$store.dispatch('user/registerUser', body)
                    if (status) {
                        await this.$router.push("/")
                    }
                }

                this.isButtonDisabled = false
            },

            async callDismissed() {
                this.usernameIsAvailable = true
                this.usernameValid = true
                this.passwordValid = true
                this.emailValid = true
                this.firstNameValid = true
                this.lastnameValid = true
                this.isButtonDisabled = false
            },


        },

        async mounted() {
            this.custosId = config.value('clientId')
            this.custosSec = config.value('clientSec')
            let data = {
                client_id: this.custosId,
                client_sec: this.custosSec
            }
            if (await store.dispatch('identity/isAuthenticated', data) == true) {

                await this.$router.push('workspace')
            }
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