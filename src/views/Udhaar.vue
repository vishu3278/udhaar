<template>
    <section class="bg-secondary p-2 mb-3">
        <div class="columns m-2">
            <div class="column">
                <div class="card bg-primary">
                    <div class="card-header">
                        <div class="card-title h5">Total <strong class="float-right">{{total}}</strong></div>
                        <!-- <div class="card-subtitle text-gray">lorem ipsum</div> -->
                    </div>
                    <!-- <div class="card-body ">
                        <h4 class="">{{total}}</h4>
                    </div> -->
                </div>
            </div>
            <div class="divider-vert"></div>
            <div class="column">
                <div class="card bg-warning">
                    <div class="card-header">
                        <div class="card-title h5">Pending <strong class="float-right">{{pending}}</strong></div>
                        <!-- <div class="card-subtitle text-gray">lorem ipsum</div> -->
                    </div>
                </div>
            </div>
            <div class="divider-vert"></div>
            <div class="column">
                <div class="card bg-error">
                    <div class="card-header">
                        <div class="card-title h5">Bad <strong class="float-right">{{bad}}</strong></div>
                        <!-- <div class="card-subtitle text-gray">lorem ipsum</div> -->
                    </div>
                </div>
            </div>
            <!-- <div class="divider-vert"></div> -->
        </div>
    </section>
    <div class="container">
        <table class="table compact table-striped table-hover">
            <thead>
                <tr>
                    <th># - Id</th>
                    <th>Name</th>
                    <th>Amount</th>
                    <th>Pending</th>
                    <th>Return Date</th>
                    <th>Remarks</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(p, index) in payees" :key="index" >
                    <td>{{index+1}} - {{p.id}}</td>
                    <td>{{p.name}}</td>
                    <td>{{p.amount}}</td>
                    <td>{{p.pending}}</td>
                    <td>{{humanDate(p.duedate)}} - <span v-html="status(p.duedate)"></span></td>
                    <td>{{p.remarks}}</td>
                    <td><span v-show="p.pending == 0" class="label label-rounded label-success">Done</span> <span v-show="!p.bad && p.pending > 0" class="label label-rounded label-primary">Pending</span> <span v-show="p.bad" class="label label-rounded label-error">Bad</span></td>
                    <td>
                        <div class="btn-group ">
                            <button class="btn btn-sm btn-info" @click="openTransaction(p)">Transactions</button>
                            <!-- <div v-if="p.pending != 0" > -->
                                <!-- <button class="btn btn-primary btn-sm" @click="donePayee(p)">Done</button> -->
                                <router-link :to="'/editpayee/'+p.id" class="btn btn-warning btn-sm">Edit/Update</router-link>
                                <button v-if="!p.bad" class="btn btn-error btn-sm" @click="addBadPayee(p.id)">Mark Bad</button>
                            <!-- </div> -->
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="modal " :class="{'active': msg }">
            <a href="#close" class="modal-overlay" aria-label="Close" @click="closeModal"></a>
            <div class="modal-container">
                <div class="modal-header">
                    <a href="#close" class="btn btn-clear float-right" @click="closeModal" aria-label="Close"></a>
                    <div class="modal-title h5">Modal title</div>
                </div>
                <div class="modal-body">
                    <div class="content">
                        {{msg}}
                        <!-- content here -->
                    </div>
                </div>
                <!-- <div class="modal-footer">
                    ...
                </div> -->
            </div>
        </div>
        <!-- transaction modal -->
        <div class="modal  " :class="{'active': transactionModal}">
            <a href="#close" class="modal-overlay" aria-label="Close" @click="closeTransaction"></a>
            <div class="modal-container">
                <div class="modal-header">
                    <a href="#close" class="btn btn-clear float-right p-relative" aria-label="Close" style="z-index: 2;" @click="closeTransaction"></a>
                    <div class="modal-title h5">Transactions for {{payee?.name}}</div>
                </div>
                <div class="modal-body">
                    <div class="content">
                        <h6><span v-show="!transactions" class="text-error"><i class="icon icon-cross"></i> No </span> Past transactions</h6>
                        <table v-if="transactions" class="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th>Amount</th>
                                    <th>Due date</th>
                                    <th>Pay date</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(t, index) in transactions">
                                    <td>{{t.amount}}</td>
                                    <td>{{humanDate(t.duedate)}}</td>
                                    <td>{{humanDate(t.paydate)}}</td>
                                </tr>
                            </tbody>
                        </table>
                        <!-- <Transactions :payee="payee"></Transactions> -->

                        <div class="divider"></div>
                        <!-- <template v-if="payee?.pending > 0"> -->
                            <h6>Add transaction</h6>
                            <div class="columns">
                                <div class="column ">
                                    <div class="form-group ">
                                        <label class="form-label">Amount</label>
                                        <input class="form-input input-sm" type="number" v-model="transaction.amount" placeholder="Amount">
                                    </div>
                                </div>
                                <div class="column ">
                                    <div class="form-group ">
                                        <label class="form-label">Due date</label>
                                        <input class="form-input input-sm" type="date" v-model="transaction.duedate" placeholder="Due date">
                                    </div>
                                </div>
                                <div class="column ">
                                    <div class="form-group ">
                                        <label class="form-label">Pay date</label>
                                        <input class="form-input input-sm" type="date" v-model="transaction.paydate" placeholder="Pay date">
                                    </div>
                                </div>
                            </div>
                        <!-- </template> -->
                    </div>
                </div>
                <div v-if="payee?.pending > 0" class="modal-footer d-flex justify-between">
                    <button class="btn btn-sm" @click="closeTransaction">Cancel</button>
                    <progress v-show="loading" class="progress" max="100"></progress>
                    <button class="btn btn-sm btn-primary" @click="submitTransaction">Add</button>
                </div>
                <div v-else class="modal-footer">
                    <button class="btn btn-sm" @click="closeTransaction">Close</button>
                    
                </div>
            </div>
        </div>
    </div>
</template>
<script>
// import Transactions from '@/components/udhaar/Transactions.vue'
// import { collection, getDocs } from "firebase/firestore";
import { getPayees, updatePayee, addTransaction } from "@/firebase.js"
import { format, formatDistanceToNow, compareAsc } from 'date-fns'
// import * as echarts from 'echarts';

export default {

    name: 'Udhaar',
    components: {
        // Transactions,
    },

    data() {
        return {
            payees: [],
            payee: null,
            transactions: null,
            msg: "",
            total: 0,
            pending: 0,
            bad: 0,
            transactionModal: false,
            transaction: {
                id: null,
                amount: 0,
                duedate: null,
                paydate: null,
            },
            loading: false,
        }
    },

    mounted() {
        // console.log('mounted')
        // this.getPayees()
        getPayees()
            .then(p => {
                this.payees = p
                this.payees.map((elem) => {
                    // return something;
                    // console.log(elem.amount)
                    this.total += elem.amount
                    this.pending += elem.pending
                    this.bad += elem.bad ? elem.pending : 0
                })
            })
            .catch(e => console.log(e))
    },
    methods: {
        addBadPayee(id) {
            updatePayee(id, { bad: true })
                .then((res) => {
                    console.log(res)
                    this.msg = "Success"
                    this.autocloseModal()
                })
                .catch(e => {
                    console.log(e)
                    this.msg = e
                })
        },
        donePayee(payee) {
            // console.log(payee)
            updatePayee(payee.id, { pending: 0, bad: false })
                .then(() => {
                    // console.log(res)
                    this.msg = "Success"
                    this.autocloseModal()
                })
                .catch(e => {
                    console.log(e)
                    this.msg = e
                })
        },
        closeModal() {
            this.msg = null
        },
        autocloseModal(duration = 3500) {
            setTimeout(() => {
                this.msg = null
            }, duration)
        },
        humanDate(d) {
            if (d) {
                return format(new Date(d), 'dd-MMM-yyyy')
            } else {
                return "-"
            }
        },
        status(date) {
            const d = new Date(date)
            if (compareAsc(new Date(date), new Date()) == 1) {
                return "Upcoming"
            } else {
                return formatDistanceToNow(d)
            }

            /*if ((new Date(date) - new Date()) > 2 && (new Date(date) - new Date()) < 11) {
                return `<span class="label label-primary">Upcoming</span>`
            }
            if ((new Date(date) - new Date()) > 1 && (new Date(date) - new Date()) < 2 ) {
                return `<span class="label label-warning">Past due</span>`
            }
            if ((new Date(date) - new Date()) > 30 ) {
                return `<span class="label label-error">Delayed</span>`
            }*/
        },
        openTransaction(payee) {
            // console.log(payee)
            this.payee = payee
            this.transactions = payee.transactions
            this.transactionModal = true
            this.transaction.id = payee.id
        },
        closeTransaction() {
            this.transactionModal = false
            this.transaction = {}
            this.payee = null
        },
        submitTransaction() {
            this.loading = true
            addTransaction(this.transaction.id, { amount: this.transaction.amount, duedate: this.transaction.duedate, paydate: this.transaction.paydate }).then(res => {
                console.log(res)
                this.loading = false
                this.closeTransaction()
                // getPayees()
            }).catch(e => {
                console.warn(e)
                this.loading = false
            })
        }
    }
}
</script>
<style lang="css" scoped>
</style>