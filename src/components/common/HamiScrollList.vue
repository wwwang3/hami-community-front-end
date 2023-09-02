<script setup lang="ts">
import { ref, reactive, onMounted, computed, nextTick } from "vue"
import { useRequest } from '@/hooks'
import { isEmpty } from '@/utils'
import noDataImg from "/assets/nodata02.png"
import fetchErrorImg from "/assets/load-error.685235d2.png"
//interface
interface Page {
    current: number
    size: number
    total: number
}

interface ScrollListProps {
    size?: number,
    noDataText?: string
    keyProperty?: string | undefined,
    query: (pageNum: number, pageSize: number) => Promise<PageData<any>>
}

interface ExposeProps {
    init: () => void,
    deleteItem: (item: any, index: number) => void
}

const $props = withDefaults(defineProps<ScrollListProps>(), {
    size: 10,
    noDataText: "还没有数据"
})
const dataList = reactive<Array<any>>([])
const [onLoadingMore, processQuery] = useRequest({
    run: (...params) => handleRun(...params)
})
const inited = ref(false)
const page = ref<Page>({
    current: 1,
    size: $props.size < 5 ? 5 : $props.size,
    total: 0
})
const loadingError = ref(false)

/**
 * 是否还有更多数据
 */
const hasMore = computed(() => {
    return page.value.current < Math.ceil(page.value.total / page.value.size)
})

/**
 * 禁止滚动
 */
const disableScroll = computed(() => {
    return !hasMore.value || onLoadingMore.value || loadingError.value
})

const showEmpty = computed(() => {
    return inited.value && dataList.length === 0
})

defineExpose<ExposeProps>({
    init() {
        _init()
    },
    deleteItem(item: any, index: number): void {
        _delete(item, index)
    },

})

//life cycle
onMounted(() => {
    console.debug("HamiScrollList mounted")
})
//watch
const _init = () => {
    page.value.current = 1
    page.value.total = 0
    page.value.size = $props.size
    inited.value = false
    dataList.splice(0, dataList.length)
    processQuery(page.value.current, page.value.size)
        .then(pageData => {
            console.log(pageData)
            page.value.size = pageData.pageSize
            page.value.total = pageData.total
            refreshData(pageData.data as any[])
        })
        .catch(e => {
            console.log(e)
            loadingError.value = true
        })
        .finally(() => {
            inited.value = true
            console.log("init finish")
        })
}
const _delete = async (item: any, index: number) => {
    if (dataList.length > 0) {
        dataList.splice(index, 1)
    }
}
//@ts-ignore
const handleRun = (...params) => {
    console.log(params)
    let promise = $props.query(page.value.current, page.value.size)
    console.log(promise)
    return promise
}

const handleScroll = async () => {
    if (onLoadingMore.value || !hasMore.value) {
        return
    }
    page.value.current++
    try {
        let pageData: PageData<any> = await processQuery([page.value.current, page.value.size])
        page.value.size = pageData.pageSize
        refreshData(pageData.data as any[])
    } catch (e) {
        //出错了
        console.log(e)
        loadingError.value = true
    }
}
const refreshData = (data: any[]) => {
    nextTick(() => {
        if (!isEmpty(data)) {
            dataList.push(...data)
        }
    })
}
</script>
<template>
    <div class="hami-scroll-list">
        <div class="scroll-list-body"
             v-infinite-scroll="handleScroll"
             :infinite-scroll-disabled="disableScroll"
        >
            <template v-for="(item, index) in dataList"
                      :key="keyProperty === undefined ? index : `${item[$props.keyProperty]}`">
                <slot name="item" v-bind="{item, index, _delete}"></slot>
            </template>
        </div>
        <el-skeleton :rows="4" animated v-if="onLoadingMore"></el-skeleton>
        <div v-show="loadingError">
            <slot name="error">
                <el-empty :image="fetchErrorImg" style="--el-empty-image-width: 200px" description="加载失败"></el-empty>
            </slot>
        </div>
        <div v-show="!hasMore && !showEmpty && !onLoadingMore">
            <slot name="no-more">
                <div class="no-more">
                    我是有底线的~
                </div>
            </slot>
        </div>
        <div v-if="showEmpty && !loadingError">
            <slot name="empty">
                <el-empty :description="noDataText" :image="noDataImg"></el-empty>
            </slot>
        </div>
    </div>
</template>

<style scoped lang="less">
.hami-scroll-list {
    position: relative;
    min-height: 320px;

    .no-more {
        height: 24px;
        line-height: 24px;
        text-align: center;
        color: var(--hami-text-3);
        font-size: 14px;
    }
    :deep(.el-empty) {
        --el-empty-image-width: 180px;
    }
}
</style>