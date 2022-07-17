<template>
    <div class="container">
        <table class="table table-striped table-hover">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Amount</th>
                    <th>Pending</th>
                    <th>Return Date</th>
                    <th>Remarks</th>
                    <th></th>
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
                <tr v-for="(p, index) in payees" :key="index">
                    <td>{{index+1}}</td>
                    <td>{{p.name}}</td>
                    <td>{{p.amount}}</td>
                    <td>{{p.pending}}</td>
                    <td>{{p.duedate}}</td>
                    <td>{{p.remarks}}</td>
                    <td><button class="btn btn-primary btn-sm">Done</button>
                        <router-link :to="'/editpayee/'+p.id" class="btn btn-warning btn-sm">Extend</router-link> <button class="btn btn-error btn-sm">Bad</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
// import { getPayees } from '../firebase.js'
import { collection, getDocs } from "firebase/firestore";
import { db, getPayees } from "@/firebase.js"

export default {

    name: 'Dashboard',

    data() {
        return {
            payees: []
        }
    },
    mounted() {
        console.log('mouted')
        // this.getPayees()
        getPayees().then(p => this.payees = p).catch(e => console.log(e))
    },
    methods: {


    }
}
</script>
<style lang="css" scoped>
</style>