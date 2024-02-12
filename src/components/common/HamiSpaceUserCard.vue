<script setup lang="ts">
import { computed, onUnmounted, watch } from "vue"
import useUserStore from '@/store/modules/user.ts'
import { useFollow } from '@/hooks/userInteract.ts'
import { $message, onPPT } from '@/utils'
import { defaultAvatar } from '@/store/images.ts'
import { AvatarProps } from 'element-plus/es/components/avatar/src/avatar'
import { useRouter } from 'vue-router'

interface AuthorCardProps {
    author: User
    avatarSize?: AvatarProps['size']
    showTag?: boolean
    showStat?: boolean
    showOpt?: boolean
}

const $props = withDefaults(defineProps<AuthorCardProps>(), {
    icon: false,
    showTag: false,
    avatarSize: 'default'
})

const userStore = useUserStore()
const $router = useRouter()

const [state, handleAction] = useFollow($props.author?.followed)

const link = computed(() => {
    return "/user/space/" + $props.author?.userId
})

const stopStateWatch = watch(() => $props.author.followed, (newVal, _) => {
    state.value = newVal
})

onUnmounted(() => {
    stopStateWatch()
})

const description = computed(() => {
    if ($props.author?.position && $props.author?.company) {
        return $props.author.position + " | " + $props.author.company
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

const handleClick = () => {
    $router.replace('/account/profile')
}

</script>
<template>
    <div class="hami-author-card">
        <div class="author-card-header">
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
                        <div class="description">
                            <el-icon size="22" class="icon">
                                <svg width="21" height="18" viewBox="0 0 21 18">
                                    <path fill="currentColor"
                                          d="M3 8.909V6.947a1 1 0 0 1 1-1h13a1 1 0 0 1 1 1V8.92l-6 2.184v-.42c0-.436-.336-.79-.75-.79h-1.5c-.414 0-.75.354-.75.79v.409L3 8.909zm0 .7l6 2.184v.47c0 .436.336.79.75.79h1.5c.414 0 .75-.354.75-.79v-.46l6-2.183V16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.609zm6.75 1.075h1.5v1.58h-1.5v-1.58z"></path>
                                    <path fill="currentColor"
                                          d="M7.5 5.213V4A1.5 1.5 0 0 1 9 2.5h3A1.5 1.5 0 0 1 13.5 4v1.213"></path>
                                </svg>
                            </el-icon>
                            <span class="ellipsis content">{{ description }}</span>
                        </div>
                        <div class="profile">
                            <el-icon class="icon" size="22" v-if="author?.profile">
                                <svg width="21" height="18" viewBox="0 0 21 18">
                                    <path fill="currentColor" fill-rule="evenodd"
                                          d="M4 4h13a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1zm9 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3 3a3 3 0 0 0-6 0h6zM5 7v1h4V7H5zm0 2.5v1h4v-1H5zM5 12v1h4v-1H5z"></path>
                                </svg>
                            </el-icon>
                            <span class="ellipsis content">{{ author?.profile}}</span>
                        </div>
                    </div>
                    <div class="info-box-right">
                       <div class="opt-box">
                           <template v-if="!userStore.isSelf(author?.userId)">
                               <el-button type="success" @click="handleFollow" v-if="state" plain>取消关注</el-button>
                               <el-button type="primary" @click="handleFollow" v-else>关注</el-button>
                               <el-button type="primary" plain @click="handleChat">私信</el-button>
                           </template>
                           <template v-else>
                               <el-button plain type="primary" @click.prevent="handleClick" auto-insert-space>设置</el-button>
                           </template>
                       </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.hami-author-card {

    .author-card-header {
        display: flex;
        width: 100%;
        margin-bottom: 5px;

        .header-left {
            margin-right: 10px;
            flex: 0 0 auto;
        }

        .header-right {
            margin-right: 10px;
            flex: 1;
        }

    }

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

        .description, .profile {
            display: flex;
            align-items: center;
            color: var(--hami-card-text-color);
            font-size: 14px;
            margin-top: 8px;
        }
        .description {
            margin-top: 8px;
        }
        .profile {
            margin-top: 2px;
        }

        .info-box-right {
            display: flex;
            align-items: flex-end;
        }

        .content {
            max-width: 200px;
            line-height: 28px;
            height: 28px;
            margin-left: 6px;
            word-break: break-all;
        }
    }
    .opt-box {
        display: flex;
        justify-content: space-between;
        button {
            width: 100px;
        }
    }
}
</style>