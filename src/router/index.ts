import {
    createRouter,
    createWebHashHistory,
    createWebHistory,
    RouteLocationNormalized,
    Router,
    RouteRecordRaw, RouterHistory
} from 'vue-router'
import type {App} from 'vue'

const routes: RouteRecordRaw[] = [
    {
        path: "/",
        component: () => import("@/views/IndexPage.vue")
    },
    {
        path: "/login",
        component: () => import("@/views/LoginRegisterPage.vue"),
    },
    {
        path: "/register",
        component: () => import("@/views/LoginRegisterPage.vue"),
    }
]

function getHistory(): RouterHistory {
    let publicPath = import.meta.env.VITE_PUBLIC_PATH
    return import.meta.env.VITE_ROUTER_HISTORY === "hash" ?
        createWebHashHistory(publicPath) : createWebHistory(publicPath)
}

const router: Router = createRouter({
    history: getHistory(),
    routes: routes
})

router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized) => {
    console.log(to, from)
    return true
})

export function registerRouter(app: App) {
    app.use(router)
}
export default router