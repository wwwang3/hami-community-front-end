<script setup lang="ts">
import { onMounted, ref, watch } from "vue"
import { RouteLocationMatched, useRoute, useRouter } from "vue-router"
//interface

//router, props, inject, provide
const $router = useRouter()
const $route = useRoute()
//custom var
const menuStyle = {
    "--el-menu-text-color": "#515767",
    "--el-menu-active-color": "#1e80ff",
    "--active-bg-color": "#eaf2ff",
    "--el-menu-item-font-size": "16px",
    "--el-menu-hover-bg-color": ""
}

const frameMode = ref("/creator/home")

onMounted(() => {
    frameMode.value = $route.matched[1]!.path;
    console.log("Creator mounted");
})
//life cycle

//watch
watch(() => $route.path, (newValue, oldValue) => {
    // frameMode.value = newValue
    let matched: RouteLocationMatched[] = $route.matched
    frameMode.value = matched[1]!.path

})
//fun
const handleSelect = (index: string, indexPath: string) => {
    console.log("handle Select");
    console.log(index, indexPath);
    $router.push(index)
}

const handleOpen = () => {

}
const handleClose = () => {

}

const handleClick = () => {

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
                    @close="handleClose" :style="menuStyle">
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
        max-width: 1120px;
        margin: 0 auto;
        display: flex;
        //justify-content: space-between;
    }

    .creator-nav {
        min-width: 240px;
        background-color: var(--hami-bg);
        padding: 16px 16px;
        min-height: 500px;
        border-radius: var(--hami-radius);
        .creator-nav-title {
            width: 100%;
            margin-bottom: 20px;
        }
        .el-menu {
            border: none;
        }
        .el-menu-item {
            border-radius: var(--hami-radius-small);
            //margin-bottom: 6px;
        }
        :deep(.el-sub-menu) {
            .el-menu-item:last-child {
                margin-bottom: 0;
            }
        }
        .el-sub-menu {
            .el-menu-item {
                padding-left: calc(var(--el-menu-base-level-padding) + var(--el-menu-level) * var(--el-menu-level-padding) + 8px);            }
        }
        :deep(.el-menu-item.is-active ) {
            background-color: var(--active-bg-color);
        }
        :deep(.el-sub-menu.is-active .el-sub-menu__title) {
            color: var(--el-menu-active-color);
        }
        :deep(.el-sub-menu__icon-arrow) {
            font-size: 16px;
        }
    }

    .creator-body {
        flex: 1;
        margin-left: 32px;
    }
}
</style>