<script setup lang="ts">

//interface
interface StatItemProps {
    value: string | number
    label: string
    reversed?: boolean
}

const $props = withDefaults(defineProps<StatItemProps>(), {
    value: 0,
    label: "",
    reversed: false
})

</script>
<template>
    <div class="stat-item" :class="{'reversed': reversed}">
        <div class="count">{{ value }}</div>
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
}

.stat-item .text {
    font-size: 14px;
    color: var(--hami-card-text-color);
}

.stat-item .count {
    color: var(--hami-text-1);
    font-size: 18px;
    font-weight: 600;
}
</style>