<template>
    <div class="hami-login-register-frame">
        <div class="login-register-header">
            <el-image class="logo" :src="logo"></el-image>
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
                <div @click="changeMode('register')" class="text">立即注册</div>
            </template>
            <template v-else>
                <el-divider>已有账号</el-divider>
                <div @click="changeMode('login')" class="text">点我登录</div>
            </template>
        </div>
        <div class="login-register-protocol">
            注册或登录即代表您同意<a href="/" class="link">《用户协议》</a>和<a href="/" class="link">《隐私政策》</a>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, provide, ref, watch } from 'vue'
import HamiLoginCard from '@/components/auth/LoginCard.vue'
import HamiRegisterCard from '@/components/auth/RegisterCard.vue'
import { useRoute, useRouter } from 'vue-router'
import { LOGIN_REGISTER_SUCCESS } from '@/store/keys.ts'
import { logo2, logo3 } from "@/store/images.ts"
import useThemeStore from '@/store/modules/theme.ts'

interface Props {
    mode?: string
}

const $router = useRouter()
const $route = useRoute()
const themeStore = useThemeStore()

const $props = withDefaults(defineProps<Props>(), {
    mode: "login",
    changeRoute: false
})

const logo = computed(() => {
    return themeStore.isDark ? logo2 : logo3
})

//登录或者注册成功的回调
provide<Function>(LOGIN_REGISTER_SUCCESS, (mode: "login" | "register") => {
    if (mode === "login") {
        //登录成功
        $router.replace("/")
            .then(() => {
                setTimeout(() => {
                    window.location.reload()
                }, 300)
            })
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
    padding: 24px 32px;
    width: 420px;
    background-color: var(--el-bg-color);
    box-shadow: var(--el-box-shadow-light);
    border-radius: var(--hami-radius-large);
    min-height: 420px;
    position: relative;
    margin-top: 20px;
}

.login-register-header {
    margin-bottom: 16px;

    .logo {
        height: 56px;
        width: auto;
    }
}

.login-register-bottom {
    font-size: 15px;
    margin-bottom: 12px;
    color: var(--hami-text-1);

    .text {
        text-align: center;
        line-height: 22px;
        height: 22px;
        cursor: pointer;
        font-size: 18px;
    }

}

.login-register-protocol {
    font-size: 13px;
    height: 24px;
    line-height: 24px;
    text-align: center;
    color: var(--hami-text-1);

    .link {
        color: var(--hami-text-hover-color);
    }
}

</style>