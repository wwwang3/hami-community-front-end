import type { App } from 'vue'

import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import UndrawUi from 'undraw-ui'
import 'undraw-ui/dist/style.css'


function loadIcons(app: App) {
    //register all icons
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
        app.component(key, component)
    }
}

function loadUndrawUi(app: App) {
    app.use(UndrawUi)
}

export function loadPlugins(app: App) {
    loadIcons(app)
    loadUndrawUi(app)
}