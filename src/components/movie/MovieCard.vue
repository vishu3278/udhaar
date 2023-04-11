<template>
    <div class="card">
        <div class="card-image">
            <img v-if="movie.poster_path" :src="img_uri+movie.poster_path" class="img-responsive">
            <img v-else-if="movie.backdrop_path" :src="img_uri+movie.backdrop_path" class="img-responsive">
            <img v-else src="https://placehold.co/300x440/9ab/ddd?text=No+Poster" class="img-responsive" alt="">
        </div>
        <div class="card-header">
            <div class="card-title h5 text-primary">{{movie.title}}</div>
            <div class="card-subtitle text-gray">{{movie.original_title}}</div>
            <figure class="avatar avatar-sm text-uppercase " :data-initial="movie.original_language" ></figure>
            <span class="label label-rounded label-primary ml-1">{{movie.release_date}}</span>
        </div>
        <div class="card-body">
            {{movie.overview}}
        </div>
        <div class="card-footer">
            <button class="btn btn-sm btn-primary">More</button>
        </div>
    </div>
</template>
<script>
import { api_key, base_uri, img_uri, profile_uri } from '../../constants.js'
export default {

    name: 'MovieCard',
    props: {
        movie: { type: Object }
    },
    data() {
        return {
        		img_uri
        }
    },

}
</script>
<style lang="css" scoped>
</style>