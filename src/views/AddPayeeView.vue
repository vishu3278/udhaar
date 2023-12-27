<template>
    <div class="container p-2">
        <div class="columns">
            <div class="col-6 column col-mx-auto">
                <div class="panel">
                    <div class="panel-header">
                        Edit Payee
                    </div>
                    <div class="panel-body">
                        <edit-payee-form v-on:submit-form=""></edit-payee-form>
                    </div>
                    <div class="panel-footer">
                        <!-- <button class="btn btn-primary" @click="addPayee">Submit</button> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import EditPayeeForm from '@/components/udhaar/EditPayeeForm.vue'
import { getPayeeById, updatePayee } from '@/firebase.js'
export default {

    name: 'AddPayeeView',
    components: {
        EditPayeeForm
    },

    data() {
        return {
        }
    },
    
    /*methods: {
        addPayee(){

        }
    }*/
}
</script>
<style lang="css" scoped>
</style>