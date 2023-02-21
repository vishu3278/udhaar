<template>
    <section class="bg-secondary p-2 mb-3">
        <div class="d-flex align-center gap-1">
            <h3 class="mb-0">Invoices</h3>
            <router-link to="/addinvoice" class="btn btn-primary btn-sm ">Add</router-link>
        </div>
    </section>
    <div class="container">
        <table class="table compact table-striped table-hover">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>No.</th>
                    <th>Date</th>
                    <th>From</th>
                    <th>To</th>
                    <th>Place</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Mode</th>
                    <th>Amount</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(p, index) in invoices" :key="index" :class="{'bg-error': p.bad, 'bg-success': p.pending == 0}">
                    <td>{{p.id}}</td>
                    <td>{{p.no}}</td>
                    <td>{{p.date}}</td>
                    <td>{{p.from}}</td>
                    <td>{{p.to}}</td>
                    <td>{{p.place}}</td>
                    <td>{{p.phone}}</td>
                    <td>{{p.email}}</td>
                    <td>{{p.payment_mode}}</td>
                    <td>{{p.total}}</td>
                    <td>Preview | Print | Download</td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <td colspan="4"></td>
                    <td colspan="4"></td>
                    <td></td>
                    <td></td>
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
        <invoice-template :invoice="invoices[0]"></invoice-template>
    </div>
</template>
<script>
import { getInvoices } from "@/firebase.js"
import { format, formatDistanceToNow, compareAsc } from 'date-fns'
import InvoiceTemplate from "@/components/InvoiceTemplate.vue"
// import * as echarts from 'echarts';

export default {

    name: 'InvoiceView',
    components: {
        InvoiceTemplate
    },
    data() {
        return {
            invoices: [],
            msg: "",
            balance: 0,
            totalDebit: 0,
            totalCredit: 0,
        }
    },

    mounted() {
        // console.log('mounted')
        getInvoices()
            .then(inv => {
                this.invoices = inv
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
    }
}
</script>
<style lang="css" scoped>
</style>