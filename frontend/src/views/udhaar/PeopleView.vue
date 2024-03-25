<template>
    <div class="about container">
        <h2 class="text-3xl text-center py-5">Peoples</h2>
        <hr>
        <div class="grid grid-cols-2 gap-5 my-4">
            <main class="relative">
                <section class="p-3 bg-slate-100 rounded mb-2">
                    <h5 class="mt-0 mb-3 text-teal-600">Peoples</h5>
                    <ol class="">
                        <li v-for="u in users" :key="u.id" class="flex items-center gap-2 py-1 divide-y divide-slate-400 divide-solid hover:bg-slate-200">{{u.id}} - {{u.name}} | {{u.phone}} | {{u.email}} <div class="ml-auto">
                                <button class="btn btn-sm" @click="getPeople(u.id)">Edit</button> | <button class="btn btn-sm bg-rose-400 border-rose-500 text-white hover:bg-rose-500" @click="deletePeople(u.id)">Delete</button> | <button class="btn btn-sm" @click="getPeopleDetail(u.id)">Details</button>
                            </div>
                        </li>
                    </ol>
                </section>
                <div v-show="loading" class="loading absolute inset-0 bg-stone-100 bg-opacity-70 flex items-center justify-center">
                    <i class="ri-loader-line animate-spin text-2xl text-teal-500"></i>
                </div>
            </main>
            <aside class="bg-slate-200 rounded p-3">
                <template v-if="detail">
                    <h4 class="text-indigo-500 mb-0 flex gap-3 items-center">{{detail.name}} <small class="text-slate-500 text-sm">({{detail.id}})</small> <button @click="detail = null" class="ml-auto text-sm">Close</button></h4>
                    <p class="mb-3"><i class="ri-phone-line"></i> {{detail.phone}} - <i class="ri-mail-line"></i>{{detail.email}}</p>
                    <div v-for="item in detail.udhaars" class="flex gap-5  border-t border-indigo-300 py-1">
                        <p class="udhaar"><i class="ri-wallet-line"></i> {{item.amount}}</p>
                        <div class="emi">
                            <div v-for="trs in detail.transactions">
                                <p v-if="trs.udhaar_id == item.id"><i class="ri-refund-line"></i> {{trs.amount}} - <i class="ri-calendar-line"></i> {{humanDate(trs.date)}}</p>
                            </div>
                        </div>
                        
                    </div>

                </template>
                    
                <div v-else>
                    <h4 class="text-indigo-500 mb-3">Add people</h4>
                    <div class="flex gap-2 ">
                        <div class="form-group">
                            <input type="text" v-model="name" placeholder="Name">
                        </div>
                        <div class="form-group">
                            <input type="number" v-model="phone" placeholder="Phone">
                        </div>
                        <div class="form-group">
                            <input type="email" v-model="email" placeholder="Email">
                        </div>
                    </div>
                    <button v-if="id" @click="updatePeople">Update</button>
                    <button v-show="name && !id" @click="addPeople">Add</button>
                </div>
            </aside>
        </div>
    </div>
</template>
<script>
import axios from "axios"
import { format, formatDistanceToNow, compareAsc } from "date-fns";
export default {
    name: "People",
    data() {
        return {
            users: [],
            id: null,
            name: "",
            phone: "",
            email: "",
            loading: false,
            detail: null,
        }
    },
    mounted() {
        this.loadPeople()
    },
    methods: {
        humanDate(d) {
            if (d) {
                return format(new Date(d), "dd-MMM-yyyy");
            } else {
                return "-";
            }
        },
        loadPeople() {
            // console.log('inside method')
            axios.get(
                import.meta.env.VITE_API_URL + "/people").then(res => {
                // console.log(res.data)
                this.users = res.data.data
                this.loading = false
                this.id = null
                this.name = ""
                this.phone = ""
                this.email = ""
            }).catch(err => console.warn(err))
        },
        addPeople() {
            if (!this.name) return
            axios.post(
                import.meta.env.VITE_API_URL + "/people", { name: this.name, phone: this.phone, email: this.email }).then((res) => {
                // console.log(res.data)
                this.loading = true
                this.loadPeople()
            })
        },
        getPeople(id) {
            axios.get(
                import.meta.env.VITE_API_URL + "/people/" + id).then(p => {
                // console.log(p.data)
                // let ppl = p.data[0]
                this.id = p.data.id
                this.name = p.data.name
                this.phone = p.data.phone
                this.email = p.data.email
            }).catch(err => console.warn(err))
        },
        updatePeople() {
            axios.put(
                import.meta.env.VITE_API_URL + '/people/' + this.id, { name: this.name, phone: this.phone, email: this.email }).then(p => {
                if (p.status == 200) {
                    console.log(p)
                    // console.log(p.data.message)
                    this.loading = true
                    this.loadPeople()
                }
            }).catch(err => console.warn(err))
        },
        deletePeople(id) {
            axios.delete(
                import.meta.env.VITE_API_URL + "/people/" + id).then(p => {
                console.log(p)
                this.loading = true
                this.loadPeople()
            })
        },
        getPeopleDetail(id){
            axios.get(
                import.meta.env.VITE_API_URL + "/people/detail/" + id).then(p => {
                console.log(p.data)
                // let ppl = p.data[0]
                this.detail = p.data
                
            }).catch(err => console.warn(err))
        },
    }
}
</script>
<style>
@media (min-width: 1024px) {}
</style>