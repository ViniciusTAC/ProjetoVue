import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    children: [
      {
        name: 'CriarAtividade',
        path: 'criar_atividade',
        component: () => import('../components/Task.vue')
      },
      {
        name: 'EditarAtividade',
        path: "editar_atividade/:id",
        component: () => import('../components/Task.vue')
      }
    ]
  }
  // },
  // {
  //   // path: '/about',
  //   // name: 'about',
  //   // component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
