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

async function loadLoginUser()  {
    let loading = $message.loading("正在进入Hami...")
    try {
        return await useUserStore().getProfile()
    } catch (e) {
        console.log(e)
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
    let loginUser = await loadLoginUser()
    // 注册路由
    registerRouter(app)
    await router.isReady()

    app.mount("#hami")
    let end = Date.now();
    console.log(`start Hami success. use: ${end - start}ms`)
}

start().then(() => {
    console.log("###Welcome to Hami###")
    console.log("  _  _     ___   __  __    ___\n" +
        " | || |   /   \\ |  \\/  |  |_ _|\n" +
        " | __ |   | - | | |\\/| |   | |\n" +
        " |_||_|   |_|_| |_|__|_|  |___|")
}).catch(err => {
    console.error(err)
})