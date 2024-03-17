import "./style.css";
import "./themes/light.css"
import "./themes/dark.css"
import "./themes/universe.js"
import App from "./App.vue";
import { createApp } from "vue";
import { loadPlugins } from '@/plugins'
import { loadStore } from '@/store'
import router, { registerRouter } from '@/router'
import useUserStore from '@/store/modules/user.ts'
import { $message } from '@/utils/message.ts'

const bg = "color:#fff; background: linear-gradient(270deg, #986fee, #8695e6, #68b7dd, #18d7d3); padding: 8px 15px; border-radius: 10px"
const banner = "  _  _     ___   __  __    ___\n" +
    " | || |   /   \\ |  \\/  |  |_ _|\n" +
    " | __ |   | - | | |\\/| |   | |\n" +
    " |_||_|   |_|_| |_|__|_|  |___|"

async function loadLoginUser() {
    let loading = $message.loading("正在进入Hami...")
    try {
        return await useUserStore().getProfile()
    } catch (e) {
        // ignore it
    } finally {
        loading?.close()
    }
}

async function start() {
    const app = createApp(App)
    let start = Date.now();
    // 加载Pinia
    loadStore(app)
    // 加载其他ui库
    loadPlugins(app)
    // 加载登录用户
    await loadLoginUser()
    // 注册路由
    registerRouter(app)
    await router.isReady()

    app.mount("#hami")
    let end = Date.now();
    console.log(`%cstart Hami success. use: ${end - start}ms`, bg)
}

start().then(() => {
    console.log("%cWelcome to Hami~~", bg)
    console.log(banner)
}).catch(err => {
    console.error(err)
})