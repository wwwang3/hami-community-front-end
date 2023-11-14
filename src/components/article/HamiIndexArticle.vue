<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue"
import { ArticleService } from '@/service/modules/article.ts'
import HamiScrollList from '@/components/common/HamiScrollList.vue'
import HamiArticleCard from '@/components/article/HamiArticleCard.vue'
import { HamiScrollListInstance } from '@/components/types'

interface IndexArticleProps {
    cateId: number
}
const $props = withDefaults(defineProps<IndexArticleProps>(), {
    cateId: -1
})


const articleList = ref<HamiScrollListInstance<Article>>()


onMounted(() => {
    articleList.value?.init()
})

watch(() => $props.cateId, (newVal, oldVal) => {
    articleList.value?.init()
})

const showCate = computed(() => {
    return $props.cateId === -1
})

//fun
const getArticles = async (pageNum: number, pageSize: number): Promise<PageData<Article>> => {
    return new Promise((resolve, reject) => {
        let promise = ArticleService.listNewestArticles({
            pageNum: pageNum,
            pageSize: pageSize,
            cateId: $props.cateId
        })
        setTimeout(() => {
            resolve(promise)
        }, 1000)
    })
}
</script>
<template>
    <div class="hami-recommend-list">
        <HamiScrollList
            :size="20"
            no-data-text="还没有文章"
            key-property="id"
            :query="getArticles"
            ref="articleList"
            immediate-loading
        >
            <template #item="{item, index, _delete}">
                <HamiArticleCard :article="item" :show-cate="showCate" class="list-item"></HamiArticleCard>
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