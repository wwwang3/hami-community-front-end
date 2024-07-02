<script setup lang="ts">
import { onMounted, ref } from "vue"
import { ArticleDraftService } from '@/service/modules/article.ts'
import { $message } from '@/utils/message.ts'
import HamiArticleDraftCard from '@/components/article/ArticleDraftCard.vue'
import HamiScrollList from '@/components/common/HamiScrollList.vue'
import { HamiScrollListInstance } from '@/components/types'

const creatorDraftList = ref<HamiScrollListInstance<ArticleDraft>>()

onMounted(() => {
    creatorDraftList.value?.init()
})

const handleQuery = (current: number, size: number): Promise<PageData<ArticleDraft>> => {
    return ArticleDraftService.listDraft({
        current, size
    })
}

const handleDelete = async (item: ArticleDraft, index: number) => {
    //删除草稿
    try {
        await ArticleDraftService.deleteOriginDraft(item.id)
        $message.success("删除成功")
        creatorDraftList.value?.deleteItem(item, index)
    } catch (e) {

    }
}

</script>
<template>
    <div class="hami-creator-article">
        <HamiScrollList :size="10" :query="handleQuery" ref="creatorDraftList">
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