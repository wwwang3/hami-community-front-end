<script setup lang="ts">
import { onMounted, ref } from "vue"
import { ArticleDraftService } from '@/service/modules/article.ts'
import { $message } from '@/utils/message.ts'
import HamiScrollList from '@/components/common/HamiScrollList.vue'
import HamiArticleDraftCard from '@/components/article/HamiArticleDraftCard.vue'
import { HamiScrollListInstance } from '@/components/types'

const creatorArticleList = ref<HamiScrollListInstance<ArticleDraftDetail>>()

onMounted(() => {
    creatorArticleList.value?.init()
})

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
        <HamiScrollList :size="10" :query="handleQuery" ref="creatorArticleList" key-property="id">
            <template #item="{item, index, _delete}">
                <div class="creator-article-list-item">
                    <HamiArticleDraftCard :draft="item" :index="index" @delete="handleDelete"></HamiArticleDraftCard>
                </div>
            </template>
        </HamiScrollList>
    </div>
</template>

<style scoped lang="less">
.hami-creator-article {
    .creator-article-list-item {
        &:last-child {
            margin-bottom: 10px;
        }
    }
}
</style>