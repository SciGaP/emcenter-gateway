<template>
    <p></p>
</template>

<script>

    import config from "@/config";

    export default {
        name: "Callback",
        data: function () {
            return {
                username: "",
                password: "",
                custosId: null,
                custosSec: null,
                redirectURI: null,
                tokenEndpoint: null
            }
        },

        methods: {
            async authenticate() {
                let code = this.$route.query.code
                let params = {
                    client_id: this.custosId, client_sec: this.custosSec, code: code,
                    redirect_uri: this.redirectURI, token_endpoint: this.tokenEndpoint
                };
                await this.$store.dispatch('identity/authenticateUsingCode', params)

            }
        },

        computed: {
            isAuthenticated: function () {
                let data = {
                    client_id: this.custosId,
                    client_sec: this.custosSec
                }
                return this.$store.dispatch('identity/isAuthenticated', data)
            }
        },

        async mounted() {
            this.custosId = config.value('clientId')
            this.custosSec = config.value('clientSec')
            this.redirectURI = config.value('redirectURI')
            this.tokenEndpoint = "https://custos.scigap.org/apiserver/identity-management/v1.0.0/token"

            await this.authenticate()

            await this.$router.push('tenants')
            let username = await this.$store.dispatch('identity/getCurrentUserName')
            let accessToken = await this.$store.getters['identity/getAccessToken']
            let data = {
                offset: 0, limit: 1, client_id: this.custosId, client_sec: this.custosSec,
                username: username
            }
            let resp = await this.$store.dispatch('user/users', data)
            if (Array.isArray(resp) && resp.length > 0) {
                resp.forEach(user => {
                    let dat = {
                        usertoken:accessToken,
                        body: {
                            username: user.username,
                            first_name: user.first_name,
                            last_name: user.last_name,
                            email: user.email,
                        }
                    }
                    this.$store.dispatch('user/updateUserProfile', dat)
                })
            }
        }
    }
</script>

<style scoped>

</style>