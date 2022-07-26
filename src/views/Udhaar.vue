<template>
    <section class="bg-secondary p-2 mb-3">
        <div class="columns m-2">
            <div class="column">
                <div class="card ">
                    <div class="card-body bg-primary">
                        <h4 class="">{{total}}</h4>
                    </div>
                    <div class="card-header">
                        <div class="card-title h5">Total</div>
                        <div class="card-subtitle text-gray">lorem ipsum</div>
                    </div>
                </div>
            </div>
            <div class="divider-vert"></div>
            <div class="column">
                <div class="card">
                    <div class="card-body bg-warning">
                        <h4 class="">{{pending}}</h4>
                    </div>
                    <div class="card-header">
                        <div class="card-title h5">Pending</div>
                        <div class="card-subtitle text-gray">lorem ipsum</div>
                    </div>
                </div>
            </div>
            <div class="divider-vert"></div>
            <div class="column">
                <div class="card">
                    <div class="card-body bg-error">
                        <h4 class="">{{bad}}</h4>
                    </div>
                    <div class="card-header">
                        <div class="card-title h5">Bad</div>
                        <div class="card-subtitle text-gray">lorem ipsum</div>
                    </div>
                </div>
            </div>
            <div class="divider-vert"></div>
            <div class="column">
                <div class="card">
                    <div class="card-header">
                        <div class="card-title h5">Total</div>
                        <div class="card-subtitle text-gray">lorem</div>
                    </div>
                    <div class="card-body">
                        32564
                    </div>
                </div>
            </div>
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
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <!-- <tr>
                    <td>1</td>
                    <td>Naveen</td>
                    <td>15000</td>
                    <td>15000</td>
                    <td>2 July 2022</td>
                    <td><button class="btn btn-primary btn-sm">Done</button> <button class="btn btn-warning btn-sm">Extend</button> <button class="btn btn-error btn-sm">Bad</button></td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>Tarun</td>
                    <td>9000</td>
                    <td>5000</td>
                    <td>2 July 2021</td>
                    <td><button class="btn btn-primary btn-sm">Done</button> <button class="btn btn-warning btn-sm">Extend</button> <button class="btn btn-error btn-sm">Bad</button></td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>Suresh</td>
                    <td>3000</td>
                    <td>1000</td>
                    <td>2 Sept 2022</td>
                    <td><button class="btn btn-primary btn-sm">Done</button> <button class="btn btn-warning btn-sm">Extend</button> <button class="btn btn-error btn-sm">Bad</button></td>
                </tr> -->
                <tr v-for="(p, index) in payees" :key="index" :class="{'bg-error': p.bad, 'bg-success': p.pending == 0}">
                    <td>{{index+1}}</td>
                    <td>{{p.name}}</td>
                    <td>{{p.amount}}</td>
                    <td>{{p.pending}}</td>
                    <td>{{p.duedate}}</td>
                    <td>{{p.remarks}}</td>
                    <td><template v-if="p.pending != 0"><button class="btn btn-primary btn-sm" @click="donePayee(p.id)">Done</button>
                            <router-link :to="'/editpayee/'+p.id" class="btn btn-warning btn-sm">Extend</router-link> <button v-if="!p.bad" class="btn btn-error btn-sm" @click="addBadPayee(p.id)">Bad</button>
                        </template>
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

export default {

    name: 'Dashboard',

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
                    this.autoclose()
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
                    this.autoclose()
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

    }
}
</script>
<style lang="css" scoped>
</style>