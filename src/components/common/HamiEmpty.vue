<script setup lang="ts">
import { noDataImg } from "@/store/images.ts"

interface EmptyProps {
    image?: any
    description?: string
    imageSize?: number
}

const $props = withDefaults(defineProps<EmptyProps>(), {
    description: "还没有数据",
    image: noDataImg,
    imageSize: 200
})

</script>
<template>
    <el-empty :description="description" :image="image" :image-size="imageSize"></el-empty>
</template>

<style scoped lang="less">

</style>