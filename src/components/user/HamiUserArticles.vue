<script setup lang="ts">
import { onMounted, ref } from "vue"
import { ArticleService } from '@/service/modules/article.ts'
import { HamiScrollListInstance } from '@/components/types'

//interface
interface UserArticleProps {
    id: string
}

const $props = defineProps<UserArticleProps>()
const spaceUserArticleList = ref<HamiScrollListInstance<Article> | null>(null)

onMounted(() => {
    spaceUserArticleList.value?.init()
})

const handleQuery = (current: number, size: number) => {
    return ArticleService.listUserArticles({
        pageNum: current,
        pageSize: size,
        userId: parseInt($props.id)
    })
}

</script>
<template>
    <div class="hami-user-article-list">
        <HamiScrollList
            ref="spaceUserArticleList"
            :query="handleQuery"
            no-data-text="还没有文章"
            key-property="id"
        >
            <template #item="data">
                <HamiArticleCard :article="data.item" border :show-user="false"></HamiArticleCard>
            </template>
        </HamiScrollList>
    </div>
</template>

<style scoped lang="less">
.hami-user-article-list {
    padding-bottom: 20px;
}
</style>