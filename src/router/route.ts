import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
    {
        path: "/",
        alias: "/recommend",
        name: "Index",
        props: {activePath: "/recommend"},
        component: () => import("@/views/IndexPage.vue"),
    },
    {
        path: "/:activePath(recommend|backend|front-end|android|ios|ai|tool|coding|reading|follow)",
        name: "IndexPage",
        props: (route) => ({
            activePath: "/" + route.params.activePath
        }),
        component: () => import("@/views/IndexPage.vue"),
    },
    {
        path: "/:activePath",
        redirect: "/",
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
        props: {mode: "login"},
        component: () => import("@/views/LoginRegisterPage.vue"),
    },
    {
        path: "/register",
        name: "Register",
        props: {mode: "register"},
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
        component: () => import("@/views/PublishedPage.vue"),
        props: route => ({
            id: window.sessionStorage.getItem("p_article_id"),
            title: window.sessionStorage.getItem("p_title")
        })
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
                name: "UserArticle",
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
                path: "home",
                name: "CreatorHome",
                component: () => import("@/components/creator/HamiCreatorHome.vue")
            },
            {
                path: "content",
                name: "CreatorContent",
                component: () => import("@/components/creator/HamiCreatorContent.vue"),
            },
            {
                path: "tool/import",
                name: "CreatorTool",
                component: () => import("@/components/creator/HamiCreatorTool.vue")
            },
            {
                path: "help/question",
                name: "CreatorHelpQuestion",
                component: () => import("@/components/creator/HamiCreatorHelp.vue")
            }
        ]
    },
    {
        path: "/editor/drafts/:draftId(\\d+)",
        name: "EditorPage",
        props: true,
        component: () => import("@/views/EditorPage.vue"),
    },
    {
        path: "/editor/drafts/new",
        name: "DefaultEditorPage",
        props: {draftId: "new"},
        component: () => import("@/views/EditorPage.vue"),
    },
    {
        path: "/notify",
        name: "Notify",
        component: () => import("@/views/NotifyMsgPage.vue"),
        children: [
            {
                path: "",
                name: "NotifyDefault",
                redirect: "/notify/reply"
            },
            {
                path: "reply",
                name: "NotifyReply",
                component: () => import("@/components/notify/HamiNotifyReply.vue")
            },
            {
                path: "love",
                name: "NotifyLove",
                component: () => import("@/components/notify/HamiNotifyLove.vue")
            },
            {
                path: "follow",
                name: "NotifyFollow",
                component: () => import("@/components/notify/HamiNotifyFollow.vue")
            },
            {
                path: "im",
                name: "NotifyIM",
                component: () => import("@/components/notify/HamiNotifyIM.vue")
            },
            {
                path: "system",
                name: "NotifySystem",
                component: () => import("@/components/notify/HamiNotifySystem.vue")
            }
        ]
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
    },
    {
        path: "/:catchAll(.*)",
        name: "404",
        component: () => import("@/components/common/HamiNotFound.vue")
    }
]

export default routes