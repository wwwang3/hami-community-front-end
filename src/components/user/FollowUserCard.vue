<script setup lang="ts">
import { inject, Ref } from "vue"
import { useFollow } from '@/hooks/userInteract.ts'
import useUserStore from '@/store/modules/user.ts'
import { $message } from '@/utils/message.ts'
import { SPACE_USER } from '@/store/keys.ts'
import { defaultAvatar } from '@/store/images.ts'

//interface
interface SimpleUserCardProps {
    user: User
}

const $props = defineProps<SimpleUserCardProps>()
const userStore = useUserStore()
const [followed, handleAction] = useFollow($props.user?.followed)

const spaceUser = inject<Ref<User>>(SPACE_USER)
const handleFollow = async () => {
    if (userStore.isSelf($props.user.userId)) {
        $message.error("自己不能关注自己~")
        return
    }
    try {
        let state = await handleAction($props.user.userId)
        if (userStore.isSelf(spaceUser?.value?.userId)) {
            //如果点开的页面是登录用户自己
            let stat = spaceUser?.value?.stat
            if (stat !== undefined) {
                if (state) {
                    stat.totalFollowings++;
                } else {
                    stat.totalFollowings--;
                }
            }
        }
    } catch (e) {
        $message.error("操作失败")
    }
}

const toUserSpace = () => {
    return "/user/space/" + $props.user.userId
}
const hasText = () => {
    return $props.user && $props.user.company && $props.user.position
}
</script>
<template>
    <div class="hami-follow-user-card">
        <div class="entry">
            <router-link class="left-panel" :to="toUserSpace()">
                <el-avatar :src="user.avatar || defaultAvatar" :size="64"></el-avatar>
                <div class="info">
                    <el-text class="username" truncated size="large" tag="div">
                        {{ user?.username }}
                    </el-text>
                    <div class="job">
                        <el-text truncated>{{ user?.position }}</el-text>
                        <el-text v-if="hasText()" class="at">@</el-text>
                        <el-text truncated>{{ user?.company }}</el-text>
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
.hami-follow-user-card {
    cursor: pointer;
    padding: 16px 20px;
    min-height: 7rem;

    .entry {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .left-panel {
        display: flex;
        align-items: center;

        .info {
            flex: 1;
            margin-left: 10px;

            .username {
                color: var(--hami-text-common);
                max-width: 240px;
                font-size: 17px;
                font-weight: 600;
            }

            .job {
                display: flex;
                align-items: center;
                font-size: 14px;
            }

            .at {
                margin: 0 4px;
            }
        }
    }

    .right-panel {
        button {
            width: 120px;
        }
    }
}
</style>