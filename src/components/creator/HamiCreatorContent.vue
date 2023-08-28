<script setup lang="ts">
import { ref, reactive, onMounted, computed, watch } from "vue"
import { RouteParams, RouteRecordName, useRoute, useRouter } from "vue-router"
import { TabsPaneContext } from 'element-plus'
//interface

//router, props, inject, provide
const $route = useRoute()
const $router = useRouter()
//custom var
const activeMode = ref("article")
onMounted(() => {
    changeMode()
})
//life cycle
watch(() => $route.path, (newValue, oldValue) => {
    if (/\/creator\/content\/(article|draft)/.test(newValue)) {
        changeMode()
    }
})

const changeMode = () => {
    if ($route.name === "CreatorContentArticle" && activeMode.value !== 'article') {
        activeMode.value = "article"
    } else if ($route.name === "CreatorContentDraft" && activeMode.value !== 'draft'){
        activeMode.value = "draft"
    }
}
//fun
const handleChange =  async (value: string) => {
    await $router.replace("/creator/content/" + activeMode.value)
}

const handleClick = (pane: TabsPaneContext, ev: Event) => {
    console.log(activeMode.value)
}
</script>
<template>
<div class="hami-creator-content">
    <el-tabs v-model="activeMode" class="content-tabs"
             @tab-click="handleClick"
             @tab-change="handleChange">
        <el-tab-pane label="文章" name="article"></el-tab-pane>
        <el-tab-pane label="草稿" name="draft"></el-tab-pane>
    </el-tabs>
    <div class="creator-content-body">
        <router-view></router-view>
    </div>
</div>
</template>

<style scoped lang="less">
.hami-creator-content {
    background-color: var(--hami-bg);
    border-radius: var(--hami-radius);
    .content-tabs {
        --el-tabs-header-height: 56px;
    }
    :deep(#tab-article) {
        padding-left: 20px;
    }
    :deep(.el-tabs__item) {
        font-size: 16px;
    }
    :deep(.el-tabs__content) {
        //display: none;
    }
    .creator-content-body {
        min-height: 400px;
    }
}
</style>