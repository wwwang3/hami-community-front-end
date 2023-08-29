
<script setup lang="ts">
import { computed, onBeforeMount, onMounted, reactive, ref, watch } from 'vue'
import { $message } from '@/utils/message.ts'
import { useRoute } from 'vue-router'
import useUserStore from '@/store/modules/user.ts'
import * as path from 'path'
onBeforeMount(async () => {
    console.log("app before mount")
})
const $route = useRoute()

const paths = ["/login", "/register", "/editor/drafts"]
onMounted(() => {
    $message.success("hello")
})

const showHeader = ref(true)
watch(() => $route.path, (newVal, oldValue) => {
    for (let path of paths) {
        if (newVal.includes(path)) {
            showHeader.value = false
            return
        }
    }
    showHeader.value = true
}, {immediate: true})
</script>

<template>
    <div id="hami">
        <HamiHeader v-show="showHeader"></HamiHeader>
        <router-view></router-view>
    </div>
</template>

<style lang="less">
</style>
<style lang="less" scoped>

</style>