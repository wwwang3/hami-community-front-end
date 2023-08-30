import "./style.css";
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
        await useUserStore().getProfile()
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
    //加载element-plus
    loadPlugins(app)
    //注册路由
    registerRouter(app)
    await router.isReady()

    //加载登录用户
    await loadLoginUser()

    app.mount("#app")
    let end = Date.now();
    console.log(`start success. use: ${end - start}ms`)
}

await start()