import type {App} from "vue"
import {createPinia} from 'pinia'
import {type Pinia} from 'pinia'

const store: Pinia = createPinia();

export function loadStore(app: App) {
    app.use(store)
}

export default store