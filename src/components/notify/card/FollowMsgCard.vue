<script setup lang="ts">
import { computed } from "vue"
import { $message, formatDateTime } from '@/utils'
import { useFollow } from '@/hooks/userInteract.ts'
import useUserStore from '@/store/modules/user.ts'
import { defaultAvatar } from "@/store/images.ts"
import { Delete } from '@element-plus/icons-vue'
import { useDeleteMsg } from '@/components/notify/hooks'

interface FollowMsgProps {
    id: number | string
    ctime: number | Date
    sender: NotifyInfo
}

const $emit = defineEmits<{
    (e: 'delete'): void
}>()


const $props = defineProps<FollowMsgProps>()
const userStore = useUserStore()
const [followed, handleAction] = useFollow($props.sender?.followed ?? false)


const spaceLink = computed(() => {
    return "/user/space/" + $props.sender.id
})

const handleFollow = async () => {
    if (userStore.isSelf($props.sender?.id as number)) {
        $message.error("自己不能关注自己~")
        return
    }
    try {
        let state = await handleAction($props.sender.id as number)
        if (state) {
            $message.success("关注成功")
        } else {
            $message.success("取消关注成功(๑‾᷅^‾᷅๑)")
        }
    } catch (e) {
        $message.error("操作失败")
    }
}


</script>
<template>
    <div class="notify-card follow-notify-card">
        <div class="entry">
            <router-link class="left-panel" :to="spaceLink">
                <el-avatar :src="sender.image || defaultAvatar" :size="64"></el-avatar>
                <div class="info">
                    <div class="profile">
                        <el-text class="username" truncated size="large" tag="div">
                            {{ sender.name }}
                        </el-text>
                        <div class="title">关注了你</div>
                    </div>
                    <div class="option">
                        <div class="time">{{ formatDateTime(ctime) }}</div>
                        <div class="delete" @click="useDeleteMsg(id, $emit, $event)">
                            <el-icon>
                                <Delete/>
                            </el-icon>
                            刪除该通知
                        </div>
                    </div>
                </div>
            </router-link>
            <div class="right-panel">
                <el-button type="success" v-if="followed" @click="handleFollow">已关注</el-button>
                <el-button type="info" plain v-else @click="handleFollow">关注</el-button>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.follow-notify-card {

    .entry {
        align-items: center;
        justify-content: space-between;
    }

    .left-panel {
        display: flex;
        align-items: center;

        .info {
            flex: 1;
            margin-left: 10px;
        }

        .profile {
            display: flex;
            align-items: center;
            font-size: 16px;
        }

        .username {
            color: var(--hami-text-common);
            max-width: 240px;
            font-weight: 600;
        }

        .title {
            font-weight: 400;
            color: var(--hami-white-2);
            margin-left: 8px;
        }

    }

    .option {
        display: flex;
        align-items: center;
        padding-top: 10px;
        font-size: 15px;
        color: var(--hami-grey-1);

        .time {
            font-size: 14px;
        }

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

    .right-panel {

        button {
            width: 120px;
        }
    }
}

.follow-notify-card {
    .delete {
        display: none;
    }
}

.follow-notify-card:hover {
    .delete {
        display: flex;
        align-items: center;
    }
}
</style>