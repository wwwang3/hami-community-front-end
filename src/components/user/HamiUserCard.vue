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

//watch
watch(() => $props.user.followed, (newVal, oldVal) => {
    state.value = newVal
})

//fun
const handleFollow = () => {
    if (userStore.isAuthor($props.user.userId)) {
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
        <div class="header">
            <div class="avatar">
                <el-avatar :size="54" :src="user?.avatar"></el-avatar>
            </div>
            <div class="info">
                <el-text class="username" truncated size="large">
                    {{ user?.username }}
                </el-text>
                <div class="job">
                    <span>{{ user?.position }}</span>
                    <span v-if="hasText()">@</span>
                    <span>{{ user?.company }}</span>
                </div>
            </div>
        </div>
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
        <div class="btn-group" v-if="!userStore.isAuthor(user?.userId)">
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

        .info {
            flex: 1;
            max-width: 140px;
            margin-left: 10px;

            .username {
                margin-top: 10px;
                color: var(--hami-text);
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