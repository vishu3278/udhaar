import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../views/Login.vue'
import Logout from '../views/Logout.vue'
import Dashboard from '../views/Dashboard.vue'
import Udhaar from '../views/Udhaar.vue'
import AddPayeeView from '../views/AddPayeeView.vue'
import EditPayeeView from '../views/EditPayeeView.vue'
import Expense from '../views/Expense.vue'
import Invoice from '../views/Invoice.vue'
import Movies from '../views/Movies.vue'
import MovieDetail from '../views/MovieDetail.vue'
import AddExpenseView from '../views/AddExpenseView.vue'
import AddInvoice from '../views/AddInvoice.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Dashboard,
    },
    { path: '/login', name: 'login', component: Login },
    { path: '/logout', name: 'logout', component: Logout },
    { path: '/udhaar', name: 'udhaar', component: Udhaar },
    { path: '/addpayee', name: 'addpayee', component: AddPayeeView },
    { path: '/editpayee/:id', name: 'editpayee', component: EditPayeeView },
    { path: '/expense', name: 'expense', component: Expense },
    { path: '/addexpense', name: 'addexpense', component: AddExpenseView },
    { path: '/invoice', name: 'invoice', component: Invoice },
    { path: '/movies', name: 'movies', component: Movies },
    { path: '/movie/:id', name: 'moviedetail', component: MovieDetail },
    { path: '/addinvoice', name: 'addinvoice', component: AddInvoice },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  // if (to.path == 'login') {}
  // let user = sessionStorage.getItem("user")
  if (to.name != "login" && !isAllowed()) {
    next({name: 'login'})
  } else {
    next()
  }
})

function isAllowed() {
  let user = JSON.parse(sessionStorage.getItem("user"))
  if (user?.uid) { return true } else { return false }
}

export default router
