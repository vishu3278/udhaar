<template>
    <form action="" class="columns p-relative">
        <div class="column ">
            <div class="form-group">
                <label class="form-label">Contact Name *</label>
                <input class="form-input" type="text" v-model="form.name" placeholder="Name">
            </div>
            <div class="form-group">
                <label class="form-label">Company Name *</label>
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
                <label class="form-label">Address *</label>
                <!-- <input class="form-input" type="text" v-model="form.remarks" placeholder="Some remark you want to add"> -->
                <textarea v-model="form.address" cols="30" rows="4" class="form-input"></textarea>
            </div>
            <div class="columns ">
                <div class="column col-4">
                    <div class="form-group">
                        <label class="form-label">Initial *</label><input type="text" class="form-input" v-model="form.initial">
                    </div>
                </div>
                <div class="column ">
                    <div class="form-group">
                        <label class="form-label">&nbsp;</label>
                        <button v-if="formdata" class="btn btn-primary" v-on:click.prevent="updateCompany">Update</button>
                        <button v-else class="btn btn-primary" v-on:click.prevent="addCompany">Add</button>
                        <button v-if="formdata" class="btn " @click.prevent="$emit('clear-update')">Cancel</button>
                        <router-link v-else class="btn " to="/udhaar">Cancel</router-link>
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
import { db, addCompany, updateCompany } from "@/firebase.js"
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
                this.form = JSON.parse(JSON.stringify(this.formdata))
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
        addCompany() {
            // console.log(this.form)
            if ((this.form.name || this.form.company) && this.form.initial && this.form.address) {
                this.error = ""
                console.info("Good to go")
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
                        // this.$router.push('/udhaar')
                        this.$emit("get-companies")
                    })
                    .catch(e => {
                        console.log(e)
                        this.error = e
                    })
            } else {
                if (!this.form.name || !this.form.company) {
                    this.error = "Either 'Name' or 'Company' field required"
                }
                if (!this.form.address) {
                    this.error = "Address is required"
                }
                if (!this.form.initial) {
                    this.error = "Initial is required"
                }
            }
        },
        updateCompany() {
            // if (this.form.name && this.form.amount && this.form.mobile && this.form.duedate) {
            if ((this.form.name || this.form.company) && this.form.initial && this.form.address) {
                console.log(this.form)
                updateCompany(this.form.id, this.form)
                    .then(() => {
                        this.error = "Success"
                        this.$emit("get-companies")
                        this.$emit('clear-update')
                    })
                    .catch(e => {
                        console.log(e)
                        this.error = e
                    })
            } else {
                if (!this.form.name || !this.form.company) {
                    this.error = "Either 'Name' or 'Company' field required"
                }
                if (!this.form.address) {
                    this.error = "Address is required"
                }
                if (!this.form.initial) {
                    this.error = "Initial is required"
                }
            }
        }
    }
}
</script>
<style lang="css" scoped>
</style>