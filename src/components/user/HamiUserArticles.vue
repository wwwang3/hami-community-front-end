<script setup lang="ts">
import { onMounted, ref } from "vue"
import { useRoute } from "vue-router"
import { useRequest } from '@/hooks'
import { ArticleService } from '@/service/modules/article.ts'

//interface
interface UserArticleProps {
    id: string
}

const [onLoading, getUserArticles] = useRequest<PageData<Article>, [UserArticleParam]>({
    loading: true,
    run: (...params) => ArticleService.listUserArticles(...params)
})
//router, props, inject, provide
const $props = defineProps<UserArticleProps>()
const $route = useRoute()
const userId = ref($props.id)
const userArticleList = ref()

onMounted(() => {
    console.log(userId)
    userArticleList.value?.init()
})

const handleQuery = (current: number, size: number) => {
    return getUserArticles({
        pageNum: current,
        pageSize: size,
        userId: parseInt(userId.value)
    })
}

</script>
<template>
    <div class="hami-user-article-list">
        <HamiScrollList
            ref="userArticleList"
            :query="handleQuery"
            no-data-text="还没有文章"
            key-property="id"
            :show-no-more="false"
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