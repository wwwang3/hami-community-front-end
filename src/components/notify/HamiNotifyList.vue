<script setup lang="ts">
import { ref, onMounted, watch, provide } from "vue"
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
    console.log($props.notifyType)
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
    >
        <template #item="scope">
            <slot name="notify" v-bind="scope"></slot>
        </template>
    </HamiScrollList>
</template>

<style scoped lang="less">

</style>