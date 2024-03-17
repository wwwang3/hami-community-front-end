<script setup lang="ts">
import { onMounted, ref, watch } from "vue"
import { SearchService } from '@/service/modules/search.ts'
import HamiScrollList from '@/components/common/HamiScrollList.vue'
import { HamiScrollListInstance } from '@/components/types'

interface SearchProps {
    keyword: string
}

const $props = defineProps<SearchProps>()


const searchArticleList = ref<HamiScrollListInstance<Article> | null>(null)


onMounted(() => {
    searchArticleList.value?.init()
})

watch(() => $props.keyword, (newVal: string, _oldVal: string) => {
    if (newVal.length < 2) {
        return
    } else {
        searchArticleList.value?.init()
    }
})

const handleQuery = (current: number, size: number) => {
    if ($props.keyword.length < 2) {
        return Promise.reject("关键字最少两个字符~")
    }
    return SearchService.searchArticle({
        current: current,
        size: size,
        keyword: $props.keyword
    })
}


</script>
<template>
    <div class="hami-search-page">
        <div class="container">
            <HamiScrollList
                ref="searchArticleList"
                :size="10"
                :query="handleQuery"
                no-data-text="暂无文章"
                key-property="id"
                immediate-loading
                :show-no-more="false"
            >
                <template #item="{item, index, _delete}">
                    <CommonArticleCard
                        :article="item"
                        highlight-summary
                        highlight-title
                        class="list-item"
                    >
                    </CommonArticleCard>
                </template>
            </HamiScrollList>
        </div>
    </div>
</template>


<style lang="less">
html.dark {
    .hami-search-page {
        .list-item {
            background-color: var(--hami-card-bg);
            border: 1px solid var(--color-9);
        }
    }
}
</style>
<style scoped lang="less">
.hami-search-page {
    margin-top: 40px;
    position: relative;

    .list-item {
        border-radius: var(--hami-radius);
        margin-top: 16px;
        transition: all .3s;
        position: relative;
        z-index: 10;

        &:first-child {
            margin-top: 0;
        }

        &:hover {
            background-color: var(--hami-card-hover-bg);
        }

        &:last-child {
            margin-bottom: 20px;
        }
    }
}
</style>