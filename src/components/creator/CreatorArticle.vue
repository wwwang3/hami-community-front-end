<script setup lang="ts">
import { ref, reactive, onMounted, computed } from "vue"
import { useRoute, useRouter } from "vue-router"
import HamiScrollList from '@/components/common/HamiScrollList.vue'
import { ArticleDraftService } from '@/service/modules/article.ts'
import { $message } from '@/utils/message.ts'
import loadingError from "/assets/load-error.685235d2.png"
//interface

//router, props, inject, provide

//custom var
const creatorArticleList = ref<InstanceType<typeof HamiScrollList> | null>(null)
//life cycle
onMounted(() => {
    creatorArticleList.value?.init()
})
//watch

//fun
const handleQuery = (pageNum: number, pageSize: number): Promise<PageData<ArticleDraftDetail>> => {
    return ArticleDraftService.getArticles(pageNum, pageSize)
}

const handleDelete = async (item: ArticleDraftDetail, index: number) => {
    try {
        await ArticleDraftService.deleteArticle(item.articleId)
        $message.success("删除成功")
        creatorArticleList.value?.deleteItem(item, index)
    } catch (e) {
        console.log(e)
        $message.error("删除失败")
    }
}

</script>
<template>
    <div class="hami-creator-article">
        <HamiScrollList :size="10" :query="handleQuery" ref="creatorArticleList">
            <template #item="{item, index, _delete}">
                <div class="creator-article-list-item">
                    <HamiArticleCardV1 :article="item" :index="index" @delete="handleDelete"></HamiArticleCardV1>
                </div>
            </template>
            <template #error>
                <el-empty :image="loadingError" style="--el-empty-image-width: 200px" description="加载失败"></el-empty>
            </template>
        </HamiScrollList>
    </div>
</template>

<style scoped lang="less">
.hami-creator-article {
    .creator-article-list-item {
        //display: flex;
        //align-items: center;
        //justify-content: center;
        //height: 32px;
        &:last-child {
            margin-bottom: 10px;
        }
    }
}
</style>