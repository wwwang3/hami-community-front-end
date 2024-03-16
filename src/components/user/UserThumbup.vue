<script setup lang="ts">
import { onMounted, ref } from "vue"
import { UserInteractService } from '@/service/modules/interact.ts'
import { HamiScrollListInstance } from '@/components/types'

interface UserArticleProps {
    id: string
}

const $props = defineProps<UserArticleProps>()
const userId = ref($props.id)
const userLikeArticleList = ref<HamiScrollListInstance<Article> | null>(null)

onMounted(() => {
    userLikeArticleList.value?.init()
})

const handleQuery = (current: number, size: number) => {
    return UserInteractService.listUserLikeArticle({
        current: current,
        size: size,
        userId: parseInt(userId.value)
    })
}

</script>
<template>
    <div class="hami-user-article-list">
        <HamiScrollList
            ref="userLikeArticleList"
            :query="handleQuery"
            no-data-text="还没有文章"
            key-property="id"
        >
            <template #item="data">
                <CommonArticleCard :article="data.item" border></CommonArticleCard>
            </template>
        </HamiScrollList>
    </div>
</template>

<style scoped lang="less">
.hami-user-article-list {
    padding-bottom: 20px;
}
</style>