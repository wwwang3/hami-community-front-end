import {defineStore} from 'pinia'
import {isEmpty} from '@/utils'
import {computed, ref} from 'vue'
import store from '@/store'
import UserService from '@/service/modules/UserService.ts'

const useUserStore = defineStore("user", () => {

    const userInfo = ref<UserInfo>()

    const getProfile = async () => {
        if (!isEmpty(userInfo.value)) {
            return Promise.resolve(userInfo.value)
        }
        userInfo.value = await UserService.getUserProfile()
        return userInfo.value
    }

    const logined = computed(() => {
        return !isEmpty(userInfo.value) && isEmpty(userInfo.value?.id)
    })

    return { logined, getProfile }
})
export function loadUserStore() {
    return useUserStore(store)
}

export default useUserStore
