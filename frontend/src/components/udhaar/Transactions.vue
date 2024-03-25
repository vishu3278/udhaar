<template>
    <div class="my-2">
        <div v-if="!transactions" class="empty text-center">
            <div class="empty-icon animate-pulse text-amber-400 text-3xl">
                <i class="ri-close-line "></i>
            </div>
            <p class="empty-title text-2xl text-amber-500">No Transactions</p>
            <p class="empty-subtitle text-lg text-amber-500">found for {{payee?.name}}</p>
            <!-- <div class="empty-action">
                <button class="btn btn-primary">Send a message</button>
            </div> -->
        </div>
        <table v-else class="table table-striped table-hover w-full">
            <thead>
                <tr>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Udhaar (id)</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(t, index) in transactions" class="text-center">
                    <td>{{t.amount}}</td>
                    <td>{{humanDate(t.date)}}</td>
                    <td>{{(t.udhaar_id)}}</td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <th colspan="3" class="text-right">
                        Amount = {{totalUdhaar}}<br>
                        Total paid = {{transactionTotal}}<br>
                        Pending = {{totalUdhaar - transactionTotal}}
                    </th>
                </tr>
                <tr>
                    <td colspan="3">
                        Amount – total transactions = Pending
                    </td>
                </tr>
            </tfoot>
        </table>
    </div>
</template>
<script>
import { format } from 'date-fns'

export default {
    name: "Transactions",
    props: {
        payee: Object,
        transactions: Array,
    },
    data() {
        return {

        }
    },
    computed: {
        totalUdhaar(){
            return this.payee.udhaars.reduce((a, c) => a + Number(c.amount), 0)
        },
        transactionTotal() {
            let tt = this.transactions.reduce((a, c) => a + Number(c.amount), 0)
            return tt
        }
    },
    methods: {
        humanDate(d) {
            if (d) {
                return format(new Date(d), 'dd-MMM-yyyy')
            } else {
                return "-"
            }
        },
    }
}
</script>