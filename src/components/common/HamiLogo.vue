<script setup lang="ts">
import {ref, reactive, onMounted, computed} from "vue"
import {useRoute, useRouter} from "vue-router"
import logo2 from "/assets/hami-logo-2.png"
import logo3 from "/assets/hami-logo-3.png"

//interface
interface LogoProps {
    size: "mini" | "small" | "normal" | "medium" | "large"
    type: "logo2" | "logo3"
    fit: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down'
    width?: number
    height?: number
}

//router, props, inject, provide
const $props = withDefaults(defineProps<LogoProps>(), {
    size: "normal",
    type: "logo3",
    fit: "fill"
})
//custom var
const logoStyle = computed(() => {
    if ($props.width !== undefined || $props.height !== undefined) {
        return {
            width: $props.width === undefined ? "auto" : $props.width + "px",
            height: $props.height === undefined ? "auto" : $props.height + "px"
        }
    }
    switch ($props.size) {
        case "mini": {
            return {
                width: "76px",
                height: "24px"
            }
        }
        case "small": {
            return {
                width: "101px",
                height: "32px"
            }
        }
        case "normal": {
            return {
                width: "152px",
                height: "48px"
            }
        }
        case "medium": {
            return {
                width: "178px",
                height: "56px"
            }
        }
        case "large": {
            return {
                width: "201px",
                height: "64px"
            }
        }
    }
})
//life cycle

//watch

//fun

</script>
<template>
    <template v-if="type === 'logo3'">
        <el-image :src="logo3" :fit="fit" :style="logoStyle"></el-image>
    </template>
    <template v-if="type == 'logo2'">
        <el-image :src="logo3" :fit="fit" :style="logoStyle"></el-image>
    </template>
</template>

<style scoped lang="less">
</style>