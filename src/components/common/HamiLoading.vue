<script setup lang="ts">

//interface
interface LoadingProps {
    loading: boolean,
    spinner?: string,
    text?: string,
    background?: string,
    height?: string | number,
    width?: string | number
}

const $props = withDefaults(defineProps<LoadingProps>(), {
    loading: false,
    spinner: '',
    text: '加载中',
    background: 'rgba(100, 100, 100, .7)',
})
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
    height: auto;
}
</style>