<script setup lang="ts">
import {onMounted, ref} from "vue"
import avatar from '/assets/avatar.jpg'
import useUserStore from "@/store/modules/user.ts"
import {useTokenStore} from '@/store/modules/token.ts'
//interface

//router, props, inject, provide
const userStore = useUserStore()
const tokenStore = useTokenStore()
//custom var
const avatarRef = ref()
const popoverRef = ref<HTMLElement>()
const avatarHover = ref<string>("hami-avatar-normal")
const userInfo = ref<UserInfo | undefined>()
const logined = ref<boolean>(false)
const visible = ref(false)
//life cycle
onMounted(async () => {
    try {
        userInfo.value = await userStore.getProfile()
        logined.value = true
    } catch (e) {
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

const logout = () => {
    tokenStore.logout()
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
                    width="300"
                    virtual-triggering
                    :teleported="false"
                    popper-class="hami-avatar-popper"
                    :visible="visible"
                >
                    <template #default>
                        <div class="hami-avatar-panel">
                            <div class="username">{{ userInfo?.username }}</div>
                            <el-divider/>
                            <div class="logout-item" @click="logout">
                                <el-icon class="logout-icon">
                                    <svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                              d="M17.6137 9.30115C17.6932 9.10837 17.6932 8.89282 17.6137 8.70004C17.5743 8.60393 17.5165 8.51726 17.4443 8.44504L15.2221 6.22282C14.9148 5.9156 14.4176 5.91615 14.111 6.22282C13.8043 6.52948 13.8037 7.02671 14.111 7.33393L14.9921 8.21504L7.99985 8.21504C7.56596 8.21448 7.21429 8.56615 7.21429 9.00059C7.21429 9.21726 7.30207 9.41393 7.44429 9.55615C7.58651 9.69837 7.78318 9.78615 7.99985 9.78615L14.9921 9.78615L14.111 10.6673C13.8043 10.9739 13.8037 11.4712 14.111 11.7784C14.4182 12.0856 14.9154 12.085 15.2221 11.7784L17.4443 9.55615C17.5165 9.48393 17.5743 9.39726 17.6137 9.30115"
                                              fill="currentColor"></path>
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                              d="M11.8889 5.11111C9.74127 2.96349 6.25873 2.96349 4.11111 5.11111C1.96349 7.25873 1.96349 10.7413 4.11111 12.8889C6.25873 15.0365 9.74127 15.0365 11.8889 12.8889C12.1957 12.5821 12.6932 12.5821 13 12.8889C13.3068 13.1957 13.3068 13.6932 13 14C10.2387 16.7613 5.76127 16.7613 3 14C0.238731 11.2387 0.23873 6.76127 3 4C5.76127 1.23873 10.2387 1.23873 13 4C13.3068 4.30683 13.3068 4.80429 13 5.11111C12.6932 5.41794 12.1957 5.41794 11.8889 5.11111Z"
                                              fill="currentColor"></path>
                                    </svg>
                                </el-icon>
                                <span>退出登录</span>
                            </div>
                        </div>
                    </template>
                </el-popover>
            </div>
        </template>
        <template v-else>
            <div class="login-button">登录</div>
        </template>
    </div>
</template>


<style lang="less">
.hami-avatar-wrap .hami-avatar-popper.el-popper {
    padding: 24px 20px 18px;
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

    .hami-avatar-panel {
        .username {
            text-align: center;
            height: 32px;
            line-height: 32px;
            color: var(--hami-title);
            font-weight: 700;
            font-size: 18px;
            margin: 10px 0 8px;
        }

        .logout-item {
            display: flex;
            align-items: center;
            padding: 10px 14px;
            border-radius: 8px;
            color: var(--hami-text-1);
            font-size: 14px;
            cursor: pointer;
            transition: background-color .3s;
            span {
                height: 24px;
                line-height: 23px;
            }
        }

        .logout-item:hover {
            background-color: #e3e5e7;
        }

        .logout-icon {
            font-size: 18px;
            margin-right: 16px;
            svg {
                ////height: 24px;
                ////width: 24px;
                //display: flex;
                //align-items: center;
                //font-size: 18px;
                //justify-content: center;
                //margin-right: 16px;
            }
        }
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
        transform: scale(1) translate(-17px, 10px);
    }
}

@keyframes avatarFadeSmall {
    0% {
        transform: scale(1) translate(-17px, 10px);
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