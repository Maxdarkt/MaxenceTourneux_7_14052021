import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../views/Login.vue'
import NotFound from '../views/NotFound.vue'
import Home from '../views/Home.vue'
import Profil from '../views/Profil.vue'
import store from '../store/index'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta:{
      title: 'Login'
    }
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta:{
      title: 'Home'
    },
    beforeEnter: (to, from, next) => {
      if (store.state.user.id == -1){
        next('/login')
      }else{
        next()
      }
    }
  },
  {
    path: '/profil',
    name: 'Profil',
    component: Profil,
    props: true,
    meta: {
      title: 'Profil',
    },
    beforeEnter: (to, from, next) => {
      if (store.state.user.id == -1){
        next('/login')
      }else{
        next()
      }
    }
  },
  {
    name: 'NotFound',
    path: '/:pathMatch(.*)',
    component: NotFound,
    meta: {
      title: '404 Not Found'
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.afterEach((to, from) => {
  console.log(from, to)
  document.title = to.meta.title;
})



export default router
