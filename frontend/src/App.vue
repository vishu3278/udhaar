<template>
  <header>
    <img
      alt="Vue logo"
      class="logo"
      src="@/assets/logo.svg"
      width="64"
      height="64"
    />

    <div class="time ml-5">
      <div class="tile flex items-center gap-2">
        <div class="tile-icon bg-primary">
          <div class="text-xl text-center p-1">
            <i class="ri-time-line"></i>
          </div>
        </div>
        <div class="tile-content">
          <div class="tile-title">{{ timestamp.date }}</div>
          <small class="tile-subtitle text-gray">{{ timestamp.time }}</small>
        </div>
      </div>
    </div>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Dashboard</RouterLink>
        <RouterLink to="/people">Peoples</RouterLink>
        <RouterLink to="/udhaar">Udhaar</RouterLink>
        <RouterLink to="/addpayee">New Payee</RouterLink>
        <RouterLink to="/expense">Expense</RouterLink>
        <RouterLink to="/invoice">Invoice</RouterLink>
        <RouterLink to="/movies">Movies</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/login">Login</RouterLink>
        <RouterLink to="/logout">Logout</RouterLink>
      </nav>
    </div>
  </header>
  <RouterView />
</template>
<script>
import { RouterLink, RouterView } from "vue-router";

export default {
  data() {
    return {
      isActive: true,
      hasError: false,
      timestamp: {},
    };
  },
  mounted() {
    setInterval(() => {
      this.getNow();
    }, 2000);
  },
  methods: {
    getNow() {
      const today = new Date();
      const date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();
      const time =
        today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      // const dateTime = date + ' ' + time;
      this.timestamp = { date: today.toDateString(), time: time };
    },
  },
};
</script>
<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
  @apply border-b-2 border-amber-200
}

.logo {
  display: block;
  margin: 0 auto 1rem;
}

nav {
  width: 100%;
  font-size: 14px;
  text-align: center;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  @apply transition
}

nav a:hover {
  @apply bg-teal-100 text-teal-800 ring ring-teal-400
}

nav a:first-of-type {
  border: 0;
}

.tile .tile-subtitle,
.tile .tile-title {
  line-height: 1.1;
}

.router-link-exact-active {
  @apply text-teal-800 font-bold ring ring-teal-400
}

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
