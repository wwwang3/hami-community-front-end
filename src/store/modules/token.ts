import store from '@/store'
import { defineStore } from 'pinia'

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
        return getTokenValue() !== null
    }

    const clear = () => {
        localStorage.removeItem("_tn")
        localStorage.removeItem("_tv")
    }

    return { saveToken, getTokenName, getTokenValue, authenticated, clear }
})

/**
 * 在setup外使用
 */
export function loadTokenStore() {
    return useTokenStore(store)
}
