<script setup lang="ts">
import { computed } from "vue"
import { logo2, logo3 } from "@/store/images.ts"

interface LogoProps {
    size: "mini" | "small" | "normal" | "medium" | "large"
    type: "logo2" | "logo3"
    fit: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down'
    width?: number
    height?: number
}

const $props = withDefaults(defineProps<LogoProps>(), {
    size: "normal",
    type: "logo3",
    fit: "fill"
})
//custom var
const logoStyle = computed(() => {
    if ($props.width || $props.height) {
        return {
            width: $props.width ? $props.width + "px" : "auto",
            height: $props.height ? $props.height + "px" : "auto"
        }
    }
    let style;
    switch ($props.size) {
        case "mini":
            style = {
                width: "76px",
                height: "24px"
            }
            break
        case "small":
            style =  {
                width: "101px",
                height: "32px"
            }
            break
        case "normal":
            style =  {
                width: "152px",
                height: "48px"
            }
            break
        case "medium":
            style = {
                width: "178px",
                height: "56px"
            }
            break
        case "large":
            style =  {
                width: "201px",
                height: "64px"
            }
            break
    }
    return style;
})

</script>
<template>
    <template v-if="type === 'logo3'">
        <el-image :src="logo3" :fit="fit" :style="logoStyle"></el-image>
    </template>
    <template v-if="type == 'logo2'">
        <el-image :src="logo2" :fit="fit" :style="logoStyle"></el-image>
    </template>
</template>

<style scoped lang="less">
</style>