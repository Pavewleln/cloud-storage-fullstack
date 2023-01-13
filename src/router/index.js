import {createRouter, createWebHistory} from 'vue-router'
import store from "@/store";

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('@/views/MainHome'),
        meta: {
            layout: 'main',
            auth: true
        }
    },
    {
        path: '/logout',
        name: 'logout',
        component: () => import('@/views/AuthLogout'),
        meta: {
            layout: 'auth',
            auth: true
        }
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/AuthLogin'),
        meta: {
            layout: 'auth',
            auth: false
        }
    },
    {
        path: '/registration',
        name: 'registration',
        component: () => import('@/views/AuthRegister'),
        meta: {
            layout: 'auth',
            auth: false
        }
    },
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
