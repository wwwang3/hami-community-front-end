import type { App } from 'vue'

import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// import 'vue-cropper/dist/index.css'
import VueCropper from 'vue-cropper';

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

function loadCropper(app: App): void {
    app.use(VueCropper)
}

export function loadPlugins(app: App) {
    loadMessage(app)
    loadIcons(app)
    // loadCropper(app)
}