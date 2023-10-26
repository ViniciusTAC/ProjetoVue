import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/Home.vue'

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
        component: () => import('../components/Atividade.vue')
      },
      {
        name: 'EditarAtividade',
        path: "editar_atividade/:id",
        component: () => import('../components/Atividade.vue')
      }
    ]
  },
  {
    path: '/sobre',
    name: 'sobre',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/SobreView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
