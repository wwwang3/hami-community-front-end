<script setup lang="ts">
import { formatNumber } from '@/utils'

interface Props {
    value: number | undefined
}

const $props = defineProps<Props>()

</script>
<template>
    <span class="ellipsis">{{ formatNumber(value) }}</span>
</template>

<style scoped lang="less">

</style>