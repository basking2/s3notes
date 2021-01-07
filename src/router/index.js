import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import S3Config from '../views/S3Config.vue'
import DocPass from '../views/DocPass.vue'
import View from '../views/View.vue'

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
    component: () => import('../views/Editor.vue'),
    props: route => {
      return {
        // Props go here.
        file: route.params.file
      }
    }
  },
  {
    path: '/docpass',
    name: 'DocPass',
    component: DocPass
  },
  {
    path: '/view/:file*',
    name: 'View',
    component: View,
    props: route => {
      var p = {}

      p.useS3 = !!route.query.useS3
      p.file = route.params.file

      return p
    }
  }
]

const router = new VueRouter({
  routes
})

export default router
