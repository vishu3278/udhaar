<template>
    <main>
        <div class="container">
            <div class="columns">
                <div class="column col-4">
                </div>
                <div class="column col-4">
                    <div class="card">
                        <div class="card-header">
                            <ul class="tab tab-block">
                                <li class="tab-item ">
                                    <a href="#" @click="tab = 'login'" :class="{active: tab == 'login'}">Login</a>
                                </li>
                                <li class="tab-item">
                                    <a href="#" @click="tab = 'register'" :class="{active: tab == 'register'}">Register</a>
                                </li>
                            </ul>
                        </div>
                        <template v-if="tab == 'login'">
                            <div class="card-body">
                                <!-- <div class="card-title h5">Login</div>
                                <div class="card-subtitle text-gray">to use the app</div> -->
                                <form action="">
                                    <div class="form-group">
                                        <label class="form-label">Email</label>
                                        <input class="form-input" type="email" v-model="email" placeholder="Enter email">
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label">Password</label>
                                        <input class="form-input" type="password" v-model="password" placeholder="Password">
                                    </div>
                                </form>
                                <div v-show="state.loginError" class="toast toast-error">
                                    <!-- <button class="btn btn-clear float-right"></button> -->
                                    {{state.loginError}}
                                </div>
                            </div>
                            <div class="card-footer">
                                <button class="btn btn-primary" @click="login">Login</button>
                            </div>
                        </template>
                        <template v-if="tab == 'register'">
                            <div class="card-body">
                                <!-- <div class="card-title h5">Register</div>
                                <div class="card-subtitle text-gray">to use the app</div> -->
                                <form action="">
                                    <div class="form-group">
                                        <label class="form-label">Email</label>
                                        <input class="form-input" type="email" v-model="email" placeholder="Enter email">
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label">Password</label>
                                        <input class="form-input" type="password" v-model="password" placeholder="Password">
                                    </div>
                                </form>
                                <div v-show="state.regError" class="toast toast-error">
                                    <!-- <button class="btn btn-clear float-right"></button> -->
                                    {{state.regError}}
                                </div>
                            </div>
                            <div class="card-footer">
                                <button class="btn btn-primary" @click="register">Register</button>
                            </div>
                        </template>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>
<script setup>
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
// import { createUser } from '@/firebase/auth.js'
// import TheWelcome from '@/components/TheWelcome.vue'
import { reactive, computed } from 'vue'
import { ref, watch } from 'vue'
import router from '@/router'
import { auth } from '@/firebase.js'
const email = ref('')
const password = ref('')
const tab = ref('login')
const user = ref({})
const state = reactive({ loginError: '', regError: '' })
watch(tab, (newValue) => {
    if (newValue == "login") { state.regError == '' }
    if (newValue == "register") { state.loginError == '' }
})
const login = () => {
    signInWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            // Signed in 
            console.info(userCredential)
            user.value = userCredential.user;
            sessionStorage.setItem("user", JSON.stringify({ accessToken: userCredential.user.accessToken, email: userCredential.user.email, name: userCredential.user.displayName, phone: userCredential.user.phoneNumber, photo: userCredential.user.photoURL, uid: userCredential.user.uid }))
            router.push('/')
        })
        .catch((error) => {
            console.log(error.code, error.message)
            state.loginError = error.message
            /*const errorCode = error.code;
            const errorMessage = error.message;*/
        });
}
const register = () => {
    createUserWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            // Signed in 
            user.value = userCredential.user;
            console.info(userCredential)

        })
        .catch((error) => {
            console.log(error.code, error.message)
            /*const errorCode = error.code;
            const errorMessage = error.message;*/

        });
}
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

.tab .tab-item a.active,
.tab .tab-item.active a {
    font-weight: bold;
}

.tab .tab-item a:focus {
    outline: none;
    box-shadow: none;
}
</style>