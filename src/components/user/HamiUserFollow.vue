<script setup lang="ts">
import { ref, reactive, onMounted, computed, inject } from "vue"
import { useRoute, useRouter } from "vue-router"
import { TabPaneName } from 'element-plus'
import UserService from '@/service/modules/user.ts'
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

const prefix = computed(() => {
    return !userStore.isSelf(parseInt($props.id)) ? "他" : ""
})

//custom var
onMounted(() => {
    userFollowingList.value?.init()
})
//life cycle

//watch

//fun
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
            <el-tab-pane label="关注的用户" name="following" >
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
            <el-tab-pane label="粉丝" name="follower">
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