import type {App, Ref} from 'vue'

import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
function loadMessage(app: App) {
    // app.use(ElementPlus)
    // app.provide("$message", $message)
}

function loadIcons(app: App) {
    //register all icons
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
        app.component(key, component)
    }
}

export function loadPlugins(app: App) {
    loadMessage(app)
    loadIcons(app)
}