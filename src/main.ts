import "./style.css";
import App from "./App.vue";
import { createApp } from "vue";
import { loadPlugins } from '@/plugins'
import { loadStore } from '@/store'
import router, { registerRouter } from '@/router'
import useUserStore from '@/store/modules/user.ts'
import { $message } from '@/utils/message.ts'
import "./themes/dark.css"

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
    //加载Pinia
    loadStore(app)
    //加载其他ui库
    loadPlugins(app)
    //加载登录用户
    let loginUser = await loadLoginUser()
    console.log(loginUser)
    //注册路由
    registerRouter(app)
    await router.isReady()

    app.mount("#app")
    let end = Date.now();
    console.log(`start success. use: ${end - start}ms`)
}

await start()