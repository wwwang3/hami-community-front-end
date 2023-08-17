import {
    createRouter,
    createWebHashHistory,
    createWebHistory,
    RouteLocationNormalized,
    Router,
    RouteRecordRaw, RouterHistory
} from 'vue-router'
import type {App} from 'vue'
import {loadTokenStore} from '@/store/modules/token.ts'

const routes: RouteRecordRaw[] = [
    {
        path: "/",
        name: "Index",
        component: () => import("@/views/IndexPage.vue")
    },
    {
        path: "/login",
        name: "Login",
        component: () => import("@/views/LoginRegisterPage.vue"),
    },
    {
        path: "/register",
        name: "Register",
        component: () => import("@/views/LoginRegisterPage.vue"),
    },
    {
        path: "/reset-pass",
        name: "RestPass",
        component: () => import("@/views/ResetPasswordPage.vue")
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

const needLoginPages: Array<string> = []

/**
 * 全局路由守卫
 */
router.beforeEach(async (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
    let tokenStore = loadTokenStore()
    console.log(to, from)
    if (to.fullPath === "/login" || to.fullPath === "/register") {
        //如果已经登录了, 不准去啦
        if (tokenStore.authenticated()) {
            return {name: "Index"}
        }
        return true
    }
    for (let page of needLoginPages) {
        if (to.fullPath === page && !tokenStore.authenticated()) {
            //要登录的页面没有登录
            //去登录吧
            return {name: "Login"}
        }
    }
    return true
})

export function registerRouter(app: App) {
    app.use(router)
}
export default router