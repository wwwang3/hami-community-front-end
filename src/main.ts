import "./style.css";
import App from "./App.vue";
import {createApp} from "vue";
import {loadPlugins} from '@/plugins'
import {loadStore} from '@/store'
import {registerRouter} from '@/router'
import router from '@/router'

async function start() {
    const app = createApp(App)
    let start = Date.now();
    //加载Pinia
    loadStore(app)
    //加载element-plus
    loadPlugins(app)
    //注册路由
    registerRouter(app)
    await router.isReady()

    app.mount("#app")
    let end = Date.now();
    console.log(`start success. use: ${end - start}ms`)
}

await start()