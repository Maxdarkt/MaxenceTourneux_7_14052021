import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../views/Login.vue'
import About from '../views/About.vue'
import NotFound from '../views/NotFound.vue'
import Post from '../views/Post.vue'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    meta:{
      title: 'Accueil'
    }
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    meta:{
      title: 'About'
    }
  },
  {
      path: '/post/:postId',
      name: 'Post',
      component: Post,
      props: true,
      meta: {
        title: 'PostId',
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
