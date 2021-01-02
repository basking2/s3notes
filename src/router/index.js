import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import S3Config from '../views/S3Config.vue'
import Editor from '../views/Editor.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/s3credentials',
    name: 'S3Config',
    component: S3Config
  },
  {
    path: '/editor/:file*',
    name: 'Editor',
    component: Editor,
    props: route => {
      return {
        // Props go here.
        file: route.params.file
      }
    }
  }
]

const router = new VueRouter({
  routes
})

export default router
