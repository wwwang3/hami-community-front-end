<script setup lang="ts">
import { computed, onUnmounted, provide, Ref, ref, watchEffect } from "vue"
import { useRequest } from '@/hooks'
import { UserService } from '@/service/modules/user.ts'
import { useRoute, useRouter } from 'vue-router'
import { TabsPaneContext } from 'element-plus'
import useUserStore from '@/store/modules/user.ts'
import { SPACE_USER } from '@/store/keys.ts'
import HamiUserData from '@/components/user/UserData.vue'
import SpaceUserCard from '@/components/user/SpaceUserCard.vue'

interface UserSpaceProps {
    id: string
}

const $props = defineProps<UserSpaceProps>()
const $router = useRouter()
const $route = useRoute()
const userStore = useUserStore()

const [onLoading, getAuthorInfo] = useRequest<User, [number]>({
    loading: true,
    run: (...params) => UserService.getAuthorInfo(...params)
})

const user = ref<User>({} as User)
provide<Ref<User>>(SPACE_USER, user)

const prefix1 = computed(() => {
    return !userStore.isSelf(parseInt($props.id)) ? "他的" : ""
})
const prefix2 = computed(() => {
    return !userStore.isSelf(parseInt($props.id)) ? "他" : ""
})

const activeRoute = ref("articles")
const stopRouteWatch = watchEffect(() => {
    let regex = /\/user\/space\/(\d+)(\/(articles|likes|collects|follows|""))?/
    let res = regex.exec($route.path)
    let route = res?.at(3)
    activeRoute.value = route || "articles"
})

const stopTitleWatch = watchEffect(() => {
    document.title = user.value.username + '的个人空间'
})

const getAuthor = async (id: number) => {
    try {
        user.value = await getAuthorInfo(id)
    } catch (e) {
        console.error(e)
        await $router.replace("/error")
    } finally {
    }
}

const stopIdWatch = watchEffect(async () => {
    await getAuthor(parseInt($props.id))
})

onUnmounted(() => {
    stopRouteWatch()
    stopIdWatch()
    stopTitleWatch()
    document.title = 'Hami'
})

const handleClick = (pane: TabsPaneContext) => {
    window.scrollTo({
        top: 0
    })
    $router.push("/user/space/" + $props.id + "/" + pane.paneName)
}
</script>
<template>
    <div class="hami-user-space">
        <div class="user-space-container">
            <div class="user-space-body">
                <div class="user-space-card card">
                    <SpaceUserCard :user="user" :avatar-size="90" show-tag></SpaceUserCard>
                </div>
                <div class="detail-block card" v-if="!onLoading">
                    <el-tabs v-model="activeRoute" @tab-click="handleClick">
                        <el-tab-pane :label="prefix1 + '文章'" name="articles"></el-tab-pane>
                        <el-tab-pane :label="prefix2 + '赞过'" name="likes"></el-tab-pane>
                        <el-tab-pane :label="prefix1 + '收藏'" name="collects"></el-tab-pane>
                        <el-tab-pane label="关注" name="follows"></el-tab-pane>
                    </el-tabs>
                    <router-view></router-view>
                </div>
            </div>
            <div class="user-space-right">
                <HamiUserData :stat="user.stat" :ctime="user.ctime"></HamiUserData>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">

.hami-user-space {
    margin-top: 40px;

    .user-space-card {
        padding: 30px;
        border-radius: var(--hami-radius);
        background-color: var(--hami-card-bg);
        margin-bottom: 20px;
    }

    .user-space-container {
        position: relative;
        max-width: 1020px;
        min-width: 800px;
        margin: 24px auto;
        display: flex;
    }

    .user-space-body {
        flex: 1;
        min-height: 600px;

        .detail-block {
            //background-color: var(--hami-bg);
            border-radius: var(--hami-radius);
        }

        :deep(.el-tabs__header) {
            margin: 0;
        }
    }

    .user-space-right {
        min-width: 240px;
        margin-left: 40px;
        max-width: 260px;
    }


}
</style>
<style>
html.dark .el-tabs__header {
    opacity: .8;
}
#tab-articles {
    padding-left: 20px;
}
</style>