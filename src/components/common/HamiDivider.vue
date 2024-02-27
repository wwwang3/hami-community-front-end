<script setup lang="ts">

import { computed } from 'vue'
import { isNumber, isString } from '@/utils'

interface DividerProps {
    margin?: string | number
    width?: string | number
    bg?: string
}

const $props = withDefaults(defineProps<DividerProps>(), {
    margin: 10,
    width: "100%",
    bg: "var(--color-9)"
})

const margin = computed(() => {
    if (isString($props.margin) && (<string>$props.margin).endsWith("px")) {
        return $props.margin
    }
    return $props.margin + "px"
})

const width = computed<string>(() => {
    return isNumber($props.width) ? $props.width + 'px' : $props.width + ''
})

const dividerStyle = computed(() => {
    return {
        "width": width.value,
        "background-color": $props.bg,
        "margin": `${margin.value} 0`,
    }
})

</script>
<template>
    <div :style="dividerStyle" class="hami-divider"></div>
</template>

<style scoped lang="less">
.hami-divider {
    display: block;
    height: 1px;
    border: none;
    padding: 0;
}
</style>