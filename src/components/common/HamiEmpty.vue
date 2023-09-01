<script setup lang="ts">
import { ref, reactive, onMounted, computed } from "vue"
import { useRoute, useRouter } from "vue-router"
import noDataImg from "/assets/nodata02.png"
//interface
interface EmptyProps {
    description?: string
}
//router, props, inject, provide
const $props = withDefaults(defineProps<EmptyProps>(), {
    description: "还没有数据"
})
//custom var

//life cycle

//watch

//fun

</script>
<template>
    <el-empty :description="description" :image="noDataImg"></el-empty>
</template>

<style scoped lang="less">

</style>