<template>
    <section class="bg-secondary p-2 mb-3">
        <!-- <div class="columns m-2">
            <div class="column">
                <div class="card bg-primary">
                    <div class="card-header">
                        <div class="card-title h5">Total <strong class="float-right">{{total}}</strong></div>
                        
                    </div>
                </div>
            </div>
            <div class="divider-vert"></div>
            <div class="column">
                <div class="card bg-warning">
                    <div class="card-header">
                        <div class="card-title h5">Pending <strong class="float-right">{{pending}}</strong></div>
                    </div>
                </div>
            </div>
            <div class="divider-vert"></div>
            <div class="column">
                <div class="card bg-error">
                    <div class="card-header">
                        <div class="card-title h5">Bad <strong class="float-right">{{bad}}</strong></div>
                    </div>
                </div>
            </div>
            
        </div> -->
    </section>
    <div class="container">
        <table class="table compact table-striped table-hover">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>From/To</th>
                    <th>Mode</th>
                    <th>Detail</th>
                    <th>Debit</th>
                    <th>Credit</th>
                    <th>Closing Balance</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(p, index) in expense" :key="index" :class="{'bg-error': p.bad, 'bg-success': p.pending == 0}">
                    <td>{{humanDate(p.date)}}</td>
                    <td>{{p.from}} {{p.to}}</td>
                    <td>{{p.mode}}</td>
                    <td>{{p.detail}}</td>
                    <td>{{p.debit}}</td>
                    <td>{{p.credit}}</td>
                    <td>{{balance}}</td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <td colspan="4"></td>
                    <td>{{totalDebit}}</td>
                    <td>{{totalCredit}}</td>
                    <td class="text-center">
                        <router-link to="/addExpense" class="btn btn-primary btn-sm ">Add</router-link>
                    </td>
                </tr>
            </tfoot>
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
import { getExpense } from "@/firebase.js"
import { format, formatDistanceToNow, compareAsc } from 'date-fns'
// import * as echarts from 'echarts';

export default {

    name: 'ExpenseView',

    data() {
        return {
            expense: [],
            msg: "",
            balance: 0,
            totalDebit: 0,
            totalCredit: 0,
        }
    },

    mounted() {
        // console.log('mounted')
        // this.getexpense()
        getExpense()
            .then(p => {
                this.expense = p
                /*this.expense.map((elem) => {
                    // return something;
                    // console.log(elem.amount)
                })*/
                this.calcBalance(p)
            })
            .catch(e => console.log(e))
    },
    methods: {
        
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
        calcBalance(expense) {
            /*let b = this.expense.reduce((acc, item) => {
                console.log( parseFloat(acc) + parseFloat(item.debit) )
                parseFloat(acc) + parseFloat(item.debit) + parseFloat(item.credit)
            }, 0)*/
            let b = 0
            expense.map((elem)=>{
                b+elem.debit+elem.credit
            })
            this.balance = b
        }
    }
}
</script>
<style lang="css" scoped>
</style>