<script setup lang="ts">
import HamiNotifyList from '@/components/notify/HamiNotifyList.vue'
import { ItemType } from '@/components/common/HamiScrollList.vue'
import LoveMsgCard from '@/components/notify/card/LoveMsgCard.vue'

</script>
<template>
    <div class="hami-love-notify">
        <HamiNotifyList notify-type="love">
            <template #notify="{item, index, _delete}: ItemType<NotifyMsg>">
                <LoveMsgCard :notify="item" @delete="() => _delete(item, index)"></LoveMsgCard>
            </template>
        </HamiNotifyList>
    </div>
</template>

<style scoped lang="less">
    .hami-love-notify {
        padding: 10px 0;
    }
</style>