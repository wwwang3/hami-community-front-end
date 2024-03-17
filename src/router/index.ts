import { createRouter, createWebHashHistory, createWebHistory, Router, RouterHistory } from 'vue-router'
import type { App } from 'vue'
import routes from "./route.ts"
import { doFilter } from './auth.ts'

function getHistory(): RouterHistory {
    let publicPath = import.meta.env.VITE_PUBLIC_PATH
    return import.meta.env.VITE_ROUTER_HISTORY === "hash" ?
        createWebHashHistory(publicPath) : createWebHistory(publicPath)
}

const router: Router = createRouter({
    history: getHistory(),
    routes: routes
})

/**
 * 全局路由守卫
 */
router.beforeEach((to, from) => {
    return doFilter(to, from)
})

export function registerRouter(app: App) {
    app.use(router)
}


export default router