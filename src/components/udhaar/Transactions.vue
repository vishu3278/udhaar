<template>
    <div>
        <div v-if="!payee.transactions" class="empty">
            <div class="empty-icon text-warning">
                <i class="icon icon-cross"></i>
            </div>
            <p class="empty-title h5">No Transactions</p>
            <p class="empty-subtitle">found for the payee</p>
            <!-- <div class="empty-action">
                <button class="btn btn-primary">Send a message</button>
            </div> -->
        </div>
        <table v-else class="table table-striped table-hover">
            <thead>
                <tr>
                    <th>Amount</th>
                    <th>Due date</th>
                    <th>Pay date</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(t, index) in payee.transactions">
                    <td>{{t.amount}}</td>
                    <td>{{humanDate(t.duedate)}}</td>
                    <td>{{humanDate(t.paydate)}}</td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <th>{{transactionTotal}}</th>
                    <th>Total paid</th>
                    <th></th>
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
        payee,
    },
    data() {
        return {

        }
    },
    computed: {
        transactionTotal() {
            let tt = this.payee.transactions.reduce((a, c) => a + c.amount, 0)
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