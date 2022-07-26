<template>
    <div class="container p-2">
        <div class="columns">
            <div class="col-6 column col-mx-auto">
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
        </div>
    </div>
</template>
<script>
import EditPayeeForm from '@/components/EditPayeeForm.vue'
import { getPayeeById, updatePayee } from '@/firebase.js'
export default {

    name: 'EditPayeeView',
    components: {
        EditPayeeForm
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
    /*methods: {
        addPayee(){

        }
    }*/
}
</script>
<style lang="css" scoped>
</style>