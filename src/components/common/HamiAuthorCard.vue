<script setup lang="ts">
import { computed } from "vue"
import useUserStore from '@/store/modules/user.ts'
import { useFollow } from '@/hooks/userInteract.ts'
import { $message, onPPT } from '@/utils'
import { defaultAvatar } from '@/store/images.ts'
import { AvatarProps } from 'element-plus/es/components/avatar/src/avatar'
import StatItem from "@/components/common/StatItem.vue"

interface AuthorCardProps {
    author: User
    avatarSize?: AvatarProps['size']
    showTag?: boolean
    showStat?: boolean
    showOpt?: boolean
}

const $props = withDefaults(defineProps<AuthorCardProps>(), {
    // @ts-ignore
    author: {},
    icon: false,
    profile: false,
    showTag: false,
    showStat: false,
    showOpt: false,
    avatarSize: 'default'
})

const userStore = useUserStore()
const [state, handleAction] = useFollow($props.author?.followed)

const link = computed(() => {
    return "/user/space/" + $props.author?.userId
})

const description = computed(() => {
    if ($props.author?.position && $props.author?.company) {
        return $props.author.position + " @" + $props.author.company
    } else if ($props.author?.position) {
        return $props.author.position
    } else if ($props.author?.company) {
        return $props.author.company
    } else {
        return "作者暂无简介"
    }
})

//fun
const handleFollow = () => {
    if (userStore.isSelf($props.author.userId)) {
        $message.success("你时时刻刻都在关注你自己~")
        return
    }
    handleAction($props.author.userId).then((active: boolean) => {
        let stat = $props.author!.stat
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
    return "/user/" + $props.author?.userId
})

</script>
<template>
    <div class="hami-author-card">
        <router-link class="author-card-header" :to="link">
            <div class="header-left">
                <el-avatar :src="author.avatar || defaultAvatar" :size="avatarSize"></el-avatar>
            </div>
            <div class="header-right">
                <div class="account-box">
                    <div class="username">{{ author?.username }}</div>
                    <el-tag class="tag" v-if="showTag && author?.tag" size="small">{{ author.tag }}</el-tag>
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
                <StatItem :value="author?.stat?.totalArticles" label="文章"/>
            </router-link>
            <router-link :to="baseLink + '/follows'">
                <StatItem :value="author?.stat?.totalFollowings" label="关注"/>
            </router-link>
            <router-link :to="baseLink + '/follows'">
                <StatItem :value="author?.stat?.totalFollowers" label="粉丝"/>
            </router-link>
        </div>
        <el-divider direction="horizontal" v-if="showOpt && showStat"></el-divider>
        <div class="opt-box" v-if="showOpt && !userStore.isSelf(author?.userId)">
            <el-button type="info" @click="handleFollow" v-if="state" plain>取消关注</el-button>
            <el-button type="primary" @click="handleFollow" v-else>关注</el-button>
            <el-button type="primary" plain @click="handleChat">私信</el-button>
        </div>
    </div>
</template>

<style scoped lang="less">
.hami-author-card {

    .el-divider {
        margin: 14px 0;
    }

    .author-card-header {
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