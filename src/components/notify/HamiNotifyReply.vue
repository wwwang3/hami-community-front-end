<script setup lang="ts">
import { ref, reactive, onMounted, computed } from "vue"
import { useRoute, useRouter } from "vue-router"
import { useRequest } from '@/hooks'
import { NotifyService } from '@/service/modules/notify.ts'
import { HamiScrollListInstance } from '@/components/types'
//interface

//router, props, inject, provide
//custom var
const replyNotifyRef = ref<HamiScrollListInstance<NotifyMsg> | null>(null)
//life cycle

onMounted(() => {
    console.log(11111)
    replyNotifyRef.value?.init()
})
//watch

//fun
const handleQuery = async (current: number, size: number) => {
    return NotifyService.queryCommentNotify({
        pageNum: current,
        pageSize: size
    })
}
</script>
<template>
    <div class="hami-reply-notify">
        <HamiScrollList
            ref="replyNotifyRef"
            key-property="id"
            :query="handleQuery"
            immediate-loading
            :size="20"
        >

        </HamiScrollList>
    </div>
</template>

<style scoped lang="less">

</style>