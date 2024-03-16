<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue"
import { ArticleService } from '@/service/modules/article.ts'
import HamiScrollList, { ItemType } from '@/components/common/HamiScrollList.vue'
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
        ArticleService.listNewestArticle({
            current: pageNum,
            size: pageSize,
            cateId: $props.cateId
        }).then(data => {
            setTimeout(() => {
                resolve(data)
            }, 500)
        }).catch(err => {
            reject(err)
        })
    })
}
</script>
<template>
    <HamiScrollList
        :size="20"
        no-data-text="还没有文章"
        key-property="id"
        :query="getArticles"
        ref="articleList"
        immediate-loading
    >
        <template #item="{item, index, _delete}: ItemType<Article>">
            <IndexArticleCard :article="item" :reverse="item.id % 3 === 0" :show-cate="showCate"></IndexArticleCard>
        </template>
    </HamiScrollList>
</template>

<style scoped lang="less">

</style>