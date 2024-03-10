<template>
    <div class="greetings">
        <h1 class="green">{{ msg }}</h1>
        <h4>
            Keep track of your udhaar
        </h4>
    </div>
</template>
<script>
export default {
    props: {
        msg: {
            type: String,
            required: true
        }
    }
}
</script>
<style scoped>
h1 {
    font-weight: 500;
    font-size: 2rem;
    /*top: -10px;*/
}

h4 {
    font-size: 1rem;
}
</style>