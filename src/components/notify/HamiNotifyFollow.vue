<script setup lang="ts">
import HamiNotifyList from '@/components/notify/HamiNotifyList.vue'
import { ItemType } from '@/components/common/HamiScrollList.vue'
import FollowMsgCard from '@/components/notify/card/FollowMsgCard.vue'
</script>
<template>
    <HamiNotifyList notify-type="follow">
        <template #notify="{item, index, _delete}: ItemType<NotifyMsg>">
            <FollowMsgCard :id="item.id" :sender="item.sender" :ctime="item.ctime" @delete="() => _delete(item, index)"></FollowMsgCard>
        </template>
    </HamiNotifyList>
</template>

<style scoped lang="less">
</style>