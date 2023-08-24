import { defineStore } from 'pinia'
import { isEmpty } from '@/utils'
import { computed, ref } from 'vue'
import store from '@/store'
import UserService from '@/service/modules/UserService.ts'

const useUserStore = defineStore("user", () => {

    const userInfo = ref()
    const inited = ref(false)

    const getProfile = async (): Promise<SimpleUserInfo> => {
        if (!isEmpty(userInfo.value)) {
            inited.value = true
            return Promise.resolve(userInfo.value)
        }
        try {
            userInfo.value = await UserService.getLoginProfile()
            return userInfo.value as SimpleUserInfo
        } catch (e) {
            return Promise.reject(e)
        } finally {
            inited.value = true
        }
    }
    const sync = async (): Promise<void> => {
        const start = Date.now()
        return new Promise((resolve, reject) => {
            const timer = setInterval(() => {
                if (inited.value) {
                    clearInterval(timer)
                    console.log("sync finish");
                    resolve()
                }
            }, 1)
        })
    }

    const logined = computed(() => {
        return !isEmpty(userInfo.value) && isEmpty(userInfo.value?.id)
    })

    return { logined, getProfile, sync}
})

export function loadUserStore() {
    return useUserStore(store)
}

export default useUserStore
