<script setup lang="ts">
import { ref, reactive, onMounted, computed, watch } from "vue"
import { useRoute, useRouter } from "vue-router"
import useUserStore from '@/store/modules/user.ts'
import { useAction, useFollow } from '@/hooks/userInteract.ts'
import { $message } from '@/utils/message.ts'

//interface
interface UserCardProps {
    user: User
}

const $props = defineProps<UserCardProps>()
//router, props, inject, provide
const $router = useRouter()
const $route = useRoute
const userStore = useUserStore()
//custom var
const [state, handleAction] = useFollow($props.user?.followed)
//life cycle

const link = computed(() => {
    return "/user/space/" + $props.user.userId
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
    handleAction($props.user.userId).then(active => {
        let stat = $props.user!.stat
        if (active) {
            stat.totalFollowers++
        } else {
            stat.totalFollowers--;
        }
    })
}

const handleChat = () => {
    $message.notifySuccess("暂不支持, 敬请期待 _(≧∇≦」∠)_")
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
                <div class="job">
                    <el-text truncated>{{ user?.position }}</el-text>
                    <el-text v-if="hasText()" class="at">@</el-text>
                    <el-text truncated>{{ user?.company }}</el-text>
                </div>
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
        justify-content: space-between;
        align-items: center;

        .info {
            flex: 1;
            max-width: 140px;
            margin-left: 10px;

            .username {
                color: var(--hami-text);
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
                color: var(--hami-text-gray);
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