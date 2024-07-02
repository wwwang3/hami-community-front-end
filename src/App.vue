<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import HamiHeader from '@/components/header/HamiHeader.vue'


const $route = useRoute()
const paths = ["/editor/drafts", "/login", "/register", "/admin"]

const showHeader = ref(true)
watch(() => $route.path, (newVal, _oldValue) => {
    for (let path of paths) {
        if (newVal.includes(path)) {
            showHeader.value = false
            return
        }
    }
    showHeader.value = true
}, { immediate: true })
</script>

<template>
    <HamiHeader v-show="showHeader"></HamiHeader>
    <router-view></router-view>
</template>

<style lang="less">
</style>
<style lang="less" scoped>

</style>