<template>
    <form action="" class="columns p-relative">
        <div class="column col-6">
            <!-- <div class="form-group">
                <label class="form-label">Type</label>
                <select class="form-select" v-model="form.type">
                    <option>Choose an option</option>
                    <option value="Debit">Debit</option>
                    <option value="Credit">Credit</option>
                </select>
            </div> -->
            <div class="form-group">
                <label class="form-radio form-inline">
                    <input type="radio" name="type" value="Credit" v-model="form.type"><i class="form-icon"></i> Credit
                </label>
                <label class="form-radio form-inline">
                    <input type="radio" name="type" value="Debit" v-model="form.type"><i class="form-icon"></i> Debit
                </label>
            </div>
            <template v-if="form.type == 'Debit'">
                <div class="form-group">
                    <label class="form-label">Debit</label>
                    <input class="form-input" type="number" v-model="form.debit" placeholder="10xxx.xx">
                </div>
                <div class="form-group">
                    <label class="form-label">To</label>
                    <input class="form-input" type="text" v-model="form.to" placeholder="To ">
                </div>
            </template>
            <template v-if="form.type == 'Credit'">
                <div class="form-group">
                    <label class="form-label">Credit</label>
                    <input class="form-input" type="number" v-model="form.credit" placeholder="10xxx.xx">
                </div>
                <div class="form-group">
                    <label class="form-label">From</label>
                    <input class="form-input" type="text" v-model="form.from" placeholder="From ">
                </div>
            </template>
            <div v-show="!form.type" class="toast">
                Choose type of expense
            </div>
        </div>
        <div class="column col-6">
            <div class="form-group">
                <label class="form-label">Date</label>
                <input class="form-input" type="date" v-model="form.date" placeholder="25-04-2022">
            </div>
            <div class="form-group">
                <label class="form-label">Mode</label>
                <select class="form-select" v-model="form.mode">
                    <option>Choose mode</option>
                    <option value="Neft">Neft</option>
                    <option value="Imps">Imps</option>
                    <option value="Cash">Cash</option>
                    <option value="Atm">Atm</option>
                    <option value="Cheque">Cheque</option>
                    <option value="Online">Online (GPay, PayTm, PhonePe)</option>
                    <option value="Bank Deposit">Bank Deposit</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                </select>
                <!-- <input class="form-input" type="text" v-model="form.mode" placeholder="Mode of transaction"> -->
            </div>
            <div class="form-group">
                <label class="form-label">Detail</label>
                <input class="form-input" type="text" v-model="form.detail" placeholder="Detail of transaction">
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
            <div class="columns col-gapless">
                <div class="column col-auto col-ml-auto">
                    <button class="btn btn-primary" v-on:click.prevent="addNewExpense">Add</button>
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
import { addExpense } from "@/firebase.js"
export default {

    name: 'AddExpenseForm',

    data() {
        return {
            // payee: {},
            form: {
                type: "Credit",
                debit: 0,
                credit: 0,
                from: "",
                to: "",
                mode: null,
                date: "",
                detail: "",
            },
            loading: false,
            error: false,
            timeout: 0,
        }
    },
    methods: {
        addNewExpense() {
            if (this.form.type && this.form.date && this.form.mode) {
                /*if (this.form.type == "Credit" && this.form.from) {}
                if (this.form.type == "Debit" && this.form.to) {}*/
                addExpense(this.form)
                    .then(res => {
                        // console.log(res)
                        this.form = {
                            type: null,
                            debit: 0,
                            credit: 0,
                            from: "",
                            to: "",
                            mode: null,
                            date: "",
                            detail: "",
                        }
                        this.error = "Success"
                        this.$router.push('/expense')
                    })
                    .catch(e => {
                        console.log(e)
                        this.error = e
                    })
            } else {
                this.error = "fields required"
            }
        },
    }
}
</script>
<style lang="css" scoped>
</style>