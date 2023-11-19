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

    .line-2 {
        font-size: 16px;
        font-weight: 400;
        margin-top: 8px;
        color: var(--hami-black-5);
        line-height: 28px;
        display: -webkit-box;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
    }

    .option {
        display: flex;
        align-items: center;
        padding-top: 10px;
        font-size: 14px;
        color: var(--hami-grey-1);
        height: 24px;
        box-sizing: content-box;

        .delete {

            i {
                margin-right: 4px;
            }

            pointer-events: auto;
            margin-left: 6px;

            &:hover {
                color: var(--hami-blue-5);
            }
        }
    }

    .delete {
        display: none;
    }
}

</style>