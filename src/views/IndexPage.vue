<script setup lang="ts">
import {ref, reactive, onMounted, computed} from "vue"
import {useRoute, useRouter} from "vue-router"
import {useTokenStore} from '@/store/modules/token.ts'
import {$message} from '@/utils/message.ts'
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
    <div>hello world!</div>
    <el-button @click="logout">退出登录</el-button>
</template>

<style scoped lang="less">

</style>