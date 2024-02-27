<script setup lang="ts">
import { computed } from 'vue'

interface StatItemProps {
    value: number
    label: string
    reversed?: boolean
    center?: boolean
}

const $props = withDefaults(defineProps<StatItemProps>(), {
    value: 0,
    label: "",
    reversed: false,
    center: false
})

const count = computed(() => {
    if ($props.value >= 1000) {
        return $props.value / 1000 + "k"
    }
    return $props.value.toString()
})

</script>
<template>
    <div class="hami-stat-item" :class="{'reversed': reversed, 'center': center}">
        <div class="count">{{ count }}</div>
        <div class="text">{{ label }}</div>
    </div>
</template>

<style lang="less">
.hami-stat-item {
    display: flex;
    flex-direction: column;
}

.hami-stat-item.reversed {
    flex-direction: column-reverse;

    .count {
        margin-top: 4px;
    }

    .text {
        margin-top: 0;
    }
}

.hami-stat-item.center {
    align-items: center;
}

.hami-stat-item .text {
    font-size: 1rem;
    color: var(--hami-card-text-color);
    margin-top: 4px;
}

.hami-stat-item .count {
    color: var(--hami-text-1);
    font-size: 1.2rem;
    font-weight: 600;
}
</style>