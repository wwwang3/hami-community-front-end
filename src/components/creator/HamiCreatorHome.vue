<script setup lang="ts">
import { ref, reactive, onMounted, computed, onBeforeMount } from "vue"
import { useRoute, useRouter } from "vue-router"
import useUserStore from '@/store/modules/user.ts'
import { isEmpty } from '@/utils'
//interface

const userStore = useUserStore()
const userInfo = ref<SimpleUserInfo>({} as SimpleUserInfo)
//router, props, inject, provide
onBeforeMount(async () => {
    try {
        userInfo.value = await userStore.getProfile()
    } catch (e) {

    }
})
//custom var

//life cycle

//watch

//fun

</script>
<template>
    <div class="hami-creator-home">
        <HamiUserCardV3 :user-info="userInfo"></HamiUserCardV3>
    </div>
</template>

<style scoped lang="less">

</style>