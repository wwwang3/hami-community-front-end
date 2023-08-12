<template>
    <div class="hami-login-register-frame">
        <div class="login-register-header">
            <img src="/assets/hami-logo-3.png" alt="" class="logo">
        </div>
        <div class="login-register-body">
            <template v-if="frameMode === 'login'">
                <HamiLoginCard></HamiLoginCard>
            </template>
            <template v-else>
                <HamiRegisterCard></HamiRegisterCard>
            </template>
        </div>
        <div class="login-register-bottom">
            <template v-if="frameMode === 'login'">
                <el-divider>没有账号</el-divider>
                <div @click="changeMode('register')" class="text option">立即注册</div>
            </template>
            <template v-else>
                <el-divider>已有账号</el-divider>
                <div @click="changeMode('login')" class="text option">点我登录</div>
            </template>
        </div>
        <div class="login-register-protocol">
            注册或登录即代表您同意<a href="/" class="link">《用户协议》</a>和<a href="/" class="link">《隐私政策》</a>
        </div>
    </div>
</template>

<script setup lang="ts">
import {provide, ref, watch} from 'vue'
import HamiLoginCard from '@/components/auth/HamiLoginCard.vue'
import HamiRegisterCard from '@/components/auth/HamiRegisterCard.vue'
import {useRoute, useRouter} from 'vue-router'
interface Props {
    mode?: string
}
const $router = useRouter()
const $route = useRoute()

const $props = withDefaults(defineProps<Props>(), {
    mode: "login",
    changeRoute: false
})
//登录或者注册成功的回调
provide("success", (mode: string) => {
    if (mode === "login") {
        //登录成功
        $router.replace("/")
    } else {
        //注册成功
        changeMode("login")
    }
})
const frameMode = ref<typeof $props.mode>($props.mode)

watch(() => $route.fullPath, (path) => {
    if (path === "/login") {
        frameMode.value = "login"
    } else if (path === "/register") {
        frameMode.value = "register"
    }
})
const changeMode = (mode: string) => {
    //在登录或者注册界面调用此方法
    if ($route.fullPath === '/register' || $route.fullPath === '/login') {
        $router.replace("/" + mode)
    } else { //不在登录注册界面, 比如弹出式的dialog中调用
        frameMode.value = mode
    }
}
</script>

<style scoped lang="less">
.hami-login-register-frame {
    padding: 24px 32px 32px;
    width: 400px;
    background-color: #fff;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1), 0 10px 22px rgba(0, 0, 0, 0.16);
    border-radius: var(--hami-radius-large);
    min-height: 420px;
    position: relative;
}
.login-register-header {
    margin: 10px 0 20px 0;
    .logo {
        height: 56px;
        width: auto;
    }

}

.login-register-bottom {
    color: var(--hami-text-gray);
    font-size: var(--hami-text-size);
    margin-bottom: 20px;
    .text {
        text-align: center;
        line-height: 22px;
        height: 22px;
    }
    .option {
        color: var(--hami-title-color);
        cursor: pointer;
        font-size: 18px;
    }
}
.login-register-protocol {
    position: absolute;
    font-size: var(--hami-text-size-small);
    height: 24px;
    line-height: 24px;
    text-align: center;
    bottom: 16px;
    .link {
        color: var(--hami-blue);
    }
}
</style>