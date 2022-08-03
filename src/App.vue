<template>
    <header>
        <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="64" height="64" />
        <HelloWorld msg="Udhaar" />
        <div class="time ml-5">
            <div class="tile tile-centered">
                <div class="tile-icon bg-primary">
                    <div class="example-tile-icon text-center p-1">
                        <i class="icon icon-time centered"></i>
                    </div>
                </div>
                <div class="tile-content">
                    <div class="tile-title">{{timestamp.date}}</div>
                    <small class="tile-subtitle text-gray">{{timestamp.time}}</small>
                </div>
            </div>
        </div>
        <div class="wrapper">
            <nav>
                <RouterLink to="/">Home</RouterLink>
                <RouterLink to="/udhaar">Udhaar</RouterLink>
                <RouterLink to="/addpayee">New Payee</RouterLink>
                <RouterLink to="/expense">Expense</RouterLink>
                <RouterLink to="/about">About</RouterLink>
            </nav>
        </div>
    </header>
    <RouterView />
</template>
<script>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
export default {

    data() {
        return {
            isActive: true,
            hasError: false,
            timestamp: {},
        }
    },
    mounted() {
        setInterval(() => { this.getNow() }, 2000)
    },
    methods: {
        getNow() {
            const today = new Date();
            const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
            const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            // const dateTime = date + ' ' + time;
            this.timestamp = {date: today.toDateString(), time: time};
        }
    }
}
</script>
<style scoped>
header {
    line-height: 1.5;
    max-height: 100vh;
}

.logo {
    display: block;
    margin: 0 auto 1rem;
}

nav {
    width: 100%;
    font-size: 12px;
    text-align: center;
}

nav a {
    display: inline-block;
    padding: 0 1rem;
    border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
    border: 0;
}

.tile .tile-subtitle,
.tile .tile-title { line-height: 1.1;}
.example-tile-icon { width: 32px; height: 32px;}

@media (min-width: 1024px) {
    header {
        display: flex;
        place-items: center;
        padding: 0 1rem;
    }

    .logo {
        margin: 0 0.5rem 0 0;
    }

    header .wrapper {
        display: flex;
        place-items: flex-start;
        margin-left: auto;
    }

    nav {
        text-align: left;
        font-size: 0.8rem;
        padding: 1rem 0;
    }
}
</style>