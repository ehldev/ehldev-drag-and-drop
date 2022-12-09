import Vue from 'vue'
import VueRouter from 'vue-router'
import OneColumnView from '../views/OneColumnView.vue'
import TwoColumnsView from '../views/TwoColumnsView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: OneColumnView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/two-columns',
    name: 'two-columns',
    component: TwoColumnsView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
