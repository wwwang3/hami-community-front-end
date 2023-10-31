<script setup lang="ts">
import HamiNotifyList from '@/components/notify/HamiNotifyList.vue'
import { ItemType } from '@/components/common/HamiScrollList.vue'
import defaultAvatar from "/assets/avatar.jpg"
import { formatDateTime } from '@/utils'

const toUserSpace = (id: string | number) => {
    return "/user/space/" + id
}
</script>
<template>
    <div class="hami-follow-notify">
        <HamiNotifyList notify-type="follow">
            <template #notify="{item, index, _delete}: ItemType<NotifyMsg>">
                <div class="follow-notify-card">
                    <div class="entry">
                        <router-link class="left-panel" :to="toUserSpace(item.sender.id)">
                            <el-avatar :src="item.sender.image || defaultAvatar" :size="64"></el-avatar>
                            <div class="info">
                                <div class="profile">
                                    <el-text class="username" truncated size="large" tag="div">
                                        {{ item.sender.name }}
                                    </el-text>
                                    <div class="title">关注了你</div>
                                </div>
                                <div class="time">{{ formatDateTime(item.ctime) }}</div>
                            </div>
                        </router-link>
                    </div>
                </div>
            </template>
        </HamiNotifyList>
    </div>
</template>

<style scoped lang="less">
.hami-follow-notify {
    padding: 20px;
}
.follow-notify-card {
    cursor: pointer;
    padding: 16px 10px;
    min-height: 7rem;
    background-color: var(--hami-bg);
    border-radius: var(--hami-radius-small);
    transition: all .3s;

    &:hover {
        box-shadow: var(--el-box-shadow);
        background-color: var(--hami-bg-gray-1);
    }
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
        }

        .profile {
            display: flex;
            align-items: center;
            font-size: 16px;
        }

        .username {
            color: var(--hami-text);
            max-width: 240px;
            font-weight: 600;
        }

        .title {
            font-weight: 400;
            color: var(--hami-dark);
            margin-left: 8px;
        }

        .time {
            padding-top: 6px;
            font-size: 14px;
            color: var(--hami-gray-2);
        }
    }
    .right-panel {

        button {
            width: 120px;
        }
    }
}
</style>