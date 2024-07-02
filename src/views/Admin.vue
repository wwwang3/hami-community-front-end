<script setup lang="ts">
import { computed, onMounted, ref, watch, watchEffect } from "vue"
import useUserStore from '@/store/modules/user.ts'
import { RouteLocationMatched, useRoute } from 'vue-router'
//interface

const userStore = useUserStore()
const $route = useRoute()

const frameMode = ref("/admin/stat")
onMounted(() => {
    frameMode.value = $route.matched[1]!.path;
})

watch(() => $route.path, (newValue, _) => {
    if (newValue.includes("/admin/")) {
        let matched: RouteLocationMatched[] = $route.matched
        frameMode.value = matched[1]!.path
    }
})
const handleSelect = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}

</script>
<template>
    <el-container class="hami-admin">
        <el-aside class="hami-admin-aside">
            <el-menu
                :default-active="frameMode"
                class="hami-admin-menu"
                mode="vertical"
                @select="handleSelect"
                background-color="#000"
                text-color="#fff"
                active-text-color="#ffff"
                router
            >
                <el-menu-item index="0" disabled>
                    <div class="logo">
                        <img src="/assets/hami-logo-3.png" style="object-fit: fill;" alt="">
                    </div>
                </el-menu-item>
                <el-menu-item index="/admin/stat">数据统计</el-menu-item>
                <el-menu-item index="/admin/bulletin">公告管理</el-menu-item>
                <el-sub-menu index="content">
                    <template #title>内容管理</template>
                    <el-menu-item index="/admin/article">文章管理</el-menu-item>
                    <el-menu-item index="/admin/reply">评论管理</el-menu-item>
                </el-sub-menu>
                <el-menu-item index="/admin/user">用户管理</el-menu-item>
            </el-menu>
        </el-aside>
        <el-container>
            <el-header class="hami-admin-header">
                <el-page-header>
                    <template #extra>
                        <el-avatar
                            :size="48"
                            class="admin-avatar"
                            :src="userStore.userInfo.avatar"
                        />
                    </template>
                </el-page-header>
            </el-header>
            <el-main class="hami-admin-main">
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<style lang="less">
</style>
<style scoped lang="less">
.hami-admin {
    :deep(.el-menu) {
        --el-menu-item-font-size: 16px;
    }
    .logo {
        display: flex;
        align-items: center;
        width: 100%;

        img {
            height: 36px;
        }
    }
    .hami-admin-aside {
        ul {
            border: none;
        }
        .el-menu-item {
            margin-right: 4px;
        }
        .el-menu-item.is-active {
            background-color: #1677ff;
            border-radius: var(--hami-radius-medium);
        }
        .el-menu-item.is-disabled {
            opacity: 1;
            cursor: pointer;
        }
    }

    .hami-admin-header {
        background-color: var(--hami-bg);
        height: 56px;
        :deep(.el-page-header__left) {
            opacity: 0;
        }
        .el-avatar {
            cursor: pointer;
        }
    }

}

.el-container {
    height: 100vh;
}
.hami-admin-menu {
    height: 100%;
}
</style>