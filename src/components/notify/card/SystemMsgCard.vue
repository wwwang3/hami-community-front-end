<script setup lang="ts">
import { formatDateTime } from '@/utils'

import favicon from "/assets/favicon.png"

interface SystemMsgProps {
    notify: NotifyMsg
}

const $props = defineProps<SystemMsgProps>()


</script>
<template>
    <div class="system-notify-card">
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
    cursor: pointer;
    padding: 16px 10px;
    min-height: 7rem;
    background-color: var(--hami-bg);
    border-radius: var(--hami-radius-small);
    transition: all .3s;
    margin-bottom: 10px;

    &:hover {
        box-shadow: var(--el-box-shadow);
        background-color: var(--hami-bg-gray-1);

        .delete {
            display: flex;
            align-items: center;
        }
    }

    .entry {
        display: flex;
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
        color: var(--hami-black-3);
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
        color: var(--hami-gray-2);
        height: 24px;
        box-sizing: content-box;

        .delete {

            i {
                margin-right: 4px;
            }

            pointer-events: auto;
            margin-left: 6px;

            &:hover {
                color: var(--hami-blue-1);
            }
        }
    }

    .delete {
        display: none;
    }
}

</style>