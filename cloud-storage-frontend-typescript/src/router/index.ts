import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import MainHome from "@/views/MainHome.vue";
import AuthLogout from "@/views/AuthLogout.vue";
import AuthLogin from "@/views/AuthLogin.vue";
import AuthRegister from "@/views/AuthRegister.vue";
import store from "@/store";
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: MainHome,
    meta: {
      layout: 'main',
      auth: true
    }
  },
  {
    path: '/logout',
    name: 'logout',
    component: () => AuthLogout,
    meta: {
      layout: 'auth',
      auth: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => AuthLogin,
    meta: {
      layout: 'auth',
      auth: false
    }
  },
  {
    path: '/registration',
    name: 'registration',
    component: () => AuthRegister,
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
