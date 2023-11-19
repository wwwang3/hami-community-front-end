<script setup lang="ts">
import { onBeforeMount, ref } from "vue"
import { useRouter } from "vue-router"
import { Message } from '@element-plus/icons-vue'
import useNotifyStore, { NotifyRouteItem, NotifyRouteType } from '@/store/modules/notify.ts'
import NotifyNavList from '@/components/notify/NotifyNavList.vue'

const $router = useRouter()
const notifyStore = useNotifyStore()

const notifyRef = ref()
const notifyPopoverRef = ref()

const activeRoute = ref<NotifyRouteType>("/notify/reply")

onBeforeMount(async () => {
    await notifyStore.init()
})

const handleClick = (item: NotifyRouteItem) => {
    $router.replace(item.path)
}

</script>
<template>
    <div class="notify" ref="notifyRef">
        <el-badge class="badge" :value="notifyStore.unReadCount"
                  :is-dot="notifyStore.unReadCount >= 10"
                  :hidden="notifyStore.unReadCount === 0"
        >
            <el-icon size="20">
                <Message/>
            </el-icon>
        </el-badge>
        <span>消息</span>
        <el-popover
            ref="notifyPopoverRef"
            :virtual-ref="notifyRef"
            trigger="hover"
            virtual-triggering
            width="160px"
            placement="bottom"
        >
            <NotifyNavList v-model="activeRoute"
                           item-class="notify-item"
                           nav-class="notify-item-list"
                           @click="handleClick"
            >

            </NotifyNavList>
        </el-popover>
    </div>
</template>

<style scoped lang="less">
.badge {
    height: 20px;
    --el-badge-radius: 10px;
    --el-badge-font-size: 12px;
    --el-badge-padding: 4px;
    --el-badge-size: 16px;

    :deep(.el-badge__content) {
        right: 5px;
        top: 3px;
    }
}
</style>
<style lang="less">
.notify-item-list {
    padding: 12px 8px;

    .notify-item {
        width: 100%;
        padding: 6px 4px;
        cursor: pointer;
        font-size: 14px;
        height: 40px;
    }

    .notify-item:hover {
        background-color: var(--hami-card-hover-bg);
        color: var(--hami-text-hover-color);
        border-radius: var(--hami-radius-small);
    }
}
</style>