<script setup lang="ts">
import HamiNotifyList from '@/components/notify/HamiNotifyList.vue'
import { ItemType } from '@/components/common/HamiScrollList.vue'
import ReplyMsgCard from '@/components/notify/card/ReplyMsgCard.vue'
</script>
<template>
    <HamiNotifyList notify-type="reply">
        <template #notify="scope: ItemType<NotifyMsg>">
            <ReplyMsgCard :notify="scope.item" @delete="() => scope._delete(scope.item, scope.index)"></ReplyMsgCard>
        </template>
    </HamiNotifyList>
</template>

<style scoped lang="less">

</style>