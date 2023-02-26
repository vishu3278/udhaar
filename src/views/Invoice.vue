<template>
    <section class="bg-secondary p-2 mb-3">
        <div class="d-flex align-center gap-1">
            <h3 class="mb-0">Invoices</h3>
            <router-link to="/addinvoice" class="btn btn-primary btn-sm ">Add</router-link>
        </div>
    </section>
    <div class="container">
        <div class="columns">
            <div class="column col-8">
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
                            <td><button class="btn btn-sm" @click="setActiveInvoice(p.id)">Preview</button></td>
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
                <br>
                <hr>
                <h5>Companies</h5>
                <table class="table compact table-striped">
                    <thead>
                        <tr>
                            <td>Id</td>
                            <td>Name</td>
                            <td>Address</td>
                            <td>Contact</td>
                            <td>Phone</td>
                            <td>Email</td>
                            <td>GST</td>
                            <td>PAN</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="c in companies">
                            <td>{{c.id}}</td>
                            <td>{{c.company}}</td>
                            <td>{{c.address}}</td>
                            <td>{{c.name}}</td>
                            <td>{{c.phone}}</td>
                            <td>{{c.email}}</td>
                            <td>{{c.gst}}</td>
                            <td>{{c.pan}}</td>
                        </tr>
                    </tbody>
                </table>
                <add-company-form></add-company-form>
            </div>
            <div class="column" style="background-color: #D2C7BA;">
                <!-- <div v-if="activeInvoice">
                    <div class="d-flex justify-center my-1">
                        <div class="btn-group ">
                            <button class="btn btn-sm" @click="closePreview">Close</button>
                            <button class="btn btn-sm">Download</button>
                            <button class="btn btn-sm">Print</button>
                        </div>
                    </div>
                    <br>
                </div> -->
                <template v-if="activeInvoice">
                    <invoice-template :invoice="activeInvoice" :key="activeInvoice.id" @close-preview="activeInvoice = null"></invoice-template>
                </template>
                <div v-else>
                    <div class="empty">
                        <div class="empty-icon">
                            <i class="icon icon-stop icon-2x"></i>
                        </div>
                        <p class="empty-title h5">You have not selected any Invoice</p>
                        <p class="empty-subtitle">Click the preview button to start.</p>
                        <div class="empty-action">
                            <button class="btn btn-primary" @click="setActiveInvoice(invoices[0].id)">Preview 1</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
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
</template>
<script>
import { getInvoices, getCompanies } from "@/firebase.js"
import { format, formatDistanceToNow, compareAsc } from 'date-fns'
import InvoiceTemplate from "@/components/InvoiceTemplate.vue"
import AddCompanyForm from '@/components/AddCompanyForm.vue'
// import * as echarts from 'echarts';

export default {

    name: 'InvoiceView',
    components: {
        InvoiceTemplate,
        AddCompanyForm,
    },
    data() {
        return {
            invoices: [],
            companies: [],
            msg: "",
            balance: 0,
            totalDebit: 0,
            totalCredit: 0,
            activeInvoice: null,
        }
    },

    mounted() {
        // console.log('mounted')
        getInvoices()
            .then(inv => {
                this.invoices = inv
            })
            .catch(e => console.log(e))
        getCompanies().then(c => {
            this.companies = c
        })
    },
    methods: {
        setActiveInvoice(id) {
            this.activeInvoice = this.invoices.find(inv => inv.id == id)
        },
        closePreview() {
            this.activeInvoice = null
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
    }
}
</script>
<style lang="css" scoped>

</style>