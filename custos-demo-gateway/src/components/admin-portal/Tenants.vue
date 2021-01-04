<template>
    <div class="row">
        <div class="left-column">
            <div class="upper-row">
                <router-link to="/tenants">
                    <div style="font-size: 1.5rem; margin-right:98%; margin-bottom: 100%  ">
                        <b-icon icon="house-door-fill"></b-icon>
                    </div>
                </router-link>
            </div>
            <div class="lower-row">
                <div class="side-buttons">
                    <b-button class="border border-info rounded p-2"  v-b-tooltip.right title="Create New Tenant"
                              v-on:click="this.createNewTenant" variant="outline-primary">
                        <b-icon icon="plus"></b-icon>
                    </b-button>
                </div>
                <div class="side-buttons">
                    <b-button class="border border-info rounded p-2"  v-b-tooltip.right title="List tenants"
                              v-on:click="this.viewTenants" variant="outline-primary">
                        <b-icon icon="list"></b-icon>
                    </b-button>
                </div>

            </div>
        </div>
        <div class="right-column">
            <div class="upper-row">

            </div>
            <div class="lower-row">
              <div v-if="this.addTenant">
                  <NewTenant :tenantId="parentId"></NewTenant>
              </div>
                <div v-if="!this.addTenant">
                    <ListTenants :key="this.refresh" @loginToTenant="loginToTenant" @createChildTenant="createChildTenant"></ListTenants>
                </div>
            </div>
        </div>
    </div>


</template>

<script>
    import NewTenant from "@/components/admin-portal/NewTenant";
    import ListTenants from "@/components/admin-portal/ListTenants";
    import config from "@/config";
    export default {
        name: "tenants",
        components: {ListTenants, NewTenant},
        data: function () {
            return {
                addTenant:false,
                custosId:'',
                custosSec:'',
                refresh:false,
                parentId:null

            }
        },

        methods: {
            async createNewTenant() {
                this.addTenant = true
            },
            async viewTenants() {
                this.addTenant = false
                this.refresh = !this.refresh
                this.parentId = null
            },
            async loginToTenant(item) {
               await this.$router.push({name:'tenantLogin', params:{tenantId:item.tenantId, tenantName:item.tenantName}})
            },

            // eslint-disable-next-line no-unused-vars
            async createChildTenant(item){
                this.addTenant = true
                this.parentId = item.tenantId
            }
        },

        async mounted() {
            this.custosId = config.value('clientId')
            this.custosSec = config.value('clientSec')
            this.tenantModeactivated = await this.$store.dispatch('tenant/isTenantModeActivated')
            if (this.tenantModeactivated) {
                this.custosId = await this.$store.dispatch('tenant/getActivatedClientId')
                this.custosSec = await  this.$store.dispatch('tenant/getActivatedClientSecret');
                await this.$router.push({name:'workspace', params:{tenantId: this.custosId}})
            }
        }


    }
</script>

<style scoped>
    .left-column {
        float: left;
        width: 3%;
        padding: 0px;
        height: 100vh;
        background: #fe8c00;
        background: -webkit-linear-gradient(to bottom, #afafae, #afafae);
        background: linear-gradient(to bottom, #afafae, #afafae);
    }

    .right-column {
        float: left;
        width: 97%;
        padding: 0px;
        height: 100vh;
    }

    .upper-row {
        float: left;
        width: 100%;
        padding: 0px;
        background: #fe8c00;
        background: -webkit-linear-gradient(to right, #f83600, #fe8c00);
        background: linear-gradient(to right, #f83600, #fe8c00);
        height: 3.5%;
    }

    .lower-row {

    }

    .side-buttons {
        position: relative;
        margin-top: 3%;
    }


</style>