<script setup lang="ts">
import { computed, watch } from "vue"
import { useRoute, useRouter } from "vue-router"
import useUserStore from '@/store/modules/user.ts'
import { useFollow } from '@/hooks/userInteract.ts'
import { onPPT } from '@/utils'

interface UserCardProps {
    user: User
    profile?: boolean,
    position?: boolean
}

const $props = withDefaults(defineProps<UserCardProps>(), {
    user: {},
    profile: false,
    position: true
})
const $router = useRouter()
const $route = useRoute
const userStore = useUserStore()
const [state, handleAction] = useFollow($props.user?.followed)

const link = computed(() => {
    return "/user/space/" + $props.user?.userId
})

//watch
watch(() => $props.user?.followed, (newVal, oldVal) => {
    state.value = newVal
})

//fun
const handleFollow = () => {
    if (userStore.isSelf($props.user.userId)) {
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
    onPPT()
}

const hasText = () => {
    return $props.user && $props.user.company && $props.user.position
}

</script>
<template>
    <div class="hami-user-card">
        <router-link class="header" :to="link">
            <div class="avatar">
                <el-avatar :size="54" :src="user?.avatar"></el-avatar>
            </div>
            <div class="info">
                <el-text class="username" truncated size="large" tag="div">
                    {{ user?.username }}
                </el-text>
                <div class="job" v-if="position">
                    <el-text truncated :title="user?.position">{{ user?.position }}</el-text>
                    <el-text v-if="hasText()" class="at">@</el-text>
                    <el-text truncated>{{ user?.company }}</el-text>
                </div>
                <el-text class="profile" truncated tag="div" v-if="profile">
                    {{ user?.profile }}
                </el-text>
            </div>
        </router-link>
        <div class="bottom">
            <div class="bottom-item">
                <div class="count">{{ user?.stat.totalArticles }}</div>
                <div class="text">文章</div>
            </div>
            <div class="bottom-item">
                <div class="count">{{ user?.stat.totalViews }}</div>
                <div class="text">阅读</div>
            </div>
            <div class="bottom-item">
                <div class="count">{{ user?.stat.totalFollowers }}</div>
                <div class="text">粉丝</div>
            </div>
        </div>
        <div class="btn-group" v-if="!userStore.isSelf(user?.userId)">
            <el-button type="info" @click="handleFollow" v-if="state" plain>取消关注</el-button>
            <el-button type="primary" @click="handleFollow" v-else>关注</el-button>
            <el-button type="primary" plain @click="handleChat">私信</el-button>
        </div>
    </div>
</template>

<style scoped lang="less">
.hami-user-card {
    .header {
        display: flex;
        margin-left: 10px;
        align-items: center;

        .info {
            flex: 1;
            max-width: 140px;
            margin-left: 10px;

            .username {
                color: var(--hami-black-6);
                font-size: 17px;
                font-weight: 600;
            }

            .job {
                display: flex;
                align-items: center;
                font-size: 14px;
            }

            .profile {
                font-size: 14px;
            }

            .at {
                margin: 0 4px;
            }
        }
    }

    .bottom {
        display: flex;
        justify-content: space-around;
        margin: 8px 0 10px 0;

        .bottom-item {
            display: flex;
            flex-direction: column;
            align-items: center;

            .count {
                font-size: 17px;
            }

            .text {
                color: var(--hami-card-text-color);
                font-size: 13px;
            }
        }
    }

    .btn-group {
        display: flex;
        justify-content: space-between;

        button {
            width: 100px;
        }
    }
}
</style>