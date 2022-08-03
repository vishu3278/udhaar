import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Dashboard from '../views/Dashboard.vue'
import Udhaar from '../views/Udhaar.vue'
import AddPayeeView from '../views/AddPayeeView.vue'
import EditPayeeView from '../views/EditPayeeView.vue'
import Expense from '../views/Expense.vue'
import AddExpenseView from '../views/AddExpenseView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Dashboard
    },
    { path: '/udhaar', name: 'udhaar', component: Udhaar },
    { path: '/addpayee', name: 'addpayee', component: AddPayeeView },
    { path: '/editpayee/:id', name: 'editpayee', component: EditPayeeView },
    { path: '/expense', name: 'expense', component: Expense },
    { path: '/addExpense', name: 'addexpense', component: AddExpenseView },
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

export default router
