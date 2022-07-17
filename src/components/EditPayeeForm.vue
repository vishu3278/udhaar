<template>
    <form action="" class="columns p-relative">
        <div class="column col-6">
            <div class="form-group">
                <label class="form-label">Name</label>
                <input class="form-input" type="text" v-model="form.name" placeholder="Name">
            </div>
            <div class="form-group">
                <label class="form-label">Amount</label>
                <input class="form-input" type="number" v-model="form.amount" placeholder="10xxx.xx">
            </div>
            <div class="form-group">
                <label class="form-label">Pending</label>
                <input class="form-input" type="number" v-model="form.pending" placeholder="10xxx.xx">
            </div>
        </div>
        <div class="column col-6">
            <div class="form-group">
                <label class="form-label">Mobile</label>
                <input class="form-input" type="number" v-model="form.mobile" placeholder="98xxxxxxxx">
            </div>
            <div class="form-group">
                <label class="form-label">Due Date</label>
                <input class="form-input" type="date" v-model="form.duedate" placeholder="25-04-2022">
            </div>
            <div class="form-group">
                <label class="form-label">Remarks</label>
                <input class="form-input" type="text" v-model="form.remarks" placeholder="Some remark you want to add">
            </div>
        </div>
        <div v-if="error" class="column col-12">
            <div class="toast toast-error mt-2">
                {{error}}
            </div>
        </div>
        <div class="column col-12 text-center mt-3">
            <div class="columns col-gapless">
                <div class="column col-auto col-ml-auto">
                    <button v-if="formdata" class="btn btn-primary" v-on:click.prevent="editPayee">Submit</button>
                    <button v-else class="btn btn-primary" v-on:click.prevent="addNewPayee">Add</button>
                </div>
                <div class="divider-vert"></div>
                <div class="column col-auto col-mr-auto">
                    <router-link class="btn " to="/udhaar">Cancel</router-link>
                </div>
            </div>
        </div>
        <div v-show="loading" class=" loading-wrapper">
            <div class="loading loading-lg"></div>
        </div>
    </form>
</template>
<script>
import { collection, getDocs } from "firebase/firestore";
import { db, addPayee, updatePayee, getPayees } from "@/firebase.js"
export default {

    name: 'EditPayee',
    props: {
        formdata: {
            type: Object,
            default () {
                return null
            }
        }
    },

    data() {
        return {
            payee: {},
            form: this.formdata || {
                name: null,
                amount: null,
                pending: null,
                mobile: null,
                duedate: null,
                remarks: null,
            },
            loading: false,
            error: false
        }
    },
    watch: {
        formdata() {
            if (this.formdata) {
                this.form = this.formdata
            } else {
                this.form = {
                    name: null,
                    amount: null,
                    pending: null,
                    mobile: null,
                    duedate: null,
                    remarks: null,
                }
            }
        }
    },
    methods: {
        addNewPayee() {
            if (this.form.name && this.form.amount && this.form.mobile && this.form.duedate) {
                addPayee(this.form)
                    .then(res => {
                        console.log(res)
                        this.form = {
                            name: null,
                            amount: null,
                            pending: null,
                            mobile: null,
                            duedate: null,
                            remarks: null,
                        }
                    })
                    .catch(e => {
                        console.log(e)
                        this.error = e
                    })
            } else {
                this.error = "fields required"
            }
        },
        editPayee() {
            if (this.form.name && this.form.amount && this.form.mobile && this.form.duedate) {
                updatePayee(this.$route.params.id).then(u => console.log(u)).catch(e => console.log(e))
            } else {
                this.error = "fields required"
            }
        }
    }
}
</script>
<style lang="css" scoped>
</style>