//import store from '@/store'
import { authGuard } from '@/authGuard/authGuard'
import { createRouter, createWebHashHistory } from 'vue-router'


const routes = [

  {
    path: '/',
    name: 'loginPage',
    component: () => import('../components/loginPage.vue')
  },
  {
    path: '/createAccount',
    name: 'createAccount',
    component: () => import('../components/createAccount.vue'),
  },
  {
    path: '/afterSignUpPage',
    name: 'afterSignUpPage',
    component: () => import('../components/afterSignUpPage'),
  },
  {
    path: '/welcomePage',
    name: 'welcomePage',
    component: () => import('../components/welcomePage.vue'),
    beforeEnter: authGuard
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
