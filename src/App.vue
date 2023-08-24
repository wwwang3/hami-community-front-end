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

const $route = useRoute()
onMounted(() => {
    $message.success("hello")
})
const showHeader = computed(() => {
    return $route.name !== 'Login' || $route.name !== 'Register'
})
</script>

<style lang="less">
</style>
<style lang="less" scoped>

</style>