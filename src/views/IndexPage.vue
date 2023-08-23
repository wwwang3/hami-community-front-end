<script setup lang="ts">
import { useTokenStore } from '@/store/modules/token.ts'
import { $message } from '@/utils/message.ts'
//interface

//router, props, inject, provide
const tokenStore = useTokenStore()
//custom var

//life cycle

//watch

//fun
const logout = async () => {
    await tokenStore.logout()
    $message.success("退出成功/")
}
</script>
<template>
    <div class="hami-index-page">
    </div>
</template>

<style scoped lang="less">

</style>