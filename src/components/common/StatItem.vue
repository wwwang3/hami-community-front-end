<script setup lang="ts">
import { computed } from 'vue'

interface StatItemProps {
    value: number
    label: string
    reversed?: boolean
}

const $props = withDefaults(defineProps<StatItemProps>(), {
    value: 0,
    label: "",
    reversed: false
})

const count = computed(() => {
    if ($props.value >= 1000) {
        return $props.value / 1000 + "k"
    }
    return $props.value.toString()
})

</script>
<template>
    <div class="stat-item" :class="{'reversed': reversed}">
        <div class="count">{{ count }}</div>
        <div class="text">{{ label }}</div>
    </div>
</template>

<style scoped lang="less">
.stat-item {
    display: flex;
    flex-direction: column;
}

.stat-item.reversed {
    flex-direction: column-reverse;
    .count {
        margin-top: 4px;
    }
    .text {
        margin-top: 0;
    }
}

.stat-item .text {
    font-size: 14px;
    color: var(--hami-card-text-color);
    margin-top: 4px;
}

.stat-item .count {
    color: var(--hami-text-1);
    font-size: 18px;
    font-weight: 600;
}
</style>