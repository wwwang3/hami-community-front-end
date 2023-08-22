<script setup lang="ts">
import {ref, reactive, onMounted, computed} from "vue"
import {useRoute, useRouter} from "vue-router"
//interface
interface LoadingProps  {
    loading: boolean,
    spinner?: string,
    text?: string,
    background?: string
}
const $props = withDefaults(defineProps<LoadingProps>(), {
    loading: false,
    spinner: '',
    text: '加载中',
    background: 'rgba(100, 100, 100, .7)'
})

//router, props, inject, provide

//custom var

//life cycle

//watch

//fun

</script>
<template>
    <div class="hami-loading"
         v-loading="loading"
         :element-loading-spinner="spinner"
         :element-loading-background="background"
         :element-loading-text="text"
    >
        <slot name="default"></slot>
    </div>
</template>

<style scoped lang="less">
    .hami-loading {
        width: 100%;
        height: 100%;
    }
</style>