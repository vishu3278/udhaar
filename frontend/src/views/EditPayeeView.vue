<template>
    <div class="container p-2">
        <div class="columns">
            <div class="column">
                <div class="panel">
                    <div class="panel-header">
                        Edit Payee
                    </div>
                    <div class="panel-body">
                        <edit-payee-form :formdata="form" v-on:submit-form=""></edit-payee-form>
                    </div>
                    <div class="panel-footer">
                        <!-- <button class="btn btn-primary" @click="addPayee">Submit</button> -->
                    </div>
                </div>
            </div>
            <div class="divider-vert" data-content="+"></div>
            <div class="column ">
                <div class="panel">
                    <div v-if="form.transactions" class="panel-header">
                        <div class="panel-title">Past transactions</div>
                    </div>
                    <div class="panel-body">
                        <transactions :payee="form"></transactions>
                    </div>
                    <div class="panel-footer">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import EditPayeeForm from '@/components/udhaar/EditPayeeForm.vue'
import Transactions from '@/components/udhaar/Transactions.vue'
import { getPayeeById, updatePayee } from '@/firebase.js'
import { format } from 'date-fns'
export default {

    name: 'EditPayeeView',
    components: {
        EditPayeeForm,
        Transactions,
    },

    data() {
        return {
            form: {}
            // id: this.$route.params.id
        }
    },
    
    mounted() {
        // console.log(this.$route.params.id)
        getPayeeById(this.$route.params.id).then(d => this.form = d).catch(e => console.log(e))
    },
    methods: {
        humanDate(d) {
            if (d) {
                return format(new Date(d), 'dd-MMM-yyyy')
            } else {
                return "-"
            }
        },
    }
}
</script>
<style lang="css" scoped>
</style>