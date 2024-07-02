<script setup lang="ts">
import { onMounted, ref } from "vue"
import { useRoute } from "vue-router"
import { TabsPaneContext } from 'element-plus'
import CreatorArticlePanel from '@/components/creator/CreatorArticlePanel.vue'
import CreatorOriginDraft from '@/components/creator/CreatorOriginDraft.vue'


const $route = useRoute()
const activeMode = ref("article")
onMounted(() => {
    changeMode()
})

const changeMode = () => {
    if ($route.name === "CreatorContentArticle" && activeMode.value !== 'article') {
        activeMode.value = "article"
    } else if ($route.name === "CreatorContentDraft" && activeMode.value !== 'draft') {
        activeMode.value = "draft"
    }
}
//fun
const handleChange = async (value: string) => {
}

const handleClick = (pane: TabsPaneContext, ev: Event) => {
}
</script>
<template>
    <div class="card hami-creator-content">
        <el-tabs v-model="activeMode" class="content-tabs"
                 @tab-click="handleClick">
            <el-tab-pane label="文章" name="article">
                <div class="creator-content-body">
                    <CreatorArticlePanel></CreatorArticlePanel>
                </div>
            </el-tab-pane>
            <el-tab-pane label="草稿" name="draft">
                <div class="creator-content-body">
                    <CreatorOriginDraft></CreatorOriginDraft>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<style scoped lang="less">
.hami-creator-content {

    .content-tabs {
        --el-tabs-header-height: 56px;
    }

    :deep(#tab-article) {
        padding-left: 20px;
    }

    :deep(.el-tabs__item) {
        font-size: 16px;
    }

    .creator-content-body {
        min-height: 429px;
    }
}
</style>