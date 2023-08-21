<script setup lang="ts">
import {ref, reactive, onMounted, computed} from "vue"
import {useRoute, useRouter} from "vue-router"
import {useTokenStore} from '@/store/modules/token.ts'
import {$message} from '@/utils/message.ts'
import HamiHeader from '@/components/common/HamiHeader.vue'
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