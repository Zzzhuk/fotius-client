import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import home from '../views/home';
import login from '../views/login';
import signUp from '../views/sign-up'
import BoxLayout from '../components/BoxLayout';
import box from '../views/box';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: home
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/sign-up',
    name: 'sign-up',
    component: signUp
  },
  {
    path: '/box',
    name: 'box-wrapper',
    component: BoxLayout,
    children: [
      {
        path: '',
        name: 'box',
        component: box
      }
    ],
    meta: {
      requiresAuth: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.auth) {
      const response = store.dispatch('getUser')
      if(!response.error) {
        next()
        return
      }
      next('/login')
    }
    next('/login')
  } else {
    next()
  }
})

export default router
