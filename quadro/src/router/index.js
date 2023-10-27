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
    component: () => import('../views/SobreView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
