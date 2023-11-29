
//需要登录的页面


import { RouteLocationNormalized } from 'vue-router'
import { loadUserStore } from '@/store/modules/user.ts'

const needLoginPages: Array<string> = [
    "/account",
    "/creator",
    "/editor",
    "/history",
    "/notify",
    "/published",
]


export function doFilter(to: RouteLocationNormalized, from: RouteLocationNormalized) {
    const userStore = loadUserStore()
    let fullPath = to.fullPath
    if (fullPath === "/login" || fullPath === "/register") {
        //如果已经登录了, 不准去啦
        if (userStore.logined) {
            return { name: "Index" }
        }
        return true
    }

    for (let path of needLoginPages) {
        if (fullPath === path || fullPath.startsWith(path)) {
            //需要登录
            if (!userStore.logined) {
                return { name: "Index" }
            }
        }
    }
    return true
}