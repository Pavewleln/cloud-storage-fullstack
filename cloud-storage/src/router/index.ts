import {
  createRouter,
  createWebHistory,
  RouteRecordRaw
} from 'vue-router'
import store from "@/store/index";
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/MainHome.vue'),
    meta: {
      layout: 'main',
      auth: true
    }
  },
  {
    path: '/logout',
    name: 'logout',
    component: () => import('@/views/AuthLogout.vue'),
    meta: {
      layout: 'auth',
      auth: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/AuthLogin.vue'),
    meta: {
      layout: 'auth',
      auth: false
    }
  },
  {
    path: '/registration',
    name: 'registration',
    component: () => import('@/views/AuthRegister.vue'),
    meta: {
      layout: 'auth',
      auth: false
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const requireAuth = to.meta.auth
  if(requireAuth && store.getters["auth/isAuthenticated"]) {
    next()
  } else if(requireAuth && !store.getters["auth/isAuthenticated"]){
    next('/login?message=auth')
  } else {
    next()
  }
})
export default router
