<script setup lang="ts">
import { formatDateTime } from '@/utils'
import { favicon } from "@/store/images.ts"

interface SystemMsgProps {
    notify: NotifyMsg
}

const $props = defineProps<SystemMsgProps>()


</script>
<template>
    <div class="notify-card system-notify-card">
        <div class="entry">
            <el-avatar :src="favicon" :size="64" class="left-panel"></el-avatar>
            <div class="right-panel">
                <div class="line-2">
                    {{ notify.itemInfo.detail }}
                </div>
                <div class="option">
                    <div class="ctime">{{ formatDateTime(notify.ctime) }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.system-notify-card {
    margin-bottom: 10px;

    &:hover {

        .delete {
            display: flex;
            align-items: center;
        }
    }

    .left-panel {
        display: flex;
        margin-right: 10px;
        background-color: transparent;
        border: 1px solid var(--el-border-color);
    }

    .right-panel {
        flex: 1;
    }

    .delete {
        display: none;
    }
}

</style>