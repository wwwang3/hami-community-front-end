<script setup lang="ts">
import { ref, onMounted, watch } from "vue"
import { NotifyService } from '@/service/modules/notify.ts'
import { HamiScrollListInstance } from '@/components/types'
import { ItemType } from '@/components/common/HamiScrollList.vue'

interface NotifyListProps {
    notifyType: Exclude<keyof NotifyCountItem, "im">
}

const slots = defineSlots<{
    notify(props: ItemType<NotifyMsg>): any
}>()

const $props = defineProps<NotifyListProps>()
const notifyRef = ref<HamiScrollListInstance<NotifyMsg> | null>(null)

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
    <div class="hami-reply-notify">
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
    </div>
</template>

<style scoped lang="less">

</style>