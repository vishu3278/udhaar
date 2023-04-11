<template>
    <section class="bg-secondary p-2 mb-3">
        <div class="d-flex align-center gap-1">
            <h3 class="mb-0">Movies</h3>
            <div class="search-wrapper">
                <div class="input-group">
                    <span class="input-group-addon">Search by Title</span>
                    <input type="text" class="form-input" v-model="query" placeholder="...">
                    <button class="btn btn-primary input-group-btn" @click="searchMovie">Search</button>
                </div>
            </div>
            <!-- <router-link to="/addinvoice" class="btn btn-primary btn-sm "><i class="ri-add-line"></i> Add</router-link> -->
        </div>
    </section>
    <div class="container">
        <!-- <div class="search-wrapper">
            <div class="input-group">
                <span class="input-group-addon">Search</span>
                <input type="text" class="form-input" v-model="query" placeholder="...">
                <button class="btn btn-primary input-group-btn" @click="searchMovie">Search</button>
            </div>
        </div> -->
        <h5 v-if="movies.results" class="text-center bg-primary"><span class="text-bold">{{movies.total_results}}</span> results found for "{{query}}"</h5><br>
        <div class="columns">
            <div v-for="m in movies.results" class="column col-2">
                <movie-card :movie="m"></movie-card>
            </div>
        </div>
        <div v-show="!movies.results" class="empty">
            <div class="empty-icon">
                <i class="ri-movie-2-line ri-5x"></i>
                <!-- <i class="icon icon-people"></i> -->
            </div>
            <p class="empty-title h4 text-error">No movies to show</p>
            <p class="empty-subtitle">Search for a movie by entering keyword and click the Search button.</p>
            <!-- <div class="empty-action">
                <button class="btn btn-primary">Send a message</button>
            </div> -->
        </div>
        <hr>
        <ul class="pagination mx-auto justify-center" style="max-width: 80rem;">
            <!-- <li class="page-item disabled">
                <a href="#" tabindex="-1">Previous</a>
            </li> -->
            <li v-for="n in movies.total_pages" class="page-item" :class="{active: n == movies.page}">
                <a href="#">{{n}}</a>
            </li>
            <!-- <li class="page-item active">
                <a href="#">1</a>
            </li>
            <li class="page-item">
                <a href="#">12</a>
            </li> -->
            <!-- <li class="page-item">
                <a href="#">Next</a>
            </li> -->
        </ul>
        <hr>
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
// import { getInvoices, getCompanies } from "@/firebase.js"
import { format, formatDistanceToNow, compareAsc } from 'date-fns'
import MovieCard from "@/components/movie/MovieCard.vue"
// import AddCompanyForm from '@/components/AddCompanyForm.vue'
// import * as echarts from 'echarts';
import { api_key, base_uri, img_uri, profile_uri } from '../constants.js'
import axios from 'axios'
export default {

    name: 'MoviesView',
    components: {
        MovieCard,
        // AddCompanyForm,
    },
    data() {
        return {
            movies: [],
            query: "",
            editCompany: null,
            msg: "",
            balance: 0,
            totalDebit: 0,
            totalCredit: 0,
            activeInvoice: null,
        }
    },

    mounted() {
        // console.log('mounted')

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
        searchMovie() {
            // url: `${base_uri}/search/movie?api_key=${api_key}&query=${q}`,
            axios.get(`${base_uri}/search/movie?api_key=${api_key}&query=${this.query}`)
                .then(movies => {
                    console.log(movies)
                    this.movies = movies.data
                })
                .catch(e => console.warn(e))
            /*getCompanies().then(c => {
                this.companies = c
            }).catch(e => console.warn(e))*/
        },
    }
}
</script>
<style lang="css" scoped>
.search-wrapper {
    margin-block: 0.1rem;
    margin-inline: auto;
    max-width: 50rem;
}
</style>