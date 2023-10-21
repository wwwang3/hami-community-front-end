<script setup lang="ts">
import { ref, reactive, onMounted, computed } from "vue"
import { useRoute, useRouter } from "vue-router"
import { Search } from '@element-plus/icons-vue'
import { SearchConfig, USearch } from 'undraw-ui'
import * as querystring from 'querystring'
//interface
const config = ref<SearchConfig>({
    search: '', //可选输入框默认值
    keywords: ['斗罗大陆', '斗破苍穹', '吞噬星空', '凡人修仙传', '一念永恒'], // 搜索框关键字滚动
    hotSearchList: [
        '斗罗大陆',
        '斗破苍穹',
        '吞噬星空',
        '凡人修仙传',
        '一念永恒',
        '完美世界',
        '鬼灭之刃',
        '间谍过家家',
        '武动乾坤',
        '神印王座'
    ] // top10 热门搜索 最多显示10条数据
})

const $router = useRouter()


const handleSearch = (val: string) => {
    $router.replace({
        path: "/search",
        query: {
            keyword: val
        }
    })
}
</script>
<template>
    <u-search :config="config" @submit="handleSearch"></u-search>
</template>

<style scoped lang="less">
    .u-search {
        --u-bg-color-overlay: var(--hami-border-color-1);
        :deep(.search) {
            label > input[type=text] {
                line-height: 28px;
            }
            label::before, label::after {
                line-height: 28px;
            }
        }
    }
</style>