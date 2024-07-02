<script setup lang="ts">
import { onMounted, ref } from "vue"
import { ArticleDraftService } from '@/service/modules/article.ts'
import { $message } from '@/utils/message.ts'
import HamiScrollList from '@/components/common/HamiScrollList.vue'
import HamiArticleDraftCard from '@/components/article/ArticleDraftCard.vue'
import { HamiScrollListInstance } from '@/components/types'

interface CreatorArticleProps {
    state: 1 | 2 | 3
}

const $props = defineProps<CreatorArticleProps>()

const creatorArticleList = ref<HamiScrollListInstance<ArticleDraft>>()

onMounted(() => {
    creatorArticleList.value?.init()
})

const handleQuery = (current: number, size: number): Promise<PageData<ArticleDraft>> => {
    return ArticleDraftService.listDraft({
        current: current,
        size: size,
        state: $props.state
    })
}

const handleDelete = async (item: ArticleDraft, index: number) => {
    try {
        await ArticleDraftService.deleteArticle(item.id)
        $message.success("删除成功")
        creatorArticleList.value?.deleteItem(item, index)
    } catch (e) {
        console.error(e)
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

    :deep(.hami-empty) {
        border: none !important;
    }
}
</style>