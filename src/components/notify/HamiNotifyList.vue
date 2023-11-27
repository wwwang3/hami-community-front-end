<script setup lang="ts">
import { onMounted, provide, ref, watch } from "vue"
import { NotifyService } from '@/service/modules/notify.ts'
import { HamiScrollListInstance } from '@/components/types'
import { ItemType } from '@/components/common/HamiScrollList.vue'
import { NOTIFY_LIST_REF } from '@/store/keys.ts'

interface NotifyListProps {
    notifyType: Exclude<keyof NotifyCountItem, "im">
}

const slots = defineSlots<{
    notify(props: ItemType<NotifyMsg>): any
}>()

const $props = defineProps<NotifyListProps>()
const notifyRef = ref<HamiScrollListInstance<NotifyMsg> | null>(null)

provide<typeof notifyRef>(NOTIFY_LIST_REF, notifyRef)

onMounted(() => {
    notifyRef.value?.init()
})

watch(() => $props.notifyType, (newVal) => {
    notifyRef.value?.init()
})

const handleQuery = async (current: number, size: number) => {
    return NotifyService.queryNotify($props.notifyType, {
        pageNum: current,
        pageSize: size
    })
}
</script>
<template>
    <HamiScrollList
        ref="notifyRef"
        key-property="id"
        :query="handleQuery"
        immediate-loading
        :size="20"
        no-data-text="然而并没有数据"
        class="hami-notify-list"
    >
        <template #item="scope">
            <slot name="notify" v-bind="scope"></slot>
        </template>
    </HamiScrollList>
</template>

<style lang="less">
.hami-notify-list {
    padding: 16px 0 10px 0;
}
.notify-card {
    cursor: pointer;
    padding: 16px 10px;
    min-height: 7rem;
    background-color: var(--hami-card-bg);
    border-radius: var(--hami-radius);
    transition: all .3s;

    .username {
        color: var(--hami-text-common);
        font-weight: 600;
        margin-right: 6px;
    }

    &:hover {
        box-shadow: var(--el-box-shadow);
        background-color: var(--hami-card-hover-bg);
    }

    .entry {
        display: flex;
    }

    .line-1 {
        color: var(--hami-item-text-color);
        display: flex;
        align-items: center;

        .line-item {
            overflow: hidden;
            text-overflow: ellipsis;
            word-break: break-word;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            font-size: 16px;
            line-height: 24px;
            height: 24px;
        }

        .username {
            color: var(--hami-text-common);
            font-weight: 600;
            margin-right: 6px;
        }

        .link:hover {
            color: var(--hami-blue-3);
            text-decoration: underline;
        }

        .title {
            color: var(--hami-blue-1);
        }

        .title:hover {
            text-decoration: underline;
        }
    }

    .line-2 {
        font-size: 16px;
        font-weight: 400;
        margin-top: 8px;
        color: var(--hami-text-4);
        line-height: 28px;
        display: -webkit-box;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
    }

    .line-3 {

        &::before {
            content: " ";
            position: absolute;
            width: 2px;
            top: 4px;
            bottom: 4px;
            left: 0;
            background: var(--hami-item-text-color);
        }

        margin-top: 8px;
        color: var(--hami-card-text-color);
        font-size: 16px;
        font-weight: 400;
        line-height: 28px;
        position: relative;
        padding-left: 10px;
        display: -webkit-box;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
    }

    .option {
        display: flex;
        align-items: center;
        padding-top: 10px;
        font-size: 14px;
        color: var(--hami-grey-1);
        height: 24px;
        box-sizing: content-box;

        .delete {

            i {
                margin-right: 4px;
            }

            pointer-events: auto;
            margin-left: 6px;

            &:hover {
                color: var(--hami-blue-5);
            }
        }
    }
}

</style>