<template>
    <div>
        <template v-if="showHeader">
            <HamiHeader></HamiHeader>
        </template>
        <router-view></router-view>
    </div>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, onMounted } from 'vue'
import { $message } from '@/utils/message.ts'
import { useRoute } from 'vue-router'
import useUserStore from '@/store/modules/user.ts'
onBeforeMount(async () => {
    console.log("app before mount")
    // let loading = $message.loading(`加载中`)
    // try {
    //     await useUserStore().getProfile()
    // } catch (e) {
    // } finally {
    //     loading?.close()
    // }
})
const $route = useRoute()
onMounted(() => {
    $message.success("hello")
})
const showHeader = computed(() => {
    //@ts-ignore
    return $route.name !== 'Login' || $route.name !== 'Register'
})
</script>

<style lang="less">
</style>
<style lang="less" scoped>

</style>