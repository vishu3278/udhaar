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
                    <th>#</th>
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
                <tr v-for="(p, index) in payees" :key="index" :class="{'bg-error': p.bad, 'bg-success': p.pending == 0}">
                    <td>{{index+1}}</td>
                    <td>{{p.name}}</td>
                    <td>{{p.amount}}</td>
                    <td>{{p.pending}}</td>
                    <td>{{humanDate(p.duedate)}}</td>
                    <td>{{p.remarks}}</td>
                    <td v-html="status(p.duedate)"></td>
                    <td>
                        <div v-if="p.pending != 0" class="btn-group ">
                            <button class="btn btn-primary btn-sm" @click="donePayee(p.id)">Done</button> 
                            <router-link :to="'/editpayee/'+p.id" class="btn btn-warning btn-sm">Extend</router-link> 
                            <button v-if="!p.bad" class="btn btn-error btn-sm" @click="addBadPayee(p.id)">Bad</button>
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
    </div>
</template>
<script>
// import { getPayees } from '../firebase.js'
import { collection, getDocs } from "firebase/firestore";
import { db, getPayees, updatePayee } from "@/firebase.js"
import { format, formatDistanceToNow, compareAsc } from 'date-fns'
// import * as echarts from 'echarts';

export default {

    name: 'Udhaar',

    data() {
        return {
            payees: [],
            msg: "",
            total: 0,
            pending: 0,
            bad: 0,
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
        donePayee(id) {
            updatePayee(id, { pending: 0, bad: false })
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
            return format(new Date(d), 'dd-MMM-yyyy')
        },
        status(date) {
            const d = new Date(date)
            if (compareAsc(new Date(date), new Date()) == 1) {
                return `<span class="label label-success">Upcoming</span>`
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
        }
    }
}
</script>
<style lang="css" scoped>
</style>