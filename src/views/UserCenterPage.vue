<script setup lang="ts">

import { computed, onBeforeMount } from "vue"
import { useRoute, useRouter } from "vue-router"
import { ArrowLeft, Position, Postcard, Setting, User } from '@element-plus/icons-vue'
import useUserStore from '@/store/modules/user.ts'
import { $message } from '@/utils/message.ts'
//interface

//router, props, inject, provide
const $router = useRouter()
const $route = useRoute()
const userStore = useUserStore()
const activeMode = computed(() => {
    return $route.fullPath
})
//custom var

//life cycle
onBeforeMount(async () => {
})
//watch

//fun
const changeMode = async (path: string) => {
    await $router.replace(path)
}
const goBack = () => {
    $router.replace("/user/space/" + userStore.userInfo.userId)
}
</script>
<template>
    <div class="hami-user-center">
        <div class="user-center-title">
            <div class="content" @click="goBack()">
                <el-icon class="icon" :size="18">
                    <ArrowLeft/>
                </el-icon>
                <span>返回个人主页</span>
            </div>
        </div>
        <div class="user-center-container">
            <div class="user-center-nav">
                <div class="nav-item" :class="{active: activeMode === '/account/profile'}"
                     @click="changeMode('/account/profile')">
                    <el-icon class="icon" size="18">
                        <Postcard/>
                    </el-icon>
                    个人信息
                </div>
                <div class="nav-item" :class="{active: activeMode === '/account/setting'}"
                     @click="changeMode('/account/setting')">
                    <el-icon class="icon" size="18">
                        <User/>
                    </el-icon>
                    账号设置
                </div>
                <div class="nav-item" :class="{active: activeMode === '/account/common'}"
                     @click="changeMode('/account/common')">
                    <el-icon class="icon" size="18">
                        <Setting/>
                    </el-icon>
                    通用设置
                </div>
                <div class="nav-item" :class="{active: activeMode === '/account/record'}"
                     @click="changeMode('/account/record')">
                    <el-icon class="icon" size="18">
                        <Position/>
                    </el-icon>
                    登录记录
                </div>
            </div>
            <div class="user-center-body">
                <router-view v-slot="{ Component }">
                    <Component :is="Component"></Component>
                </router-view>
                <!--                <router-view></router-view>-->
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.hami-user-center {
    margin-top: 20px;

    .user-center-title {
        max-width: 1200px;
        margin: 0 auto;
        background-color: var(--hami-bg);
        border-radius: var(--hami-radius);
        padding: 6px 0 6px 20px;

        .content {
            width: 240px;
            display: flex;
            align-items: center;
            color: var(--hami-text-blue);
            height: 32px;
            cursor: pointer;

            span {
                margin-left: 2px;
                line-height: 31px;
            }
        }
    }

    .user-center-container {
        position: relative;
        max-width: 1200px;
        margin: 24px auto;
        display: flex;

        .hami-user-center-body {
            flex: 1;
        }
    }

    .user-center-nav {
        margin-right: 20px;
        padding: 16px 14px 20px;
        width: 226px;
        min-height: 500px;
        max-height: 500px;
        background-color: var(--hami-bg);
        border-radius: var(--hami-radius-medium);

        .nav-item {
            display: flex;
            align-items: center;
            height: 48px;
            font-size: 16px;
            border-radius: var(--hami-radius-medium);
            cursor: pointer;
            margin-bottom: 6px;
            padding: 6px 0 6px 16px;
            transition: all .3s;

            .icon {
                margin-right: 8px;
            }

        }

        .nav-item:last-child {
            margin-bottom: 0;
        }

        .nav-item:hover {
            color: var(--hami-text-blue);
            background-color: var(--hami-bg-blue);
        }

        .nav-item.active {
            background: var(--hami-bg-blue);
            color: var(--hami-text-blue);
        }
    }

    .user-center-body {
        flex: 1;
    }
}
</style>