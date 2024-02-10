import store from '@/store'
import { defineStore } from 'pinia'
import { AuthService } from '@/service/modules/user.ts'
import { isEmpty } from '@/utils'

export const useTokenStore = defineStore("token", () => {

    const saveToken = (tn: string, tv: string) => {
        localStorage.setItem("_tn", tn)
        localStorage.setItem("_tv", tv)
    }

    const getTokenName = () => {
        return localStorage.getItem("_tn")
    }

    const getTokenValue = () => {
        return localStorage.getItem("_tv")
    }

    const authenticated = () => {
        return !isEmpty(getTokenName()) && !isEmpty(getTokenValue())
    }

    const clear = () => {
        localStorage.removeItem("_tn")
        localStorage.removeItem("_tv")
    }

    const login = async (loginParam: LoginParam) => {
        try {
            let result = await AuthService.login(loginParam)
            saveToken(result.tokenName, result.tokenValue)
            return Promise.resolve("success")
        } catch (e) {
            return Promise.reject(e)
        }
    }

    const logout = async () => {
        try {
            await AuthService.logout()
        } catch (e) {
            return Promise.reject(e)
        } finally {
            // 退出登录失败, token出了问题
            // 管tmd, 全给他移除了, 重新登录去
            clear()
        }
    }

    return { saveToken, getTokenName, getTokenValue, authenticated, clear, login, logout }
})

/**
 * 在setup外使用
 */
export function loadTokenStore() {
    return useTokenStore(store)
}
