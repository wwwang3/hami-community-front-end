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
    },
    {
        path: "/recommend",
        name: "IndexRecommend",
        component: () => import("@/views/IndexPage.vue"),
    },
    {
        path: "/backend",
        name: "IndexBackend",
        component: () => import("@/views/IndexPage.vue"),
    },
    {
        path: "/front-end",
        name: "IndexFrontend",
        component: () => import("@/views/IndexPage.vue"),
    },
    {
        path: "/android",
        name: "IndexAndroid",
        component: () => import("@/views/IndexPage.vue"),
    },
    {
        path: "/ios",
        name: "IndexIOS",
        component: () => import("@/views/IndexPage.vue"),
    },
    {
        path: "/ai",
        name: "IndexAi",
        component: () => import("@/views/IndexPage.vue"),
    },
    {
        path: "/tool",
        name: "IndexTool",
        component: () => import("@/views/IndexPage.vue"),
    },
    {
        path: "/coding",
        name: "IndexCoding",
        component: () => import("@/views/IndexPage.vue"),
    },
    {
        path: "/reading",
        name: "IndexReading",
        component: () => import("@/views/IndexPage.vue"),
    },
    {
        path: "/follow",
        name: "IndexFollow",
        component: () => import("@/views/IndexPage.vue"),
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
        path: "/user/space/:id(\\d+)",
        component: () => import("@/views/UserSpacePage.vue"),
        props: true,
        children: [
            {
                path: "",
                name: "UserSpaceDefault",
                props: true,
                component: () => import("@/components/user/HamiUserArticles.vue")

            },
            {
                path: "articles",
                name: "UserArticles",
                props: true,
                component: () => import("@/components/user/HamiUserArticles.vue")
            },
            {
                path: "likes",
                name: "UserLike",
                props: true,
                component: () => import("@/components/user/HamiUserLike.vue")
            },
            {
                path: "collects",
                name: "UserCollect",
                props: true,
                component: () => import("@/components/user/HamiUserCollect.vue")
            },
            {
                path: "follows",
                name: "UserFollow",
                props: true,
                component: () => import("@/components/user/HamiUserFollow.vue")
            }
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
            },
            {
                path: "/creator/tool/import",
                name: "CreatorTool",
                component: () => import("@/components/creator/HamiCreatorTool.vue")
            },
            {
                path: "/creator/help/question",
                name: "CreatorHelpQuestion",
                component: () => import("@/components/creator/HamiCreatorHelp.vue")
            }
        ]
    },
    {
        path: "/editor/drafts/:id",
        name: "EditorPage",
        component: () => import("@/views/EditorPage.vue"),
    },
    {
        path: "/notify",
        name: "Notify",
        component: () => import("@/views/NotifyMsgPage.vue")
    },
    {
        path: "/search",
        name: "SearchPage",
        component: () => import("@/views/SearchPage.vue"),
        props: route => ({ keyword: route.query.keyword })
    },
    {
        path: "/history",
        name: "HistoryPage",
        component: () => import("@/views/ReadingRecordPage.vue")
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

const needLoginPages: Array<string> = ["/"]

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