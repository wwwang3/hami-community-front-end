import {
    createRouter,
    createWebHashHistory,
    createWebHistory,
    RouteLocationNormalized,
    Router,
    RouteRecordRaw,
    RouterHistory
} from 'vue-router'
import type { App } from 'vue'
import { loadTokenStore } from '@/store/modules/token.ts'
import { loadUserStore } from '@/store/modules/user.ts'

const routes: RouteRecordRaw[] = [
    {
        path: "/",
        name: "Index",
        component: () => import("@/views/IndexPage.vue"),
        children: [
            {
                path: "",
                name: "IndexDefault",
                component: () => import("@/components/article/HamiIndexArticle.vue")
            },
            {
                path: "/recommend",
                name: "IndexRecommend",
                component: () => import("@/components/article/HamiIndexArticle.vue")
            },
            {
                path: "",
                name: "IndexDefault",
                component: () => import("@/components/article/HamiIndexArticle.vue")
            },
            {
                path: "/backend",
                name: "IndexBackend",
                component: () => import("@/components/article/HamiIndexArticle.vue")
            },
            {
                path: "/front-end",
                name: "IndexFrontend",
                component: () => import("@/components/article/HamiIndexArticle.vue")
            },
            {
                path: "/android",
                name: "IndexAndroid",
                component: () => import("@/components/article/HamiIndexArticle.vue")
            },
            {
                path: "/ios",
                name: "IndexIOS",
                component: () => import("@/components/article/HamiIndexArticle.vue")
            },
            {
                path: "/ai",
                name: "IndexAi",
                component: () => import("@/components/article/HamiIndexArticle.vue")
            },
            {
                path: "/tool",
                name: "IndexTool",
                component: () => import("@/components/article/HamiIndexArticle.vue")
            },
            {
                path: "/coding",
                name: "IndexCoding",
                component: () => import("@/components/article/HamiIndexArticle.vue")
            },
            {
                path: "/reading",
                name: "IndexReading",
                component: () => import("@/components/article/HamiIndexArticle.vue")
            },
            {
                path: "/follow",
                name: "IndexFollow",
                component: () => import("@/components/article/HamiFollowUserArticle.vue")
            }
        ]
    },
    {
        path: "/article/:id(\\d+)",
        name: "ArticleContent",
        props: true,
        component: () => import("@/views/ArticleContentPage.vue"),
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
    },
    {
        path: "/published",
        name: "Published",
        component: () => import("@/views/PublishedPage.vue")
    },
    {
        path: "/account",
        component: () => import("@/views/UserCenterPage.vue"),
        children: [
            {
                path: '',
                name: 'AccountDefault',
                redirect: "/account/profile"
            },
            {
                path: "profile",
                name: "AccountUserProfile",
                component: () => import("@/components/account/HamiUserProfile.vue")
            },
            {
                path: "setting",
                name: "AccountSetting",
                component: () => import("@/components/account/HamiAccountSetting.vue")
            },
            {
                path: "common",
                name: "AccountCommonSetting",
                component: () => import("@/components/account/HamiCommonSetting.vue")
            },
            {
                path: "record",
                name: "AccountLoginRecord",
                component: () => import("@/components/account/HamiLoginRecord.vue")
            },
        ]
    },
    {
        path: "/user/space/:userId",
        component: () => import("@/views/UserSpacePage.vue"),
        children: [
            // {
            //     path: "/articles",
            // }
        ]
    },
    {
        path: "/creator",
        component: () => import("@/views/CreatorPage.vue"),
        children: [
            {
                path: "",
                name: "default",
                redirect: "/creator/home"
            },
            {
                path: "/creator/home",
                name: "CreatorHome",
                component: () => import("@/components/creator/HamiCreatorHome.vue")
            },
            {
                path: "/creator/content",
                name: "CreatorContent",
                component: () => import("@/components/creator/HamiCreatorContent.vue"),
            }
        ]
    },
    {
        path: "/editor/drafts/:id",
        name: "EditorPage",
        component: () => import("@/views/EditorPage.vue"),
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
    let userStore = loadUserStore()
    if (to.fullPath === "/login" || to.fullPath === "/register") {
        console.log(userStore.logined)
        //如果已经登录了, 不准去啦
        if (userStore.logined) {
            return { name: "Index" }
        }
        return true
    }
    for (let page of needLoginPages) {
        if (to.fullPath === page && !userStore.logined) {
            //要登录的页面没有登录
            //去登录吧
            return { name: "Login" }
        }
    }
    return true
})

export function registerRouter(app: App) {
    app.use(router)
}

export function getRoutePrefix() {
    return import.meta.env.VITE_ROUTER_HISTORY === "hash" ? "/#/" : "/"
}

export default router