<script setup lang="ts">
import { computed } from "vue"
import useUserStore from '@/store/modules/user.ts'
import { useFollow } from '@/hooks/userInteract.ts'
import { $message, onPPT } from '@/utils'
import { defaultAvatar } from '@/store/images.ts'
import { AvatarProps } from 'element-plus/es/components/avatar/src/avatar'
import StatItem from "@/components/common/StatItem.vue"

interface AuthorCardProps {
    author: Author
    avatarSize?: AvatarProps['size']
    showTag?: boolean
    showStat?: boolean
    showOpt?: boolean
}

const $props = withDefaults(defineProps<AuthorCardProps>(), {
    // @ts-ignore
    author: {},
    showTag: true,
    showStat: true,
    showOpt: true,
    avatarSize: 'default'
    // profile: false,
    // position: true
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
    onPPT()
}

</script>
<template>
    <div class="hami-author-card">
        <router-link class="author-card-header" :to="link">
            <div class="left">
                <el-avatar :src="author.avatar || defaultAvatar" :size="avatarSize"></el-avatar>
            </div>
            <div class="right">
                <div class="top">
                    <div class="username">{{ author?.username }}</div>
                    <el-tag class="tag" v-if="showTag && author?.tag"></el-tag>
                </div>
                <div class="info-box">
                    <div class="description ellipsis">{{ description }}</div>
                </div>
            </div>
        </router-link>
        <div class="stat-box" v-if="showStat">
            <StatItem :value="author?.stat?.totalFollowings" label="关注"/>
            <StatItem :value="author?.stat?.totalFollowers" label="粉丝"/>
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

    .author-card-header {
        display: flex;
        align-items: center;
        width: 100%;
        margin-bottom: 5px;

        .left {
            margin-right: 10px;
        }

        .username {
            color: var(--hami-text-1);
            font-size: 17px;
            font-weight: 600;
        }

        .info-box {
            color: var(--hami-card-text-color);
            font-size: 14px;
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