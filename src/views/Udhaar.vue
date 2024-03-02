<template>
    <section class="container my-4">
        <div class="grid grid-cols-3 gap-4">
            <div class="column">
                <div class="card bg-gradient-to-br from-blue-200 to-blue-400 rounded p-4">
                    <div class="card-header text-blue-800">
                        <div class="card-title ">
                            Total
                        </div>
                        <strong class="text-2xl">{{ total }}</strong>
                        <!-- <div class="card-subtitle text-gray">lorem ipsum</div> -->
                    </div>
                    <!-- <div class="card-body ">
                        <h4 class="">{{total}}</h4>
                    </div> -->
                </div>
            </div>
            <!-- <div class="divider-vert"></div> -->
            <div class="column">
                <div class="card bg-gradient-to-br from-yellow-200 to-yellow-400 rounded p-4">
                    <div class="card-header text-amber-600">
                        <div class="card-title ">
                            Pending
                        </div>
                        <strong class="text-2xl">{{ pending }}</strong>
                        <!-- <div class="card-subtitle text-gray">lorem ipsum</div> -->
                    </div>
                </div>
            </div>
            <!-- <div class="divider-vert"></div> -->
            <div class="column">
                <div class="card bg-gradient-to-br from-red-200 to-red-400 rounded p-4">
                    <div class="card-header text-red-800">
                        <div class="card-title ">
                            Bad
                        </div>
                        <strong class="text-2xl">{{ bad }}</strong>
                        <!-- <div class="card-subtitle text-gray">lorem ipsum</div> -->
                    </div>
                </div>
            </div>
            <!-- <div class="divider-vert"></div> -->
        </div>
    </section>
    <div class="container">
        <table class="table compact table-striped table-hover w-full">
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
                <tr v-for="(p, index) in payees" :key="index">
                    <td>{{ index + 1 }} - {{ p.id }}</td>
                    <td>{{ p.name }}</td>
                    <td>{{ p.amount }}</td>
                    <td>
                        <span :class="{
                                'text-error text-bold': p.pending > 0 && !p.bad,
                            }">{{ p.pending }}</span>
                    </td>
                    <td>
                        {{ humanDate(p.duedate) }} -
                        <span v-html="status(p.duedate)"></span>
                    </td>
                    <td>{{ p.remarks }}</td>
                    <td>
                        <span v-show="p.pending == 0" class="text-xs px-2 rounded-full bg-green-300 mr-1">Done</span>
                        <span v-show="!p.bad && p.pending > 0" class="text-xs px-2 rounded-full bg-blue-300 mr-1">Pending</span>
                        <span v-show="p.bad" class="text-xs px-2 rounded-full bg-rose-300 mr-1">Bad</span>
                    </td>
                    <td>
                        <div class="btn-group">
                            <button class="btn btn-sm btn-info mr-1" @click="openTransaction(p)">
                                Transactions
                            </button>
                            <!-- <div v-if="p.pending != 0" > -->
                            <!-- <button class="btn btn-primary btn-sm" @click="donePayee(p)">Done</button> -->
                            <router-link :to="'/editpayee/' + p.id" class="btn bg-amber-200 btn-sm border-amber-400 hover:bg-amber-400 text-amber-900 mr-1">Edit/Update</router-link>
                            <button v-if="!p.bad" class="btn bg-rose-300 border-rose-300 text-rose-900 hover:bg-rose-500 hover:border-rose-500 btn-sm mr-1" @click="addBadPayee(p.id)">
                                Mark Bad
                            </button>
                            <button v-else class="btn bg-purple-200 border-purple-200 text-purple-900 hover:bg-purple-400 hover:border-purple-400 btn-sm mr-1" @click="markNotBad(p.id)">Not Bad</button>
                            <!-- </div> -->
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
        <Modal v-show="transactionModal" @close="transactionModal = false" title="Transactions">
            <template v-slot:content>
                <div class="content">
                    <Transactions :payee="payee"></Transactions>
                    <hr>
                    <h6 class="py-2 font-bold">Add transaction</h6>
                    <div class="grid grid-cols-3 gap-2">
                        <div class="form-group">
                            <label class="form-label">Transaction amount</label>
                            <input class="form-input input-sm" type="number" v-model="transaction.amount" placeholder="Amount" />
                        </div>
                        <div class="form-group">
                            <label class="form-label">Due date</label>
                            <input class="form-input input-sm" type="date" v-model="transaction.duedate" placeholder="Due date" />
                        </div>
                        <div class="form-group">
                            <label class="form-label">Pay date</label>
                            <input class="form-input input-sm" type="date" v-model="transaction.paydate" placeholder="Pay date" />
                        </div>
                    </div>
                </div>
            </template>
            <template v-slot:footer>
                <div v-if="payee?.pending > 0" class="flex items-center justify-between">
                    <button class="btn" @click="closeTransaction">
                        Cancel
                    </button>
                    <!-- <progress v-show="loading" class="progress" max="100"></progress> -->
                    <button class="btn bg-blue-500 text-white hover:bg-blue-600 hover:border-blue-600" @click="submitTransaction">
                        Add
                    </button>
                </div>
                <div v-else>
                    <button class="btn" @click="closeTransaction">Close</button>
                </div>
            </template>
        </Modal>
        <!-- <div class="modal" :class="{ active: msg }">
            <a
                href="#close"
                class="modal-overlay"
                aria-label="Close"
                @click="closeModal"
            ></a>
            <div class="modal-container">
                <div class="modal-header">
                    <a
                        href="#close"
                        class="btn btn-clear float-right"
                        @click="closeModal"
                        aria-label="Close"
                    ></a>
                    <div class="modal-title h5">Modal title</div>
                </div>
                <div class="modal-body">
                    <div class="content">
                        {{ msg }}
                        
                    </div>
                </div>
                
            </div>
        </div> -->
        <!-- transaction modal -->
        <!-- <div class="modal" :class="{ active: transactionModal }">
            <a
                href="#close"
                class="modal-overlay"
                aria-label="Close"
                @click="closeTransaction"
            ></a>
            <div class="modal-container">
                <div class="modal-header">
                    <a
                        href="#close"
                        class="btn btn-clear float-right p-relative"
                        aria-label="Close"
                        style="z-index: 2"
                        @click="closeTransaction"
                    ></a>
                    <div class="modal-title h5">
                        Transactions for {{ payee?.name }}
                    </div>
                </div>
                <div class="modal-body">
                    <div class="content">
                        
                        <Transactions :payee="payee"></Transactions>

                        <div class="divider"></div>
                        
                        <h6>Add transaction</h6>
                        <div class="columns">
                            <div class="column">
                                <div class="form-group">
                                    <label class="form-label"
                                        >Transaction amount</label
                                    >
                                    <input
                                        class="form-input input-sm"
                                        type="number"
                                        v-model="transaction.amount"
                                        placeholder="Amount"
                                    />
                                </div>
                            </div>
                            <div class="column">
                                <div class="form-group">
                                    <label class="form-label">Due date</label>
                                    <input
                                        class="form-input input-sm"
                                        type="date"
                                        v-model="transaction.duedate"
                                        placeholder="Due date"
                                    />
                                </div>
                            </div>
                            <div class="column">
                                <div class="form-group">
                                    <label class="form-label">Pay date</label>
                                    <input
                                        class="form-input input-sm"
                                        type="date"
                                        v-model="transaction.paydate"
                                        placeholder="Pay date"
                                    />
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
                <div v-if="payee?.pending > 0" class="modal-footer d-flex justify-between">
                    <button class="btn" @click="closeTransaction">
                        Cancel
                    </button>
                    <progress
                        v-show="loading"
                        class="progress"
                        max="100"
                    ></progress>
                    <button class="btn btn-primary" @click="submitTransaction">
                        Add
                    </button>
                </div>
                <div v-else class="modal-footer">
                    <button class="btn" @click="closeTransaction">Close</button>
                </div>
            </div>
        </div> -->
    </div>
</template>
<script>
import Modal from "@/components/Modal.vue"
import Transactions from "@/components/udhaar/Transactions.vue"
// import { collection, getDocs } from "firebase/firestore";
import { getPayees, updatePayee, addTransaction } from "@/firebase.js";
import { format, formatDistanceToNow, compareAsc } from "date-fns";
// import * as echarts from 'echarts';

export default {
    name: "Udhaar",
    components: {
        Transactions,
        Modal,
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
        };
    },

    mounted() {
        // console.log('mounted')
        // this.getPayees()
        getPayees()
            .then((p) => {
                this.payees = p;
                this.payees.map((elem) => {
                    // return something;
                    // console.log(elem.amount)
                    this.total += elem.amount;
                    this.pending += elem.pending;
                    this.bad += elem.bad ? elem.pending : 0;
                });
            })
            .catch((e) => console.log(e));
    },
    methods: {
        addBadPayee(id) {
            updatePayee(id, { bad: true })
                .then((res) => {
                    console.log(res);
                    this.msg = "Success";
                    this.autocloseModal();
                })
                .catch((e) => {
                    console.log(e);
                    this.msg = e;
                });
        },
        markNotBad(id) {
            console.log('not bad')
        },
        donePayee(payee) {
            // console.log(payee)
            updatePayee(payee.id, { pending: 0, bad: false })
                .then(() => {
                    // console.log(res)
                    this.msg = "Success";
                    this.autocloseModal();
                })
                .catch((e) => {
                    console.log(e);
                    this.msg = e;
                });
        },
        closeModal() {
            this.msg = null;
        },
        autocloseModal(duration = 3500) {
            setTimeout(() => {
                this.msg = null;
            }, duration);
        },
        humanDate(d) {
            if (d) {
                return format(new Date(d), "dd-MMM-yyyy");
            } else {
                return "-";
            }
        },
        status(date) {
            const d = new Date(date);
            if (compareAsc(new Date(date), new Date()) == 1) {
                return "Upcoming";
            } else {
                return formatDistanceToNow(d);
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
            this.payee = payee;
            this.transactions = payee.transactions;
            this.transactionModal = true;
            this.transaction.id = payee.id;
        },
        closeTransaction() {
            this.transactionModal = false;
            this.transaction = {};
            this.payee = null;
        },
        submitTransaction() {
            this.loading = true;
            let tt = this.payee.transactions ?
                this.payee.transactions.reduce((a, c) => a + c.amount, 0) :
                0;
            let pending = this.payee.amount - (tt + this.transaction.amount);
            console.log(this.transaction.amount, tt, pending);
            // return
            addTransaction(this.transaction.id, {
                    amount: this.transaction.amount,
                    duedate: this.transaction.duedate,
                    paydate: this.transaction.paydate,
                    pending,
                })
                .then((res) => {
                    console.log(res);
                    this.loading = false;
                    this.closeTransaction();
                    // getPayees()
                })
                .catch((e) => {
                    console.warn(e);
                    this.loading = false;
                });
        },
    },
};
</script>
<style lang="css" scoped></style>