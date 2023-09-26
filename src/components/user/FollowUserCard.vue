<script setup lang="ts">
import { ref, reactive, onMounted, computed, inject, Ref } from "vue"
import { useRoute, useRouter } from "vue-router"
import { useFollow } from '@/hooks/userInteract.ts'
import useUserStore from '@/store/modules/user.ts'

//interface
interface SimpleUserCardProps {
    user: User
}

const $props = defineProps<SimpleUserCardProps>()
const userStore = useUserStore()
const $router = useRouter()
//router, props, inject, provide
const [followed, handleAction] = useFollow($props.user?.followed)

const user = inject<Ref<User>>("user") as Ref<User>
const handleFollow = () => {
    if (userStore.isSelf($props.user.userId)) {
        return
    }
    console.log(user)
    handleAction($props.user.userId).then(active => {
        console.log(11111111)
        if (userStore.isSelf(user.value?.userId)) {
            //如果点开的页面是登录用户自己
            let stat = user.value?.stat
            if (active) {
                stat.totalFollowings++;
            } else {
                stat.totalFollowings--;
            }
        }
    })
}
//custom var

//life cycle

//watch

//fun
const toUserSpace = ()  => {
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
                <el-avatar :src="user.avatar" :size="64"></el-avatar>
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
                color: var(--hami-text);
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