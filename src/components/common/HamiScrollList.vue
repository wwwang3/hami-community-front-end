<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
    name: "HamiScrollList"
})
</script>

<script setup lang="ts" generic="T">
import { computed, nextTick, reactive, ref } from "vue"
import { useRequest } from '@/hooks'
import { $message, formatDateTime, isEmpty } from '@/utils'
import { noDataImg, loadErrorImg } from "@/store/images.ts"
import HamiEmpty from '@/components/common/HamiEmpty.vue'
import HamiBackTop from '@/components/common/HamiBackTop.vue'
import { TIMELINE_TAG_NODES, TimelineTagType } from '@/store/modules/category.ts'
export interface ItemType<T> {
    item: T
    index: number
    _delete: (d: T, i: number) => void
}
interface Page {
    current: number
    size: number
    total: number
}

interface ScrollListProps {
    size?: number
    noDataText?: string
    keyProperty?: string | undefined
    showNoMore?: boolean
    immediateLoading?: boolean
    timeline?: boolean
    timestampKey?: string //timeline为true时, 需要指定timestamp-key
    query: (current: number, size: number) => Promise<PageData<T>>
}

interface ExposeProps {
    init: () => void
    deleteItem: (item: T, index: number) => void
    /**
     * 根据ID删除，id根据keyProperty确定
     * @param id
     */
    delete: (id: string | number) => void
}

const slots = defineSlots<{
    item(props: ItemType<T>): any,
    empty(props: any): any,
    noMore(props: any): any,
    error(props: any): any,
}>()

defineExpose<ExposeProps>({
    init() {
        _init()
    },
    deleteItem(item: T, index: number): void {
        _delete(item, index)
    },
    delete(id: string | number): void {
        handleDelete(id)
    }
})

const $props = withDefaults(defineProps<ScrollListProps>(), {
    size: 10,
    noDataText: "还没有数据",
    showNoMore: false,
    immediateLoading: false,
    timeline: false,
    timestampKey: "ctime",
    keyProperty: "id"
})

const dataList = reactive<Array<any>>([])

const [onLoadingMore, processQuery] = useRequest<PageData<T>, [number, number]>({
    loading: $props.immediateLoading,
    run: (...params) => handleRun(...params)
})

const inited = ref(false)
const page = ref<Page>({
    current: 1,
    size: Math.max(5, Math.min($props.size, 20)),
    total: 0
})
const loadingError = ref(false)

/**
 * 是否还有更多数据
 */
const hasMore = ref(true)

const calcHasMore = (data: any[]) => {
    if (page.value.total === -1) {
        return !isEmpty(data) && data.length == page.value.size
    }
    return page.value.current < Math.ceil(page.value.total / page.value.size)
}

/**
 * 禁止滚动
 */
const disableScroll = computed(() => {
    return !hasMore.value || onLoadingMore.value || loadingError.value
})

const showEmpty = computed(() => {
    return inited.value && dataList.length === 0
})

const showError = computed(() => {
    return inited.value && !onLoadingMore.value && loadingError.value
})


const _init = () => {
    page.value.current = 1
    page.value.total = 0
    page.value.size = $props.size
    inited.value = false
    dataList.splice(0, dataList.length)
    onLoadingMore.value = true
    hasMore.value = true
    let start = Date.now()
    processQuery(page.value.current, page.value.size)
        .then(pageData => {
            page.value.total = pageData.total
            refreshData(pageData.data as any[])
        })
        .catch(e => {
            if (typeof e === "string") {
                $message.error(e)
            }
            loadingError.value = true
        })
        .finally(() => {
            inited.value = true
            console.log(`init finish, cost: ${Date.now() - start}ms`)
        })
}
const _delete = async (_item: any, index: number) => {
    if (dataList.length > 0) {
        dataList.splice(index, 1)
    }
}

const handleDelete = (id: string | number) => {
    if (isEmpty(dataList)) return
    if (!$props.keyProperty) return
    // @ts-ignore
    let index = dataList.findIndex(item => item[$props.keyProperty] == id)
    if (index != -1) {
        dataList.splice(index, 1)
    }
}

const handleRun = (...params: [number, number]) => {
    return $props.query(...params)
}

const handleScroll = async () => {
    if (onLoadingMore.value || !hasMore.value) {
        return
    }
    page.value.current++
    try {
        let pageData: PageData<T> = await processQuery(page.value.current, page.value.size)
        refreshData(pageData.data ?? [])
    } catch (e) {
        loadingError.value = true
    }
}
const refreshData = (data: T[]) => {
    hasMore.value = calcHasMore(data)
    if (!isEmpty(data)) {
        dataList.push(...data)
    }
}

const formatTime = (time: number | Date) => {
    return formatDateTime(time, "YYYY-MM-DD")
}
const randomType = (): TimelineTagType => {
    return TIMELINE_TAG_NODES[Math.floor(Math.random() * TIMELINE_TAG_NODES.length)]
}

</script>
<template>
    <div class="hami-scroll-list">
        <div class="scroll-list-body"
             v-infinite-scroll="handleScroll"
             :infinite-scroll-disabled="disableScroll"
        >
            <template v-if="!timeline">
                <template v-for="(item, index) in dataList"
                          :key="item[keyProperty] ?? index">
                    <slot name="item" v-bind="{item, index, _delete} as ItemType<T>"></slot>
                </template>
            </template>
            <template v-else>
                <el-timeline>
                    <template v-for="(item, index) in dataList"
                              :key="keyProperty === undefined ? index : `${item[$props.keyProperty]}`">
                        <el-timeline-item
                            placement="top"
                            :timestamp="formatTime(item[timestampKey])"
                            :type="randomType()"
                        >
                            <slot name="item" v-bind="{item, index, _delete} as ItemType<T>"></slot>
                        </el-timeline-item>
                    </template>
                </el-timeline>
            </template>
        </div>
        <el-skeleton :rows="3" animated :throttle="200" :loading="onLoadingMore"></el-skeleton>
        <div v-show="showError">
            <slot name="error">
                <HamiEmpty :image="loadErrorImg" description="加载失败" :image-size="200"></HamiEmpty>
            </slot>
        </div>
        <div v-show="showNoMore && !hasMore && !showEmpty && !onLoadingMore">
            <slot name="noMore">
                <div class="no-more">
                    我是有底线的~
                </div>
            </slot>
        </div>
        <div v-if="showEmpty && !loadingError">
            <slot name="empty">
                <HamiEmpty :description="noDataText" :image="noDataImg" :image-size="180"></HamiEmpty>
            </slot>
        </div>
        <HamiBackTop :right="60" :bottom="64" :size="48" :icon-size="18"></HamiBackTop>
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

    :deep(.el-skeleton) {
        background-color: var(--hami-bg);
        border-radius: var(--hami-radius);
        padding: 20px;
        margin-bottom: 20px;
    }
}
</style>
