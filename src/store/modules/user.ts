import { defineStore } from 'pinia'
import { isEmpty } from '@/utils'
import { computed, ref } from 'vue'
import store from '@/store'
import UserService from '@/service/modules/user.ts'
import { loadTokenStore } from '@/store/modules/token.ts'
import { useRequest } from '@/hooks'

const useUserStore = defineStore("user", () => {

    const userInfo = ref<SimpleUserInfo>()
    const inited = ref(false)
    const tokenStore = loadTokenStore()

    const [onLoading, process] = useRequest({
        run: (...params) => UserService.getLoginProfile()
    })
    const getProfile = async (): Promise<SimpleUserInfo> => {
        console.log("start to get profile")
        //token在cookie就不要判断了
        // if (tokenStore.getTokenValue() === null || tokenStore.getTokenName() == null) {
        //     inited.value = true
        //     return Promise.reject("没有token")
        // }
        if (checkLoaded()) {
            return Promise.resolve(userInfo.value as SimpleUserInfo)
        }
        if (onLoading.value) {
            await sync() //等待
            return Promise.resolve(userInfo.value as SimpleUserInfo)
        }
        if (!isEmpty(userInfo.value)) {
            inited.value = true
            return Promise.resolve(userInfo.value as SimpleUserInfo)
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
            return userInfo.value as SimpleUserInfo
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

    const isAuthor = (userId: number) => {
        return userId !== undefined && userId === userInfo.value?.userId
    }

    const logined = computed(() => {
        return !isEmpty(userInfo.value) && !isEmpty(userInfo.value?.userId)
    })

    return { logined, getProfile, sync, userInfo, isAuthor}
})

export function loadUserStore() {
    return useUserStore(store)
}

export default useUserStore
