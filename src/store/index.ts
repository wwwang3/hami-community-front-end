import type {App} from "vue"
import {createPinia} from 'pinia'

const store = createPinia();

export function loadStore(app: App) {
    app.use(store)
}

export {store}