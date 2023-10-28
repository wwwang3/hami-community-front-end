<script setup lang="ts">
import { ref, onMounted, watch, provide, computed} from "vue"
import { useRequest } from '@/hooks'
import { UserService } from '@/service/modules/user.ts'
import HamiUserData from '@/components/user/HamiUserData.vue'
import { useRoute, useRouter } from 'vue-router'
import { TabsPaneContext } from 'element-plus'
import useUserStore from '@/store/modules/user.ts'
//interface
interface UserSpaceProps {
    id: string
}
const $props = defineProps<UserSpaceProps>()
const $router = useRouter()
const $route = useRoute()
const userStore = useUserStore()

const user = ref<User>({} as User)
const [onLoading, getAuthorInfo] = useRequest<User, [number]>({
    loading: true,
    run: (...params) => UserService.getAuthorInfo(...params)
})
const prefix1 = computed(() => {
    return !userStore.isSelf(parseInt($props.id)) ? "他的" : ""
})
const prefix2 = computed(() => {
    return !userStore.isSelf(parseInt($props.id)) ? "他" : ""
})

const activeRoute = ref("articles")

provide("SPACE_USER", user)

onMounted(() => {
    getAuthor()
})
//router, props, inject, provide
watch(() => $props.id, (newVal, oldVal) => {
     getAuthor()
})

watch(() => $route.path, (newVal, oldVal) => {
    let regex = /\/user\/space\/(\d+)(\/(articles|likes|collects|follows|""))?/
    let res = regex.exec($route.path)
    let route = res?.at(3)
    activeRoute.value = route ? route : "articles"
}, {
    immediate: true
})

const getAuthor = async () => {
    try {
        user.value = await getAuthorInfo(parseInt($props.id))
    } catch (e) {
        console.log(e)
    } finally {
    }
}
const handleClick = (pane:TabsPaneContext) => {
    console.log(pane.paneName)
    $router.push("/user/space/" + $props.id + "/" + pane.paneName)
}
</script>
<template>
    <div class="hami-user-space">
        <div class="user-space-container" v-if="!onLoading">
            <div class="user-space-body">
                <SpaceUserCard :user="user"></SpaceUserCard>
                <div class="detail-block">
                    <el-tabs v-model="activeRoute" @tab-click="handleClick">
                        <el-tab-pane :label="prefix1 + '文章'" name="articles"></el-tab-pane>
                        <el-tab-pane :label="prefix2+ '赞过'" name="likes"></el-tab-pane>
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
            background-color: var(--hami-bg);
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
#tab-articles {
    padding-left: 20px;
}
</style>