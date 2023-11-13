<script setup lang="ts">
import { computed, onBeforeMount, ref } from "vue"
import useUserStore from "@/store/modules/user.ts"
import { useRouter } from 'vue-router'
import defaultAvatar from "/assets/avatar.jpg"
import HeaderUserCard from '@/components/header/HeaderUserCard.vue'

const $router = useRouter();
const userStore = useUserStore()
const avatarRef = ref()
const popoverRef = ref<HTMLElement>()
const avatarHover = ref<string>("hami-avatar-normal")
const userInfo = ref<LoginProfile>()
const logined = ref<boolean>(false)
const visible = ref(false)

const spaceRoute = computed(() => {
    return "/user/space/" + userInfo.value?.userId
})
//life cycle
onBeforeMount(async () => {
    try {
        userInfo.value = await userStore.getProfile()
        logined.value = userStore.logined
    } catch (e) {
        console.log(e)
        logined.value = false
    }
})

const avatarMouseEnter = () => {
    visible.value = true
    avatarHover.value = "hami-avatar-large"
}
const avatarMouseLeave = () => {
    avatarHover.value = "hami-avatar-normal"
    visible.value = false
}

</script>
<template>
    <div class="hami-avatar-wrap">
        <template v-if="logined">
            <div class="hami-avatar-container" :class="avatarHover" ref="avatarRef"
                 @mouseenter="avatarMouseEnter" @mouseleave="avatarMouseLeave">
                <router-link :to="spaceRoute" class="hami-avatar normal">
                    <img :src="userInfo?.avatar || defaultAvatar" alt="" class="avatar">
                </router-link>
                <router-link :to="spaceRoute" class="hami-avatar large">
                    <img :src="userInfo?.avatar || defaultAvatar" alt="" class="avatar">
                </router-link>
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
                        <HeaderUserCard :user-info="userInfo as LoginProfile"></HeaderUserCard>
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
                transition: all .6s;
            }
        }
    }

    .hami-avatar-normal {
        .hami-avatar.large {
            animation: avatarFadeSmall .4s both;
        }
    }

    .hami-avatar.normal {
        animation: fade-in .6s both;
    }

    .hami-avatar.large {
        opacity: 0;
        display: block;
        animation: avatarFadeLarge .6s both;
        width: 84px;
        height: 84px;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 99999;

        img {
            opacity: 0;
            transition: all .6s;
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