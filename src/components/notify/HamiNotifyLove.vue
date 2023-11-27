<script setup lang="ts">
import HamiNotifyList from '@/components/notify/HamiNotifyList.vue'
import { ItemType } from '@/components/common/HamiScrollList.vue'
import LoveMsgCard from '@/components/notify/card/LoveMsgCard.vue'
</script>
<template>
    <HamiNotifyList notify-type="love">
        <template #notify="{item, index, _delete}: ItemType<NotifyMsg>">
            <LoveMsgCard :notify="item" @delete="() => _delete(item, index)"></LoveMsgCard>
        </template>
    </HamiNotifyList>
</template>

<style scoped lang="less">
</style>