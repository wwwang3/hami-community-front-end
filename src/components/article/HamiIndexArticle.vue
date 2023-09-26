<script setup lang="ts">
import { ref, reactive, onMounted, computed, watch } from "vue"
import { useTokenStore } from '@/store/modules/token.ts'
import useUserStore from '@/store/modules/user.ts'
import { CateRoutePath, useCateStore } from '@/store/modules/category.ts'
import { useRoute } from 'vue-router'
import { ArticleService } from '@/service/modules/article.ts'
import HamiScrollList from '@/components/common/HamiScrollList.vue'
import HamiArticleCard from '@/components/article/HamiArticleCard.vue'
//interface
interface IndexArticleProps {
    cateId: number
}
const $props = withDefaults(defineProps<IndexArticleProps>(), {
    cateId: -1
})
//router, props, inject, provide
const tokenStore = useTokenStore()
const userStore = useUserStore()
const cateStore = useCateStore()
const $route = useRoute()
//custom var
const cateId = ref<number>(-1)

// @ts-ignore
const articleList = ref<InstanceType<typeof HamiScrollList> | null>(null)
//life cycle
onMounted(() => {
    articleList.value?.init()
})

watch(() => $props.cateId, (newVal, oldVal) => {
    articleList.value?.init()
})

//fun
const getArticles = async (pageNum: number, pageSize: number): Promise<PageData<Article>> => {
    return ArticleService.listNewestArticles({
        pageNum: pageNum,
        pageSize: pageSize,
        cateId: $props.cateId
    })
}
</script>
<template>
    <div class="hami-recommend-list">
        <HamiScrollList
            :size="20"
            no-data-text="还没有文章"
            key-property="articleId"
            :query="getArticles"
            ref="articleList"
        >
            <template #item="{item, index, _delete}">
                <HamiArticleCard :article="item" class="list-item"></HamiArticleCard>
            </template>
        </HamiScrollList>
    </div>
</template>

<style scoped lang="less">
    .hami-recommend-list {
        .list-item {
            border-radius: var(--hami-radius);
            margin-top: 16px;
            transition: all .3s;
            &:first-child {
                margin-top: 0;
            }
            &:hover {
                box-shadow: var(--el-box-shadow);
            }
            &:last-child {
                margin-bottom: 20px;
            }
        }
    }
</style>