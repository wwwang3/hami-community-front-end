<script setup lang="ts">
import { ref, reactive, onMounted, computed } from "vue"
import { useRoute, useRouter } from "vue-router"
//interface

//router, props, inject, provide

//custom var
const activeMode = ref("state-1")

//life cycle

//watch

//fun
const handleClick = (pane: any) => {
    // ignore it
}
</script>
<template>
    <el-tabs v-model="activeMode" class="content-article-tabs"
             @tab-click="handleClick" type="border-card">
        <el-tab-pane label="已发布" name="state-1">
            <CreatorArticle :state="1"></CreatorArticle>
        </el-tab-pane>
        <el-tab-pane label="审核中" name="state-2">
            <CreatorArticle :state="2"></CreatorArticle>
        </el-tab-pane>
        <el-tab-pane label="未通过" name="state-3">
            <CreatorArticle :state="3"></CreatorArticle>
        </el-tab-pane>
    </el-tabs>
</template>

<style scoped lang="less">
.content-article-tabs {
    :deep(#tab-state-1) {
        padding-left: 20px;
    }
    :deep(.el-tabs__item) {
        font-size: 14px !important;
    }
    border-left: none !important;
    border-right: none !important;
    border-bottom: none;
}
</style>