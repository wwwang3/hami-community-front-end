import type { App } from 'vue'

import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import UndrawUi from 'undraw-ui'
import 'undraw-ui/dist/style.css'
import { loadThemeStore } from '@/store/modules/theme.ts'


function loadIcons(app: App) {
    //register all icons
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
        app.component(key, component)
    }
}

function loadUndrawUi(app: App) {
    app.use(UndrawUi)
}

function loadTheme(app: App) {
    const themeStore = loadThemeStore()
}

export function loadPlugins(app: App) {
    loadIcons(app)
    loadUndrawUi(app)
    loadTheme(app)
}