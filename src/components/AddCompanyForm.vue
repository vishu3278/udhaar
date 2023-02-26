<template>
    <form action="" class="columns p-relative">
        <div class="column ">
            <div class="form-group">
                <label class="form-label">Contact Name</label>
                <input class="form-input" type="text" v-model="form.name" placeholder="Name">
            </div>
            <div class="form-group">
                <label class="form-label">Company Name</label>
                <input class="form-input" type="text" v-model="form.company" placeholder="Company Name">
            </div>
            <div class="form-group">
                <label class="form-label">Email</label>
                <input class="form-input" type="email" v-model="form.email" placeholder="email@domain.in">
            </div>
        </div>
        <div class="column ">
            <div class="form-group">
                <label class="form-label">Mobile</label>
                <input class="form-input" type="number" v-model="form.mobile" placeholder="98xxxxxxxx">
            </div>
            <div class="form-group">
                <label class="form-label">GST</label>
                <input class="form-input" type="text" v-model="form.gst" placeholder="GST No">
            </div>
            <div class="form-group">
                <label class="form-label">PAN</label>
                <input class="form-input" type="text" v-model="form.pan" placeholder="PAN">
            </div>
        </div>
        <div class="column">
            <div class="form-group">
                <label class="form-label">Address</label>
                <!-- <input class="form-input" type="text" v-model="form.remarks" placeholder="Some remark you want to add"> -->
                <textarea v-model="form.address" cols="30" rows="4" class="form-input"></textarea>
            </div>
            <div class="columns ">
                <div class="column col-4">
                    <div class="form-group">
                        <label class="form-label">Initial</label><input type="text" class="form-input" v-model="form.initial">
                    </div>
                </div>
                <div class="column ">
                    <div class="form-group">
                        <label class="form-label">&nbsp;</label>
                        <button v-if="formdata" class="btn btn-primary" v-on:click.prevent="editPayee">Submit</button>
                        <button v-else class="btn btn-primary" v-on:click.prevent="addNewCompany">Add</button>
                        <router-link class="btn " to="/udhaar">Cancel</router-link>
                    </div>
                </div>
                <!-- <div class="divider-vert"></div> -->
            </div>
        </div>
        <div v-if="error" class="column col-12">
            <div class="toast mt-2">
                {{error}}
            </div>
            <div class="bar bar-sm mb-2">
                <div class="bar-item" role="progressbar" :style="{'width':timeout+'%'}" :aria-valuenow="timeout" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
        </div>
        <div class="column col-12 text-center mt-3">
        </div>
        <div v-show="loading" class=" loading-wrapper">
            <div class="loading loading-lg"></div>
        </div>
    </form>
</template>
<script>
import { collection, getDocs } from "firebase/firestore";
import { db, addCompany, updatePayee } from "@/firebase.js"
export default {

    name: 'AddCompanyForm',
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
                name: "",
                company: "",
                address: "",
                phone: "",
                email: "",
                gst: "",
                pan: "",
                initial: "",
            },
            loading: false,
            error: false,
            timeout: 0,
        }
    },
    watch: {
        formdata() {
            if (this.formdata) {
                this.form = this.formdata
            } else {
                this.form = {
                    name: "",
                    company: "",
                    address: "",
                    phone: "",
                    email: "",
                    gst: "",
                    pan: "",
                    initial: "",
                }
            }
        }
    },
    methods: {
        addNewCompany() {
            console.log(this.form)
            if (this.form.name && this.form.email && this.form.mobile && this.form.initial) {
                addCompany(this.form)
                    .then(res => {
                        // console.log(res)
                        this.form = {
                            name: "",
                            company: "",
                            address: "",
                            phone: "",
                            email: "",
                            gst: "",
                            pan: "",
                            initial: "",
                        }
                        this.error = "Success"
                        this.$router.push('/udhaar')
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
                console.log(this.form)
                updatePayee(this.$route.params.id, this.form)
                    .then(() => {
                        this.error = "Success"
                        let interval = setInterval(() => {
                            this.timeout += 100 / 7
                        }, 500)
                        setTimeout(() => {
                            clearInterval(interval)
                            this.error = false
                            this.$router.push('/udhaar')
                        }, 3500)
                    })
                    .catch(e => {
                        console.log(e)
                        this.error = e
                    })
            } else {
                this.error = "fields required"
            }
        }
    }
}
</script>
<style lang="css" scoped>
</style>