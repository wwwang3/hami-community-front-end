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
            <div class="text">或</div>
            <template v-if="frameMode === 'login'">
                <div @click="changeMode('register')" class="text option">立即注册</div>
            </template>
            <template v-else>
                <div @click="changeMode('login')" class="text option">点我登录</div>
            </template>
        </div>
        <div class="login-register-protocol">
            注册或登录即代表您同意<a href="/" class="link">《用户协议》</a>和<a href="/" class="link">《隐私政策》</a>
        </div>
    </div>
</template>

<script setup lang="ts">
import {ref, watch} from 'vue'
import HamiLoginCard from '@/components/auth/HamiLoginCard.vue'
import HamiRegisterCard from '@/components/auth/HamiRegisterCard.vue'
import {useRoute, useRouter} from 'vue-router'
interface Props {
    mode?: string,
    changeRoute?: boolean
}
const $router = useRouter()
const $route = useRoute()

const $props = withDefaults(defineProps<Props>(), {
    mode: "login",
    changeRoute: false
})
const frameMode = ref($props.mode)

watch(() => $route.fullPath, (path) => {
    if (path === "/login") {
        frameMode.value = "login"
    } else if (path === "/register") {
        frameMode.value = "register"
    }
})
const changeMode = (mode: string) => {
    if (!$props.changeRoute) {
        frameMode.value = mode
    } else {
        $router.replace("/" + mode)
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
    min-height: 400px;
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
    .text {
        text-align: center;
        line-height: 22px;
        height: 22px;
    }
    .text:first-child {
        margin: 4px 0;
    }
    .option {
        color: var(--hami-blue);
        cursor: pointer;
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