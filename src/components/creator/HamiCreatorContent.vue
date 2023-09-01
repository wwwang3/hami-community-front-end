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

const changeMode = () => {
    if ($route.name === "CreatorContentArticle" && activeMode.value !== 'article') {
        activeMode.value = "article"
    } else if ($route.name === "CreatorContentDraft" && activeMode.value !== 'draft'){
        activeMode.value = "draft"
    }
}
//fun
const handleChange =  async (value: string) => {
}

const handleClick = (pane: TabsPaneContext, ev: Event) => {
}
</script>
<template>
<div class="hami-creator-content">
    <el-tabs v-model="activeMode" class="content-tabs"
             @tab-click="handleClick"
             @tab-change="handleChange">
        <el-tab-pane label="文章" name="article">
            <div class="creator-content-body">
                <CreatorArticle></CreatorArticle>
            </div>
        </el-tab-pane>
        <el-tab-pane label="草稿" name="draft">
            <div class="creator-content-body">
                <CreatorDraft></CreatorDraft>
            </div>
        </el-tab-pane>
    </el-tabs>
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
        min-height: 429px;
    }
}
</style>