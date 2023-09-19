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

//router, props, inject, provide
const tokenStore = useTokenStore()
const userStore = useUserStore()
const cateStore = useCateStore()
const $route = useRoute()
//custom var
const cateId = ref<number>(-1)
const cates = cateStore.cates

// @ts-ignore
const articleList = ref<InstanceType<typeof HamiScrollList> | null>(null)
//life cycle
onMounted(() => {
    resolveCateId($route.path)
    articleList.value?.init()
})


//watch
watch(() => $route.path, (newVal: string, oldVal: string) => {
    console.log(newVal, oldVal)
    resolveCateId(newVal)
    articleList.value?.init()
})
//fun

const resolveCateId = (path: string) => {
    if (path in cates && cates[path as CateRoutePath] !== cateId.value) {
        cateId.value = cates[path as CateRoutePath]
    }
}
const getArticles = async (pageNum: number, pageSize: number): Promise<PageData<Article>> => {
    return ArticleService.listRecommendArticles({
        pageNum: pageNum,
        pageSize: pageSize,
        cateId: cateId.value
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