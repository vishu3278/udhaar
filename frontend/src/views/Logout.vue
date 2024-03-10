<template>
    <main>
        <div class="container">
            <h4 class="text-center">Logging you out</h4>
            <div class="loading loading-lg"></div>
        </div>
    </main>
</template>
<script setup>
import { signOut } from "firebase/auth";
// import { createUser } from '@/firebase/auth.js'
// import TheWelcome from '@/components/TheWelcome.vue'
import { ref, onMounted } from 'vue'
import router from '@/router'
import { auth } from '@/firebase.js'
const error = ref('')

onMounted(() => {
    console.log(`the component is now mounted.`)
    signOut(auth).then(() => {
        console.log("Sign-out successful.")
        sessionStorage.removeItem("user")
        router.push("/login")
    }).catch((error) => {
        console.warn(error)
    });
})
</script>
<style lang="css" scoped>
@keyframes gradient {
    0% {
        background-position: 0% 50%;
    }

    50% {
        background-position: 100% 50%;
    }

    100% {
        background-position: 0% 50%;
    }
}

main {
    background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
    background-size: 400% 400%;
    animation: gradient 15s ease infinite;
    /*background-color: rgba(200,200,225,0.5);*/
    padding: 2rem;
    min-height: calc(100vh - 65px);
}
</style>