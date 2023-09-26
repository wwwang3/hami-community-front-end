import { defineStore } from 'pinia'
import { isEmpty } from '@/utils'
import { computed, ref } from 'vue'
import store from '@/store'
import UserService from '@/service/modules/user.ts'
import { loadTokenStore } from '@/store/modules/token.ts'
import { useRequest } from '@/hooks'

const useUserStore = defineStore("user", () => {

    const userInfo = ref<LoginProfile>({
        userId: -1,
        username: "",
        avatar: '',
        collects: 0,
        ctime: 0,
        followers: 0,
        followings: 0,
        likes: 0,
        profile: '',
        stat: {
            totalArticles: 0,
            totalCollects: 0,
            totalComments: 0,
            totalFollowers: 0,
            totalFollowings: 0,
            totalLikes: 0,
            totalViews: 0,
            userId: -1
        }
    })
    const inited = ref(false)
    const tokenStore = loadTokenStore()

    const [onLoading, process] = useRequest<LoginProfile, any[]>({
        run: (...params) => UserService.getLoginProfile()
    })
    const getProfile = async (): Promise<LoginProfile> => {
        console.log("start to get profile")
        //token在cookie就不要判断了
        // if (tokenStore.getTokenValue() === null || tokenStore.getTokenName() == null) {
        //     inited.value = true
        //     return Promise.reject("没有token")
        // }
        if (checkLoaded()) {
            return Promise.resolve(userInfo.value)
        }
        if (onLoading.value) {
            await sync() //等待
            return Promise.resolve(userInfo.value)
        }
        if (userInfo.value.userId !== -1) {
            inited.value = true
            return Promise.resolve(userInfo.value)
        }
        return await fetch()
    }
    const checkLoaded = (): boolean => {
        //初始化过 同时不在请求中
        return inited.value && !onLoading.value
    }

    const fetch = async () => {
        try {
            userInfo.value = await process(null)
            return userInfo.value
        } catch (e) {
            console.log(e)
            // tokenStore.clear()
            return Promise.reject(e)
        } finally {
            inited.value = true
            onLoading.value = false
        }
    }

    const sync = async (): Promise<void> => {
        const start = Date.now()
        return new Promise((resolve, reject) => {
            const timer = setInterval(() => {
                //加载过了 或者超时
                if ((inited.value && !onLoading.value) || timeout(start, 3000)) {
                    clearInterval(timer)
                    console.log("sync finish");
                    resolve()
                }
            }, 10)
        })
    }

    const timeout = (start: number, time: number): boolean => {
        return Date.now() - start > time
    }

    const isSelf = (userId: number) => {
        return userId !== undefined && userInfo.value.userId !== -1 && userId === userInfo.value.userId
    }

    const logined = computed(() => {
        return !isEmpty(userInfo.value) && !isEmpty(userInfo.value.userId) && userInfo.value.userId !== -1
    })

    return { logined, getProfile, sync, userInfo, isSelf: isSelf}
})

export function loadUserStore() {
    return useUserStore(store)
}

export default useUserStore
