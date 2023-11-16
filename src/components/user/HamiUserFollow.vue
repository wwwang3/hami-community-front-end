<script setup lang="ts">
import { computed, onMounted, ref } from "vue"
import { TabPaneName } from 'element-plus'
import { UserInteractService } from '@/service/modules/interact.ts'
import FollowUserCard from '@/components/user/FollowUserCard.vue'
import useUserStore from '@/store/modules/user.ts'

//interface
interface UserFollowProps {
    id: string
}

//router, props, inject, provide
const $props = defineProps<UserFollowProps>()
const userStore = useUserStore()

const activeRoute = ref<"following" | "follower">("following")
const userFollowingList = ref()
const userFollowerList = ref()

const followLabel = computed(() => {
    return userStore.isSelf(parseInt($props.id)) ? "我的关注" : "关注的用户"
})

const followerLabel = computed(() => {
    return userStore.isSelf(parseInt($props.id)) ? "我的粉丝" : "粉丝"
})

//custom var
onMounted(() => {
    userFollowingList.value?.init()
})

const handleQueryFollower = (current: number, size: number) => {
    let param = {
        pageNum: current,
        pageSize: size,
        userId: parseInt($props.id)
    }
    return UserInteractService.listUserFollower(param)
}

const handleQueryFollowing = (current: number, size: number) => {
    let param = {
        pageNum: current,
        pageSize: size,
        userId: parseInt($props.id)
    }
    return UserInteractService.listUserFollowing(param)
}

const handleChange = (name: TabPaneName) => {
    if (name === "following") {
        userFollowingList.value?.init()
    } else {
        userFollowerList.value?.init()
    }
}
</script>
<template>
    <div class="user-follow">
        <el-tabs v-model="activeRoute" @tab-change="handleChange" type="border-card">
            <el-tab-pane :label="followLabel" name="following" >
                <HamiScrollList
                    ref="userFollowingList"
                    :query="handleQueryFollowing"
                    no-data-text="还没有关注"
                    key-property="id"
                    :show-no-more="false"
                >
                    <template #item="{item, index, _delete}">
                        <FollowUserCard :user="item" />
                    </template>
                </HamiScrollList>
            </el-tab-pane>
            <el-tab-pane :label="followerLabel" name="follower">
                <HamiScrollList
                    ref="userFollowerList"
                    :query="handleQueryFollower"
                    no-data-text="还没有粉丝"
                    key-property="id"
                    :show-no-more="false"
                >
                    <template #item="data">
                        <FollowUserCard :user="data.item" />
                    </template>
                </HamiScrollList>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<style scoped lang="less">
 #tab-following {
     padding-left: 20px;
 }
 .el-tabs--border-card {
     border: none;
     background-color: transparent;
 }
</style>