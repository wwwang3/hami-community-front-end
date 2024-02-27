<script setup lang="ts">
import { onMounted, ref } from "vue"
import { BulletinService } from '@/service/modules/system.ts'
import HamiScrollList, { ItemType } from '@/components/common/HamiScrollList.vue'
import BulletinCard from '@/components/system/BulletinCard.vue'
import { HamiScrollListInstance } from '@/components/types'

const bulletinList = ref<HamiScrollListInstance<Bulletin> | null>()

onMounted(() => {
    bulletinList.value?.init()
})

const handleQuery = (current: number, size: number) => {
    return BulletinService.listBulletin({
        current,
        size
    })
}
</script>
<template>
    <div class="hami-bulletin-list">
        <div class="header"></div>
        <HamiScrollList
            ref="bulletinList"
            :query="handleQuery"
            :size="20"
            immediate-loading
            key-property="id"
            :show-no-more="false"
        >
            <template #item="ele: ItemType<Bulletin>">
                <BulletinCard :bulletin="ele.item"></BulletinCard>
                <el-divider></el-divider>
            </template>
        </HamiScrollList>
    </div>
</template>

<style scoped lang="less">
.hami-bulletin-list {
    .el-divider {
        margin: 10px 0;
    }
    .el-divider:last-child {
        display: none;
    }
}
</style>