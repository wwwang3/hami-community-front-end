<script setup lang="ts">
import { onBeforeMount, Ref, ref } from "vue"
import useUserStore from "@/store/modules/user.ts"
import { useTokenStore } from '@/store/modules/token.ts'
import { useRouter } from 'vue-router'
import { $message } from '@/utils/message.ts'
//interface

//router, props, inject, provide
const $router = useRouter();
const userStore = useUserStore()
const tokenStore = useTokenStore()
//custom var
const avatarRef = ref()
const popoverRef = ref<HTMLElement>()
const avatarHover = ref<string>("hami-avatar-normal")
const userInfo = ref<SimpleUserInfo>() as Ref<SimpleUserInfo>
const logined = ref<boolean>(false)
const visible = ref(false)
//life cycle
onBeforeMount(async () => {
    try {
        userInfo.value = await userStore.getProfile()
        userInfo.value.tag = "管理员"
        logined.value = true
    } catch (e) {
        $message.error(e)
        logined.value = false
    }
})
//watch

//fun
const avatarMouseEnter = () => {
    visible.value = true
    avatarHover.value = "hami-avatar-large"
    // avatarRef.value.className =  "hami-avatar-container hami-avatar-large"
}
const avatarMouseLeave = () => {
    avatarHover.value = "hami-avatar-normal"
    visible.value = false
    // avatarRef.value.className =  "hami-avatar-container hami-avatar-normal"
}

</script>
<template>
    <div class="hami-avatar-wrap">
        <template v-if="logined">
            <div class="hami-avatar-container" :class="avatarHover" ref="avatarRef"
                 @mouseenter="avatarMouseEnter" @mouseleave="avatarMouseLeave">
                <a href="/" class="hami-avatar normal">
                    <img :src="userInfo?.avatar" alt="" class="avatar">
                </a>
                <a href="/" class="hami-avatar large">
                    <img :src="userInfo?.avatar" alt="" class="avatar">
                </a>
                <el-popover
                    ref="popoverRef"
                    :virtual-ref="avatarRef"
                    trigger="hover"
                    :show-arrow="false"
                    :show-after="200"
                    :hide-after="100"
                    width="308"
                    virtual-triggering
                    :teleported="false"
                    popper-class="hami-avatar-popper"
                    :visible="visible"
                >
                    <template #default>
                        <HamiUserCardV1 :user-info="userInfo"></HamiUserCardV1>
                    </template>
                </el-popover>
            </div>
        </template>
        <template v-else>
            <div class="login-button" @click="() => $router.replace('/login')">
                登录
            </div>
        </template>
    </div>
</template>


<style lang="less">
.hami-avatar-wrap .hami-avatar-popper.el-popper {
    padding: 24px 24px 18px;
    border-radius: var(--hami-radius-medium);
}
</style>
<style scoped lang="less">
.hami-avatar-wrap {
    position: relative;
    box-sizing: content-box;
    width: 50px;
    height: 50px;
    cursor: pointer;

    .hami-avatar-container {
        position: relative;
        z-index: 99999;
    }

    .hami-avatar-large {
        .hami-avatar.normal {
            animation: fade-out .6s both;
        }

        .hami-avatar.large {
            img {
                opacity: 1;
                transition: all .35s;
            }
        }
    }

    .hami-avatar-normal {
        .hami-avatar.large {
            animation: avatarFadeSmall .35s both;
        }
    }

    .hami-avatar.normal {
        animation: fade-in .6s both;
    }

    .hami-avatar.large {
        opacity: 0;
        display: block;
        animation: avatarFadeLarge .35s both;
        width: 84px;
        height: 84px;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 99999;

        img {
            opacity: 0;
            transition: all .35s;
        }
    }

    .hami-avatar {
        .avatar {
            border-radius: 50%;
            background: transparent;
            width: 100%;
            height: 100%;
        }
    }

    .login-button {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: #1d7dfa;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
    }
}

@keyframes fade-in {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}

@keyframes fade-out {
    0% {
        opacity: 1;
    }

    100% {
        opacity: 0;
    }
}

@keyframes avatarFadeLarge {
    0% {
        opacity: 0;
        transform: scale(.4) translateY(0) translate(0);
    }

    30% {
        opacity: 1;
    }
    100% {
        opacity: 1;
        transform: scale(1) translate(-17px, 16px);
    }
}

@keyframes avatarFadeSmall {
    0% {
        transform: scale(1) translate(-17px, 16px);
    }

    60% {
        opacity: 1;
    }
    100% {
        opacity: 0;
        transform: scale(.4) translateY(0) translate(0);
    }
}
</style>