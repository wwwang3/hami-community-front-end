<script setup lang="ts">
import {ref, reactive, onMounted, computed, Ref} from "vue"
import {useRoute, useRouter} from "vue-router"
import {useRequest} from '@/hooks'
import UserService from '@/service/modules/UserService.ts'
import HamiLoading from '@/components/common/HamiLoading.vue'
import {$message} from '@/utils/message.ts'
//interface
//router, props, inject, provide
const $router = useRouter()
//custom var
const [onLoading, getProfile] = useRequest({
    loading: true,
    run: (params) => UserService.getUserProfile()
})

const logined = ref(false)
const profile = ref<UserProfile>() as Ref<UserProfile>

onMounted(async () => {
    try {
        profile.value = await getProfile(null)
        logined.value = true
    } catch (e) {
        $message.error("登录状态异常")
    }
})

//life cycle

//watch

//fun

</script>
<template>
    <div class="hami-user-profile">
        <HamiLoading :loading="true">
            <div class="user-profile-container">2</div>
        </HamiLoading>
    </div>
</template>

<style scoped lang="less">
.hami-user-profile {
    padding: 10px 20px;
    background-color: var(--hami-bg);
    border-radius: var(--hami-radius-medium);
    .user-profile-container {
        min-height: 520px;
    }
}
</style>