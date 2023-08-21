<template>
    <div>
        <HamiHeader></HamiHeader>
        <router-view></router-view>
    </div>
</template>

<script setup lang="ts">
import {onMounted} from 'vue'
import {$message} from '@/utils/message.ts'

onMounted(() => {
    $message.success("hello")
})
</script>

<style lang="less">
</style>
<style  lang="less" scoped>

</style>