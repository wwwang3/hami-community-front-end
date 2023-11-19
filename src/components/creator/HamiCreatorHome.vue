<script setup lang="ts">
import { onBeforeMount, ref } from "vue"
import { useRouter } from "vue-router"
import useUserStore from '@/store/modules/user.ts'
import HamiUserStat from '@/components/creator/HamiUserStat.vue'
import HamiUserCardV3 from "@/components/user/CreatorUserCard.vue"
import { defaultAvatar } from "@/store/images.ts"

const $router = useRouter()
const userStore = useUserStore()
const userInfo = ref<LoginProfile>({} as LoginProfile)

const inited = ref(false)

onBeforeMount(async () => {
    try {
        inited.value = false
        userInfo.value = await userStore.getProfile()
    } catch (e) {
        await $router.replace("/")
    } finally {
        inited.value = true
    }
})

</script>
<template>
    <div class="hami-creator-home">
        <div class="creator-home" v-if="inited">
            <HamiUserCardV3
                :avatar="userInfo?.avatar ?? defaultAvatar"
                :ctime="userInfo?.ctime ?? new Date()"
                :followers="userInfo?.stat?.totalFollowers ?? 0"
                :followings="userInfo?.stat?.totalFollowings ?? 0"
                :username="userInfo?.username"
            >
            </HamiUserCardV3>
            <HamiUserStat :stat="userInfo.stat"></HamiUserStat>
        </div>
    </div>
</template>

<style scoped lang="less">
.hami-creator-home {
    max-width: 800px;
}
</style>