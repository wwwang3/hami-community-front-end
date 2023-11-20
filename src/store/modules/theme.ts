import { defineStore } from 'pinia'
import { COLOR_THEME, THEME_STORE } from '@/store/keys.ts'
import { BasicColorSchema, useDark, useStorage } from '@vueuse/core'
import { computed, ComputedRef } from 'vue'
import store from '@/store'

export type ThemeType = BasicColorSchema

const useThemeStore = defineStore(THEME_STORE, () => {

    const themeMode = useStorage<ThemeType>(COLOR_THEME, "light")

    const isDark = useDark({
        selector: 'html',
        attribute: 'class',
        valueDark: 'dark',
        valueLight: 'light',
        initialValue: "light",
        storageKey: COLOR_THEME,
    })

    const theme: ComputedRef<"dark" | "light"> = computed(() => {
        return isDark.value ? "dark" : "light"
    })

    const setThemeMode = (mode: ThemeType) => {
        themeMode.value = mode
    }


    return { theme, isDark, themeMode, setThemeMode }
})

export function loadThemeStore() {
    return useThemeStore(store)
}

export default useThemeStore