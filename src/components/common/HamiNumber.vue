<script setup lang="ts">
import { formatNumber } from '@/utils'
import { computed } from 'vue'

interface Props {
    value: number | undefined
    hiddenZero?: boolean
}

const $props = withDefaults(defineProps<Props>(), {
    hiddenZero: true
})

const hidden = computed(() => {
    return ($props.value === undefined || $props.value == 0) && $props.hiddenZero
})

</script>
<template>
    <span class="ellipsis" v-show="!hidden">{{ formatNumber(value) }}</span>
</template>

<style scoped lang="less">

</style>