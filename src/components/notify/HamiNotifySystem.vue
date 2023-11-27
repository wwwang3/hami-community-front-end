<script setup lang="ts">
import HamiNotifyList from '@/components/notify/HamiNotifyList.vue'
import { ItemType } from '@/components/common/HamiScrollList.vue'
import SystemMsgCard from '@/components/notify/card/SystemMsgCard.vue'
</script>
<template>
    <HamiNotifyList notify-type="system">
        <template #notify="scope: ItemType<NotifyMsg>">
            <SystemMsgCard :notify="scope.item"></SystemMsgCard>
        </template>
    </HamiNotifyList>
</template>

<style scoped lang="less">

</style>