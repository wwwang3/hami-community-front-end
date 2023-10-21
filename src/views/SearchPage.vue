<script setup lang="ts">
import { ref, reactive, onMounted, computed, watch } from "vue"
import { useRoute, useRouter } from "vue-router"
import { useRequest } from '@/hooks'
import HamiScrollList from '@/components/common/HamiScrollList.vue'
import { isEmpty } from '@/utils'
import { SearchService } from '@/service/modules/search.ts'

interface SearchProps {
    keyword: string
}

const $props = defineProps<SearchProps>()

// @ts-ignore
const searchArticleList = ref<InstanceType<typeof HamiScrollList> | null>(null)


onMounted(() => {
    searchArticleList.value?.init()
})

onMounted(() => {
    console.log($props)
})

watch(() => $props.keyword, (newVal: string, oldVal: string) => {
    if (isEmpty(newVal)) {
        return
    } else {
        searchArticleList.value?.init()
    }
})

const handleQuery = (current: number, size: number) => {
    return SearchService.searchArticle({
        pageNum: current,
        pageSize: size,
        keyword: $props.keyword
    })
}


</script>
<template>
    <div class="hami-search-page">
        <div class="container">
            <HamiScrollList
                ref="searchArticleList"
                :size="20"
                :query="handleQuery"
                no-data-text="暂无文章"
                key-property="id"
                immediate-loading
            >
                <template #item="{item, index, _delete}">
                    <HamiArticleCard :article="item" highlight-summary highlight-title class="list-item">
                    </HamiArticleCard>
                </template>
            </HamiScrollList>
        </div>
    </div>
</template>

<style scoped lang="less">
.hami-search-page {
    margin-top: 40px;

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