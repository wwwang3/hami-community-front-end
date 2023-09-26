<script setup lang="ts">
import { ref, reactive, onMounted, computed } from "vue"
import { useRoute, useRouter } from "vue-router"
import { useRequest } from '@/hooks'
import { ArticleService } from '@/service/modules/article.ts'
import { UserInteractService } from '@/service/modules/interact.ts'

//interface
interface UserArticleProps {
    id: string
}

//router, props, inject, provide
const $props = defineProps<UserArticleProps>()
const $route = useRoute()
const userId = ref($props.id)
const userArticleList = ref()

onMounted(() => {
    console.log(userId)
    userArticleList.value?.init()
})
//custom var

//life cycle

//watch

//fun
const handleQuery = (current: number, size: number) => {
    return UserInteractService.listUserLikeArticle({
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
                <HamiArticleCard :article="data.item" border></HamiArticleCard>
            </template>
        </HamiScrollList>
    </div>
</template>

<style scoped lang="less">
.hami-user-article-list {
    padding-bottom: 20px;
}
</style>