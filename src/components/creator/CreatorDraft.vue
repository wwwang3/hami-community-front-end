<script setup lang="ts">
import { onMounted, ref } from "vue"
import HamiScrollList from '@/components/common/HamiScrollList.vue'
import { ArticleDraftService } from '@/service/modules/article.ts'
import { $message } from '@/utils/message.ts'
import { HamiScrollListInstance } from '@/components/types'
import HamiArticleDraftCard from '@/components/article/HamiArticleDraftCard.vue'

const creatorDraftList = ref<HamiScrollListInstance<ArticleDraftDetail>>()

onMounted(() => {
    creatorDraftList.value?.init()
})

const handleQuery = (pageNum: number, pageSize: number): Promise<PageData<ArticleDraftDetail>> => {
    return ArticleDraftService.getDrafts(pageNum, pageSize)
}

const handleDelete = async (item: ArticleDraftDetail, index: number) => {
    //删除草稿
    try {
        await ArticleDraftService.deleteDraft(item.id)
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
                    <HamiArticleDraftCard :article="item" :index="index" @delete="handleDelete"></HamiArticleDraftCard>
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