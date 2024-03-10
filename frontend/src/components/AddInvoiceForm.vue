<template>
    <form action="" class="columns p-relative">
        <div class="column col-4">
            <!-- <div class="form-group">
                <label class="form-label">Type</label>
                <select class="form-select" v-model="form.type">
                    <option>Choose an option</option>
                    <option value="Debit">Debit</option>
                    <option value="Credit">Credit</option>
                </select>
            </div> -->
            <!-- <div class="form-group">
                <label class="form-radio form-inline">
                    <input type="radio" name="type" value="Credit" v-model="form.type"><i class="form-icon"></i> Credit
                </label>
                <label class="form-radio form-inline">
                    <input type="radio" name="type" value="Debit" v-model="form.type"><i class="form-icon"></i> Debit
                </label>
            </div> -->
            <div class="panel">
                <div class="panel-header">
                    <div class="panel-title">Add Invoice --> {{no}}</div>
                </div>
                <div class="panel-body">
                    <div class="form-body">
                        <label class="form-label">To </label>
                        <select class="form-select" v-model="to">
                            <option value="" selected>Select Name | Company</option>
                            <option v-for="comp in companies" :value="comp.id">{{comp.name || 'no name'}} | {{comp.company || 'no name'}}</option>
                        </select>
                    </div>
                    <div v-if="to" class="card mt-2">
                        <div class="card-header">
                            <div class="card-title h5 text-primary">{{company.name}}</div>
                            <div class="card-subtitle text-bold">{{company.company}}</div>
                        </div>
                        <div class="card-body">
                            Address: {{company.address}}<br>
                            Phone: {{company.phone}}<br>
                            Email: {{company.email}}<br>
                            GST: {{company.gst}} <br>
                            PAN: {{company.pan}}
                        </div>
                    </div>
                    <template v-else>
                        <div class="form-group">
                            <label class="form-label">From</label>
                            <textarea class="form-input" v-model="form.to" cols="30" rows="3"></textarea>
                            <!-- <input class="form-input" type="text" v-model="form.debit" placeholder="abc"> -->
                        </div>
                        <div class="columns">
                            <div class="column">
                                <div class="form-group">
                                    <label class="form-label">Email</label>
                                    <input class="form-input" type="email" v-model="form.email" placeholder="Email address">
                                </div>
                            </div>
                            <div class="column col-5">
                                <div class="form-group">
                                    <label class="form-label">Phone</label>
                                    <input class="form-input" type="number" v-model="form.phone" placeholder="Phone">
                                </div>
                            </div>
                        </div>
                        <div class="columns">
                            <div class="column">
                                <div class="form-group">
                                    <label class="form-label">GST No.</label>
                                    <input class="form-input" type="text" v-model="form.gst" placeholder="GST No.">
                                </div>
                            </div>
                            <div class="column col-5">
                                <div class="form-group">
                                    <label class="form-label">PAN No.</label>
                                    <input class="form-input" type="text" v-model="form.pan" placeholder="PAN No.">
                                </div>
                            </div>
                        </div>
                    </template>
                    <div class="columns">
                        <div class="column ">
                            <div class="form-group">
                                <label class="form-label">Subject line</label>
                                <input class="form-input" type="text" v-model="form.subject" placeholder="Subject (optional)">
                            </div>
                        </div>
                        <div class="column col-5">
                            <div class="form-group">
                                <label class="form-label">Date</label>
                                <input class="form-input" type="date" v-model="form.date" placeholder="25-04-2022">
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-label">From</label>
                        <textarea class="form-input" v-model="form.from" cols="30" rows="3"></textarea>
                    </div>
                    <div class="columns">
                        <div class="column">
                            <div class="form-group">
                                <label class="form-label">Place</label>
                                <input class="form-input" type="text" v-model="form.place" placeholder="Place of delivery">
                            </div>
                        </div>
                        <div class="column">
                            <div class="form-group">
                                <label class="form-label">Mode</label>
                                <select class="form-select" v-model="form.payment_mode">
                                    <option>Choose mode</option>
                                    <option value="Neft">Neft</option>
                                    <option value="Imps">Imps</option>
                                    <!-- <option value="Cash">Cash</option> -->
                                    <!-- <option value="Atm">Atm</option> -->
                                    <option value="Cheque">Cheque</option>
                                    <option value="Online">Online (GPay, PayTm, PhonePe)</option>
                                    <option value="Bank Deposit">Bank Deposit</option>
                                    <option value="Bank Transfer">Bank Transfer</option>
                                </select>
                                <!-- <input class="form-input" type="text" v-model="form.mode" placeholder="Mode of transaction"> -->
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Payment Mode Detail</label>
                        <textarea v-model="form.payment_detail" cols="30" rows="3" class="form-input"></textarea>
                        <!-- <input class="form-input" type="text" v-model="form.detail" placeholder="Detail of transaction"> -->
                    </div>
                </div>
            </div>
            <!-- <div v-show="!form.type" class="toast">
                Choose type of expense
            </div> -->
        </div>
        <div class="column col-8">
            <div class="panel">
                <div class="panel-header">
                    <div class="panel-title">Items Description --> {{no}}</div>
                </div>
                <div class="panel-body">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th width="5%">S.No.</th>
                                <th>Description</th>
                                <th width="10%">Time</th>
                                <th width="10%">Rate</th>
                                <th width="10%">Amount</th>
                                <th width="5%"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <!-- <tr>
                                <td>1.</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>3600</td>
                            </tr> -->
                            <tr v-for="(item, index) in items">
                                <td>{{index + 1}}</td>
                                <td><input type="text" class="form-input" v-model="item.description" autofocus></td>
                                <td><input type="number" class="form-input" v-model="item.time"></td>
                                <td><input type="number" class="form-input" v-model="item.rate"></td>
                                <td>{{item.time * item.rate}}</td>
                                <td><button v-if="index > 0" class="btn btn-sm btn-action btn-error" @click.prevent="removeRow(index)"><i class="icon icon-cross "></i></button></td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td><button class="btn btn-sm btn-action" @click.prevent="newRow"><i class="icon icon-plus"></i></button></td>
                            </tr>
                            <tr>
                                <th></th>
                                <th colspan="4">Total</th>
                                <th>{{total}}</th>
                            </tr>
                            <tr>
                                <td></td>
                                <td colspan="5" align="right">In words ({{number2words(total)}})</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
                <div class="panel-footer">
                    <div class="columns col-gapless">
                        <div class="column col-auto col-ml-auto">
                            <button class="btn btn-primary" v-on:click.prevent="addNewInvoice">Add</button>
                        </div>
                        <div class="divider-vert"></div>
                        <div class="column col-auto col-mr-auto">
                            <router-link class="btn " to="/invoice">Cancel</router-link>
                        </div>
                    </div>
                </div>
            </div>
            <!-- <hr> -->
            <!-- <br> -->
        </div>
        <div v-if="error" class="column col-12">
            <div class="toast mt-2">
                {{error}}
            </div>
            <div class="bar bar-sm mb-2">
                <div class="bar-item" role="progressbar" :style="{'width':timeout+'%'}" :aria-valuenow="timeout" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
        </div>
        <!-- <div class="column col-12 text-center mt-3">
            <div class="columns col-gapless">
                <div class="column col-auto col-ml-auto">
                    <button class="btn btn-primary" v-on:click.prevent="addInvoice">Add</button>
                </div>
                <div class="divider-vert"></div>
                <div class="column col-auto col-mr-auto">
                    <router-link class="btn " to="/invoice">Cancel</router-link>
                </div>
            </div>
        </div> -->
        <div v-show="loading" class=" loading-wrapper">
            <div class="loading loading-lg"></div>
        </div>
    </form>
</template>
<script>
import { addInvoice, getCompanies } from "@/firebase.js"
export default {

    name: 'AddInvoiceForm',

    data() {
        return {
            // payee: {},
            form: {
                // type: "Credit",
                phone: 0,
                email: "",
                from: "",
                to: "",
                place: "",
                payment_mode: null,
                date: new Date(),
                gst: null,
                pan: null,
                subject: "",
                payment_detail: "",
            },
            companies: [],
            from: "",
            to: "",
            loading: false,
            error: false,
            timeout: 0,
            items: [{ description: "", rate: 600.00, time: 1.0 }],
            a: ['', 'one ', 'two ', 'three ', 'four ', 'five ', 'six ', 'seven ', 'eight ', 'nine ', 'ten ', 'eleven ', 'twelve ', 'thirteen ', 'fourteen ', 'fifteen ', 'sixteen ', 'seventeen ', 'eighteen ', 'nineteen '],
            b: ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'],
        }
    },
    computed: {
        total() {
            // let initialValue = this.invoice[0].rate * this.invoice[0].time
            let t = this.items.reduce((a, c) => { return a + (c.time * c.rate) }, 0)
            return t;
        },
        no() {
            let d = this.form.date.toString()
            // console.log(d.replaceAll('-', ''))
            let initial = this.form.from ? this.form.from.splice(0, 2) : ""
            initial = this.company ? this.company.initial : "SS"
            return `${initial}/${d.replaceAll('-', '')}/000`
        },
        company() {
            return this.companies.find(c => c.id == this.from)
        },
    },
    mounted() {
        getCompanies().then(c => {
            this.companies = c
        })
    },
    methods: {
        newRow() {
            this.items.push({ description: "", rate: 600, time: 1 })
        },
        removeRow(index) {
            this.items.splice(index, 1)
        },
        number2words(num) {
            if ((num = num.toString()).length > 9) return 'overflow';
            let n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
            if (!n) return;
            let str = '';
            str += (n[1] != 0) ? (this.a[Number(n[1])] || this.b[n[1][0]] + ' ' + this.a[n[1][1]]) + 'crore ' : '';
            str += (n[2] != 0) ? (this.a[Number(n[2])] || this.b[n[2][0]] + ' ' + this.a[n[2][1]]) + 'lakh ' : '';
            str += (n[3] != 0) ? (this.a[Number(n[3])] || this.b[n[3][0]] + ' ' + this.a[n[3][1]]) + 'thousand ' : '';
            str += (n[4] != 0) ? (this.a[Number(n[4])] || this.b[n[4][0]] + ' ' + this.a[n[4][1]]) + 'hundred ' : '';
            str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (this.a[Number(n[5])] || this.b[n[5][0]] + ' ' + this.a[n[5][1]]) + 'only ' : '';
            return str
        },
        addNewInvoice() {
            let formdata = {
                from: this.company.company || this.form.from,
                phone: this.company.phone || this.form.phone,
                email: this.company.email || this.form.email,
                address: this.company.address || this.form.address,
                gst: this.company.gst || this.form.gst,
                pan: this.company.pan || this.form.pan,
            }
            console.log({ ...formdata, items: this.items, total: this.total, no: this.no })
            addInvoice({ ...this.form, items: this.items, total: this.total, no: this.no })
            .then(s => {
                console.log(s)
                this.$router.push('/invoice')
            })
            .catch(e => console.warn(e))
        },
    }
}
</script>
<style lang="css" scoped>
</style>