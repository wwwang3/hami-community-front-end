<script setup lang="ts">
import { computed } from "vue"
import useUserStore from '@/store/modules/user.ts'
import { useFollow } from '@/hooks/userInteract.ts'
import { $message, onPPT } from '@/utils'
import { defaultAvatar } from '@/store/images.ts'
import { AvatarProps } from 'element-plus/es/components/avatar/src/avatar'
import StatItem from "@/components/common/StatItem.vue"

interface CommonUserCardProps {
    user: User
    avatarSize?: AvatarProps['size']
    showTag?: boolean
    showStat?: boolean
    showOpt?: boolean
}

const $props = withDefaults(defineProps<CommonUserCardProps>(), {
    // @ts-ignore
    user: {},
    icon: false,
    profile: false,
    showTag: false,
    showStat: false,
    showOpt: false,
    avatarSize: 'default'
})

const userStore = useUserStore()
const [state, handleAction] = useFollow($props.user?.followed)

const link = computed(() => {
    return "/user/space/" + $props.user?.userId
})

const description = computed(() => {
    if ($props.user?.position && $props.user?.company) {
        return $props.user.position + " @" + $props.user.company
    } else if ($props.user?.position) {
        return $props.user.position
    } else if ($props.user?.company) {
        return $props.user.company
    } else {
        return "作者暂无简介"
    }
})

//fun
const handleFollow = () => {
    if (userStore.isSelf($props.user.userId)) {
        $message.success("你时时刻刻都在关注你自己~")
        return
    }
    handleAction($props.user.userId).then((active: boolean) => {
        let stat = $props.user!.stat
        if (active) {
            stat.totalFollowers++
        } else {
            stat.totalFollowers--;
        }
    })
}

const handleChat = () => {
    onPPT("提示")
}

const baseLink = computed(() => {
    return "/user/" + $props.user?.userId
})

</script>
<template>
    <div class="hami-user-card">
        <router-link class="user-card-header" :to="link">
            <div class="header-left">
                <el-avatar :src="user.avatar || defaultAvatar" :size="avatarSize"></el-avatar>
            </div>
            <div class="header-right">
                <div class="account-box">
                    <div class="username">{{ user?.username }}</div>
                    <el-tag class="tag" v-if="showTag && user?.tag" size="small">{{ user.tag }}</el-tag>
                </div>
                <div class="info-box">
                    <div class="info-box-left">
                        <div class="description ellipsis">{{ description }}</div>
                    </div>
                    <div class="info-box-right"></div>
                </div>
            </div>
        </router-link>
        <div class="stat-box" v-if="showStat">
            <router-link :to="baseLink + '/articles'">
                <StatItem :value="user?.stat?.totalArticles" label="文章"/>
            </router-link>
            <router-link :to="baseLink + '/follows'">
                <StatItem :value="user?.stat?.totalFollowings" label="关注"/>
            </router-link>
            <router-link :to="baseLink + '/follows'">
                <StatItem :value="user?.stat?.totalFollowers" label="粉丝"/>
            </router-link>
        </div>
        <el-divider direction="horizontal" v-if="showOpt && showStat"></el-divider>
        <div class="opt-box" v-if="showOpt && !userStore.isSelf(user?.userId)">
            <el-button type="info" @click="handleFollow" v-if="state" plain>取消关注</el-button>
            <el-button type="primary" @click="handleFollow" v-else>关注</el-button>
            <el-button type="primary" plain @click="handleChat">私信</el-button>
        </div>
    </div>
</template>

<style scoped lang="less">
.hami-user-card {

    .el-divider {
        margin: 14px 0;
    }

    .user-card-header {
        display: flex;
        align-items: center;
        width: 100%;
        margin-bottom: 5px;

        .header-left {
            margin-right: 10px;
            flex: 0 0 auto;
        }

        .header-right {
            margin-right: 10px;
            flex: 1;

            .account-box {
                display: flex;
                align-items: center;

                .username {
                    color: var(--hami-text-1);
                    font-size: 17px;
                    font-weight: 600;
                }

                .tag {
                    margin-left: 4px;
                }
            }

            .info-box {
                display: flex;
                justify-content: space-between;

                .description {
                    color: var(--hami-card-text-color);
                    font-size: 14px;
                }
            }

        }

    }

    .stat-box {
        display: flex;
        justify-content: space-around;

        :deep(.stat-item) {
            align-items: center;
        }
    }

    .opt-box {
        display: flex;
        justify-content: space-between;

        button {
            width: 100%;
        }
    }
}
</style>