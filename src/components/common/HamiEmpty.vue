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
    <el-empty :description="description" :image="image" :image-size="imageSize" class="hami-empty"></el-empty>
</template>

<style scoped lang="less">
.hami-empty {
    background-color: var(--hami-bg);
    border-radius: var(--hami-radius);
}
</style>