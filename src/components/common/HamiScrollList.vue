<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: "HamiScrollList"
})
</script>

<script setup lang="ts" generic="T">
import { computed, nextTick, reactive, ref } from "vue"
import { useRequest } from '@/hooks'
import { formatDateTime, isEmpty } from '@/utils'
import { noDataImg, loadErrorImg } from "@/store/images.ts"
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
    size?: number,
    noDataText?: string
    keyProperty?: string | undefined,
    showNoMore?: boolean,
    immediateLoading?: boolean,
    timeline?: boolean,
    timestampKey?: string, //timeline为true时, 需要指定timestamp-key
    query: (pageNum: number, pageSize: number) => Promise<PageData<T>>
}

interface ExposeProps {
    init: () => void,
    deleteItem: (item: T, index: number) => void,
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
    let start = Date.now()
    processQuery(page.value.current, page.value.size)
        .then(pageData => {
            page.value.total = pageData.total
            refreshData(pageData.data as any[])
        })
        .catch(e => {
            loadingError.value = true
        })
        .finally(() => {
            inited.value = true
            console.log(`init finish, cost: ${Date.now() - start}ms`)
        })
}
const _delete = async (item: any, index: number) => {
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
    nextTick(() => {
        if (!isEmpty(data)) {
            dataList.push(...data)
        }
    })
}

const formatTime = (time: number | Date) => {
    return formatDateTime(time, "YYYY-MM-DD")
}

type NodeType = "info" | "success"| "danger" | "warning"
const nodeType = ["info", "success", "danger", "warning"]
const randomType = (): NodeType => {
    return nodeType[Math.floor(Math.random() * 4)] as NodeType
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
                <el-empty :image="loadErrorImg"
                          style="--el-empty-image-width: 200px"
                          description="加载失败"
                          class="empty"
                >
                </el-empty>
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
        <el-backtop class="back-top" :right="60" :bottom="64">
            <template #default>
                <el-icon :size="18" color="#1d7dfa">
                    <svg viewBox="0 0 1024 1024"
                         xmlns="http://www.w3.org/2000/svg"
                         data-spm-anchor-id="a313x.7781069.0.i0" width="200" height="200">
                        <path
                            d="M780.288 750.592H244.736V415.744C244.736 229.376 396.288 79.872 460.8 24.576c29.696-24.576 71.68-24.576 101.376 0 65.536 55.296 217.088 204.8 217.088 391.168v334.848z m-453.632-81.92h371.712V415.744c0-150.528-128-277.504-186.368-326.656-57.344 49.152-186.368 176.128-186.368 326.656v252.928zM509.952 87.04z"
                            fill="#1d7dfa"></path>
                        <path
                            d="M326.656 750.592H148.48c-43.008 0-78.848-34.816-78.848-78.848v-76.8c0-26.624 13.312-51.2 34.816-65.536l221.184-146.432v367.616z m-175.104-81.92h92.16v-133.12l-92.16 61.44v71.68zM875.52 750.592H697.344V384l221.184 146.432c22.528 14.336 34.816 38.912 34.816 65.536v76.8c1.024 41.984-34.816 77.824-77.824 77.824z m-96.256-81.92h92.16v-71.68l-92.16-61.44v133.12zM513.024 489.472c-64.512 0-116.736-52.224-116.736-116.736S449.536 256 513.024 256s116.736 52.224 116.736 116.736-52.224 116.736-116.736 116.736z m0-151.552c-18.432 0-34.816 15.36-34.816 34.816s15.36 34.816 34.816 34.816 34.816-15.36 34.816-34.816S532.48 337.92 513.024 337.92zM512 1017.856c-22.528 0-40.96-18.432-40.96-40.96v-163.84c0-22.528 18.432-40.96 40.96-40.96s40.96 18.432 40.96 40.96v163.84c0 22.528-18.432 40.96-40.96 40.96zM351.232 953.344c-22.528 0-40.96-18.432-40.96-40.96v-66.56c0-22.528 18.432-40.96 40.96-40.96s40.96 18.432 40.96 40.96v66.56c0 22.528-18.432 40.96-40.96 40.96zM673.792 953.344c-22.528 0-40.96-18.432-40.96-40.96v-66.56c0-22.528 18.432-40.96 40.96-40.96s40.96 18.432 40.96 40.96v66.56c0 22.528-18.432 40.96-40.96 40.96z"
                        ></path>
                    </svg>
                </el-icon>
            </template>
        </el-backtop>
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
<style>
.back-top {
    width: 48px;
    height: 48px;
}
</style>