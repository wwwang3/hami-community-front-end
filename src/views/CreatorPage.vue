<script setup lang="ts">
import { onMounted, ref, watch } from "vue"
import { NavigationFailure, RouteLocationMatched, useRoute, useRouter } from "vue-router"
import { Grid, HomeFilled, QuestionFilled, Tools } from '@element-plus/icons-vue'
import { MenuItemClicked } from 'element-plus'

const $router = useRouter()
const $route = useRoute()
const frameMode = ref("/creator/home")

onMounted(() => {
    frameMode.value = $route.matched[1]!.path;
})

watch(() => $route.path, (newValue, _) => {
    if (newValue.includes("/creator/")) {
        let matched: RouteLocationMatched[] = $route.matched
        frameMode.value = matched[1]!.path
    }
})

const handleSelect = (index: string, _indexPath: string[], _item: MenuItemClicked,
                      _routeResult?: Promise<void | NavigationFailure> | undefined): any => {
    $router.push(index)
}

const handleOpen = () => {

}
const handleClose = () => {

}

const handleClick = () => {
    $router.replace("/editor/drafts/new")
}

</script>
<template>
    <div class="hami-creator">
        <div class="hami-creator-container">
            <div class="creator-nav">
                <el-button class="creator-nav-title" type="primary" size="large" @click="handleClick">写文章</el-button>
                <el-menu
                    :default-active="frameMode"
                    @select="handleSelect"
                    @open="handleOpen"
                    @close="handleClose">
                    <el-menu-item index="/creator/home">
                        <el-icon>
                            <HomeFilled/>
                        </el-icon>
                        <span>首页</span>
                    </el-menu-item>
                    <el-sub-menu index="/creator/content-menu">
                        <template #title>
                            <el-icon>
                                <Grid/>
                            </el-icon>
                            <span>内容管理</span>
                        </template>
                        <el-menu-item index="/creator/content">
                            <span>文章管理</span>
                        </el-menu-item>
                    </el-sub-menu>
                    <el-sub-menu index="/creator/tool">
                        <template #title>
                            <el-icon>
                                <Tools/>
                            </el-icon>
                            <span>创作工具</span>
                        </template>
                        <el-menu-item index="/creator/tool/import">
                            <span>文章导入</span>
                        </el-menu-item>
                    </el-sub-menu>
                    <el-sub-menu index="/creator/help">
                        <template #title>
                            <el-icon>
                                <QuestionFilled/>
                            </el-icon>
                            <span>帮助中心</span>
                        </template>
                        <el-menu-item index="/creator/help/question">
                            <span>常见问题</span>
                        </el-menu-item>
                    </el-sub-menu>
                </el-menu>
            </div>
            <div class="creator-body">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.hami-creator {
    margin-top: 40px;

    .hami-creator-container {
        max-width: 1100px;
        margin: 0 auto;
        display: flex;
    }

    .creator-nav {
        min-width: 220px;
        background-color: var(--hami-bg);
        padding: 16px 16px;
        height: 500px;
        border-radius: var(--hami-radius);

        .creator-nav-title {
            width: 100%;
            margin-bottom: 20px;
        }

        .el-menu {
            border: none;
            --el-menu-text-color: var(--hami-menu-text-color);
        }

        .el-menu-item {
            border-radius: var(--hami-radius-small);
            margin-bottom: 3px;
        }

        .el-menu-item:hover {
            background-color: var(--hami-menu-active-bg);
        }

        .el-menu-item.is-active {
            background-color: var(--hami-menu-active-bg);
            color: var(--hami-menu-active-text-color);
        }

        :deep(.el-sub-menu__title) {
            margin-bottom: 3px;
        }

        :deep(.el-sub-menu__title:hover) {
            border-radius: var(--hami-radius-small);
            background-color: var(--hami-menu-active-bg);
        }

        .el-sub-menu {

            .el-menu-item {
                padding-left: calc(var(--el-menu-base-level-padding) + var(--el-menu-level) * var(--el-menu-level-padding) + 8px);
            }
        }


        :deep(.el-sub-menu__icon-arrow) {
            font-size: 16px;
        }
    }

    .creator-body {
        flex: 1;
        margin-left: 32px;
        margin-bottom: 20px;
    }
}
</style>